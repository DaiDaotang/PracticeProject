package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;
import com.bean.ProjectBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetCanScoredProjectDao {

    public ArrayList<ProjectBean> GetProject(RequestBean<CompanyTeacherBean> requestBean)
    {
        ArrayList<ProjectBean> projectBeans = new ArrayList<>();
        CompanyTeacherBean companyTeacherBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            String sql;
            if (companyTeacherBean.isCanModify()){
                sql = "select distinct projectId from projtrelation natural join project where companyTeacherId = ? and projectPracticeId = ?;";
                state = conn.prepareStatement(sql);
                state.setInt(1,companyTeacherBean.getId());
                state.setInt(2,companyTeacherBean.getPractice());
            }
            else {
                sql = "select projectId from project where projectPracticeId = ? and projectId not in (select distinct projectId from projtrelation natural join project where companyTeacherId = ? and projectPracticeId = ?);";
                state = conn.prepareStatement(sql);
                state.setInt(1,companyTeacherBean.getPractice());
                state.setInt(2,companyTeacherBean.getId());
                state.setInt(3,companyTeacherBean.getPractice());
            }
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                ProjectBean projectBean = new ProjectBean();
                projectBean.setId(rs.getInt(1));
                projectBeans.add(projectBean);
            }
            return projectBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

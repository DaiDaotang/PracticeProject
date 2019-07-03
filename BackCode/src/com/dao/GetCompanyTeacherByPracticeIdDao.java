package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;
import com.bean.ProjectBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetCompanyTeacherByPracticeIdDao {
    public ArrayList<CompanyTeacherBean> GetCompanyTeacher(int practiceId)
    {
        ArrayList<CompanyTeacherBean> teacherBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT teacherId,teacherName,teacherSex FROM companyteacher JOIN pracctrelation ON companyteacher.teacherId = pracctrelation.companyTeacherId WHERE practiceId = ?";
            state = conn.prepareStatement(sql);
            state.setInt(1,practiceId);
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                CompanyTeacherBean teacherBean = new CompanyTeacherBean();
                int id = rs.getInt(1);
                teacherBean.setId(id);
                teacherBean.setName(rs.getString(2));
                teacherBean.setSex(rs.getString(3));
                PreparedStatement state2;
                state2 = conn.prepareStatement("SELECT projtrelation.projectId,projectName FROM projtrelation NATURAL JOIN project WHERE companyTeacherId = ? AND projectPracticeId = ?;");
                state2.setInt(1, id);
                state2.setInt(2,practiceId);
                ResultSet resultSet = state2.executeQuery();
                ArrayList<ProjectBean> projectBeans = new ArrayList<>();
                while (resultSet.next()) {
                    ProjectBean projectBean = new ProjectBean();
                    projectBean.setId(resultSet.getInt(1));
                    projectBean.setName(resultSet.getString(2));
                    projectBeans.add(projectBean);
                }
                teacherBean.setProjects(projectBeans);
                teacherBeans.add(teacherBean);
            }
            conn.commit();
            return teacherBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

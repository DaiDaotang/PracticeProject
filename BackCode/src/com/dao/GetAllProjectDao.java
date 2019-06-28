package com.dao;

import com.DBConn;
import com.bean.ProjectBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetAllProjectDao {
    public ArrayList<ProjectBean> GetCompany()
    {
        ArrayList<ProjectBean> projectBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT * FROM project";
            state = conn.prepareStatement(sql);
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                ProjectBean projectBean = new ProjectBean();
                projectBean.setId(rs.getInt(1));
                projectBean.setName(rs.getString(2));
                projectBeans.add(projectBean);
            }
            conn.commit();
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

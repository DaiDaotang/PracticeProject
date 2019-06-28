package com.dao;

import com.DBConn;
import com.bean.ProjectBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetProjectinPracticeDao {

    public ArrayList<ProjectBean> getProjectinPractice(int id) {
        ArrayList<ProjectBean> projectBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try {
            conn.setAutoCommit(false);
            state = conn.prepareStatement("select projectId,projectName from project where projectPracticeId = ?;");
            state.setInt(1, id);
            ResultSet resultSet = state.executeQuery();
            while (resultSet.next()) {
                ProjectBean projectBean = new ProjectBean();
                projectBean.setId(resultSet.getInt(1));
                projectBean.setName(resultSet.getString(2));
                projectBeans.add(projectBean);
            }
            return projectBeans;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } finally {
            DBConn.closeConn(conn);
        }
    }
}

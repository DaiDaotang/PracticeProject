package com.dao;

import com.DBConn;
import com.bean.ProjectBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetProjectByCompanyTeacherIdDao {
    public ArrayList<ProjectBean> getProject(int id,int practiceId)
    {
        Connection conn = DBConn.getConnection();
        ArrayList<ProjectBean> projectBeans = new ArrayList<>();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("SELECT projtrelation.projectId,projectName FROM projtrelation NATURAL JOIN project WHERE companyTeacherId = ? AND projectPracticeId = ?;");
            state.setInt(1, id);
            state.setInt(2,practiceId);
            resultSet = state.executeQuery();
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


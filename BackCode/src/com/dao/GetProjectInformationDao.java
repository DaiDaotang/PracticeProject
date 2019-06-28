package com.dao;

import com.DBConn;
import com.bean.ProjectBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetProjectInformationDao {

    public ProjectBean getProjectInformation(int id)
    {
        Connection conn = DBConn.getConnection();
        ProjectBean projectBean = new ProjectBean();
        ArrayList<Integer> teacherId = new ArrayList<>();
        ResultSet resultSet,resultSet2;
        try {
            PreparedStatement state,state2;
            state = conn.prepareStatement("select * from project where projectId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                projectBean.setName(resultSet.getString("projectName"));
                projectBean.setType(resultSet.getString("projectType"));
                projectBean.setDifficulty(resultSet.getInt("projectDifficulty"));
                projectBean.setIntroduce(resultSet.getString("projectIntroduce"));
                projectBean.setBaseContent(resultSet.getString("projectBaseContent"));
                projectBean.setExtendContent(resultSet.getString("projectExtendContent"));
                projectBean.setAdvanceContent(resultSet.getString("projectAdvanceContent"));

                state2 = conn.prepareStatement("select companyTeacherId from projtrelation where projectId = ?;");
                state2.setInt(1,id);
                resultSet2 = state2.executeQuery();
                while (resultSet2.next())
                {
                    teacherId.add(resultSet2.getInt(1));
                }
                projectBean.setTeachers(teacherId);

                return projectBean;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } finally {
            DBConn.closeConn(conn);
        }
        return null;
    }
}

package com.dao;

import com.DBConn;
import com.bean.ProjectBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetProjectinPracticeDao {

    public ArrayList<ProjectBean> getProjectinPractice(int id)
    {
        Connection conn = DBConn.getConnection();
        ArrayList<ProjectBean> arrayList = new ArrayList<>();
        ResultSet resultSet,resultSet2;
        try {
            PreparedStatement state,state2;
            state = conn.prepareStatement("select * from project where projectPracticeId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            while(resultSet.next()) {
                ProjectBean projectBean = new ProjectBean();
                projectBean.setId(resultSet.getInt("projectId"));
                projectBean.setName(resultSet.getString("projectName"));
                projectBean.setType(resultSet.getString("projectType"));
                projectBean.setDifficulty(resultSet.getInt("projectDifficulty"));
                projectBean.setIntroduce(resultSet.getString("projectIntroduce"));
                projectBean.setBaseContent(resultSet.getString("projectBaseContent"));
                projectBean.setExtendContent(resultSet.getString("projectExtendContent"));
                projectBean.setAdvanceContent(resultSet.getString("projectAdvanceContent"));

                state2 = conn.prepareStatement("select teacherName from projtrelation,companyTeacher where projectId = ? and projtrelation.companyTeacherId = companyTeacher.teacherId;");
                state2.setInt(1,resultSet.getInt("projectId"));
                resultSet2 = state2.executeQuery();
                ArrayList<String> teacherName = new ArrayList<>();
                while (resultSet2.next())
                {
                    teacherName.add(resultSet2.getString(1));
                }
                projectBean.setTeacherNames(teacherName);
                arrayList.add(projectBean);

            }
            return arrayList;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } finally {
            DBConn.closeConn(conn);
        }
    }
}

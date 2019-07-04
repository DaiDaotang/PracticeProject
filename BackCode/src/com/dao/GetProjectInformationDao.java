package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;
import com.bean.ProjectBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetProjectInformationDao {
    public ProjectBean getProjectByProjectId(int id)
    {
        Connection conn = DBConn.getConnection();
        ResultSet resultSet,resultSet2;
        try {
            PreparedStatement state,state2;
            state = conn.prepareStatement("select * from project where projectId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                ProjectBean projectBean = new ProjectBean();
                ArrayList<CompanyTeacherBean> teacherBeans = new ArrayList<>();
                projectBean.setName(resultSet.getString("projectName"));
                projectBean.setType(resultSet.getString("projectType"));
                projectBean.setDifficulty(resultSet.getInt("projectDifficulty"));
                projectBean.setIntroduce(resultSet.getString("projectIntroduce"));
                projectBean.setBaseContent(resultSet.getString("projectBaseContent"));
                projectBean.setExtendContent(resultSet.getString("projectExtendContent"));
                projectBean.setAdvanceContent(resultSet.getString("projectAdvanceContent"));

                state2 = conn.prepareStatement("select teacherId,teacherName from projtrelation JOIN companyTeacher ON projtrelation.companyTeacherId = companyTeacher.teacherId where projectId = ?");
                state2.setInt(1,id);
                resultSet2 = state2.executeQuery();
                while (resultSet2.next())
                {
                    CompanyTeacherBean teacherBean = new CompanyTeacherBean();
                    teacherBean.setId(resultSet2.getInt(1));
                    teacherBean.setName(resultSet2.getNString(2));
                    teacherBeans.add(teacherBean);
                }
                projectBean.setCompanyTeachers(teacherBeans);

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

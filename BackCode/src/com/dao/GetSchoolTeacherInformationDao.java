package com.dao;

import com.DBConn;
import com.bean.SchoolTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetSchoolTeacherInformationDao {

    public SchoolTeacherBean getSchoolTeacherInformation(int id)
    {
        Connection conn = DBConn.getConnection();
        SchoolTeacherBean schoolTeacherBean = new SchoolTeacherBean();
        ResultSet resultSet,resultSet2;
        try {
            PreparedStatement state,state2;
            state = conn.prepareStatement("select schoolteacherName,schoolteacherHead,schoolteacherSex,schoolId from schoolteacher where schoolteacherId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                schoolTeacherBean.setName(resultSet.getString(1));
                schoolTeacherBean.setHead(resultSet.getString(2));
                schoolTeacherBean.setSex(resultSet.getString(3));
                schoolTeacherBean.setSchool(resultSet.getInt(4));

                state2 = conn.prepareStatement("select schoolName from school where schoolId = ?;");
                state2.setInt(1,resultSet.getInt(4));
                resultSet2 = state2.executeQuery();
                if(resultSet2.next())
                {
                    schoolTeacherBean.setschoolName(resultSet2.getString(1));
                    return schoolTeacherBean;
                }
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

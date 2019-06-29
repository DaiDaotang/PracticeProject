package com.dao;

import com.DBConn;
import com.bean.PracticeBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetPracticeInformationDao {

    public PracticeBean getPracticeInformation(int id)
    {
        Connection conn = DBConn.getConnection();
        PracticeBean practiceBean = new PracticeBean();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("select practiceName,practiceContent,starttime,endtime,template from practice where practiceId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                practiceBean.setName(resultSet.getString(1));
                practiceBean.setContent(resultSet.getString(2));
                practiceBean.setStartTime(resultSet.getDate(3));
                practiceBean.setEndTime(resultSet.getDate(4));
                practiceBean.setTemplate(resultSet.getString(5));
                return practiceBean;
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

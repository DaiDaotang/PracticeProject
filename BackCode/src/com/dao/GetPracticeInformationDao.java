package com.dao;

import com.DBConn;
import com.bean.PracticeBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class GetPracticeInformationDao {

    public PracticeBean getPracticeInformation(int id)
    {
        Connection conn = DBConn.getConnection();
        PracticeBean practiceBean = new PracticeBean();
        ResultSet resultSet,resultSet2;
        try {
            PreparedStatement state,state2;
            state = conn.prepareStatement("select practiceName,practiceContent,starttime,endtime,practiceId,template from practice where practiceId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                practiceBean.setName(resultSet.getString(1));
                practiceBean.setContent(resultSet.getString(2));
                practiceBean.setStartTime(resultSet.getDate(3));
                practiceBean.setEndTime(resultSet.getDate(4));
                practiceBean.setId(resultSet.getInt(5));
                practiceBean.setTemplate(resultSet.getString(6));
                state2 = conn.prepareStatement("select schoolId,schoolName,companyId,companyName from pscrelation natural join company natural join school where practiceId = ?;");
                state2.setInt(1,resultSet.getInt(5));
                resultSet2 = state2.executeQuery();
                if(resultSet2.next())
                {
                    practiceBean.setSchool(resultSet2.getInt(1));
                    practiceBean.setSchoolName(resultSet2.getString(2));
                    practiceBean.setCompany(resultSet2.getInt(3));
                    practiceBean.setCompanyName(resultSet2.getString(4));
                    return practiceBean;
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

    public ArrayList<PracticeBean> getPracticeByStudentId(int id)
    {
        Connection conn = DBConn.getConnection();
        ArrayList<PracticeBean> arrayList = new ArrayList<>();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("select practiceId,practiceName from pscrelation natural join practice natural join student where studentId = ? and endtime >= ?;");
            state.setInt(1, id);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(2,dateFormat.format(new Date()));
            resultSet = state.executeQuery();
            while (resultSet.next())
            {
                PracticeBean practiceBean = new PracticeBean();
                practiceBean.setId(resultSet.getInt(1));
                practiceBean.setName(resultSet.getString(2));
                arrayList.add(practiceBean);
            }
            return arrayList;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
        } finally{
            DBConn.closeConn(conn);
        }
        return null;
    }
}

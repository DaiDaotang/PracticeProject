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
        ResultSet resultSet;
        try {
            PreparedStatement state;
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

    public ArrayList<PracticeBean> getPracticeByStudentId(int id)
    {
        Connection conn = DBConn.getConnection();
        ArrayList<PracticeBean> arrayList = new ArrayList<>();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("select practiceId,practiceName,starttime from pscrelation natural join practice where schoolId = (select schoolId from student where studentId = ?);");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            while (resultSet.next())
            {
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                Date d1 = df.parse(resultSet.getString(3));
                Date dt = new Date();
                Date d2 = df.parse(df.format(dt));
                if(d1.getTime() > d2.getTime())
                {
                    PracticeBean practiceBean = new PracticeBean();
                    practiceBean.setId(resultSet.getInt(1));
                    practiceBean.setName(resultSet.getString(2));
                    arrayList.add(practiceBean);
                }
            }
            return arrayList;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
        } catch (ParseException e) {
            e.printStackTrace();
        } finally{
            DBConn.closeConn(conn);
        }
        return null;
    }
}

package com.dao;

import com.DBConn;
import com.bean.PracticeBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class GetWeekByPracticeIdDao {
    public PracticeBean getWeek(int practiceId) {
        Connection conn = DBConn.getConnection();
        PracticeBean practiceBean = new PracticeBean();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("SELECT starttime,endtime FROM practice WHERE practiceId = ?;");
            state.setInt(1, practiceId);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                practiceBean.setStartTime(resultSet.getDate(1));
                practiceBean.setEndTime(resultSet.getDate(2));
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
                simpleDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
                Date startTime = simpleDateFormat.parse(simpleDateFormat1.format(resultSet.getDate(1)));
                Date endTime = simpleDateFormat.parse(simpleDateFormat1.format(resultSet.getDate(2)));
                java.util.Date now = new Date();
                Calendar startCal = Calendar.getInstance();
                startCal.setTime(startTime);
                int days;
                int startDayOfWeek = startCal.get(Calendar.DAY_OF_WEEK);
                if (now.getTime() < endTime.getTime()){
                    days = (int)Math.ceil((now.getTime() - startTime.getTime())/(1000*3600*24.0));
                } else {
                    days = (int)Math.ceil((endTime.getTime() - startTime.getTime())/(1000*3600*24.0));
                }
                if (days < 0){
                    practiceBean.setWeek(0);
                }else {
                    practiceBean.setDaysOfFirstWeek(9-startDayOfWeek);
                    int restDays = days + (- 7 + startDayOfWeek - 2) % 7;
                    if (startDayOfWeek == 2){
                        practiceBean.setWeek((int)Math.ceil(restDays/7.0));
                    }
                    else{
                        practiceBean.setWeek((int)Math.ceil(restDays/7.0)+1);
                    }
                }
            }
            return practiceBean;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } catch (ParseException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
        } finally {
            DBConn.closeConn(conn);
        }
        return null;
    }
}

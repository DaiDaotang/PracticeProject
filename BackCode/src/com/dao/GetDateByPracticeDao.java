package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class GetDateByPracticeDao {
    public ArrayList<ArrayList<Date>> getSignin(RequestBean<Integer> requestBean) {
        Connection conn = DBConn.getConnection();
        int practiceId = requestBean.getReqParam();
        ArrayList<ArrayList<Date>> allDates = new ArrayList<>();
        PreparedStatement state;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date startTime;
        Date endTime;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT starttime,endtime FROM practice WHERE practiceId = ?";
            state = conn.prepareStatement(sql);
            state.setInt(1,practiceId);
            ResultSet rs = state.executeQuery();
            if (rs.next()){
                startTime = df.parse(rs.getString(1));
                endTime = df.parse(rs.getString(2));
            } else {
                return null;
            }
            int days;
            int week;
            Calendar startCal = Calendar.getInstance();
            startCal.setTime(startTime);
            int startDayOfWeek = startCal.get(Calendar.DAY_OF_WEEK);
            days = (int)Math.ceil((endTime.getTime() - startTime.getTime())/(1000*3600*24.0));
            if (days < 0){
                week = 0;
            }else {
                int restDays = days + (- 7 + startDayOfWeek - 2) % 7;
                if (startDayOfWeek == 2) {
                    week = (int)Math.ceil(restDays/7.0);
                }
                else {
                    week = (int)Math.ceil(restDays/7.0) + 1;
                }
            }
            for (int index = 0; index < week; index++){
                Calendar calendar = Calendar.getInstance();
                Calendar calendar2 = Calendar.getInstance();
                calendar.setTime(startTime);
                calendar2.setTime(startTime);
                int firstWeeksDays = (9 - startDayOfWeek) % 7;
                if (firstWeeksDays != 0){
                    if (index == 0){
                        calendar2.add(Calendar.DAY_OF_MONTH,firstWeeksDays);
                    } else {
                        calendar.add(Calendar.DAY_OF_MONTH,firstWeeksDays);
                        calendar2.add(Calendar.DAY_OF_MONTH,firstWeeksDays);
                        calendar.add(Calendar.WEEK_OF_MONTH,index-1);
                        calendar2.add(Calendar.WEEK_OF_MONTH,index);
                    }
                }else {
                    calendar.add(Calendar.WEEK_OF_MONTH,index);
                    calendar2.add(Calendar.WEEK_OF_MONTH,index+1);
                }
                ArrayList<Date> dates = new ArrayList<>();
                while (calendar.getTime().getTime() < calendar2.getTime().getTime()){
                    if (calendar.getTime().getTime() > endTime.getTime())
                        break;
                    dates.add(calendar.getTime());
                    calendar.add(Calendar.DAY_OF_MONTH, 1);
                }
                allDates.add(dates);
            }
            if (allDates.size()==0){
                return null;
            }
            return allDates;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
        } catch (ParseException e) {
            e.printStackTrace();
        } finally {
            DBConn.closeConn(conn);
        }
        return null;
    }
}

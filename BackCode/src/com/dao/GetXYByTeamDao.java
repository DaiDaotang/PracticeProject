package com.dao;

import com.DBConn;
import com.bean.*;

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

public class GetXYByTeamDao {
    public ArrayList<XYBean> getXY(RequestBean<TeamBean> requestBean) {
        Connection conn = DBConn.getConnection();
        int practiceId = requestBean.getReqParam().getpracticeId();
        int teamId = requestBean.getReqParam().getteamId();
        ArrayList<XYBean> allDates = new ArrayList<>();
        PreparedStatement state,state2,state3;
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
            Date now = new Date();
            int days;
            int week;
            Calendar startCal = Calendar.getInstance();
            startCal.setTime(startTime);
            int startDayOfWeek = startCal.get(Calendar.DAY_OF_WEEK);
            if (now.getTime() < endTime.getTime()){
                days = (int)Math.ceil((now.getTime() - startTime.getTime())/(1000*3600*24.0));
            } else {
                days = (int)Math.ceil((endTime.getTime() - startTime.getTime())/(1000*3600*24.0));
            }
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
            //每一周
            for (int index = 0; index < week; index++){
                int total = 0;
                state2 = conn.prepareStatement("SELECT SUM(taskAmount) FROM task WHERE teamId = ? AND taskWeek = ?");
                state2.setInt(1,teamId);
                state2.setInt(2,index+1);
                ResultSet rs2 = state2.executeQuery();
                if (rs2.next()){
                    total = rs2.getInt(1);
                }
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
                XYBean xyBean = new XYBean();
                ArrayList<Date> dates = new ArrayList<>();
                dates.add(null);
                ArrayList<Integer> works = new ArrayList<>();
                works.add(total);
                //*****************************************
                while (calendar.getTime().getTime() < calendar2.getTime().getTime()){
                    if (calendar.getTime().getTime() > endTime.getTime() || calendar.getTime().getTime() > now.getTime())
                        break;
                    dates.add(calendar.getTime());
                    calendar.add(Calendar.DAY_OF_MONTH, 1);
                }

                state3 = conn.prepareStatement("SELECT SUM(taskAmount),finishTime FROM task WHERE teamId = ? AND isFinished = true AND taskWeek = ? GROUP BY finishTime ORDER BY finishTime;");
                state3.setInt(1,teamId);
                state3.setInt(2,index + 1);
                ResultSet rs3 = state3.executeQuery();
                ArrayList<TaskBean> tasks = new ArrayList<>();
                while (rs3.next()){
                    TaskBean taskBean = new TaskBean();
                    taskBean.setTaskAmount(rs3.getInt(1));
                    taskBean.setFinishTime(rs3.getDate(2));
                    tasks.add(taskBean);
                }
                for (TaskBean task:tasks) {
                    for (Date date:dates) {
                        if (date == null) continue;
                        if (task.getFinishTime().getTime() == date.getTime()){
                            int dex = dates.indexOf(date);
                            if (dex > works.size()){
                                for (int i = works.size(); i < dex; i++){
                                    works.add(0);
                                }
                            }
                            works.add(dex,task.getTaskAmount());
                        }
                    }
                }
                if (works.size() < dates.size()){
                    for (int i = works.size(); i < dates.size(); i++){
                        works.add(0);
                    }
                }
                for (int i = 1; i < works.size();i++){
                    int rest = works.get(i-1)-works.get(i);
                    works.set(i,rest);
                }
                xyBean.setDates(dates);
                xyBean.setWorks(works);
                allDates.add(xyBean);
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

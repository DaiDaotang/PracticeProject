package com.dao;

import com.DBConn;
import com.bean.TeamBean;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.sql.*;
import java.util.TimeZone;

public class StudentCheckTeamDao {

    public TeamBean checkTeam(int id, int practiceId)
    {
        Connection conn = DBConn.getConnection();
        TeamBean teamBean = new TeamBean();
        try{
            if(practiceId == -1)
            {
                PreparedStatement state,state2;
                state = conn.prepareStatement("select max(teamId) from stprelation where studentId = ?;");
                state.setInt(1,id);
                ResultSet resultSet = state.executeQuery();
                if(resultSet.next()) {
                    int teamId = resultSet.getInt(1);
                    teamBean.setteamId(teamId);
                    state2 = conn.prepareStatement("select teamName,projectId,projectName,projectPracticeId,starttime,endtime from project NATURAL JOIN stprelation NATURAL JOIN team JOIN practice ON project.projectPracticeId = practice.practiceId where stprelation.teamId = ?;");
                    state2.setInt(1, teamId);
                    ResultSet resultSet2 = state2.executeQuery();
                    if (resultSet2.next()) {
                        teamBean.setteamId(teamId);
                        teamBean.setteamName(resultSet2.getString(1));
                        teamBean.setprojectId(resultSet2.getInt(2));
                        teamBean.setprojectName(resultSet2.getString(3));
                        teamBean.setpracticeId(resultSet2.getInt(4));
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
                        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
                        Date startTime = simpleDateFormat.parse(simpleDateFormat1.format(resultSet2.getDate(5)));
                        Date endTime = simpleDateFormat.parse(simpleDateFormat1.format(resultSet2.getDate(6)));
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
                            teamBean.setWeeks(0);
                        }else {
                            int restDays = days + (- 7 + startDayOfWeek - 2) % 7;
                            if (startDayOfWeek == 2){
                                teamBean.setWeeks((int)Math.ceil(restDays/7.0));
                            }
                            else{
                                teamBean.setWeeks((int)Math.ceil(restDays/7.0)+1);
                            }
                        }
                        return teamBean;
                    }
                }
            }else{
                PreparedStatement state;
                state = conn.prepareStatement("select teamId,teamName,projectId,projectName,projectPracticeId,starttime,endtime from stprelation NATURAL JOIN project NATURAL JOIN team NATURAL JOIN practice where studentId = ? and projectPracticeId = ?;");
                state.setInt(1,id);
                state.setInt(2,practiceId);
                ResultSet resultSet = state.executeQuery();
                if(resultSet.next()) {
                    teamBean.setteamId(resultSet.getInt(1));
                    teamBean.setteamName(resultSet.getString(2));
                    teamBean.setprojectId(resultSet.getInt(3));
                    teamBean.setprojectName(resultSet.getString(4));
                    teamBean.setpracticeId(resultSet.getInt(5));
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
                    Date startTime = simpleDateFormat.parse(simpleDateFormat1.format(resultSet.getDate(6)));
                    Date endTime = simpleDateFormat.parse(simpleDateFormat1.format(resultSet.getDate(7)));
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
                        teamBean.setWeeks(0);
                    }else {
                        int restDays = days + (- 7 + startDayOfWeek - 2) % 7;
                        if (startDayOfWeek == 2) {
                            teamBean.setWeeks((int)Math.ceil(restDays/7.0));
                        }
                        else {
                            teamBean.setWeeks((int)Math.ceil(restDays/7.0) + 1);
                        }
                    }
                    return teamBean;
                }
            }
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } catch (ParseException e) {
            e.printStackTrace();
        } finally {
            DBConn.closeConn(conn);
        }
        return null;
    }
}

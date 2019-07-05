package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.*;

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
                    state2 = conn.prepareStatement("select teamName,projectId,projectName,projectPracticeId,starttime,endtime from project NATURAL JOIN stprelation NATURAL JOIN team NATURAL JOIN practice where stprelation.teamId = ?;");
                    state2.setInt(1, teamId);
                    ResultSet resultSet2 = state2.executeQuery();
                    if (resultSet2.next()) {
                        teamBean.setteamId(teamId);
                        teamBean.setteamName(resultSet2.getString(1));
                        teamBean.setprojectId(resultSet2.getInt(2));
                        teamBean.setprojectName(resultSet2.getString(3));
                        teamBean.setpracticeId(resultSet2.getInt(4));
                        Date startTime = resultSet2.getDate(5);
                        Date endTime = resultSet2.getDate(6);
                        int days = (int)((endTime.getTime() - startTime.getTime())/(1000*3600*24));
                        teamBean.setWeeks((int)Math.ceil(days/7.0));
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
                    Date startTime = resultSet.getDate(6);
                    Date endTime = resultSet.getDate(7);
                    int days = (int)((endTime.getTime() - startTime.getTime())/(1000*3600*24));
                    teamBean.setWeeks((int)Math.ceil(days/7.0));
                    return teamBean;
                }
            }
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
        return null;
    }
}

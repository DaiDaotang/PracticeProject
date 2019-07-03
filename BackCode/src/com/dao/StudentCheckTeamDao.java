package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
                    state2 = conn.prepareStatement("select teamName,projectId,projcetName,projectPracticeId from project NATURAL JOIN stprelation NATURAL JOIN team where stprelation.teamId = ?;");
                    state2.setInt(1, teamId);
                    ResultSet resultSet2 = state2.executeQuery();
                    if (resultSet2.next()) {
                        teamBean.setteamId(teamId);
                        teamBean.setteamName(resultSet2.getString(1));
                        teamBean.setprojectId(resultSet2.getInt(2));
                        teamBean.setprojectName(resultSet2.getString(3));
                        teamBean.setpracticeId(resultSet2.getInt(4));
                    }
                }
            }else{
                PreparedStatement state;
                state = conn.prepareStatement("select teamId,teamName,projectId,projectName,projectPracticeId from stprelation natural join project NATURAL JOIN team where studentId = ? and projectPracticeId = ?;");
                state.setInt(1,id);
                state.setInt(2,practiceId);
                ResultSet resultSet = state.executeQuery();
                if(resultSet.next()) {
                    teamBean.setteamId(resultSet.getInt(1));
                    teamBean.setteamName(resultSet.getString(1));
                    teamBean.setprojectId(resultSet.getInt(2));
                    teamBean.setprojectName(resultSet.getString(3));
                    teamBean.setpracticeId(resultSet.getInt(4));
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

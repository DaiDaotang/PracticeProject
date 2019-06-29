package com.dao;

import com.DBConn;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentCheckTeamDao {

    public TeamBean checkTeam(int id)
    {
        Connection conn = DBConn.getConnection();
        TeamBean teamBean = new TeamBean();
        ResultSet resultSet,resultSet2,resultSet3,resultSet4;

        try{
            PreparedStatement state,state2,state3,state4;
            state = conn.prepareStatement("select max(teamId) from stprelation where studentId = ?;");
            state.setInt(1,id);
            resultSet = state.executeQuery();
            if(resultSet.next())
            {
                int teamId = resultSet.getInt(1);
                teamBean.setteamId(teamId);
                state2 = conn.prepareStatement("select teamName,captainId,teamScores,githubLink from team where teamId = ?;");
                state2.setInt(1,teamId);
                resultSet2 = state2.executeQuery();
                if(resultSet2.next())
                {
                    teamBean.setteamName(resultSet2.getString(1));
                    int captainId = resultSet2.getInt(2);
                    teamBean.setteamScores(resultSet2.getInt(3));
                    teamBean.setgithubLink(resultSet2.getString(4));
                    if(id == captainId)
                    {
                        teamBean.setisCaptain(true);
                    }else {
                        teamBean.setisCaptain(false);
                    }
                }
                state3 = conn.prepareStatement("select projectId,projectName from project where projectId = (select projectId from stprelation where teamId = ?);");
                state3.setInt(1,teamId);
                resultSet3 = state3.executeQuery();
                if(resultSet3.next())
                {
                    teamBean.setprojectId(resultSet3.getInt(1));
                    teamBean.setprojectName(resultSet3.getString(2));
                    state4 = conn.prepareStatement("select practiceId,practiceName from practice where practiceId = (select projectPracticeId from project where projectId = ?);");
                    state4.setInt(1,resultSet3.getInt(1));
                    resultSet4 = state4.executeQuery();
                    if(resultSet4.next())
                    {
                        teamBean.setpracticeId(resultSet4.getInt(1));
                        teamBean.setpracticeName(resultSet4.getString(2));
                        return teamBean;
                    }
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

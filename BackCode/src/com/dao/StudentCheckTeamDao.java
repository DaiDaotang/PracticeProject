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
        ResultSet resultSet,resultSet2;

        try{
            PreparedStatement state,state2;
            state = conn.prepareStatement("select teamId from stprelation where studentId = ?;");
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

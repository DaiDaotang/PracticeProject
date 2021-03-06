package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.*;

public class CreateTeamDao {

    public int createTeam(RequestBean<TeamBean> reqbean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2,state3,state4;
        try{
            TeamBean teamBean = reqbean.getReqParam();
            conn.setAutoCommit(false);
            state3 = conn.prepareStatement("select projectPracticeId from stprelation natural join project where studentId = ?;");
            state3.setInt(1,teamBean.getcaptainId());
            ResultSet resultSet = state3.executeQuery();
            state4 = conn.prepareStatement("select projectPracticeId from project where projectId = ?;");
            state4.setInt(1,teamBean.getprojectId());
            ResultSet resultSet2 = state4.executeQuery();
            if(resultSet2.next())
            {
                while(resultSet.next())
                {
                    if(resultSet.getInt(1)==resultSet2.getInt(1))
                    {
                        return -1;
                    }
                }
            }else {
                return -1;
            }
            String sql ="INSERT INTO team (teamName,captainId,githubLink) VALUES (?,?,?)";
            state = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            state.setString(1,teamBean.getteamName());
            state.setInt(2,teamBean.getcaptainId());
            state.setString(3,teamBean.getgithubLink());
            state.executeUpdate();
            ResultSet set = state.getGeneratedKeys();
            if (set.next()){
                state2 = conn.prepareStatement("insert into stprelation (studentId,teamId,projectId) values(?,?,?)");
                state2.setInt(1,teamBean.getcaptainId());
                state2.setInt(2,set.getInt(1));
                state2.setInt(3,teamBean.getprojectId());
                state2.executeUpdate();

                conn.commit();
                return set.getInt(1);
            }
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return -1;
    }
}

package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.*;

public class ModifyTeamInformationDao {
    public int modifyTeam(RequestBean<TeamBean> reqBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        try{
            TeamBean teamBean = reqBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="UPDATE team SET teamName = ?,githubLink = ? WHERE teamId = ?";
            state = conn.prepareStatement(sql);
            state.setString(1,teamBean.getteamName());
            state.setString(2,teamBean.getgithubLink());
            state.setInt(3,teamBean.getteamId());
            state.executeUpdate();
            String sql2 = "UPDATE stprelation SET projectId = ? WHERE teamId = ?";
            state2 = conn.prepareStatement(sql2);
            state2.setInt(1,teamBean.getprojectId());
            state2.setInt(2,teamBean.getteamId());
            state2.executeUpdate();
            conn.commit();
            return 0;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

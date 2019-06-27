package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.*;
import java.util.ArrayList;

public class CreateTeamDao {

    public int createTeam(RequestBean<TeamBean> reqbean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            TeamBean teamBean = reqbean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO team (teamName,captainId) VALUES (?,?)";
            state = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            state.setString(1,teamBean.getteamName());
            state.setInt(2,teamBean.getcaptainId());
            state.executeUpdate();
            ResultSet set = state.getGeneratedKeys();
            if (set.next()){
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

package com.dao;

import com.DBConn;
import com.bean.CompanyBean;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CreateTeamDao {

    public ArrayList<TeamBean> createTeam(RequestBean<TeamBean> reqbean)
    {
        ArrayList<TeamBean> list = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        try{
            TeamBean teamBean = reqbean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO team (teamName,captainId) VALUES (?,?)";
            state = conn.prepareStatement(sql);
            state.setString(1,teamBean.getteamName());
            state.setInt(2,teamBean.getcaptainId());
            state.executeUpdate();
            conn.commit();

            state2 = conn.prepareStatement("select teamId from team where captainId = ?");
            state2.setInt(1,teamBean.getcaptainId());
            ResultSet set = state2.executeQuery();
            conn.commit();
            if (set.next()){
                TeamBean bean = new TeamBean();
                bean.setteamId(set.getInt(1));
                list.add(bean);
            }
            return list;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

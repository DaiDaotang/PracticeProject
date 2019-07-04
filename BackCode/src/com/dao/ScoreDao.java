package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ScoreDao {

    public int scoreForTeam(RequestBean<TeamBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            TeamBean teamBean = requestBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="update team set teamScores = ? where teamId = ?;";
            state = conn.prepareStatement(sql);
            state.setInt(1,teamBean.getteamScores());
            state.setInt(2,teamBean.getteamId());
            int i = state.executeUpdate();
            if(i < 0)
            {
                return -1;
            }
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }

    public int scoreForStudent(RequestBean<TeamBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            TeamBean teamBean = requestBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="update stprelation set studentscores = ? where studentId = ? and teamId = ?;";
            state = conn.prepareStatement(sql);
            state.setInt(1,teamBean.getStudentScores());
            state.setInt(2,teamBean.getstudentId());
            state.setInt(3,teamBean.getteamId());
            int i = state.executeUpdate();
            if(i < 0)
            {
                return -1;
            }
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }
}

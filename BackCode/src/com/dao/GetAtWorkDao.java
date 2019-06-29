package com.dao;

import com.DBConn;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class GetAtWorkDao {
    public boolean GetAtWork(int studentId)
    {
        Boolean atWork;
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT atwork FROM signin WHERE studentId = ? AND signinDate = ? ORDER BY signinId DESC";
            state = conn.prepareStatement(sql);
            state.setInt(1,studentId);
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(2,df.format(new Date()));
            ResultSet rs = state.executeQuery();
            if (rs.next()){
                atWork = rs.getBoolean(1);
            }else {
                atWork = false;
            }
            conn.commit();
            return atWork;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
        }finally {
            DBConn.closeConn(conn);
        }
        return false;
    }
}

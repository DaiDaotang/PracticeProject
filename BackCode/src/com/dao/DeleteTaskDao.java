package com.dao;

import com.DBConn;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DeleteTaskDao {
    public int deleteTask(int taskId)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2,state3;
        try{
            conn.setAutoCommit(false);
            state = conn.prepareStatement("delete from task where taskId = ?;");
            state.setInt(1,taskId);
            int i = state.executeUpdate();
            if(i <= 0)
            {
                return -1;
            }
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

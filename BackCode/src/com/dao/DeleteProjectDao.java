package com.dao;

import com.DBConn;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DeleteProjectDao {

    public boolean deleteProject(int projectId)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        try{
            state = conn.prepareStatement("delete from projtrelation where projectId = ?;");
            state.setInt(1,projectId);
            int i = state.executeUpdate();
            if(i >= 0)
            {
                state2 = conn.prepareStatement("delete from project where projectId = ?;");
                state2.setInt(1,projectId);
                int j = state2.executeUpdate();
                if(j > 0)
                {
                    return true;
                }
            }
            return false;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return false;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

package com.dao;

import com.DBConn;
import com.bean.Loginbean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginDao {

    public boolean checkIn(Loginbean loginbean)
    {
        String telephone = loginbean.getTelephone();
        String password = loginbean.getPassword();
        String authority = loginbean.getAuthority();
        Connection conn = DBConn.getConnection();
        ResultSet resultSet;
        try{
            PreparedStatement state;

            if(authority.equals("学生"))
            {
                state = conn.prepareStatement("select * from student where tel = ?");
                state.setString(1,telephone);
                resultSet = state.executeQuery();

            }
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return false;
        }finally {
            DBConn.closeConn(conn);
            return true;
        }
    }
}

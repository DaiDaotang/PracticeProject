package com.dao;

import com.DBConn;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class GetPracticeIsBegunDao {
    public int get(RequestBean<Integer> requestBean)
    {
        Connection conn = DBConn.getConnection();
        int practiceId = requestBean.getReqParam();
        PreparedStatement state;
        try{
            state = conn.prepareStatement("SELECT startTime from practice where practiceId = ?");
            state.setInt(1,practiceId);
            ResultSet resultSet = state.executeQuery();
            if (resultSet.next())
            {
                Date start = resultSet.getDate(1);
                Date now = new Date();
                if (start.getTime() < now.getTime())
                    return 1;
                else return 0;
            }
            return -1;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

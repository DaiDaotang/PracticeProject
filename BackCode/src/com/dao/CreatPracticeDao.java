package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CreatPracticeDao {

    public int creat(RequestBean<PracticeBean> practiceBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            PracticeBean bean = practiceBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO practice (practiceName,practiceContent,starttime,endtime) VALUES (?,?,?,?)";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getName());
            state.setString(2,bean.getContent());
            state.setDate(3,bean.getStartTime());
            state.setDate(4,bean.getEndTime());
            state.executeUpdate();
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

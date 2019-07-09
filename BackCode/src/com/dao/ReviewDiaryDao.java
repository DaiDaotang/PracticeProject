package com.dao;

import com.DBConn;
import com.bean.DiaryBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ReviewDiaryDao {
    public int Review(RequestBean<DiaryBean> reqBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            DiaryBean diaryBean = reqBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="UPDATE studentdiary SET score = ?,comment = ? WHERE studentdiaryId = ?";
            state = conn.prepareStatement(sql);
            state.setInt(1,diaryBean.getScore());
            state.setString(2,diaryBean.getComment());
            state.setInt(3,diaryBean.getId());
            state.executeUpdate();
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

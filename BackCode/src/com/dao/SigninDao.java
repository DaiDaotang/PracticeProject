package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.SigninBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class SigninDao {
    public int signin(RequestBean<SigninBean> signinBean)
    {
        Connection conn = DBConn.getConnection();
        try{
            SigninBean bean = signinBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO signin (studentId,signinDateTime,atwork) VALUES (?,?,?)";
            PreparedStatement state;
            state = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            state.setInt(1,bean.getStudentId());
            state.setString(2,bean.getDateTime());
            state.setBoolean(3,bean.isAtWork());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }
}

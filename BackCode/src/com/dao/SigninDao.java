package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.SigninBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SigninDao {
    public int signin(RequestBean<SigninBean> signinBean)
    {
        Connection conn = DBConn.getConnection();
        try{
            SigninBean bean = signinBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO signin (studentId,signinDate,signinTime,atwork) VALUES (?,?,?,?)";
            PreparedStatement state;
            state = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            state.setInt(1,bean.getStudentId());
            Date date = new Date();
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(2,df.format(date));
            SimpleDateFormat df2 = new SimpleDateFormat("HH:mm:ss");
            state.setString(3,df2.format(date));
            state.setBoolean(4,bean.isAtWork());
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

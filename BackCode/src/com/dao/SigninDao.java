package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.SigninBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class SigninDao {
    public int signin(RequestBean<SigninBean> signinBean) throws ParseException {
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat df2 = new SimpleDateFormat("HH:mm:ss");
        SimpleDateFormat df3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        df.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
        df2.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
        df3.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
        String theDate = df.format(date);
        String theTime = df2.format(date);
        Date ten = df3.parse(theDate + " 22:00:00");
        Date seven = df3.parse(theDate + " 07:00:00");
        if (date.getTime()>ten.getTime()||date.getTime()<seven.getTime()){
            return -2;
        }
        Connection conn = DBConn.getConnection();
        try{
            SigninBean bean = signinBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO signin (studentId,signinDate,signinTime,atwork) VALUES (?,?,?,?)";
            PreparedStatement state;
            state = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            state.setInt(1,bean.getStudentId());
            state.setString(2,theDate);
            state.setString(3,theTime);
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

package com.dao;

import com.DBConn;
import com.bean.OneDaySignins;
import com.bean.RequestBean;
import com.bean.SigninBean;
import com.bean.StudentBean;

import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class GetSigninByStudentDao {
    public ArrayList<OneDaySignins> getSignin(RequestBean<StudentBean> requestBean) {
        Connection conn = DBConn.getConnection();
        StudentBean studentBean = requestBean.getReqParam();
        ArrayList<OneDaySignins> allSignins = new ArrayList<>();
        PreparedStatement state,state2;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date startTime = new Date();
        Date endTime = new Date();
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT starttime,endtime FROM practice WHERE practiceId = ?";
            state = conn.prepareStatement(sql);
            state.setInt(1,studentBean.getPracticeId());
            ResultSet rs = state.executeQuery();
            if (rs.next()){
                startTime = df.parse(rs.getString(1));
                endTime = df.parse(rs.getString(2));
            }
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startTime);
            while (calendar.getTime().getTime() < endTime.getTime()){
                String sql2 ="SELECT * FROM signin WHERE studentId = ? AND signinDate = ?";
                state2 = conn.prepareStatement(sql2);
                state2.setInt(1,studentBean.getId());
                state2.setString(2,df.format(calendar.getTime()));
                ResultSet rs2 = state2.executeQuery();
                ArrayList<SigninBean> signins = new ArrayList<>();
                while (rs2.next()){
                    SigninBean signinBean = new SigninBean();
                    signinBean.setId(rs2.getInt(1));
                    signinBean.setStudentId(rs2.getInt(2));
                    signinBean.setDateTime(rs2.getString(3)+" "+rs2.getString(4));
                    signinBean.setAtWork(rs2.getBoolean(5));
                    signins.add(signinBean);

                }
                OneDaySignins oneDaySignins = new OneDaySignins();
                oneDaySignins.setSignins(signins);
                oneDaySignins.setDate(df.format(calendar.getTime()));
                allSignins.add(oneDaySignins);
                calendar.add(Calendar.DAY_OF_MONTH, 1);
            }
            return allSignins;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
        } catch (ParseException e) {
            e.printStackTrace();
        } finally {
            DBConn.closeConn(conn);
        }
        return null;
    }
}

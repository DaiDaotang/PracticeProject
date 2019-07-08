package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Calendar;

public class GetPracticeNowByCompanyTeacherIdDao {

    public ArrayList<PracticeBean> GetPractice(int companyTeacherId)
    {
        ArrayList<PracticeBean> practiceBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            state = conn.prepareStatement("select practiceId,practiceName from pracctrelation natural join practice where companyTeacherId = ? and starttime <= ? and endtime > ?;");
            state.setInt(1,companyTeacherId);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(2,df.format(new Date()));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.MONTH,-1);
            Date date = calendar.getTime();
            state.setString(3,df.format(calendar.getTime()));
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                PracticeBean practiceBean = new PracticeBean();
                practiceBean.setId(rs.getInt(1));
                practiceBean.setName(rs.getString(2));
                practiceBeans.add(practiceBean);
            }
            return practiceBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

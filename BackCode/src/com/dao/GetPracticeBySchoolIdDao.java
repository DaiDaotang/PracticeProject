package com.dao;

import com.DBConn;
import com.bean.PracticeBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class GetPracticeBySchoolIdDao {
    public ArrayList<PracticeBean> GetPractice(int schoolId,boolean finished)
    {
        ArrayList<PracticeBean> practiceBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql;
            if(finished)
            {
                sql ="SELECT practice.*,company.companyId,companyName FROM pscrelation NATURAL JOIN practice NATURAL JOIN company WHERE schoolId = ? and endtime < ?;";
            }else {
                sql ="SELECT practice.*,company.companyId,companyName FROM pscrelation NATURAL JOIN practice NATURAL JOIN company WHERE schoolId = ? and endtime >= ?;";
            }
            state = conn.prepareStatement(sql);
            state.setInt(1,schoolId);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(2,dateFormat.format(new Date()));
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                PracticeBean practiceBean = new PracticeBean();
                practiceBean.setId(rs.getInt(1));
                practiceBean.setName(rs.getString(2));
                practiceBean.setContent(rs.getString(3));
                practiceBean.setStartTime(rs.getDate(4));
                practiceBean.setEndTime(rs.getDate(5));
                practiceBean.setTemplate(rs.getString(6));
                practiceBean.setCompany(rs.getInt(7));
                practiceBean.setCompanyName(rs.getString(8));
                practiceBeans.add(practiceBean);
            }
            conn.commit();
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

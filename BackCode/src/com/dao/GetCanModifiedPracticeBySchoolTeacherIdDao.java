package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;
import com.bean.SchoolTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class GetCanModifiedPracticeBySchoolTeacherIdDao {
    public ArrayList<PracticeBean> GetPractice(RequestBean<SchoolTeacherBean> reqBean)
    {
        ArrayList<PracticeBean> practiceBeans = new ArrayList<>();
        SchoolTeacherBean schoolTeacherBean = reqBean.getReqParam();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql;
            if (schoolTeacherBean.isCanModify()){
                sql = "SELECT practice.*,company.companyId,companyName FROM pracstrelation NATURAL JOIN practice NATURAL JOIN pscrelation NATURAL JOIN company WHERE schoolTeacherId = ? AND isMain = TRUE AND starttime > ?;";
            }
            else {
                sql = "SELECT practice.*,company.companyId,companyName FROM pracstrelation NATURAL JOIN practice NATURAL JOIN pscrelation NATURAL JOIN company WHERE schoolTeacherId = ? AND isMain = TRUE AND starttime <= ?;";
            }
            state = conn.prepareStatement(sql);
            state.setInt(1,schoolTeacherBean.getId());
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

package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class GetCanModifiedPracticeByCompanyTeacherIdDao {
    public ArrayList<PracticeBean> GetPractice(RequestBean<CompanyTeacherBean> reqBean)
    {
        ArrayList<PracticeBean> practiceBeans = new ArrayList<>();
        CompanyTeacherBean companyTeacherBean = reqBean.getReqParam();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql;
            if (companyTeacherBean.isCanModify()){
                sql = "SELECT practice.*,school.schoolId,schoolName FROM pracctrelation NATURAL JOIN practice NATURAL JOIN pscrelation NATURAL JOIN school WHERE companyTeacherId = ? AND isMain = TRUE AND starttime > ?;";
            }
            else {
                sql = "SELECT practice.*,school.schoolId,schoolName FROM pracctrelation NATURAL JOIN practice NATURAL JOIN pscrelation NATURAL JOIN school WHERE companyTeacherId = ? AND isMain = TRUE AND starttime <= ?;";

            }
            state = conn.prepareStatement(sql);
            state.setInt(1,companyTeacherBean.getId());
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
                practiceBean.setSchool(rs.getInt(7));
                practiceBean.setSchoolName(rs.getString(8));
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

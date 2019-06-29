package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetCompanyTeacherByPracticeIdDao {
    public ArrayList<CompanyTeacherBean> GetCompanyTeacher(int practiceId)
    {
        ArrayList<CompanyTeacherBean> teacherBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT teacherId,teacherName,teacherSex FROM pracstrelation,companyteacher WHERE practiceId = ? AND pracctrelation.companyTeacherId = companyteacher.teacherId;";
            state = conn.prepareStatement(sql);
            state.setInt(1,practiceId);
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                CompanyTeacherBean teacherBean = new CompanyTeacherBean();
                teacherBean.setId(rs.getInt(1));
                teacherBean.setName(rs.getString(2));
                teacherBean.setSex(rs.getString(3));
                teacherBeans.add(teacherBean);
            }
            conn.commit();
            return teacherBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

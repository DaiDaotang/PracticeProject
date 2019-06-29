package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetCompanyTeacherByCompanyIdDao {
    public ArrayList<CompanyTeacherBean> GetCompanyTeacher(int companyId)
    {
        ArrayList<CompanyTeacherBean> teacherBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT teacherId,teacherName,teacherSex FROM companyteacher WHERE companyId = ?;";
            state = conn.prepareStatement(sql);
            state.setInt(1,companyId);
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

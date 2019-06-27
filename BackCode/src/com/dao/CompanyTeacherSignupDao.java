package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CompanyTeacherSignupDao {
    public int signup(RequestBean<CompanyTeacherBean> companyTeacherBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            CompanyTeacherBean bean = companyTeacherBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO companyteacher (teacherPhone,teacherPassword,teacherName,companyId,teacherSex) VALUES (?,?,?,?,?)";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getTelephone());
            state.setString(2,bean.getPassword());
            state.setString(3,bean.getName());
            state.setInt(4,bean.getCompany());
            state.setString(5,bean.getSex());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }
}

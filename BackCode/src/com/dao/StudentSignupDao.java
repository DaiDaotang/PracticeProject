package com.dao;

import com.DBConn;
import com.bean.CompanyBean;
import com.bean.RequestBean;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentSignupDao {

    public int signup(RequestBean<StudentBean> studentBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            StudentBean bean = studentBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO student (studentPhone,studentPassword,studentName,schoolId,studentNumber,studentMajor,studentSex,studentGrade) VALUES (?,?,?,?,?,?,?,?)";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getTelephone());
            state.setString(2,bean.getPassword());
            state.setString(3,bean.getName());
            state.setInt(4,bean.getSchool());
            state.setString(5,bean.getNumber());
            state.setString(6,bean.getMajor());
            state.setString(7,bean.getSex());
            state.setString(8,bean.getGrade());
            state.executeUpdate();
            conn.commit();
            return 1;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

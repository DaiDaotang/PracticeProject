package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ModifyStudentDao {
    public int modify(RequestBean<StudentBean> studentBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            StudentBean bean = studentBean.getReqParam();
            conn.setAutoCommit(false);
            String sql;
            if (bean.isPas()){
                sql ="UPDATE student SET studentPassword = ? WHERE studentId = ?";
                state = conn.prepareStatement(sql);
                state.setString(1,bean.getPassword());
                state.setInt(2,bean.getId());
            }else {
                sql ="UPDATE student SET studentPhone = ?,studentName = ?,studentNumber = ?,studentMajor = ?,studentSex = ?,studentGrade = ? WHERE studentId = ?";
                state = conn.prepareStatement(sql);
                state.setString(1,bean.getTelephone());
                state.setString(2,bean.getName());
                state.setString(3,bean.getNumber());
                state.setString(4,bean.getMajor());
                state.setString(5,bean.getSex());
                state.setString(6,bean.getGrade());
                state.setInt(7,bean.getId());
            }
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

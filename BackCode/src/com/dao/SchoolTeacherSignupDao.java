package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.SchoolTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class SchoolTeacherSignupDao {
    public int signup(RequestBean<SchoolTeacherBean> companyTeacherBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            SchoolTeacherBean bean = companyTeacherBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO schoolteacher (schoolTeacherPhone,schoolTeacherPassword,schoolTeacherName,schoolId,schoolTeacherSex) VALUES (?,?,?,?,?)";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getTelephone());
            state.setString(2,bean.getPassword());
            state.setString(3,bean.getName());
            state.setInt(4,bean.getSchool());
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

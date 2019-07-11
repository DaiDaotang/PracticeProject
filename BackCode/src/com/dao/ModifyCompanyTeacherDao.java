package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ModifyCompanyTeacherDao {
    public int modify(RequestBean<CompanyTeacherBean> companyTeacherBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            CompanyTeacherBean bean = companyTeacherBean.getReqParam();
            conn.setAutoCommit(false);
            String sql;
            if (bean.isPas()){
                sql = "UPDATE companyteacher SET teacherPassword = ? WHERE teacherId = ?";
                state = conn.prepareStatement(sql);
                state.setString(1,bean.getPassword());
                state.setInt(2,bean.getId());
            }else {
                sql = "UPDATE companyteacher SET teacherPhone = ?,teacherName = ?,teacherSex = ? WHERE teacherId = ?";
                state = conn.prepareStatement(sql);
                state.setString(1,bean.getTelephone());
                state.setString(2,bean.getName());
                state.setString(3,bean.getSex());
                state.setInt(4,bean.getId());
            }
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

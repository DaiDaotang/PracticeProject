package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.SchoolTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ModifySchoolTeacherDao {
    public int modify(RequestBean<SchoolTeacherBean> companyTeacherBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            SchoolTeacherBean bean = companyTeacherBean.getReqParam();
            conn.setAutoCommit(false);
            String sql;
            if (bean.isPas()){
                sql ="UPDATE schoolteacher SET schoolTeacherPassword = ? WHERE schoolTeacherId = ?";
                state = conn.prepareStatement(sql);
                state.setString(1,bean.getPassword());
                state.setInt(2,bean.getId());
            }else {
                sql ="UPDATE schoolteacher SET schoolTeacherPhone = ?,schoolTeacherName = ? ,schoolTeacherSex = ? WHERE schoolTeacherId = ?";
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

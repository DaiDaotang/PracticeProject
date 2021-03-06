package com.dao;

import com.DBConn;
import com.bean.CompanyBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CompanySignupDao {

    public int signup(RequestBean<CompanyBean> companyBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            CompanyBean bean = companyBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO company (companyPhone,companyPassword,companyName) VALUES (?,?,?)";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getTelephone());
            state.setString(2,bean.getPassword());
            state.setString(3,bean.getName());
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

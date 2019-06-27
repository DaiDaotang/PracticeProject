package com.dao;

import com.DBConn;
import com.bean.CompanyBean;
import com.bean.RequestBean;
import com.mysql.cj.protocol.Resultset;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetCompanyDao {
    public CompanyBean[] GetCompany(RequestBean<CompanyBean> companyTeacherBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            CompanyBean bean = companyTeacherBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="SELECT companyId,companyName FROM company";
            state = conn.prepareStatement(sql);
            ResultSet rs = state.executeQuery();
            conn.commit();
            while (rs.next()){
                CompanyBean companyBean = new CompanyBean();
                companyBean.setId(rs.getInt(1));
                companyBean.setTelephone();
            }
            return null;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

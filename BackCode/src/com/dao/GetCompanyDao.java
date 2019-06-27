package com.dao;

import com.DBConn;
import com.bean.CompanyBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetCompanyDao {
    public ArrayList<CompanyBean> GetCompany()
    {
        ArrayList<CompanyBean> companyBeans = null;
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT companyId,companyName FROM company";
            state = conn.prepareStatement(sql);
            ResultSet rs = state.executeQuery();
            conn.commit();
            while (rs.next()){
                CompanyBean companyBean = new CompanyBean();
                companyBean.setId(rs.getInt(1));
                companyBean.setName(rs.getString(2));
                companyBeans.add(companyBean);
            }
            return companyBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

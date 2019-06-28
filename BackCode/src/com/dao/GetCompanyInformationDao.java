package com.dao;

import com.DBConn;
import com.bean.CompanyBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetCompanyInformationDao {

    public CompanyBean getCompanyInformation(int id) {
        Connection conn = DBConn.getConnection();
        CompanyBean companyBean = new CompanyBean();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("select companyName,companyHead from company where companyId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                companyBean.setName(resultSet.getString(1));
                companyBean.setHead(resultSet.getString(2));
                return companyBean;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } finally {
            DBConn.closeConn(conn);
        }
        return null;
    }
}

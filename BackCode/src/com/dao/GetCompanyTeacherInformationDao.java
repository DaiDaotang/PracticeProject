package com.dao;

import com.DBConn;
import com.bean.CompanyTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetCompanyTeacherInformationDao {

    public CompanyTeacherBean getCompanyTeancherInformation(int id)
    {
        Connection conn = DBConn.getConnection();
        CompanyTeacherBean companyTeacherBean = new CompanyTeacherBean();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("select teacherName,teacherHead,teacherSex,companyId from companyteacher where teacherId = ?;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
            if (resultSet.next()) {
                companyTeacherBean.setName(resultSet.getString(1));
                companyTeacherBean.setCompany(resultSet.getInt(4));
                companyTeacherBean.setHead(resultSet.getString(2));
                companyTeacherBean.setSex(resultSet.getString(3));
                return companyTeacherBean;
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

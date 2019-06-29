package com.dao;

import com.DBConn;
import com.bean.SigninBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetSigninByStudentDao {
    public ArrayList<ArrayList<SigninBean>> getSignin(int id) {
        Connection conn = DBConn.getConnection();
        ArrayList<ArrayList<SigninBean>> allSignins = new ArrayList<>();
        ArrayList<SigninBean> oneDaySignins = new ArrayList<>();
        ResultSet resultSet;
        try {
            PreparedStatement state;
            state = conn.prepareStatement("select * from signin where studentId = ? GROUP BY signinId;");
            state.setInt(1, id);
            resultSet = state.executeQuery();
//            if (resultSet.next()) {
//                companyBean.setName(resultSet.getString(1));
//                companyBean.setHead(resultSet.getString(2));
//                return companyBean;
//            }
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

package com.dao;

import com.DBConn;
import com.bean.SchoolBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetSchoolDao {
    public ArrayList<SchoolBean> GetSchool()
    {
        ArrayList<SchoolBean> schoolBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT * FROM school";
            state = conn.prepareStatement(sql);
            ResultSet rs = state.executeQuery();
            conn.commit();
            while (rs.next()){
                SchoolBean schoolBean = new SchoolBean();
                schoolBean.setId(rs.getInt(1));
                schoolBean.setName(rs.getString(2));
                schoolBeans.add(schoolBean);
            }
            return schoolBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

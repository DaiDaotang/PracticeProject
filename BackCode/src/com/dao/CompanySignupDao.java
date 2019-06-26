package com.dao;

import com.DBConn;
import com.bean.CompanyBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CompanySignupDao {

    public int setId()
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql="SELECT COUNT(*) FROM company";
            state = conn.prepareStatement(sql);
            ResultSet set = state.executeQuery();
            if(set.next()){
                int i = set.getInt(1) + 1;
                return i;
            }
            else
            {
                return 0;
            }
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return 0;
        }finally {
            DBConn.closeConn(conn);
        }
    }

    public void signup(RequestBean<CompanyBean> companyBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        CompanyBean bean = companyBean.getReqParam();
        try{
            conn.setAutoCommit(false);
            String sql ="INSERT INTO company VALUES (?,?,?,?,?)";
            state = conn.prepareStatement(sql);
            state.setInt(1,setId());
            state.setString(2,bean.getTelephone());
            state.setString(3,bean.getPassword());
            state.setString(4,bean.getName());
            state.setString(5,bean.getHead());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

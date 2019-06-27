package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.*;

public class CreatPracticeDao {

    public int creat(RequestBean<PracticeBean> practiceBean)
    {
        Connection conn = DBConn.getConnection();
        try{
            PracticeBean bean = practiceBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO practice (practiceName,practiceContent,starttime,endtime) VALUES (?,?,?,?)";
            PreparedStatement state;
            state = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            state.setString(1,bean.getName());
            state.setString(2,bean.getContent());
            state.setDate(3,bean.getStartTime());
            state.setDate(4,bean.getEndTime());
            state.executeUpdate();
            ResultSet rs = state.getGeneratedKeys();
            int id;
            if(rs.next()){
                id = rs.getInt(1);
            }
            else throw new Exception("未返回id");
            String sql2 = "INSERT INTO pscrelation VALUES(?,?,?)";
            PreparedStatement state2;
            state2 = conn.prepareStatement(sql2);
            state2.setInt(1,id);
            state2.setInt(2,bean.getSchool());
            state2.setInt(3,bean.getCompany());
            state2.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }
}

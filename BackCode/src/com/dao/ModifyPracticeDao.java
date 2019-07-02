package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ModifyPracticeDao {
    public int modifyPractice(RequestBean<PracticeBean> reqBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        boolean haveRight = false;
        try{
            PracticeBean practiceBean = reqBean.getReqParam();
            conn.setAutoCommit(false);
            if(practiceBean.getSchoolTeacherId()!=0){
                String sql = "SELECT isMain FROM pracstrelation WHERE schoolTeacherId = ? AND practiceId = ?";
                state = conn.prepareStatement(sql);
                state.setInt(1,practiceBean.getSchoolTeacherId());
                state.setInt(2,practiceBean.getId());
                ResultSet rs = state.executeQuery();
                if(rs.next()){
                    if (rs.getBoolean(1)){
                        haveRight = true;
                    }
                }
            }else if(practiceBean.getCompanyTeacherId()!=0){
                String sql = "SELECT isMain FROM pracctrelation WHERE companyTeacherId = ? AND practiceId = ?";
                state = conn.prepareStatement(sql);
                state.setInt(1,practiceBean.getCompanyTeacherId());
                state.setInt(2,practiceBean.getId());
                ResultSet rs = state.executeQuery();
                if(rs.next()){
                    if (rs.getBoolean(1)){
                        haveRight = true;
                    }
                }
            }
            if (haveRight) {
                String sql2 ="UPDATE practice SET practiceName = ?,practiceContent = ?,starttime = ?,endtime = ? WHERE practiceId = ?";
                state2 = conn.prepareStatement(sql2);
                state2.setString(1,practiceBean.getName());
                state2.setString(2,practiceBean.getContent());
                state2.setDate(3,practiceBean.getStartTime());
                state2.setDate(4,practiceBean.getEndTime());
                state2.setInt(5,practiceBean.getId());
                state2.executeUpdate();
                conn.commit();
                return 0;
            }else {
                return -2;
            }
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

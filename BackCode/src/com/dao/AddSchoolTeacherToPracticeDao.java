package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.*;
import java.util.ArrayList;

public class AddSchoolTeacherToPracticeDao {
    public int addTeacher(RequestBean<PracticeBean> bean)
    {
        Connection conn = DBConn.getConnection();
        try{
            PracticeBean practiceBean = bean.getReqParam();
            ArrayList<Integer> teachers = practiceBean.getCompanyTeachers();
            for (Integer teacher : teachers) {
                conn.setAutoCommit(false);
                String sql2 = "INSERT INTO pracstrelation VALUES (?,?,?)";
                PreparedStatement state2;
                state2 = conn.prepareStatement(sql2);
                state2.setInt(1, practiceBean.getId());
                state2.setInt(2, teacher);
                state2.setBoolean(3,false);
                state2.executeUpdate();
                return 0;
            }
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBConn.closeConn(conn);
        }
        return -1;
    }
}

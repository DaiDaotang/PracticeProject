package com.dao;

import com.DBConn;
import com.bean.SchoolTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetSchoolTeacherByPracticeIdDao {
    public ArrayList<SchoolTeacherBean> GetSchoolTeacher(int practiceId)
    {
        ArrayList<SchoolTeacherBean> teacherBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT schoolteacher.schoolteacherId,schoolteacherName,schoolTeacherSex FROM pracstrelation NATURAL JOIN schoolteacher WHERE practiceId = ?;";
            state = conn.prepareStatement(sql);
            state.setInt(1,practiceId);
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                SchoolTeacherBean teacherBean = new SchoolTeacherBean();
                teacherBean.setId(rs.getInt(1));
                teacherBean.setName(rs.getString(2));
                teacherBean.setSex(rs.getString(3));
                teacherBeans.add(teacherBean);
            }
            conn.commit();
            return teacherBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

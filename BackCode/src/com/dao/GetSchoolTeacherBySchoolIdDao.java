package com.dao;

import com.DBConn;
import com.bean.SchoolTeacherBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetSchoolTeacherBySchoolIdDao {
    public ArrayList<SchoolTeacherBean> GetSchoolTeacher(int schoolId)
    {
        ArrayList<SchoolTeacherBean> teacherBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT schoolteacherId,schoolteacherName,schoolTeacherSex FROM schoolteacher WHERE schoolId = ?;";
            state = conn.prepareStatement(sql);
            state.setInt(1,schoolId);
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

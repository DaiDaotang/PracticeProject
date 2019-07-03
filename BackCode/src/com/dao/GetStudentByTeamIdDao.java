package com.dao;

import com.DBConn;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class GetStudentByTeamIdDao {
    public ArrayList<StudentBean> GetSchoolTeacher(int teamId)
    {
        ArrayList<StudentBean> studentBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="SELECT student.studentId,studentName,studentNumber,studentGrade,studentSex FROM student NATURAL JOIN stprelation WHERE teamId = ?;";
            state = conn.prepareStatement(sql);
            state.setInt(1,teamId);
            ResultSet rs = state.executeQuery();
            while (rs.next()){
                StudentBean studentBean = new StudentBean();
                studentBean.setId(rs.getInt(1));
                studentBean.setName(rs.getString(2));
                studentBean.setNumber(rs.getString(3));
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");
                studentBean.setGrade(dateFormat.format(rs.getDate(4)));
                studentBean.setSex(rs.getString(5));
                studentBeans.add(studentBean);
            }
            conn.commit();
            return studentBeans;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

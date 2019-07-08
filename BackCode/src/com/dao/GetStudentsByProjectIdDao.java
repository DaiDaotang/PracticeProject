package com.dao;

import com.DBConn;
import com.bean.DiaryBean;
import com.bean.RequestBean;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetStudentsByProjectIdDao {
    public ArrayList<StudentBean> GetStudent(RequestBean<DiaryBean> reqBean) {
        DiaryBean diaryBean = reqBean.getReqParam();
        ArrayList<StudentBean> studentBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try {
            conn.setAutoCommit(false);
            String sql = "SELECT DISTINCT student.studentId,studentName FROM student NATURAL JOIN stprelation NATURAL JOIN studentDiary WHERE projectId = ? AND week = ? AND score != 0;";
            state = conn.prepareStatement(sql);
            state.setInt(1, diaryBean.getProjectId());
            state.setInt(2, diaryBean.getWeek());
            ResultSet rs = state.executeQuery();
            while (rs.next()) {
                StudentBean studentBean = new StudentBean();
                studentBean.setId(rs.getInt(1));
                studentBean.setName(rs.getString(2));
                studentBeans.add(studentBean);
            }
            if (diaryBean.isReviewed()){
                if (studentBeans.size() != 0)
                    return studentBeans;
                else return null;
            }
            else {
                String sql2 = "SELECT DISTINCT student.studentId,studentName FROM student NATURAL JOIN stprelation WHERE projectId = ?;";
                PreparedStatement state2 = conn.prepareStatement(sql2);
                state2.setInt(1, diaryBean.getProjectId());
                ArrayList<StudentBean> studentBeans2 = new ArrayList<>();
                ResultSet rs2 = state2.executeQuery();
                while (rs2.next()) {
                    StudentBean studentBean = new StudentBean();
                    studentBean.setId(rs2.getInt(1));
                    studentBean.setName(rs2.getString(2));
                    studentBeans2.add(studentBean);
                }
                for (StudentBean student:studentBeans) {
                    for (StudentBean student2:studentBeans2){
                        if (student2.getId() == student.getId()){
                            studentBeans2.remove(student2);
                            break;
                        }
                    }
                }
                if (studentBeans2.size() != 0){
                    return studentBeans2;
                }
                else return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } finally {
            DBConn.closeConn(conn);
        }
    }
}

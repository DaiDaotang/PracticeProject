package com.dao;

import com.DBConn;
import com.bean.StudentBean;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class GetStudentByTeamIdDao {
    public TeamBean GetSchoolTeacher(int teamId)
    {
        TeamBean teamBean = new TeamBean();
        ArrayList<StudentBean> studentBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
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
            teamBean.setStudents(studentBeans);
            state2 = conn.prepareStatement("SELECT team.*,projectId,projectName FROM team NATURAL JOIN stprelation NATURAL JOIN project WHERE teamId = ?;");
            state2.setInt(1,teamId);
            ResultSet rs2 = state2.executeQuery();
            if (rs2.next()){
                teamBean.setteamId(teamId);
                teamBean.setteamName(rs2.getString(2));
                teamBean.setcaptainId(rs2.getInt(3));
                teamBean.setteamScores(rs2.getInt(4));
                teamBean.setgithubLink(rs2.getString(5));
                teamBean.setprojectId(rs2.getInt(6));
                teamBean.setprojectName(rs2.getString(7));
            }
            conn.commit();
            return teamBean;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

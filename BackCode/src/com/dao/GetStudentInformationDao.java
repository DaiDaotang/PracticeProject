package com.dao;

import com.DBConn;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;

public class GetStudentInformationDao {

    public StudentBean getStudentInformation(int id)
    {
        Connection conn = DBConn.getConnection();
        StudentBean studentBean = new StudentBean();
        ResultSet resultSet,resultSet2,resultSet3;
        try{
            PreparedStatement state,state2,state3;
            state3 = conn.prepareStatement("select projectPracticeId from project natural join stprelation where studentId = ?;");
            state3.setInt(1,id);
            resultSet3 = state3.executeQuery();
            if(resultSet3.next())
            {
                studentBean.setPracticeId(resultSet3.getInt(1));
            }
            state = conn.prepareStatement("select studentName,studentHead,studentSex,studentMajor,studentGrade,studentNumber,schoolId,studentHead from student where studentId = ?;");
            state.setInt(1,id);
            resultSet = state.executeQuery();
            if(resultSet.next())
            {
                studentBean.setName(resultSet.getString(1));
                studentBean.setHead(resultSet.getString(2));
                studentBean.setSex(resultSet.getString(3));
                studentBean.setMajor(resultSet.getString(4));
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(resultSet.getDate(5));
                studentBean.setGrade(""+calendar.get(Calendar.YEAR));
                studentBean.setNumber(resultSet.getString(6));
                studentBean.setHead(resultSet.getString(8));
                state2 = conn.prepareStatement("select schoolName from school where schoolId = ?;");
                state2.setInt(1,resultSet.getInt(7));
                resultSet2 = state2.executeQuery();
                if(resultSet2.next())
                {
                    studentBean.setschoolName(resultSet2.getString(1));
                    return studentBean;
                }
            }
            return null;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

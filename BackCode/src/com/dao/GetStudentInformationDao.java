package com.dao;

import com.DBConn;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetStudentInformationDao {

    public StudentBean getStudentInformation(int id)
    {
        Connection conn = DBConn.getConnection();
        StudentBean studentBean = new StudentBean();
        ResultSet resultSet,resultSet2;
        String schoolname;
        try{
            PreparedStatement state,state2;
            state = conn.prepareStatement("select studentName,studentHead,studentSex,studentMajor,studentGrade,studentNumber,schoolId,studentHead from student where studentId = ?;");
            state.setInt(1,id);
            resultSet = state.executeQuery();
            if(resultSet.next())
            {
                studentBean.setName(resultSet.getString(1));
                studentBean.setHead(resultSet.getString(2));
                studentBean.setSex(resultSet.getString(3));
                state2 = conn.prepareStatement("select schoolName from school where schoolId = ?;");
                state2.setInt(1,resultSet.getInt(7));
                resultSet2 = state2.executeQuery();
                if(resultSet2.next())
                {
                    schoolname = resultSet2.getString(1);
                }else{
                    schoolname = null;
                }
                studentBean.setschoolName(schoolname);
                studentBean.setMajor(resultSet.getString(4));
                studentBean.setGrade(resultSet.getString(5));
                studentBean.setNumber(resultSet.getString(6));
                studentBean.setHead(resultSet.getString(8));
            }
            return studentBean;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

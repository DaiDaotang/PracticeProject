package com.dao;

import com.DBConn;
import com.bean.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UploadDao {

    public int createStudentHead(StudentBean bean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="UPDATE student SET studentHead = ? WHERE studentId = ?";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getHead());
            state.setInt(2,bean.getId());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }

    public int createCompanyTeacherHead(CompanyTeacherBean bean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="UPDATE companyteacher SET teacherHead = ? WHERE teacherId = ?";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getHead());
            state.setInt(2,bean.getId());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }

    public int createSchoolTeacherHead(SchoolTeacherBean bean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="UPDATE schoolTeacher SET schoolTeacherHead = ? WHERE schoolTeacherId = ?";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getHead());
            state.setInt(2,bean.getId());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }

    public int createCompanyHead(CompanyBean bean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="UPDATE company SET companyHead = ? WHERE companyId = ?";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getHead());
            state.setInt(2,bean.getId());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }

    public int createPracticeTemplate(PracticeBean bean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            String sql ="UPDATE practice SET template = ? WHERE practiceId = ?";
            state = conn.prepareStatement(sql);
            state.setString(1,bean.getTemplate());
            state.setInt(2,bean.getId());
            state.executeUpdate();
            conn.commit();
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }
}

package com.dao;

import com.DBConn;
import com.bean.LoginBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginDao {

    public LoginBean checkIn(RequestBean<LoginBean> bean)
    {
        LoginBean loginbean = bean.getReqParam();
        String telephone = loginbean.getTelephone();
        String password = loginbean.getPassword();
        String authority = loginbean.getAuthority();
        Connection conn = DBConn.getConnection();
        ResultSet resultSet;
        LoginBean newbean = new LoginBean();
        try{
            PreparedStatement state;

            if(authority.equals("Student"))
            {
                state = conn.prepareStatement("select studentPassword, studentId from student where studentPhone = ?");
                state.setString(1,telephone);
                resultSet = state.executeQuery();
                if(resultSet.next()){
                    if(password.equals(resultSet.getString(1))){
                        int id = resultSet.getInt(2);
                        newbean.setresId(id);
                        newbean.setAuthority(authority);
                        return newbean;
                    }else {
                        newbean.setMessage("密码错误！");
                        return newbean;
                    }
                }else{
                    newbean.setMessage("账号不存在！");
                    return newbean;
                }
            } else if(authority.equals("School")){
                state = conn.prepareStatement("select schoolteacherPassword, schoolteacherId from schoolteacher where schoolteacherPhone = ?");
                state.setString(1,telephone);
                resultSet = state.executeQuery();
                if(resultSet.next()){
                    if(password.equals(resultSet.getString(1))){
                        int id = resultSet.getInt(2);
                        newbean.setresId(id);
                        newbean.setAuthority(authority);
                        return newbean;
                    }else {
                        newbean.setMessage("密码错误！");
                        return newbean;
                    }
                }else{
                    newbean.setMessage("账号不存在！");
                    return newbean;
                }
            }else if(authority.equals("Company")){
                state = conn.prepareStatement("select companyPassword, companyId from company where companyPhone = ?");
                state.setString(1,telephone);
                resultSet = state.executeQuery();
                if(resultSet.next()){
                    if(password.equals(resultSet.getString(1))){
                        int id = resultSet.getInt(2);
                        newbean.setresId(id);
                        newbean.setAuthority(authority);
                        return newbean;
                    }else {
                        newbean.setMessage("密码错误！");
                        return newbean;
                    }
                }else{
                    newbean.setMessage("账号不存在！");
                    return newbean;
                }
            }else if(authority.equals("Teacher")){
                state = conn.prepareStatement("select teacherPassword, teacherId from companyteacher where teacherPhone = ?");
                state.setString(1,telephone);
                resultSet = state.executeQuery();
                if(resultSet.next()){
                    if(password.equals(resultSet.getString(1))){
                        int id = resultSet.getInt(2);
                        newbean.setresId(id);
                        newbean.setAuthority(authority);
                        return newbean;
                    }else {
                        newbean.setMessage("密码错误！");
                        return newbean;
                    }
                }else{
                    newbean.setMessage("账号不存在！");
                    return newbean;
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

package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.StudentBean;
import com.bean.TeamBean;

import java.sql.*;

public class AddStudentDao {

    public int addStudent(RequestBean<StudentBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2,state3;
        try{
            StudentBean studentBean = requestBean.getReqParam();
            conn.setAutoCommit(false);
            state = conn.prepareStatement("select studentId from student where studentPhone = ?;");
            state.setString(1,studentBean.getTelephone());
            ResultSet resultSet1 = state.executeQuery();
            if(resultSet1.next())
            {
                state2 = conn.prepareStatement("select projectPracticeId from stprelation natural join project where studentId = ? and stprelation.projectId = project.projectId;");
                state2.setInt(1,resultSet1.getInt(1));
                ResultSet resultSet2 = state2.executeQuery();
                while(resultSet2.next())
                {
                    if(resultSet2.getInt(1)==studentBean.getPracticeId())
                    {
                        return -1;
                    }
                }
                state3 = conn.prepareStatement("insert into stprelation (studentId,teamId,projectId) values (?,?,?);");
                state3.setInt(1,resultSet1.getInt(1));
                state3.setInt(2,studentBean.getteamId());
                state3.setInt(3,studentBean.getProjectId());
                int i = state3.executeUpdate();
                if(i <= 0)
                {
                    return -1;
                }
                conn.commit();
                return 0;
            }
            return -1;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

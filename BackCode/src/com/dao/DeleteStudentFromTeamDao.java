package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DeleteStudentFromTeamDao {
    public int deleteStudent(RequestBean<StudentBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        try{
            StudentBean studentBean = requestBean.getReqParam();
            conn.setAutoCommit(false);
            state2 = conn.prepareStatement("DELETE FROM stprelation WHERE studentId = ? AND teamId = ?");
            state2.setInt(1,studentBean.getId());
            state2.setInt(2,studentBean.getteamId());
            state2.executeUpdate();
            conn.commit();
            return 0;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

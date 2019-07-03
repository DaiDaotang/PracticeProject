package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.StudentBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DeleteStudentFromTeamDao {
    public int deleteStudent(RequestBean<StudentBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        try{
            boolean isCaptain = false;
            StudentBean studentBean = requestBean.getReqParam();
            conn.setAutoCommit(false);
            state = conn.prepareStatement("SELECT captainId FROM team WHERE teamId = ?;");
            state.setInt(1,studentBean.getteamId());
            ResultSet rs = state.executeQuery();
            String sql;
            if (rs.next()){
                isCaptain = rs.getInt(1) == studentBean.getId();
            }
            if (isCaptain){
                sql = "DELETE FROM stprelation WHERE teamId = ?;";
                state2 = conn.prepareStatement(sql);
                state2.setInt(1,studentBean.getteamId());
            }else {
                sql = "DELETE FROM stprelation WHERE studentId = ? AND teamId = ?;";
                state2 = conn.prepareStatement(sql);
                state2.setInt(1,studentBean.getId());
                state2.setInt(2,studentBean.getteamId());
            }
            int res = state2.executeUpdate();
            if (isCaptain){
                PreparedStatement statement;
                statement = conn.prepareStatement("DELETE FROM team WHERE teamId = ?");
                statement.setInt(1,studentBean.getteamId());
                statement.executeUpdate();
            }
            conn.commit();
            if (res == 0){
                return -2;
            }
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

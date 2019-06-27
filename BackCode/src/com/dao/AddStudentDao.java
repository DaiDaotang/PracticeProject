package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.*;

public class AddStudentDao {

    public int addStudent(RequestBean<TeamBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        try{
            TeamBean teamBean = requestBean.getReqParam();
            conn.setAutoCommit(false);

            state2 = conn.prepareStatement("select projectId from stprelation where teamId = ?");
            state2.setInt(1,teamBean.getteamId());
            ResultSet set = state2.executeQuery();
            int projectId;
            if(set.next())
            {
                projectId = set.getInt(1);
            }else {
                return -1;
            }

            state = conn.prepareStatement("insert into stprelation (studentId,teamId,projectId) values(?,?,?)");
            state.setInt(1,teamBean.getstudentId());
            state.setInt(2,teamBean.getteamId());
            state.setInt(3,projectId);
            state.executeUpdate();
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

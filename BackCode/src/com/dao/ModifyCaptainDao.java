package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ModifyCaptainDao {

    public int modifyCaptain(RequestBean<TeamBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        boolean haveRight = false;
        try{
            TeamBean teamBean = requestBean.getReqParam();
            state = conn.prepareStatement("select studentId from stprelation where teamId = ?;");
            state.setInt(1,teamBean.getteamId());
            ResultSet resultSet1 = state.executeQuery();
            while (resultSet1.next())
            {
                if(resultSet1.getInt(1) == teamBean.getstudentId())
                {
                    haveRight = true;
                }
            }
            if(haveRight)
            {
                state2 = conn.prepareStatement("update team set captainid = ? where teamId = ?;");
                state2.setInt(1,teamBean.getstudentId());
                state2.setInt(2,teamBean.getteamId());
                int i = state2.executeUpdate();
                if(i > 0)
                {
                    return 0;
                }
            }
            return -2;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

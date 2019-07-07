package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetTeamInProjectDao {

    public ArrayList<TeamBean> getTeam(RequestBean<TeamBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        TeamBean teamBean = requestBean.getReqParam();
        ArrayList<TeamBean> arrayList = new ArrayList<>();
        try{
            PreparedStatement state;
            state = conn.prepareStatement("select distinct teamId,teamName,teamScores from stprelation natural join team where projectId = ?;");
            state.setInt(1,teamBean.getprojectId());
            ResultSet resultSet = state.executeQuery();
            while (resultSet.next())
            {
                TeamBean bean = new TeamBean();
                bean.setteamId(resultSet.getInt(1));
                bean.setteamName(resultSet.getString(2));
                bean.setteamScores(resultSet.getInt(3));
                arrayList.add(bean);
            }
            return arrayList;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

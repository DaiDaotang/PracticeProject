package com.dao;

import com.DBConn;
import com.bean.TeamBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class GetAllPastInformationDao {

    public ArrayList<TeamBean> getAllPastInformation(int studentId)
    {
        ArrayList<TeamBean> arrayList = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            state = conn.prepareStatement("select practiceName,practiceId,projectName,projectId,teamName,teamId,teamScores,studentscores from stprelation natural join team natural join project join practice on project.projectPracticeId = practice.practiceId where studentId = ? and endtime < ?;");
            state.setInt(1,studentId);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(2,dateFormat.format(new Date()));
            ResultSet resultSet = state.executeQuery();
            while (resultSet.next())
            {
                TeamBean bean = new TeamBean();
                bean.setpracticeName(resultSet.getString(1));
                bean.setpracticeId(resultSet.getInt(2));
                bean.setprojectName(resultSet.getString(3));
                bean.setprojectId(resultSet.getInt(4));
                bean.setteamName(resultSet.getString(5));
                bean.setteamId(resultSet.getInt(6));
                bean.setteamScores(resultSet.getInt(7));
                bean.setStudentScores(resultSet.getInt(8));
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

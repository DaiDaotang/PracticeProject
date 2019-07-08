package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TaskBean;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CreateTaskDao {

    public int createTask(RequestBean<TaskBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            conn.setAutoCommit(false);
            TaskBean taskBean = requestBean.getReqParam();
            state = conn.prepareStatement("insert into task (taskName,taskContent,taskAmount,taskPriority,taskWeek,isFinished,teamId,finishTime) values(?,?,?,?,?,?,?,?);");
            state.setString(1,taskBean.getTaskName());
            state.setString(2,taskBean.getTaskContent());
            state.setInt(3,taskBean.getTaskAmount());
            state.setInt(4,taskBean.getTaskPriority());
            state.setInt(5,taskBean.getTaskWeek());
            state.setBoolean(6,taskBean.isFinished());
            state.setInt(7,taskBean.getTeamId());
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(8,dateFormat.format(new Date()));
            int i = state.executeUpdate();
            if(i < 0)
            {
                return -1;
            }
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

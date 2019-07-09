package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TaskBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;


public class ModifyTaskDao {

    public int modifyTask(RequestBean<TaskBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try{
            TaskBean taskBean = requestBean.getReqParam();
            conn.setAutoCommit(false);
            state = conn.prepareStatement("update task set taskName = ?,taskContent = ?,taskAmount = ?,taskPriority = ?,taskWeek = ?,isFinished = ?,teamId = ?,finishTime = ? where taskId = ?;");
            state.setString(1,taskBean.getTaskName());
            state.setString(2,taskBean.getTaskContent());
            state.setInt(3,taskBean.getTaskAmount());
            state.setInt(4,taskBean.getTaskPriority());
            state.setInt(5,taskBean.getTaskWeek());
            state.setBoolean(6,taskBean.isFinished());
            state.setInt(7,taskBean.getTeamId());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            state.setString(8,simpleDateFormat.format(taskBean.getFinishTime()));
            state.setInt(9,taskBean.getTaskId());
            int i = state.executeUpdate();
            if(i > 0)
            {
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

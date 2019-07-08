package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TaskBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;


public class ModifyTaskDao {

    public ArrayList<TaskBean> modifyTask(RequestBean<TaskBean> requestBean)
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
                ArrayList<TaskBean> arrayList = getTotalWork(taskBean.getTeamId());
                if(arrayList != null)
                {
                    return arrayList;
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

    private ArrayList<TaskBean> getTotalWork(int teamId)
    {
        Connection conn = DBConn.getConnection();
        ArrayList<TaskBean> arrayList = new ArrayList<>();
        PreparedStatement state;
        try{
            state = conn.prepareStatement("select finishTime,Sum(taskAmount) from task where teamId = ? and isFinished = 1 group by finishTime;");
            state.setInt(1,teamId);
            ResultSet resultSet = state.executeQuery();
            while (resultSet.next())
            {
                TaskBean taskBean = new TaskBean();
                taskBean.setFinishTime(resultSet.getDate(1));
                taskBean.setTotalWork(resultSet.getInt(2));
                arrayList.add(taskBean);
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

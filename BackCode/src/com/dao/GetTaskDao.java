package com.dao;

import com.DBConn;
import com.bean.TaskBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetTaskDao {

    public ArrayList<TaskBean> getTaskByTeamId(int teamId) {
        ArrayList<TaskBean> taskBeans = new ArrayList<>();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try {
            state = conn.prepareStatement("select * from task where teamId = ?;");
            state.setInt(1, teamId);
            ResultSet resultSet = state.executeQuery();
            while (resultSet.next()) {
                TaskBean taskBean = new TaskBean();
                taskBean.setTaskId(resultSet.getInt("taskId"));
                taskBean.setTaskName(resultSet.getString("taskName"));
                taskBean.setTaskContent(resultSet.getString("taskContent"));
                taskBean.setTaskAmount(resultSet.getInt("taskAmount"));
                taskBean.setTaskPriority(resultSet.getInt("taskPriority"));
                taskBean.setTaskWeek(resultSet.getInt("taskWeek"));
                taskBean.setFinished(resultSet.getBoolean("isFinished"));
                taskBean.setTeamId(resultSet.getInt("teamId"));
                taskBean.setFinishTime(resultSet.getDate("finishTime"));
                taskBeans.add(taskBean);
            }
            return taskBeans;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } finally {
            DBConn.closeConn(conn);
        }
    }

}

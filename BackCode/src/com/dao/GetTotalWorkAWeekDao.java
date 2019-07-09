package com.dao;

import com.DBConn;
import com.bean.RequestBean;
import com.bean.TaskBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetTotalWorkAWeekDao {

    public ArrayList<TaskBean> getTotalWork(RequestBean<TaskBean> requestBean)
    {
        Connection conn = DBConn.getConnection();
        ArrayList<TaskBean> arrayList = new ArrayList<>();
        TaskBean bean = requestBean.getReqParam();
        PreparedStatement state;
        try{
            state = conn.prepareStatement("select finishTime,Sum(taskAmount) from task where teamId = ? and taskWeek = ? and isFinished = 1 group by finishTime;");
            state.setInt(1,bean.getTeamId());
            state.setInt(2,bean.getTaskWeek());
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

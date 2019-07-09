package com.dao;

import com.DBConn;
import com.bean.TaskBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetTotalWorkDao {

    public ArrayList<TaskBean> getTotalWork(int teamId)
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

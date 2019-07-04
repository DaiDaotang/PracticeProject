package com.dao;

import com.DBConn;
import com.bean.ProjectBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DeleteProjectDao {

    public int deleteProject(RequestBean<ProjectBean> requestBean)
    {
        ProjectBean projectBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2,state3;
        try{
            conn.setAutoCommit(false);
            state = conn.prepareStatement("select projectPracticeId from project where projectId = ?;");
            state.setInt(1,projectBean.getId());
            ResultSet resultSet1 = state.executeQuery();
            if(resultSet1.next())
            {
                boolean haveRight = false;
                if(projectBean.getSchoolTeacherId()!=0)
                {
                    state2 = conn.prepareStatement("select isMain from pracstrelation where practiceId = ? and schoolTeacherId = ?;");
                    state2.setInt(1,resultSet1.getInt(1));
                    state2.setInt(2,projectBean.getSchoolTeacherId());
                    ResultSet resultSet2 = state2.executeQuery();
                    if(resultSet2.next())
                    {
                        if(resultSet2.getInt(1)==1)
                        {
                            haveRight = true;
                        }
                    }
                }else if(projectBean.getCompanyTeacherId()!=0)
                {
                    state2 = conn.prepareStatement("select isMain from pracctrelation where practiceId = ? and companyTeacherId = ?;");
                    state2.setInt(1,resultSet1.getInt(1));
                    state2.setInt(2,projectBean.getCompanyTeacherId());
                    ResultSet resultSet3 = state2.executeQuery();
                    if(resultSet3.next())
                    {
                        if(resultSet3.getInt(1)==1)
                        {
                            haveRight = true;
                        }
                    }
                }
                if(haveRight)
                {
                    state3 = conn.prepareStatement("delete from project where projectId = ?;");
                    state3.setInt(1,projectBean.getId());
                    state3.executeUpdate();
                    conn.commit();
                    return 0;
                }else{
                    return -2;
                }
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

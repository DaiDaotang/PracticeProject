package com.dao;

import com.DBConn;
import com.bean.ProjectBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DeleteProjectDao {

    public boolean deleteProject(RequestBean<ProjectBean> requestBean)
    {
        ProjectBean projectBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2,state3,state4,state5;
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
                    state3 = conn.prepareStatement("delete from projtrelation where projectId = ?;");
                    state3.setInt(1,projectBean.getId());
                    int i = state3.executeUpdate();
                    state5 = conn.prepareStatement("delete from stprelation where projectId = ?;");
                    state5.setInt(1,projectBean.getId());
                    int t = state5.executeUpdate();
                    state4 = conn.prepareStatement("delete from project where projectId = ?;");
                    state4.setInt(1,projectBean.getId());
                    int j = state4.executeUpdate();
                    conn.commit();
                    return true;
                }
            }
            return false;

        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return false;
        }finally {
            DBConn.closeConn(conn);
        }
    }
}

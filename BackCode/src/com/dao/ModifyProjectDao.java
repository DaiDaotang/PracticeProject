package com.dao;

import com.DBConn;
import com.bean.ProjectBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ModifyProjectDao {
    public int modifyProject(RequestBean<ProjectBean> reqBean)
    {
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state3,state2,state4;
        try{
            ProjectBean projectBean = reqBean.getReqParam();
            conn.setAutoCommit(false);
            state = conn.prepareStatement("select projectPracticeId from project where projectId = ?;");
            state.setInt(1,projectBean.getId());
            ResultSet resultSet1 = state.executeQuery();
            if(resultSet1.next()){
                int practiceId = resultSet1.getInt(1);
                boolean haveRight = false;
                if(projectBean.getSchoolTeacherId()!=0){
                    String sql = "SELECT isMain FROM pracstrelation WHERE schoolTeacherId = ? AND practiceId = ?";
                    state3 = conn.prepareStatement(sql);
                    state3.setInt(1,projectBean.getSchoolTeacherId());
                    state3.setInt(2,practiceId);
                    ResultSet rs = state3.executeQuery();
                    if(rs.next()){
                        if (rs.getBoolean(1)){
                            haveRight = true;
                        }
                    }
                }else if(projectBean.getCompanyTeacherId()!=0){
                    String sql = "SELECT isMain FROM pracctrelation WHERE companyTeacherId = ? AND practiceId = ?";
                    state3 = conn.prepareStatement(sql);
                    state3.setInt(1,projectBean.getCompanyTeacherId());
                    state3.setInt(2,practiceId);
                    ResultSet rs = state3.executeQuery();
                    if(rs.next()){
                        if (rs.getBoolean(1)){
                            haveRight = true;
                        }
                    }
                }
                if (haveRight) {
                    String sql2 ="UPDATE project SET projectName = ?,projectType = ?,projectDifficulty = ?,projectIntroduce = ?,projectBaseContent = ?,projectExtendContent = ?,projectAdvanceContent = ? WHERE projectId = ?";
                    state2 = conn.prepareStatement(sql2);
                    state2.setString(1,projectBean.getName());
                    state2.setString(2,projectBean.getType());
                    state2.setInt(3,projectBean.getDifficulty());
                    state2.setString(4,projectBean.getIntroduce());
                    state2.setString(5,projectBean.getBaseContent());
                    state2.setString(6,projectBean.getExtendContent());
                    state2.setString(7,projectBean.getAdvanceContent());
                    state2.setInt(8,projectBean.getId());
                    state2.executeUpdate();
                    state4 = conn.prepareStatement("DELETE FROM projtrelation WHERE projectId = ?");
                    state4.setInt(1,projectBean.getId());
                    state4.executeUpdate();
                    for (Integer teacher:projectBean.getTeachers()) {
                        PreparedStatement statement = conn.prepareStatement("INSERT INTO projtrelation VALUES (?,?)");
                        statement.setInt(1,projectBean.getId());
                        statement.setInt(2,teacher);
                        statement.executeUpdate();
                    }
                    conn.commit();
                    return 0;
                }else {
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

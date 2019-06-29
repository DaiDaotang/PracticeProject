package com.dao;

import com.DBConn;
import com.bean.ProjectBean;
import com.bean.RequestBean;

import java.sql.*;
import java.util.ArrayList;

public class CreateProjectDao {
    public int creat(RequestBean<ProjectBean> practiceBean)
    {
        Connection conn = DBConn.getConnection();
        try{
            ProjectBean bean = practiceBean.getReqParam();
            conn.setAutoCommit(false);
            String sql ="INSERT INTO project (projectName,projectType,projectDifficulty,projectIntroduce,projectBaseContent,projectExtendContent,projectAdvanceContent,projectPracticeId) VALUES (?,?,?,?,?,?,?,?)";
            PreparedStatement state;
            state = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            state.setString(1,bean.getName());
            state.setString(2,bean.getType());
            state.setInt(3,bean.getDifficulty());
            state.setString(4,bean.getIntroduce());
            state.setString(5,bean.getBaseContent());
            state.setString(6,bean.getExtendContent());
            state.setString(7,bean.getAdvanceContent());
            state.setInt(8,bean.getPracticeId());
            state.executeUpdate();
            ResultSet rs = state.getGeneratedKeys();
            int id;
            if(rs.next()){
                id = rs.getInt(1);
            }
            else throw new Exception("未返回id");
            ArrayList<Integer> teachers = bean.getTeachers();
            for (Integer teacher : teachers) {
                conn.setAutoCommit(false);
                String sql2 = "INSERT INTO projtrelation VALUES (?,?)";
                PreparedStatement state2;
                state2 = conn.prepareStatement(sql2);
                state2.setInt(1, id);
                state2.setInt(2, teacher);
                state2.executeUpdate();
            }
            conn.commit();
            return id;
        }catch (SQLException e){
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBConn.closeConn(conn);
        }
        return 0;
    }

}

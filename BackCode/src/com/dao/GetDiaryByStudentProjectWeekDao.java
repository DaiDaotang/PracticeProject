package com.dao;

import com.DBConn;
import com.bean.DiaryBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetDiaryByStudentProjectWeekDao {
    public ArrayList<DiaryBean> getDiary(RequestBean<DiaryBean> requestBean) {
        DiaryBean diaryBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        ResultSet resultSet;
        ArrayList<DiaryBean> diaryBeans = new ArrayList<>();
        try {
            PreparedStatement statement1;
            statement1 = conn.prepareStatement("SELECT * FROM studentdiary WHERE studentId = ? AND projectId = ? AND week = ?;");
            statement1.setInt(1, diaryBean.getStudentId());
            statement1.setInt(2, diaryBean.getProjectId());
            statement1.setInt(3,diaryBean.getWeek());
            resultSet = statement1.executeQuery();
            while (resultSet.next()) {
                DiaryBean diary = new DiaryBean();
                diary.setId(resultSet.getInt(1));
                diary.setDate(resultSet.getDate(3));
                diary.setTitle(resultSet.getString(4));
                diary.setContent(resultSet.getString(5));
                diary.setProjectId(resultSet.getInt(6));
                diary.setWeek(resultSet.getInt(7));
                diary.setScore(resultSet.getInt(8));
                diary.setComment(resultSet.getString(9));
                diaryBeans.add(diary);
            }
            if (diaryBeans.size() == 0) {
                return null;
            }
            return diaryBeans;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return null;
        } finally {
            DBConn.closeConn(conn);
        }
    }
}

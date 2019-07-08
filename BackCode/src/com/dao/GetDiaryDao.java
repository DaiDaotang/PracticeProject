package com.dao;

import com.DBConn;
import com.bean.DiaryBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class GetDiaryDao {
    public ArrayList<DiaryBean> getDiary(RequestBean<DiaryBean> requestBean)
    {
        DiaryBean diaryBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        ResultSet resultSet;
        ArrayList<DiaryBean> diaryBeans = new ArrayList<>();
        try{
            PreparedStatement statement1;
            switch (diaryBean.getAuthority())
            {
                case "Student":
                    statement1 = conn.prepareStatement("SELECT * FROM studentdiary WHERE studentId = ?  ORDER BY studentDiaryId DESC limit ?,?;");
                    statement1.setInt(1,diaryBean.getStudentId());
                    statement1.setInt(2,diaryBean.getIndex()*diaryBean.getCount());
                    statement1.setInt(3,diaryBean.getCount());
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
                    if (diaryBeans.size() == 0){
                        return null;
                    }
                    return diaryBeans;
                case "CompanyTeacher":
                    statement1 = conn.prepareStatement("SELECT * FROM teacherdiary WHERE teacherId = ? ORDER BY teacherDiaryId DESC limit ?,?;");
                    statement1.setInt(1,diaryBean.getCompanyTeacherId());
                    statement1.setInt(2,diaryBean.getIndex()*diaryBean.getCount());
                    statement1.setInt(3,diaryBean.getCount());
                    resultSet = statement1.executeQuery();
                    while (resultSet.next()) {
                        DiaryBean diary = new DiaryBean();
                        diary.setId(resultSet.getInt(1));
                        diary.setDate(resultSet.getDate(3));
                        diary.setTitle(resultSet.getString(4));
                        diary.setContent(resultSet.getString(5));
                        diaryBeans.add(diary);
                    }
                    if (diaryBeans.size() == 0){
                        return null;
                    }
                    return diaryBeans;
                case "Team":
                    statement1 = conn.prepareStatement("SELECT * FROM teamdiary WHERE teamId = ? ORDER BY teamDiaryId DESC limit ?,?;");
                    statement1.setInt(1,diaryBean.getTeamId());
                    statement1.setInt(2,diaryBean.getIndex()*diaryBean.getCount());
                    statement1.setInt(3,diaryBean.getCount());
                    resultSet = statement1.executeQuery();
                    while (resultSet.next()) {
                        DiaryBean diary = new DiaryBean();
                        diary.setId(resultSet.getInt(1));
                        diary.setDate(resultSet.getDate(3));
                        diary.setTitle(resultSet.getString(5));
                        diary.setContent(resultSet.getString(6));
                        diaryBeans.add(diary);
                    }
                    if (diaryBeans.size() == 0){
                        return null;
                    }
                    return diaryBeans;
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
}

package com.dao;

import com.DBConn;
import com.bean.DiaryBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Date;
import java.text.SimpleDateFormat;


public class WriteDiaryDao {

    public int writeDiary(RequestBean<DiaryBean> requestBean)
    {
        DiaryBean diaryBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        try{
            PreparedStatement statement1;
            switch (diaryBean.getAuthority())
            {
                case "Student":
                    statement1 = conn.prepareStatement("insert into studentdiary (studentId,studentDiaryDate,studentDiaryTitle,studentDiaryContent,isweeklyreport,projectId) values (?,?,?,?,?,?);");
                    statement1.setInt(1,diaryBean.getStudentId());
                    statement1.setDate(2,diaryBean.getDate());
                    statement1.setString(3,diaryBean.getTitle());
                    statement1.setString(4,diaryBean.getContent());
                    statement1.setInt(5,diaryBean.getIsWeeklyReport());
                    statement1.setInt(6,diaryBean.getProjectId());
                    int i = statement1.executeUpdate();
                    if(i > 0)
                    {
                        return 0;
                    }
                case "CompanyTeacher":
                    statement1 = conn.prepareStatement("insert into teacherdiary (teacherId,teacherDiaryDate,teacherDiaryTitle,teacherDiaryContent) values (?,?,?,?);");
                    statement1.setInt(1,diaryBean.getCompanyTeacherId());
                    statement1.setDate(2,diaryBean.getDate());
                    statement1.setString(3,diaryBean.getTitle());
                    statement1.setString(4,diaryBean.getContent());
                    int j = statement1.executeUpdate();
                    if(j > 0)
                    {
                        return 0;
                    }
                case "Team":
                    statement1 = conn.prepareStatement("insert into teamdiary (teamId,teamDiaryDate,teamDiaryTitle,teamDiaryContent,isweeklyreport) values (?,?,?,?,?);");
                    statement1.setInt(1,diaryBean.getTeamId());
                    statement1.setDate(2,diaryBean.getDate());
                    statement1.setString(3,diaryBean.getTitle());
                    statement1.setString(4,diaryBean.getContent());
                    statement1.setInt(5,diaryBean.getIsWeeklyReport());
                    int t = statement1.executeUpdate();
                    if(t > 0)
                    {
                        return 0;
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

package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DeleteTeacherFromPracticeDao {
    public int deleteTeacher(RequestBean<PracticeBean> requestBean) {
        PracticeBean practiceBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        PreparedStatement state;
        try {
            conn.setAutoCommit(false);
            if (practiceBean.getSchoolTeacherId() != 0) {
                state = conn.prepareStatement("DELETE FROM pracstrelation WHERE practiceId = ? and schoolTeacherId = ?;");
                state.setInt(1, practiceBean.getId());
                state.setInt(2, practiceBean.getSchoolTeacherId());
                state.executeUpdate();
                conn.commit();
                return 0;
            } else if (practiceBean.getCompanyTeacherId() != 0) {
                state = conn.prepareStatement("DELETE FROM pracctrelation WHERE practiceId = ? and companyTeacherId = ?;");
                state.setInt(1, practiceBean.getId());
                state.setInt(2, practiceBean.getCompanyTeacherId());
                state.executeUpdate();
                PreparedStatement state2 = conn.prepareStatement("DELETE FROM projtrelation WHERE companyTeacherId = ? AND projectId IN (SELECT projectId FROM project WHERE projectPracticeId = ?)");
                state2.setInt(1,practiceBean.getCompanyTeacherId());
                state2.setInt(2,practiceBean.getId());
                state2.executeUpdate();
                conn.commit();
                return 0;
            }
            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        } finally {
            DBConn.closeConn(conn);
        }
    }
}

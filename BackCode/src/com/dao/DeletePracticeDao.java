package com.dao;

import com.DBConn;
import com.bean.PracticeBean;
import com.bean.RequestBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DeletePracticeDao {
    public int deletePractice(RequestBean<PracticeBean> requestBean) {
        PracticeBean practiceBean = requestBean.getReqParam();
        Connection conn = DBConn.getConnection();
        PreparedStatement state,state2;
        try {
            conn.setAutoCommit(false);
            boolean haveRight = false;
            if (practiceBean.getSchoolTeacherId() != 0) {
                state = conn.prepareStatement("select isMain from pracstrelation where practiceId = ? and schoolTeacherId = ?;");
                state.setInt(1, practiceBean.getId());
                state.setInt(2, practiceBean.getSchoolTeacherId());
                ResultSet resultSet2 = state.executeQuery();
                if (resultSet2.next()) {
                    if (resultSet2.getBoolean(1)) {
                        haveRight = true;
                    }
                }
            } else if (practiceBean.getCompanyTeacherId() != 0) {
                state = conn.prepareStatement("select isMain from pracctrelation where practiceId = ? and companyTeacherId = ?;");
                state.setInt(1, practiceBean.getId());
                state.setInt(2, practiceBean.getCompanyTeacherId());
                ResultSet resultSet3 = state.executeQuery();
                if (resultSet3.next()) {
                    if (resultSet3.getBoolean(1)) {
                        haveRight = true;
                    }
                }
            }
            if (haveRight) {
                state2 = conn.prepareStatement("delete from practice where practiceId = ?;");
                state2.setInt(1, practiceBean.getId());
                state2.executeUpdate();
                conn.commit();
                return 0;
            } else {
                return -2;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            DBConn.rollback(conn);
            return -1;
        } finally {
            DBConn.closeConn(conn);
        }
    }
}

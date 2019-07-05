package com.bean;

import java.sql.Date;

public class DiaryBean {
    private int Id;
    private int studentId;
    private int companyTeacherId;
    private int teamId;
    private String authority;
    private String title;
    private String content;
    private int projectId;
    private int isWeeklyReport;
    private Date date;
    private int index;
    private int count;

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getCompanyTeacherId() {
        return companyTeacherId;
    }

    public void setCompanyTeacherId(int companyTeacherId) {
        this.companyTeacherId = companyTeacherId;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getIsWeeklyReport() {
        return isWeeklyReport;
    }

    public void setIsWeeklyReport(int isWeeklyReport) {
        this.isWeeklyReport = isWeeklyReport;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }
}

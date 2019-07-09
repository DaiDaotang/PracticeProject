package com.bean;

import java.sql.Date;
import java.util.ArrayList;

public class PracticeBean {
    private int id;
    private String name;
    private String content;
    private Date startTime;
    private Date endTime;
    private int company;
    private String companyName;
    private int school;
    private String schoolName;
    private String template;
    private int companyTeacherId;
    private int schoolTeacherId;
    private ArrayList<Integer> schoolTeachers;
    private boolean isFinished;
    private int DaysOfFirstWeek;
    private int week;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public int getCompany() {
        return company;
    }

    public void setCompany(int company) {
        this.company = company;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getSchool() {
        return school;
    }

    public void setSchool(int school) {
        this.school = school;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }
    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public int getCompanyTeacherId() {
        return companyTeacherId;
    }

    public void setCompanyTeacherId(int companyTeacherId) {
        this.companyTeacherId = companyTeacherId;
    }

    public int getSchoolTeacherId() {
        return schoolTeacherId;
    }

    public void setSchoolTeacherId(int schoolTeacherId) {
        this.schoolTeacherId = schoolTeacherId;
    }

    public ArrayList<Integer> getSchoolTeachers() {
        return schoolTeachers;
    }

    public void setSchoolTeachers(ArrayList<Integer> schoolTeachers) {
        this.schoolTeachers = schoolTeachers;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }

    public int getDaysOfFirstWeek() {
        return DaysOfFirstWeek;
    }

    public void setDaysOfFirstWeek(int daysOfFirstWeek) {
        DaysOfFirstWeek = daysOfFirstWeek;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }
}

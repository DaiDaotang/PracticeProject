package com.bean;

import java.util.Date;

public class SigninBean {
    private int id;
    private int studentId;
    private String  dateTime;
    private boolean atWork;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }


    public boolean isAtWork() {
        return atWork;
    }

    public void setAtWork(boolean atWork) {
        this.atWork = atWork;
    }

    public String  getDateTime() {
        return dateTime;
    }

    public void setDateTime(String  dateTime) {
        this.dateTime = dateTime;
    }
}

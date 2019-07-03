package com.bean;

import java.util.ArrayList;

public class CompanyTeacherBean {
    private int id;
    private String telephone;
    private String password;
    private String name;
    private String sex;
    private int company;
    private String head;
    private int practice;
    private ArrayList<ProjectBean> projects;
    private boolean canModify;

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getCompany() {
        return company;
    }

    public void setCompany(int company) {
        this.company = company;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPractice() {
        return practice;
    }

    public void setPractice(int practice) {
        this.practice = practice;
    }

    public ArrayList<ProjectBean> getProjects() {
        return projects;
    }

    public void setProjects(ArrayList<ProjectBean> projects) {
        this.projects = projects;
    }

    public boolean isCanModify() {
        return canModify;
    }

    public void setCanModify(boolean canModify) {
        this.canModify = canModify;
    }
}

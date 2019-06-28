package com.bean;

import java.util.ArrayList;

public class ProjectBean {
    private int id;
    private String name;
    private String type;
    private int difficulty;
    private String introduce;
    private String baseContent;
    private String extendContent;
    private String advanceContent;
    private int practiceId;
    private ArrayList<Integer> teachers;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getBaseContent() {
        return baseContent;
    }

    public void setBaseContent(String baseContent) {
        this.baseContent = baseContent;
    }

    public String getExtendContent() {
        return extendContent;
    }

    public void setExtendContent(String extendContent) {
        this.extendContent = extendContent;
    }

    public String getAdvanceContent() {
        return advanceContent;
    }

    public void setAdvanceContent(String advanceContent) {
        this.advanceContent = advanceContent;
    }

    public int getPracticeId() {
        return practiceId;
    }

    public void setPracticeId(int practiceId) {
        this.practiceId = practiceId;
    }

    public ArrayList<Integer> getTeachers() {
        return teachers;
    }

    public void setTeachers(ArrayList<Integer> teachers) {
        this.teachers = teachers;
    }
}

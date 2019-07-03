package com.bean;

import java.util.ArrayList;

public class TeamBean {
    private int teamId;
    private String teamName;
    private int captainId;
    private int teamScores;
    private String githubLink;
    private int studentId;
    private boolean isCaptain;
    private int projectId;
    private String projectName;
    private int practiceId;
    private String practiceName;
    private ArrayList<StudentBean> students;

    public int getteamId(){return teamId;}

    public void setteamId(int teamId){
        this.teamId = teamId;
    }

    public String getteamName(){return teamName;}

    public void setteamName(String teamName){
        this.teamName = teamName;
    }

    public int getcaptainId(){return captainId;}

    public void setcaptainId(int captainId){
        this.captainId = captainId;
    }

    public int getprojectId(){return projectId;}

    public void setprojectId(int projectId){
        this.projectId = projectId;
    }

    public int getteamScores(){return teamScores;}

    public void setteamScores(int teamScores){
        this.teamScores = teamScores;
    }

    public String getgithubLink(){return githubLink;}

    public void setgithubLink(String githubLink){
        this.githubLink = githubLink;
    }

    public int getstudentId(){return studentId;}

    public void setstudentId(int studentId){
        this.studentId = studentId;
    }

    public boolean getisCaptain(){return isCaptain;}

    public void setisCaptain(boolean isCaptain){
        this.isCaptain = isCaptain;
    }

    public String getprojectName(){return projectName;}

    public void setprojectName(String projectName){
        this.projectName = projectName;
    }

    public String getpracticeName(){return practiceName;}

    public void setpracticeName(String practiceName){
        this.practiceName = practiceName;
    }

    public int getpracticeId(){return practiceId;}

    public void setpracticeId(int practiceId){
        this.practiceId = practiceId;
    }

    public ArrayList<StudentBean> getStudents() {
        return students;
    }

    public void setStudents(ArrayList<StudentBean> students) {
        this.students = students;
    }
}

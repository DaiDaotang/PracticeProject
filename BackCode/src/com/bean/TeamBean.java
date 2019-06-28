package com.bean;

public class TeamBean {
    private int teamId;
    private String teamName;
    private int captainId;
    private int projectId;
    private int teamScores;
    private String githubLink;
    private int studentId;
    private boolean isCaptain;
    private String projectName;
    private String practiceName;

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
}

package com.bean;

public class TeamBean {
    private int teamId;
    private String teamName;
    private int captainId;
    private int teamScores;
    private String githubLink;

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

    public int getteamScores(){return teamScores;}

    public void setteamScores(int teamScores){
        this.teamScores = teamScores;
    }

    public String getgithubLink(){return githubLink;}

    public void setgithubLink(String githubLink){
        this.githubLink = githubLink;
    }
}

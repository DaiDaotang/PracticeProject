package com.bean;

public class LoginBean {
    private String telephone;
    private String password;
    private String authority;
    private int resId;
    private String message;

    public void setTelephone(String telephone){
        this.telephone = telephone;
    }

    public String getTelephone(){return telephone;}

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){return password;}

    public void setAuthority(String authority){
        this.authority = authority;
    }

    public String getAuthority(){return authority;}

    public int getresId(){return resId;}

    public void setresId(int resId){
        this.resId = resId;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public String getMessage(){return message;}
}

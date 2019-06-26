package com.bean;

public class Loginbean {
    private String telephone;
    private String password;
    private String authority;

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
}

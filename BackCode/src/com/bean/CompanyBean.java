package com.bean;

import com.mysql.cj.jdbc.Blob;

public class CompanyBean {
    private int id;
    private String telephone;
    private String password;
    private String name;
    private String head;

    public void setTelephone(String telephone){
        this.telephone = telephone;
    }

    public String getTelephone(){return telephone;}

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){return password;}

    public void setName(String name){
        this.name = name;
    }

    public String getName(){return name;}

    public void setHead(String head){
        this.head = head;
    }

    public String getHead()
    {
        return head;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

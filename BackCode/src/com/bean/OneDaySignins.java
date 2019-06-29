package com.bean;

import java.util.ArrayList;

public class OneDaySignins {
    private String date;
    private ArrayList<SigninBean> signins;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ArrayList<SigninBean> getSignins() {
        return signins;
    }

    public void setSignins(ArrayList<SigninBean> signins) {
        this.signins = signins;
    }
}

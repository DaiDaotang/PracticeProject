package com.bean;

public class ResponseBean<T> {
    private String resId = null;
    private T resData = null;
    private String message = null;
    private boolean isSuccess;

    public void setResId(String id){
        resId = id;
    }

    public String getResId(){
        return resId;
    }

    public void setResData(T resData){
        this.resData = resData;
    }

    public T getResData(){
        return resData;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }
}


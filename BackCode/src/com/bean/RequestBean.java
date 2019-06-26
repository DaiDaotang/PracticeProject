package com.bean;

public class RequestBean<T> {
    private String reqId = null;
    private T reqParam = null;
    private ReqPageInfo reqPageInfo = null;

    public String getReqId(){
        return reqId;
    }

    public T getReqParam(){
        return reqParam;
    }

    public ReqPageInfo getReqPageInfo() {
        return reqPageInfo;
    }

    public void setReqId(String reqId){
        this.reqId = reqId;
    }

    public void setReqPageInfo(ReqPageInfo reqPageInfo) {
        this.reqPageInfo = reqPageInfo;
    }

    public void setReqParam(T reqParam) {
        this.reqParam = reqParam;
    }
}
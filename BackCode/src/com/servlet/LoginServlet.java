package com.servlet;

import com.bean.LoginBean;
import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.dao.LoginDao;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;

@WebServlet(name = "LoginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        BufferedReader reader = request.getReader();
        String content = reader.readLine();
        Gson gson = new Gson();
        Type requestType = new TypeToken<RequestBean<LoginBean>>(){}.getType();
        RequestBean<LoginBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean<LoginBean> resBean = new ResponseBean<>();
        try{
            LoginDao dao = new LoginDao();
            LoginBean loginbean = dao.checkIn(reqBean);
            if (loginbean == null){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                if(loginbean.getMessage()==null){
                    resBean.setResId(reqBean.getReqId());
                    resBean.setSuccess(true);
                    resBean.setResData(loginbean);
                }else {
                    resBean.setResId(reqBean.getReqId());
                    resBean.setSuccess(false);
                    resBean.setResData(loginbean);
                }
            }
            //识别ResponseBean<LoginBean>类的结构
            Type respType = new TypeToken<ResponseBean<LoginBean>>(){}.getType();
            //通过toJson方法将对象转化为json格式的字符串
            out.print(gson.toJson(resBean,respType));
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

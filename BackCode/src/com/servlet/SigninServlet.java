package com.servlet;

import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.bean.SigninBean;
import com.dao.SigninDao;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;

public class SigninServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        BufferedReader reader = request.getReader();
        String content = reader.readLine();
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        Type requestType = new TypeToken<RequestBean<SigninBean>>(){}.getType();
        RequestBean<SigninBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean resBean = new ResponseBean<>();
        try{
            SigninDao dao = new SigninDao();
            int res = dao.signin(reqBean);
            if (res == -1){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
            }
            //识别ResponseBean<LoginBean>类的结构
            Type respType = new TypeToken<ResponseBean<SigninBean>>(){}.getType();
            //通过toJson方法将对象转化为json格式的字符串
            out.print(gson.toJson(resBean,respType));
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

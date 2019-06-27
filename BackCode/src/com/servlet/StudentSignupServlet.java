package com.servlet;

import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.bean.StudentBean;
import com.dao.StudentSignupDao;
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

@WebServlet(name = "StudentSignupServlet")
public class StudentSignupServlet extends HttpServlet {
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
        Type requestType = new TypeToken<RequestBean<StudentBean>>(){}.getType();
        RequestBean<StudentBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean resBean = new ResponseBean<>();
        try{
            StudentSignupDao dao = new StudentSignupDao();
            dao.signup(reqBean);
            resBean.setResId(reqBean.getReqId());
            resBean.setSuccess(true);
            //识别ResponseBean<LoginBean>类的结构
            Type respType = new TypeToken<ResponseBean<StudentBean>>(){}.getType();
            //通过toJson方法将对象转化为json格式的字符串
            out.print(gson.toJson(resBean,respType));
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}
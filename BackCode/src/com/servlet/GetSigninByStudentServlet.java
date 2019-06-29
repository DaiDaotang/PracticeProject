package com.servlet;

import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.bean.SigninBean;
import com.bean.StudentBean;
import com.dao.GetSigninByStudentDao;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.ArrayList;

public class GetSigninByStudentServlet extends HttpServlet {
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
        ResponseBean<ArrayList<ArrayList<SigninBean>>> resBean = new ResponseBean<>();
        try{
            GetSigninByStudentDao dao = new GetSigninByStudentDao();
            ArrayList<ArrayList<SigninBean>> arrayList = dao.getSignin(reqBean);
            if (arrayList == null){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
                resBean.setResData(arrayList);
            }
            Type respType = new TypeToken<ResponseBean<ArrayList<ArrayList<SigninBean>>>>(){}.getType();
            String s = gson.toJson(resBean,respType);
            out.print(s);
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}
package com.servlet;

import com.bean.*;
import com.dao.GetCanModifiedPracticeBySchoolTeacherIdDao;
import com.dao.GetCanScoredProjectDao;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
import java.util.ArrayList;

@WebServlet(name = "GetCanScoredProjectServlet")
public class GetCanScoredProjectServlet extends HttpServlet {
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
        Type requestType = new TypeToken<RequestBean<CompanyTeacherBean>>(){}.getType();
        RequestBean<CompanyTeacherBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean<ArrayList<ProjectBean>> resBean = new ResponseBean<>();
        try{
            GetCanScoredProjectDao dao = new GetCanScoredProjectDao();
            ArrayList<ProjectBean> arrayList  = dao.GetProject(reqBean);
            if (arrayList == null){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
                resBean.setResData(arrayList);
            }
            Type respType = new TypeToken<ResponseBean<ArrayList<ProjectBean>>>(){}.getType();
            String s = gson.toJson(resBean,respType);
            out.print(s);
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

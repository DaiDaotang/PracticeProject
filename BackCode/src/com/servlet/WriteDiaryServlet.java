package com.servlet;

import com.bean.*;
import com.dao.StudentCheckTeamDao;
import com.dao.WriteDiaryDao;
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

@WebServlet(name = "WriteDiaryServlet")
public class WriteDiaryServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        BufferedReader reader = request.getReader();
        String content = reader.readLine();
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        Type requestType = new TypeToken<RequestBean<DiaryBean>>(){}.getType();
        RequestBean<DiaryBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean resBean = new ResponseBean<>();
        try{
            WriteDiaryDao dao = new WriteDiaryDao();
            int i =dao.writeDiary(reqBean);
            if (i == -1){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
            }
            Type respType = new TypeToken<ResponseBean>(){}.getType();
            String s = gson.toJson(resBean,respType);
            out.print(s);
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

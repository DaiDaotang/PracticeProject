package com.servlet;

import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.bean.SchoolBean;
import com.dao.GetSchoolDao;
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

public class GetSchoolServlet extends HttpServlet {
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
        Type requestType = new TypeToken<RequestBean<SchoolBean>>(){}.getType();
        RequestBean<SchoolBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean<ArrayList<SchoolBean>> resBean = new ResponseBean<>();
        try{
            GetSchoolDao dao = new GetSchoolDao();
            ArrayList<SchoolBean> result = dao.GetSchool();
            if (result == null){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
                resBean.setResData(result);
            }
            //识别ResponseBean<LoginBean>类的结构
            Type respType = new TypeToken<ResponseBean<ArrayList<SchoolBean>>>(){}.getType();
            //通过toJson方法将对象转化为json格式的字符串
            String s = gson.toJson(resBean,respType);
            out.print(s);
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

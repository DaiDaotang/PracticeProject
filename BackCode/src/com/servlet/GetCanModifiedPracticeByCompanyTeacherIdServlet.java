package com.servlet;

import com.bean.CompanyTeacherBean;
import com.bean.PracticeBean;
import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.dao.GetCanModifiedPracticeByCompanyTeacherIdDao;
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

@WebServlet(name = "GetCanModifiedPracticeByCompanyTeacherIdServlet")
public class GetCanModifiedPracticeByCompanyTeacherIdServlet extends HttpServlet {
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
        Type requestType = new TypeToken<RequestBean<Integer>>(){}.getType();
        RequestBean<CompanyTeacherBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean<ArrayList<PracticeBean>> resBean = new ResponseBean<>();
        try{
            GetCanModifiedPracticeByCompanyTeacherIdDao dao = new GetCanModifiedPracticeByCompanyTeacherIdDao();
            ArrayList<PracticeBean> arrayList  = dao.GetPractice(reqBean);
            if (arrayList == null){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
                resBean.setResData(arrayList);
            }
            Type respType = new TypeToken<ResponseBean<ArrayList<PracticeBean>>>(){}.getType();
            String s = gson.toJson(resBean,respType);
            out.print(s);
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

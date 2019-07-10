package com.servlet;

import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.bean.TeamBean;
import com.bean.XYBean;
import com.dao.GetXYByTeamDao;
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

@WebServlet(name = "GetXYByTeamServlet")
public class GetXYByTeamServlet extends HttpServlet {
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
        Type requestType = new TypeToken<RequestBean<TeamBean>>(){}.getType();
        RequestBean<TeamBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean<ArrayList<XYBean>> resBean = new ResponseBean<>();
        try{
            GetXYByTeamDao dao = new GetXYByTeamDao();
            ArrayList<XYBean> arrayList = dao.getXY(reqBean);
            if (arrayList == null){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
                resBean.setResData(arrayList);
            }
            Type respType = new TypeToken<ResponseBean<ArrayList<XYBean>>>(){}.getType();
            String s = gson.toJson(resBean,respType);
            out.print(s);
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

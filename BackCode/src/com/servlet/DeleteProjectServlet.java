package com.servlet;

import com.bean.ProjectBean;
import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.bean.TeamBean;
import com.dao.CreateTeamDao;
import com.dao.DeleteProjectDao;
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

@WebServlet(name = "DeleteProjectServlet")
public class DeleteProjectServlet extends HttpServlet {
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
        Type requestType = new TypeToken<RequestBean<ProjectBean>>(){}.getType();
        RequestBean<ProjectBean> reqBean = gson.fromJson(content,requestType);
        ResponseBean resBean = new ResponseBean<>();
        try{
            DeleteProjectDao dao = new DeleteProjectDao();
            boolean a = dao.deleteProject(reqBean.getReqParam().getId());
            if (!a){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
            }
            Type respType = new TypeToken<ResponseBean<ProjectBean>>(){}.getType();
            out.print(gson.toJson(resBean,respType));
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

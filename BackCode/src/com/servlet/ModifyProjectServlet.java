package com.servlet;

import com.bean.ProjectBean;
import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.dao.ModifyProjectDao;
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

@WebServlet(name = "ModifyProjectServlet")
public class ModifyProjectServlet extends HttpServlet {
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
            ModifyProjectDao dao = new ModifyProjectDao();
            int res = dao.modifyProject(reqBean);
            if (res == -1){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }else if (res == -2){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
                resBean.setMessage("You do not have right!");
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
            }
            //识别ResponseBean<LoginBean>类的结构
            Type respType = new TypeToken<ResponseBean<Integer>>(){}.getType();
            //通过toJson方法将对象转化为json格式的字符串
            out.print(gson.toJson(resBean,respType));
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

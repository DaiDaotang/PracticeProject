package com.servlet;

import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.dao.DeleteTaskDao;
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

@WebServlet(name = "DeleteTaskServlet")
public class DeleteTaskServlet extends HttpServlet {
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
        Type requestType = new TypeToken<RequestBean<Integer>>(){}.getType();
        RequestBean<Integer> reqBean = gson.fromJson(content,requestType);
        ResponseBean resBean = new ResponseBean<>();
        try{
            DeleteTaskDao dao = new DeleteTaskDao();
            int a = dao.deleteTask(reqBean.getReqParam());
            if(a == -1){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
            }
            else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
            }
            Type respType = new TypeToken<ResponseBean>(){}.getType();
            out.print(gson.toJson(resBean,respType));
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

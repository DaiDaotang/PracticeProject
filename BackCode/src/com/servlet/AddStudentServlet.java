package com.servlet;

import com.bean.RequestBean;
import com.bean.ResponseBean;
import com.bean.StudentBean;
import com.bean.TeamBean;
import com.dao.AddStudentDao;
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

@WebServlet(name = "AddStudentServlet")
public class AddStudentServlet extends HttpServlet {
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
            AddStudentDao dao = new AddStudentDao();
            int i = dao.addStudent(reqBean);
            if (i == -1){
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
                resBean.setMessage("The student has joined a team in this practice!");
            } else if(i == -2)
            {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
                resBean.setMessage("There is something wrong in the database!");
            }else if(i == -3)
            {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(false);
                resBean.setMessage("the student is not found!");
            }else {
                resBean.setResId(reqBean.getReqId());
                resBean.setSuccess(true);
            }
            Type respType = new TypeToken<ResponseBean<StudentBean>>(){}.getType();
            out.print(gson.toJson(resBean,respType));
        }catch (Exception e){
            out.print(e.toString());
        }
        out.flush();
        out.close();
    }
}

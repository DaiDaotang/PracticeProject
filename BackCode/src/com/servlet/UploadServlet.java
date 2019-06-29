package com.servlet;

import com.bean.*;
import com.dao.UploadDao;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@MultipartConfig  //使用MultipartConfig注解标注改servlet能够接受文件上传的请求
public class UploadServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Part part = request.getPart("head");
        String disposition = part.getHeader("Content-Disposition");
        String suffix = disposition.substring(disposition.lastIndexOf("."),disposition.length()-1);
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        ResponseBean<String> resBean = new ResponseBean<>();
        String type = request.getParameter("type");
        {
            if (type.equals("head")) {
                String auth = request.getParameter("auth");
                String id = request.getParameter("id");
                if (suffix.equals(".jpg") || suffix.equals(".jpeg") || suffix.equals(".png")){
                    //随机的生存一个32的字符串
                    String filename = UUID.randomUUID()+suffix;
                    //获取上传的文件名
                    InputStream is = part.getInputStream();
                    int size = is.available();
                    if ( size <= 1024*1024){
                        //动态获取服务器的路径
                        String serverPath = request.getServletContext().getRealPath("head");
                        File uploadDir = new File(serverPath);
                        if (!uploadDir.exists()) {
                            uploadDir.mkdir();
                        }
                        FileOutputStream fos = new FileOutputStream(serverPath+"/"+filename);
                        byte[] bty = new byte[1024];
                        int length;
                        while((length=is.read(bty))!=-1){
                            fos.write(bty,0,length);
                        }
                        fos.close();
                        UploadDao dao = new UploadDao();
                        switch (auth) {
                            case "student":
                                StudentBean studentBean = new StudentBean();
                                studentBean.setHead(filename);
                                studentBean.setId(Integer.valueOf(id));
                                dao.createStudentHead(studentBean);
                                break;
                            case "company":
                                CompanyBean companyBean = new CompanyBean();
                                companyBean.setHead(filename);
                                companyBean.setId(Integer.valueOf(id));
                                dao.createCompanyHead(companyBean);
                                break;
                            case "companyTeacher": {
                                CompanyTeacherBean teacherBean = new CompanyTeacherBean();
                                teacherBean.setHead(filename);
                                teacherBean.setId(Integer.valueOf(id));
                                dao.createCompanyTeacherHead(teacherBean);
                                break;
                            }
                            case "schoolTeacher": {
                                SchoolTeacherBean teacherBean = new SchoolTeacherBean();
                                teacherBean.setHead(filename);
                                teacherBean.setId(Integer.valueOf(id));
                                dao.createSchoolTeacherHead(teacherBean);
                                break;
                            }
                        }
                    }
                    else {
                        resBean.setSuccess(false);
                        resBean.setMessage("图片不能超过1M!");
                        resBean.setResData("图片不能超过1M!");
                        try{
                            //识别ResponseBean<String>类的结构
                            Type respType = new TypeToken<ResponseBean<String>>(){}.getType();
                            //通过toJson方法将对象转化为json格式的字符串
                            String s = gson.toJson(resBean,respType);
                            out.print(s);
                        }catch (Exception e){
                            out.print(e.toString());
                        }
                        out.flush();
                        out.close();
                        return;
                    }
                    is.close();
                    resBean.setSuccess(true);
                    resBean.setResData(filename);
                    try{
                        //识别ResponseBean<String>类的结构
                        Type respType = new TypeToken<ResponseBean<String>>(){}.getType();
                        //通过toJson方法将对象转化为json格式的字符串
                        String s = gson.toJson(resBean,respType);
                        out.print(s);
                    }catch (Exception e){
                        out.print(e.toString());
                    }
                }
                else {
                    resBean.setSuccess(false);
                    resBean.setMessage("图片只支持png/jpg/jpeg格式！");
                    resBean.setResData("图片只支持png/jpg/jpeg格式！");
                    try{
                        //识别ResponseBean<String>类的结构
                        Type respType = new TypeToken<ResponseBean<String>>(){}.getType();
                        //通过toJson方法将对象转化为json格式的字符串
                        String s = gson.toJson(resBean,respType);
                        out.print(s);
                    }catch (Exception e){
                        out.print(e.toString());
                    }
                }
            }
            else if (type.equals("template")){
                String id = request.getParameter("id");
                if (suffix.equals(".zip") || suffix.equals(".rar")){
                    //随机的生存一个32的字符串
                    //String filename = UUID.randomUUID()+suffix;
                    String front = request.getParameter("name");
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd-HH-mm-ss");
                    String filename = front + dateFormat.format(new Date()) + suffix;
                    //获取上传的文件名
                    InputStream is = part.getInputStream();
                    int size = is.available();
                    if ( size <= 50*1024*1024 ){
                        //动态获取服务器的路径
                        String serverPath = request.getServletContext().getRealPath("template");
                        File uploadDir = new File(serverPath);
                        if (!uploadDir.exists()) {
                            uploadDir.mkdir();
                        }
                        FileOutputStream fos = new FileOutputStream(serverPath+"/"+filename);
                        byte[] bty = new byte[1024];
                        int length;
                        while((length=is.read(bty))!=-1){
                            fos.write(bty,0,length);
                        }
                        fos.close();
                        UploadDao dao = new UploadDao();
                            PracticeBean practiceBean = new PracticeBean();
                            practiceBean.setTemplate(filename);
                            practiceBean.setId(Integer.valueOf(id));
                            dao.createPracticeTemplate(practiceBean);
                    }
                    else {
                        resBean.setSuccess(false);
                        resBean.setMessage("大小不能超过50M!");
                        resBean.setResData("大小不能超过50M!");
                        try{
                            //识别ResponseBean<String>类的结构
                            Type respType = new TypeToken<ResponseBean<String>>(){}.getType();
                            //通过toJson方法将对象转化为json格式的字符串
                            String s = gson.toJson(resBean,respType);
                            out.print(s);
                        }catch (Exception e){
                            out.print(e.toString());
                        }
                        out.flush();
                        out.close();
                        return;
                    }
                    is.close();
                    resBean.setSuccess(true);
                    try{
                        //识别ResponseBean<String>类的结构
                        Type respType = new TypeToken<ResponseBean<String>>(){}.getType();
                        //通过toJson方法将对象转化为json格式的字符串
                        String s = gson.toJson(resBean,respType);
                        out.print(s);
                    }catch (Exception e){
                        out.print(e.toString());
                    }
                }
                else {
                    resBean.setSuccess(false);
                    resBean.setMessage("只支持zip/rar格式！");
                    resBean.setResData("只支持zip/rar格式！");
                    try{
                        //识别ResponseBean<String>类的结构
                        Type respType = new TypeToken<ResponseBean<String>>(){}.getType();
                        //通过toJson方法将对象转化为json格式的字符串
                        String s = gson.toJson(resBean,respType);
                        out.print(s);
                    }catch (Exception e){
                        out.print(e.toString());
                    }
                }
            }
        }
        out.flush();
        out.close();
    }
}
package com;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;



public class DBConn {
    private static String dbDriver;
    private static String url;
    private static String user;
    private static String password;

    //静态变量初始化
    static {
        Connection con;
        //jdbc驱动
        dbDriver="com.mysql.cj.jdbc.Driver";
        url="jdbc:mysql://localhost:3306/database?&useSSL=false&serverTimezone=Asia/Shanghai";
        user="root";
        password="";

        try {
            //注册JDBC驱动程序
            Class.forName(dbDriver);
            //建立连接
            con = DriverManager.getConnection(url, user, password);
            if (!con.isClosed()) {
                System.out.println("数据库连接成功");
            }
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("数据库驱动没有安装");
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("数据库连接失败");
        }
    }
    public static Connection getConnection(){
        try {
            Connection connection = DriverManager.getConnection(url, user, password);
            System.out.println("链接信息：" + connection);
            return connection;
        }catch (SQLException e){
            System.err.println("链接信息异常");
            return null;
        }
    }
    public static void closeConn(Connection conn){
        if(conn != null){
            try{
                conn.close();
            }catch (SQLException e){
                e.printStackTrace();
            }
            conn = null;
        }
    }
    public static void rollback(Connection conn){
        if(conn != null){
            try{
                conn.rollback();
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
        conn = null;
    }
}

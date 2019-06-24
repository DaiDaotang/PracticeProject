<%--
  Created by IntelliJ IDEA.
  User: 11209
  Date: 2019/3/20
  Time: 10:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>$Title$</title>
  <script src="jquery-3.3.1.min.js"></script>
</head>
<body>
$END$
</body>
<script>
  $.ajax({
    type:"post",
    url:"http://localhost:1080/test",
    async:true,
    data:JSON.stringify({
      "reqId":"",
      "reqParam":{
        "account":"000",
        "password":"12345687",
        "authority":"管理员"
      }
    }),
    dataType:"json",
    success:function(res){
      console.log(res);
    },
    err:function(err){
      console.log(err);
    }
  });
</script>
</html>

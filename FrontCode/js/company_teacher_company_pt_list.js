// JavaScript source code
if (t_param[`temp`] === "doing") {
    document.getElementById("legend_whole").innerText += "-未完成"
}
else if (t_param[`temp`] === "done") {
    document.getElementById("legend_whole").innerText += "-已完成"
}

var GetCompanyTeacherInfoURL = "http://localhost:8080/GetCompanyTeacherInformationServlet"
    , GetCompanyNameURL = "http://localhost:8080/GetCompanyInformationServlet";

var target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_company_id = -1
    , target_company_name = "";

//form区 + 大区
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //获取信息
    $.ajax({
        type: "POST",
        url: GetCompanyTeacherInfoURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": target_id
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            target_name = res.resData.name
                , target_gender = res.resData.sex
                , target_company_id = res.resData.company
                , target_company_name = res.resData.companyName
                , target_hd_img = res.resData.head ? res.resData.head : "";
            document.getElementById("target_hd_img").src = (target_hd_img == "" ? "./img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_hd_img").style.border = "1px solid #6e7474";

            if (target_id != user_id || target_authority != user_authority) {
                document.getElementById("create_new_pt").style.display = "none";
            }

            document.getElementById("username").innerText = target_name;
            document.getElementById("gender").innerHTML = target_gender == "男" ? '<i class="layui-icon layui-icon-male" style="height:100px; color: #1E9FFF; font-size:40px; margin-left: 20px;"></i>' : '<i class="layui-icon layui-icon-female" style="height:100px; color: #fd5087; font-size:40px; margin-left: 20px;"></i>'
            console.log(target_gender)
            console.log(target_gender === "男")
            $.ajax({
                type: "POST",
                url: GetCompanyNameURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": target_company_id
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    target_company_name = res.resData.name;
                    document.getElementById("company_name").innerText = target_company_name;
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });
        },
        error: function (res) {
            console.log("获取用户基本信息失败");
        }
    });

});
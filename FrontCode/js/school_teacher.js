// JavaScript source code
var CreateNewPTURL = "school_teacher_publish_pt.html"
    , SchoolPTListURL = "school_pt_list.html"
    , ModifyPTURL = "school_teacher_modify_pt.html"
    , HomepageURL = "homepage_school_teacher.html"
    , GetSchoolTeacherInfoURL = "http://localhost:8080/GetSchoolTeacherInformationServlet";

var target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_school_id = -1
    , target_school_name = "";

//区 
layui.use(['layer', 'jquery', 'form'], function () {
    var layer = layui.layer
        , $ = layui.jquery
        , form = layui.form;

    $.ajax({
        type: "POST",
        url: GetSchoolTeacherInfoURL,
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
                , target_hd_img = res.resData.head ? res.resData.head : ""
                , target_school_id = res.resData.school
                , target_school_name = res.resData.schoolName;

            document.getElementById("username").innerText = target_name;
            document.getElementById("gender").innerHTML = (target_gender == "男") ? '<i class="layui-icon layui-icon-male" style="height:100px; color: #1E9FFF; font-size:40px; margin-left: 20px;"></i>' : '<i class="layui-icon layui-icon-female" style="height:100px; color: #fd5087; font-size:40px; margin-left: 20px;"></i>'
            document.getElementById("school_name").innerText = target_school_name;

            var basic_extra_url = "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`];
            document.getElementById("target_homepage").href = HomepageURL + basic_extra_url;
            document.getElementById("target_school_pt_doing").href = SchoolPTListURL + basic_extra_url + "&temp=doing";
            document.getElementById("target_school_pt_done").href = SchoolPTListURL + basic_extra_url + "&temp=done";
            document.getElementById("target_create_pt").href = CreateNewPTURL + basic_extra_url + "&user_school_id=" + target_school_id;
            document.getElementById("target_modify_pt").href = ModifyPTURL + basic_extra_url + "&user_school_id=" + target_school_id;
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
})
// JavaScript source code
var CreateNewPTURL = "teacher_publish_pt.html"
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

    document.getElementById("target_homepage").href = HomepageURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`];
    document.getElementById("target_school_pt_doing").href = SchoolPTListURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&temp=doing";
    document.getElementById("target_school_pt_done").href = SchoolPTListURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&temp=done";
    document.getElementById("target_create_pt").href = CreateNewPTURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&user_school_id=" + target_school_id;
    document.getElementById("target_modify_pt").href = ModifyPTURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&user_school_id=" + target_school_id + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`];

})
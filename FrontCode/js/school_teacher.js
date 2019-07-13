// JavaScript source code
var target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_school_id = -1
    , target_school_name = "";

var total = document.documentElement.clientHeight;
var colHeight = total;
document.getElementById("body_whole").style.height = colHeight + "px";

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

            document.getElementById("target_hd_img").src = (target_hd_img == "" ? "../../img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_hd_img").style.border = "1px solid #6e7474";

            var basic_extra_url = "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`];
            document.getElementById("target_homepage").href = SchoolTeacherHomepageURL + basic_extra_url;
            document.getElementById("target_create_pt").href = CreateNewPTURL + basic_extra_url + "&user_school_id=" + target_school_id;
            document.getElementById("target_modify_pt").href = ModifyPTURL + basic_extra_url + "&user_school_id=" + target_school_id;
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
})
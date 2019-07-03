// JavaScript source code
var HomepageURL = "homepage_team.html"
    , TeamDiaryURL = "team_diary.html"
    , TeamMemberURL = "team_list.html"
    , TeamProgressURL = "team_progress.html"
    , GetTeamInfoURL = "http://localhost:8080/GetStudentByTeamIdServlet"
    , GetTeamMemberURL = "";

var target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_team_id = parseInt(t_param[`team_id`])
    , target_pt_id = parseInt(t_param[`user_pt_id`])
    , target_team_name = ""
    , target_item_id = -1
    , target_item_name = ""
    , target_pt_name = ""
    , target_team_scores = -1
    , user_is_captain = false
    , captain_id = -1
    , target_hd_img = "./img/defaultHead.jpg";

var basic_extra_url = "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&team_id=" + t_param[`team_id`] + "&user_pt_id=" + t_param[`user_pt_id`]
document.getElementById("team_homepage").href = HomepageURL + basic_extra_url;
document.getElementById("team_diary").href = TeamDiaryURL + basic_extra_url;
document.getElementById("team_progress").href = TeamProgressURL + basic_extra_url;

//区
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //获取队员名字并加入菜单栏


    //补全基本信息
    $.ajax({
        type: "POST",
        url: GetTeamInfoURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": target_team_id
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            target_team_name = res.resData.teamName
                , target_item_id = res.resData.projectId
                , target_item_name = res.resData.projectName
                , target_pt_name = res.resData.practiceName
                , target_team_scores = res.resData.teamScores
                , user_is_captain = res.resData.isCaptain
                , captain_id = res.resData.captainId
                , target_hd_img = res.resData.head ? res.resData.head : "";;

            document.getElementById("target_team_name").innerText = target_team_name;
            document.getElementById("target_team_item").innerText += target_item_name;
            document.getElementById("target_team_head_img").src = (target_hd_img == "" ? "./img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_team_head_img").style.border = "1px solid #6e7474";
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
});
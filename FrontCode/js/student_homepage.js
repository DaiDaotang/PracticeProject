// JavaScript source code
var target_id = t_param[`target_id`]
    , target_authority = t_param[`target_authority`]
    , target_group_id = -1
    , target_group_name = ""
    , target_item_id = -1
    , target_item_name = ""
    , target_pt_id = -1

var GroupURL = "homepage_team.html"
    , ItemURL = "login.html"
    , CreateGroupURL = "student_create_team.html"
    , GetStudentTeamURL = "http://localhost:8080/StudentCheckTeamServlet"
    , GetPTInfoURL = "http://localhost:8080/GetPracticeByStudentIdServlet";

//区
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //监听签到
    $(document).on('click', '#checkin', function () {
        $.ajax({
            type: "POST",
            url: CheckInOutURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "studentId": user_id,
                    "atWork": !user_hasChecked
                }
            }),
            dataType: "json",
            success: function (res) {
                if (res.isSuccess) {
                    if (user_hasChecked) {
                        layer.msg('辛苦啦！');
                        user_hasChecked = false;
                        document.getElementById("checkin").innerText = "Check In";
                    } else {
                        layer.msg('签到成功！');
                        user_hasChecked = true;
                        document.getElementById("checkin").innerText = "Check Out";
                    }
                }
                else {
                    layer.msg('签到失败！');
                }
                console.log(res);
            }
        });
    });

    //监听签到情况
    $(document).on('click', '#checkrecord', function () {
        layer.open({
            title: '签到情况',
            type: 2,
            area: ["500px", "500px"],
            content: CheckRecordURL
        });
    });

    //监听选择实训以改变团队项目信息
    form.on('select(student_pt)', function (data) {
        console.log(data.value); //得到被选中的值
        target_pt_id = parseInt(data.value);
        //设置团队信息
        $.ajax({
            type: "POST",
            url: GetStudentTeamURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "id": target_id,
                    "practiceId": target_pt_id
                }
            }),
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.isSuccess) {        //有团队
                    target_group_id = res.resData.teamId
                        , target_group_name = res.resData.teamName
                        , target_item_id = res.resData.projectId
                        , target_item_name = res.resData.projectName;
                    document.getElementById("group_name").innerText = target_group_name;
                    document.getElementById("group_a").href = GroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&team_id=" + target_group_id + "&user_pt_id=" + target_pt_id;
                    document.getElementById("item_name").innerText = target_item_name;
                    document.getElementById("item_a").href = ItemURL;
                    console.log(document.getElementById("group_a").href)

                } else {              //没团队
                    target_group_id = -1
                        , target_group_name = ""
                        , target_item_id = -1
                        , target_item_name = "";

                    document.getElementById("group_name").innerText = "暂无";
                    document.getElementById("item_name").innerText = "暂无";
                    document.getElementById("item_a").href = "javascript:return false;";
                    if (target_authority == user_authority && target_id == user_id) {
                        document.getElementById("group_a").href = CreateGroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&user_pt_id=" + target_pt_id;
                    }
                    else {
                        document.getElementById("group_a").href = "javascript:;";
                    }
                }
            },
            error: function (res) {
                console.log("获取团队信息失败");
                console.log(res);
            }
        });
    });

    //设置实训
    $.ajax({
        type: "POST",
        url: GetPTInfoURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": target_id
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            var temp = ""
            for (var i = 0; i < res.resData.length; i++) {
                temp += "<option value=" + res.resData[i].id + ">" + res.resData[i].name + "</option>";
            }
            document.getElementById("student_pt").innerHTML += temp;
            form.render('select')

            //获取参加的最新的实训和组队信息
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/StudentCheckTeamServlet",
                async: true,
                data: JSON.stringify({
                    "reqId": "111",
                    "reqParam": {
                        "id": target_id,
                        "practiceId": -1
                    }
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    if (res.isSuccess) {        //有团队
                        target_pt_id = res.resData.practiceId
                        form.val('student_pt', {
                            "student_pt": target_pt_id
                        })
                        form.render('select')

                        target_group_id = res.resData.teamId
                            , target_group_name = res.resData.teamName
                            , target_item_id = res.resData.projectId
                            , target_item_name = res.resData.projectName;
                        document.getElementById("group_name").innerText = target_group_name;
                        document.getElementById("group_a").href = GroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&team_id=" + target_group_id + "&user_pt_id=" + target_pt_id;
                        document.getElementById("item_name").innerText = target_item_name;
                        document.getElementById("item_a").href = ItemURL;
                    } else {              //没团队
                        target_group_id = -1
                            , target_group_name = ""
                            , target_item_id = -1
                            , target_item_name = "";

                        document.getElementById("group_name").innerText = "暂无";
                        document.getElementById("item_name").innerText = "暂无";
                        document.getElementById("item_a").href = "javascript:return false;";
                        if (target_authority == user_authority && target_id == user_id && target_pt_id != -1) {
                            document.getElementById("group_a").href = CreateGroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&user_pt_id=" + target_pt_id;
                        }
                        else {
                            document.getElementById("group_a").href = "javascript:;";
                        }
                    }
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
});

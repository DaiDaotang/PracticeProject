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
    , WriteDiaryURL = "student_write_daily_dairy.html"
    , GetStudentTeamURL = "http://localhost:8080/StudentCheckTeamServlet"
    , GetPTInfoURL = "http://localhost:8080/GetPracticeByStudentIdServlet";

//区
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

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
                    document.getElementById("group_a").href = GroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&team_id=" + target_group_id + "&target_pt_id=" + target_pt_id;
                    document.getElementById("item_name").innerText = target_item_name;
                    document.getElementById("item_a").href = ItemURL;
                    console.log(document.getElementById("group_a").href)

                    //监听写日志
                    $(document).on('click', '#write_diary_btn', function () {
                        layer.open({
                            title: '日志',
                            type: 2,
                            area: ["500px", "500px"],
                            content: WriteDiaryURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&user_item_id=" + target_item_id
                        });
                    });

                } else {              //没团队
                    target_group_id = -1
                        , target_group_name = ""
                        , target_item_id = -1
                        , target_item_name = "";

                    document.getElementById("group_name").innerText = "暂无";
                    document.getElementById("item_name").innerText = "暂无";
                    document.getElementById("item_a").href = "javascript:return false;";
                    if (target_authority == user_authority && target_id == user_id) {

                    }
                    if (target_authority == user_authority && target_id == user_id) {
                        document.getElementById("group_a").href = CreateGroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_pt_id=" + target_pt_id;
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
            document.getElementById("student_pt").innerHTML = temp;
            target_pt_id = res.resData[res.resData.length - 1].id
            form.val('student_pt', {
                "student_pt": target_pt_id
            })
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
                        document.getElementById("group_a").href = GroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&team_id=" + target_group_id + "&target_pt_id=" + target_pt_id;
                        document.getElementById("item_name").innerText = target_item_name;
                        document.getElementById("item_a").href = ItemURL;

                        //监听写日志
                        $(document).on('click', '#write_diary_btn', function () {
                            layer.open({
                                title: '日志',
                                type: 2,
                                area: ["500px", "500px"],
                                content: WriteDiaryURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&user_item_id=" + target_item_id,
                                end: function () {
                                    
                                },
                                btn: '发布',
                                btnAlign: 'c',
                                yes: function () {
                                    var date_now = new Date();
                                    var year_now = date_now.getFullYear()
                                        , month_now = date_now.getMonth() + 1
                                        , day_now = date_now.getDay()
                                        , hour_now = date_now.getHours()
                                        , min_now = date_now.getMinutes()
                                        , sec_now = date_now.getSeconds();

                                    var diary_name = window.localStorage.diary_name
                                        , diary_content = window.localStorage.diary_content;

                                    console.log(date_now)
                                    console.log(year_now)
                                    console.log(month_now)
                                    console.log(day_now)
                                    console.log(hour_now)
                                    console.log(min_now)
                                    console.log(sec_now)

                                    console.log(diary_name)
                                    console.log(diary_content)

                                    layer.closeAll();
                                }
                            });
                        });

                    } else {              //没团队
                        target_group_id = -1
                            , target_group_name = ""
                            , target_item_id = -1
                            , target_item_name = "";

                        document.getElementById("group_name").innerText = "暂无";
                        document.getElementById("item_name").innerText = "暂无";
                        document.getElementById("item_a").href = "javascript:return false;";
                        if (target_authority == user_authority && target_id == user_id && target_pt_id != -1) {
                            document.getElementById("group_a").href = CreateGroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_pt_id=" + target_pt_id;
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

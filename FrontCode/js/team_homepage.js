﻿// JavaScript source code
var HomepageURL = "homepage_team.html"
    , TeamDiaryURL = "team_diary.html"
    , TeamMemberURL = "team_list.html"
    , TeamProgressURL = "team_progress.html"
    , GetTeamInfoURL = "http://localhost:8080/GetStudentByTeamIdServlet"
    , AddMemberURL = "http://localhost:8080/AddStudentServlet"
    , DelMemberURL = "http://localhost:8080/DeleteStudentFromTeamServlet"
    , ModifyCaptainURL = "http://localhost:8080/ModifyCaptainServlet";

var user_id = t_param[`user_id`]
    , user_authority = t_param[`user_authority`]
    , target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_team_id = parseInt(t_param[`team_id`])
    , target_pt_id = parseInt(t_param[`target_pt_id`])
    , target_team_name = ""
    , target_item_id = -1
    , target_item_name = ""
    , target_pt_name = ""
    , target_team_scores = -1
    , user_is_captain = false
    , captain_id = -1
    , target_hd_img = "./img/defaultHead.jpg"
    , target_team_members = []
    , target_github_link = "";

var param_member_existed = "";

var basic_extra_url = "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&team_id=" + t_param[`team_id`] + "&target_pt_id=" + t_param[`target_pt_id`]
document.getElementById("team_homepage").href = HomepageURL + basic_extra_url;
document.getElementById("team_diary").href = TeamDiaryURL + basic_extra_url;
document.getElementById("team_progress").href = TeamProgressURL + basic_extra_url;

layui.use(['form', 'table', 'layer', 'jquery'], function () {
    var table = layui.table
        , layer = layui.layer
        , form = layui.form
        , $ = layui.jquery;

    //基本信息
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
                , captain_id = res.resData.captainId
                , target_hd_img = res.resData.head ? res.resData.head : ""
                , target_team_members = res.resData.students
                , target_github_link = res.resData.githubLink;

            document.getElementById("target_team_name").innerText = target_team_name;
            document.getElementById("target_team_item").innerText += target_item_name;
            document.getElementById("target_team_head_img").src = (target_hd_img == "" ? "./img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_team_head_img").style.border = "1px solid #6e7474";
            document.getElementById("target_team_score").innerText = target_team_scores == 0 ? "暂无" : target_team_scores;
            if (target_github_link === "") {
                document.getElementById("target_github_link").href = "javescript:;";
                document.getElementById("target_github_link").innerText += "(暂无)";
            }
            else {
                document.getElementById("target_github_link").href = target_github_link;
                document.getElementById("target_github_link").target = "_blank";
            }

            var temp = ""
            for (var i = 0; i < target_team_members.length; i++) {
                temp += '<dd><a target="_blank"  href="homepage_student.html?user_id=' + user_id + '&user_authority=' + user_authority + '&target_id=' + target_team_members[i].id + '&target_authority=Student">' + target_team_members[i].name + '</a></dd>';
            }
            document.getElementById("team_list").innerHTML = temp;

            param_member_existed = function (res) {
                if (user_id == captain_id) {
                    return {
                        elem: '#team_member_table'
                        , url: GetTeamInfoURL
                        , title: '队员列表'
                        , contentType: 'application/json'
                        , toolbar: "#toolbar_item"
                        , method: "POST"
                        , where: {
                            "reqId": ""
                            , "reqParam": target_team_id
                        }
                        , deal: function (res) {
                            console.log(res)
                            return {
                                code: 0
                                , msg: ""
                                , count: 1000
                                , data: res.resData.students
                            }
                        }
                        , cols: [[{ field: 'id', title: 'ID', sort: true, hide: true }
                            , { field: 'name', title: '姓名' }
                            , { field: 'sex', title: '性别' }
                            , { field: 'number', title: '学号' }
                            , { field: 'grade', title: '年级' }
                            , { fixed: 'right', title: '操作', toolbar: '#bar_trans_del', width: 140 }
                        ]]
                        , done: function (res) {
                            console.log(res.data)
                        }
                    }
                }
                else {
                    return {
                        elem: '#team_member_table'
                        , url: GetTeamInfoURL
                        , title: '队员列表'
                        , contentType: 'application/json'
                        , toolbar: "#toolbar_item"
                        , method: "POST"
                        , where: {
                            "reqId": ""
                            , "reqParam": target_team_id
                        }
                        , deal: function (res) {
                            console.log(res)
                            return {
                                code: 0
                                , msg: ""
                                , count: 1000
                                , data: res.resData.students
                            }
                        }
                        , cols: [[{ field: 'id', title: 'ID', sort: true, hide: true }
                            , { field: 'name', title: '姓名' }
                            , { field: 'sex', title: '性别' }
                            , { field: 'number', title: '学号' }
                            , { field: 'grade', title: '年级' }
                        ]]
                        , done: function (res) {
                            console.log(res.data)
                        }
                    }
                }
            }

            if (user_id != captain_id) {
                document.getElementById('addMember').style.display = 'none';
                document.getElementById('delTeam').innerText = "退出队伍";
            }

            table.render(param_member_existed(1));
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });

    //监听添加同学
    $(document).on('click', '#addMember', function () {
        layer.prompt({
            formType: 0,
            value: '',
            title: '请输入电话号',
            area: ['300px', '350px'], //自定义文本域宽高,
        }, function (value, index, elem) {
            //alert(value); //得到value
            console.log(target_team_id)
            console.log(value);
            console.log(target_pt_id)
            console.log(target_item_id)
            $.ajax({
                type: "POST",
                url: AddMemberURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": {
                        "teamId": target_team_id,
                        "telephone": value,
                        "practiceId": target_pt_id,
                        "projectId": target_item_id
                    }
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.isSuccess) {
                        layer.close(index);

                        table.render(param_member_existed(1));

                        //更新导航栏
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
                                target_team_members = res.resData.students;

                                var temp = ""
                                for (var i = 0; i < target_team_members.length; i++) {
                                    temp += '<dd><a href="homepage_student.html?user_id=' + user_id + '&user_authority=' + user_authority + '&target_id=' + target_team_members[i].id + '&target_authority=Student">' + target_team_members[i].name + '</a></dd>';
                                }
                                document.getElementById("team_list").innerHTML = temp;
                            },
                            error: function (res) {
                                console.log("error");
                                console.log(res);
                            }
                        });
                    } else {
                        layer.msg(res.message, { time: 1000 })
                    }
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });
        });
    })

    //监听解散队伍
    $(document).on('click', '#delTeam', function () {
        layer.confirm('<pre>Are you seriously?</pre>', function (index) {
            $.ajax({
                type: "POST",
                url: DelMemberURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": {
                        "id": user_id,
                        "teamId": target_team_id
                    }
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.isSuccess) {
                        layer.msg("操作成功", { time: 1000 })
                        setTimeout(function sign_up_fun() {
                            window.location.href = "homepage_student.html?user_id=" + user_id + "&user_authority=Student&target_id=" + user_id + "&target_authority=Student";
                        }, 1500);
                    }
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });
        });
    })

    table.on('tool(team_member_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if (layEvent === 'trans' && user_id == target_id && user_id == captain_id && data.id == captain_id) {
            layer.msg('您就是队长哦', { time: 1000 })
        }
        else if (layEvent === 'del' && user_id == target_id && user_id == captain_id && data.id == captain_id) {
            layer.msg('您是队长，只能解散队伍，不能删除自己哦', { time: 1000 })
        }
        else {
            if (layEvent === 'trans') { //转让
                layer.confirm('<pre>确认要转让队长吗？</pre>', function (index) {
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);

                    ////向服务端发送删除指令

                    $.ajax({
                        type: "POST",
                        url: ModifyCaptainURL,
                        async: true,
                        data: JSON.stringify({
                            "reqId": "",
                            "reqParam": {
                                "teamId": target_team_id,
                                "studentId": data.id
                            }
                        }),
                        dataType: "json",
                        success: function (res) {
                            console.log(res);
                            if (res.isSuccess) {
                                layer.msg("转让成功", { time: 1000 })
                                setTimeout(function sign_up_fun() {
                                    window.location.href = "homepage_team.html?user_id=" + user_id + "&user_authority=Student&target_id=" + user_id + "&target_authority=Student&team_id=" + target_team_id + "&target_pt_id=" + target_pt_id;
                                }, 1500);
                            }
                        },
                        error: function (res) {
                            console.log("error");
                            console.log(res);
                        }
                    });
                });
            }
            else if (layEvent === 'del') { //删除
                layer.confirm('<pre>确认删除这一成员吗？</pre>', function (index) {
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);

                    ////向服务端发送删除指令

                    $.ajax({
                        type: "POST",
                        url: DelMemberURL,
                        async: true,
                        data: JSON.stringify({
                            "reqId": "",
                            "reqParam": {
                                "id": data.id,
                                "teamId": target_team_id
                            }
                        }),
                        dataType: "json",
                        success: function (res) {
                            console.log(res);
                        },
                        error: function (res) {
                            console.log("error");
                            console.log(res);
                        }
                    });

                    //table.render(param_member_existed(1));
                });
            }
        }
    });
});
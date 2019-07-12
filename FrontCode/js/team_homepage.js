// JavaScript source code
var user_id = t_param[`user_id`]
    , user_authority = t_param[`user_authority`]
    , target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_team_id = parseInt(t_param[`target_team_id`])
    , target_pt_id = parseInt(t_param[`target_pt_id`])
    , target_history = t_param[`history`]
    , target_team_name = ""
    , target_item_id = -1
    , target_item_name = ""
    , target_pt_name = ""
    , target_team_scores = -1
    , user_is_captain = false
    , captain_id = -1
    , target_hd_img = "../../img/defaultHead.jpg"
    , target_team_members = []
    , target_github_link = "";

var param_member_existed = "";

if (user_authority != "Student") {
    document.getElementById("delTeam").style.display = "none";
}

layui.use(['form', 'table', 'layer', 'jquery'], function () {
    var table = layui.table
        , layer = layui.layer
        , form = layui.form
        , $ = layui.jquery;

    //基本信息
    $.ajax({
        type: "POST",
        url: GetTeamMemberListURL,
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
            document.getElementById("target_team_head_img").src = (target_hd_img == "" ? "../../img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_team_head_img").style.border = "1px solid #6e7474";
            document.getElementById("target_team_score").innerText = target_team_scores == 0 ? "暂无" : target_team_scores;
            if (target_github_link === "") {
                document.getElementById("target_github_link").href = "javescript:;";
                document.getElementById("target_github_link").innerText += "(暂无)";
            }
            else {
                console.log(target_github_link)
                document.getElementById("target_github_link").href = target_github_link;
                document.getElementById("target_github_link").target = "_blank";
            }

            var temp = ""
            for (var i = 0; i < target_team_members.length; i++) {
                temp += '<dd><a target="_blank"  href="' + MemberHomepageURL + '?user_id=' + user_id + '&user_authority=' + user_authority + '&target_id=' + target_team_members[i].id + '&target_authority=Student">' + target_team_members[i].name + '</a></dd>';
            }
            document.getElementById("team_list").innerHTML = temp;

            var basic_extra_url = "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_team_id=" + target_team_id + "&target_pt_id=" + target_pt_id + "&target_item_id=" + target_item_id
            document.getElementById("team_homepage").href = TeamHomepageURL + basic_extra_url;
            document.getElementById("team_progress").href = TeamProgressURL + basic_extra_url;


            param_member_existed = function (members) {
                if (user_id == captain_id) {
                    return {
                        elem: '#team_member_table'
                        , url: GetTeamMemberListURL
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
                        , url: GetTeamMemberListURL
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

            if (user_id != captain_id && user_authority != "Student" || target_history == "yes") {
                document.getElementById('addMember').style.display = 'none';
                document.getElementById('editTeam').style.display = 'none';
                document.getElementById('delTeam').innerText = "退出队伍";
            }

            table.render(param_member_existed(1));

            //监听点击项目
            $(document).on('click', '#target_team_item', function () {
                layer.open({
                    title: "项目详情",
                    type: 2,
                    area: ["500px", "500px"],
                    content: ItemDetailURL + "?pt_id=" + target_pt_id + "&pt_user_id=" + user_id + "&item_id=" + target_item_id + "&temp=detail"
                });
            })

            //监听编辑信息
            $(document).on('click', '#editTeam', function () {
                window.location.href = EditTeamInfoURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_team_id=" + target_team_id + "&target_pt_id=" + target_pt_id + "&target_item_id=" + target_item_id;
            })

            //监听写日志
            $(document).on('click', '#write_diary_btn', function () {
                layer.open({
                    title: '日志',
                    type: 2,
                    area: ["500px", "500px"],
                    content: TeamerWriteDiaryURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&user_item_id=" + target_item_id + "&target_team_id=" + target_team_id,
                    end: function () {

                    },
                    btn: '发布',
                    btnAlign: 'c',
                    yes: function () {
                        var diary_name = window.localStorage.diary_name
                            , diary_time = window.localStorage.diary_time
                            , diary_content = window.localStorage.diary_content;

                        $.ajax({
                            type: "POST",
                            url: UploadDiaryURL,
                            async: true,
                            data: JSON.stringify({
                                "reqId": "",
                                "reqParam": {
                                    "teamId": target_team_id,
                                    "authority": "Team",
                                    "date": diary_time,
                                    "title": diary_name,
                                    "content": diary_content
                                }
                            }),
                            dataType: "json",
                            success: function (res) {
                                console.log(res)
                                if (res.isSuccess) {
                                    layer.msg("发布成功！", { time: 1000 })
                                    console.log(res);
                                    setTimeout("layer.closeAll()", 500)
                                    setTimeout("location.reload()", 500)
                                }
                            },
                            error: function (res) {
                                console.log("error");
                                console.log(res);
                            }
                        });
                    }
                });
            });

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
                            url: GetTeamMemberListURL,
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
                                    temp += '<dd><a href="' + MemberHomepageURL + '?user_id=' + user_id + '&user_authority=' + user_authority + '&target_id=' + target_team_members[i].id + '&target_authority=Student">' + target_team_members[i].name + '</a></dd>';
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
        var temp = "你确定要退出吗？";
        if (user_id == captain_id) {
            temp = "你确定要解散吗？"
        } 
        layer.confirm('<pre>' + temp + '</pre>', function (index) {
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
                            window.location.href = "../Student/" + StudentHomepageURL + "?user_id=" + user_id + "&user_authority=Student&target_id=" + user_id + "&target_authority=Student";
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
                                    window.location.href = TeamHomepageURL + "?user_id=" + user_id + "&user_authority=Student&target_id=" + user_id + "&target_authority=Student&target_team_id=" + target_team_id + "&target_pt_id=" + target_pt_id;
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
﻿// JavaScript source code
var HomepageURL = "homepage_team.html"
    , TeamDiaryURL = "team_diary.html"
    , TeamMemberURL = "team_list.html"
    , TeamProgressURL = "team_progress.html"
    , GetTeamInfoURL = "http://localhost:8080/GetStudentByTeamIdServlet"
    , AddMemberURL = "http://localhost:8080/AddStudentServlet";

var user_id = t_param[`user_id`]
    , user_authority = t_param[`user_authority`]
    , target_id = parseInt(t_param[`target_id`])
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
    , target_hd_img = "./img/defaultHead.jpg"
    , target_team_members = [];

var basic_extra_url = "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&team_id=" + t_param[`team_id`] + "&user_pt_id=" + t_param[`user_pt_id`]
document.getElementById("team_homepage").href = HomepageURL + basic_extra_url;
document.getElementById("team_diary").href = TeamDiaryURL + basic_extra_url;
document.getElementById("team_progress").href = TeamProgressURL + basic_extra_url;

layui.use(['form', 'table', 'layer', 'jquery'], function () {
    var table = layui.table
        , layer = layui.layer
        , form = layui.form
        , $ = layui.jquery;

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
                , captain_id = res.resData.captainId
                , target_hd_img = res.resData.head ? res.resData.head : ""
                , target_team_members = res.resData.students;

            document.getElementById("target_team_name").innerText = target_team_name;
            document.getElementById("target_team_item").innerText += target_item_name;
            document.getElementById("target_team_head_img").src = (target_hd_img == "" ? "./img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_team_head_img").style.border = "1px solid #6e7474";

            var temp = ""
            for (var i = 0; i < target_team_members.length; i++) {
                temp += '<dd><a href="homepage_student.html?user_id=' + user_id + '&user_authority=' + user_authority + '&target_id=' + target_team_members[i].id + '&target_authority=Student">' + target_team_members[i].name + '</a></dd>';
            }
            document.getElementById("team_list").innerHTML = temp;

            var param_member_existed = function (res) {
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

    table.on('tool(team_member_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'detail') { //查看
            layer.open({
                title: data.projectName,
                type: 2,
                area: ["500px", "500px"],
                content: ItemDetailURL
            });

        }
        else if (layEvent === 'del') { //删除
            layer.confirm('<pre>真的删除这一成员吗？\n(如果是队长，将解散队伍)</pre>', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);

                ////向服务端发送删除指令

                table.render(param_item_existed);
            });
        }
    });

});
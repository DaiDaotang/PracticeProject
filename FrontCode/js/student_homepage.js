//变量
var user_hasChecked = false
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_school_id = -1
    , target_school_name = ""
    , target_grade = ""
    , target_major = ""
    , target_pt_id = -1
    , target_group_id = -1
    , target_group_name = ""
    , target_item_id = -1
    , target_item_name = ""

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
                //有团队
                if (res.isSuccess) {       
                    target_group_id = res.resData.teamId
                        , target_group_name = res.resData.teamName
                        , target_item_id = res.resData.projectId
                        , target_item_name = res.resData.projectName;
                    document.getElementById("group_name").innerText = target_group_name;
                    document.getElementById("group_a").href = GroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_team_id=" + target_group_id + "&target_pt_id=" + target_pt_id;
                    document.getElementById("item_name").innerText = target_item_name;
                    $(document).on('click', '#item_a', function () {
                        layer.open({
                            title: data.projectName,
                            type: 2,
                            area: ["500px", "500px"],
                            content: ItemDetailURL + "?pt_id=" + target_pt_id + "&pt_user_id=" + user_id + "&item_id=" + target_item_id + "&temp=detail"
                        });
                    })
                    var extra_url = "&target_item_id=" + target_item_id + "&target_pt_id=" + target_pt_id;
                    document.getElementById("target_homepage").href = StudentHomepageURL + basic_extra_url + extra_url;
                    document.getElementById("target_diary").href = StudentDiaryURL + basic_extra_url + extra_url;
                    document.getElementById("target_history").href = StudentHistoryURL + basic_extra_url + extra_url;
                }
                //没团队
                else {
                    target_group_id = -1
                        , target_group_name = ""
                        , target_item_id = -1
                        , target_item_name = "";

                    document.getElementById("group_name").innerText = "暂无";
                    document.getElementById("item_name").innerText = "暂无";
                    if (target_authority == user_authority && target_id == user_id) {
                        document.getElementById("group_a").href = CreateGroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_pt_id=" + target_pt_id;
                    }
                    else {
                        document.getElementById("group_a").href = "javascript:;";
                    }
                    var extra_url = "&target_item_id=" + target_item_id + "&target_pt_id=" + target_pt_id;
                    document.getElementById("target_homepage").href = StudentHomepageURL + basic_extra_url + extra_url;
                    document.getElementById("target_diary").href = StudentDiaryURL + basic_extra_url + extra_url;
                    document.getElementById("target_history").href = StudentHistoryURL + basic_extra_url + extra_url;
                    document.getElementById("target_resume").href = StudentResumeURL + basic_extra_url + extra_url;
                }
            },
            error: function (res) {
                console.log("获取团队信息失败");
                console.log(res);
            }
        });
    });

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
                        document.getElementById("checkin").innerText = "上班打卡";
                    } else {
                        layer.msg('签到成功！');
                        user_hasChecked = true;
                        document.getElementById("checkin").innerText = "下班打卡";
                    }
                }
                else {
                    layer.msg('签到失败！');
                }
                console.log(res);
            }
        });
    });

    //设置实训列表
    $.ajax({
        type: "POST",
        url: GetPTListByStudentIdURL,
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
                url: GetStudentTeamURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": {
                        "id": target_id,
                        "practiceId": -1
                    }
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    //有团队
                    if (res.isSuccess) {
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
                        document.getElementById("group_a").href = GroupURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_team_id=" + target_group_id + "&target_pt_id=" + target_pt_id;
                        document.getElementById("item_name").innerText = target_item_name;
                        $(document).on('click', '#item_a', function () {
                            layer.open({
                                title: target_item_name,
                                type: 2,
                                area: ["500px", "500px"],
                                content: ItemDetailURL + "?pt_id=" + target_pt_id + "&pt_user_id=" + user_id + "&item_id=" + target_item_id + "&temp=detail"
                            });
                        })
                        var extra_url = "&target_item_id=" + target_item_id + "&target_pt_id=" + target_pt_id;
                        document.getElementById("target_homepage").href = StudentHomepageURL + basic_extra_url + extra_url;
                        document.getElementById("target_diary").href = StudentDiaryURL + basic_extra_url + extra_url;
                        document.getElementById("target_history").href = StudentHistoryURL + basic_extra_url + extra_url;
                        document.getElementById("target_resume").href = StudentResumeURL + basic_extra_url + extra_url;
                    }
                    //没团队
                    else {
                        target_group_id = -1
                            , target_group_name = ""
                            , target_item_id = -1
                            , target_item_name = "";

                        document.getElementById("group_name").innerText = "暂无";
                        document.getElementById("item_name").innerText = "暂无";
                        if (target_authority == user_authority && target_id == user_id && target_pt_id != -1) {
                            document.getElementById("group_a").href = CreateGroupURL + basic_extra_url + "&target_pt_id=" + target_pt_id;
                        }
                        else {
                            document.getElementById("group_a").href = "javascript:;";
                        }
                        var extra_url = "&target_item_id=" + target_item_id + "&target_pt_id=" + target_pt_id;
                        document.getElementById("target_homepage").href = StudentHomepageURL + basic_extra_url + extra_url;
                        document.getElementById("target_diary").href = StudentDiaryURL + basic_extra_url + extra_url;
                        document.getElementById("target_history").href = StudentHistoryURL + basic_extra_url + extra_url;
                        document.getElementById("target_resume").href = StudentResumeURL + basic_extra_url + extra_url;
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

    //获取信息
    $.ajax({
        type: "POST",
        url: GetStudentServletURL,
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
                , target_school_name = res.resData.schoolName
                , target_grade = res.resData.grade
                , target_major = res.resData.major
                , target_hd_img = res.resData.head ? res.resData.head : "";

            //设置签到
            $.ajax({
                type: "POST",
                url: SetCheckInOutURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": user_id
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.resData) {
                        user_hasChecked = true;
                        document.getElementById("checkin").innerText = "下班打卡";
                    }
                    else {
                        user_hasChecked = false;
                        document.getElementById("checkin").innerText = "上班打卡";
                    }
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });

            //监听签到情况
            $(document).on('click', '#checkrecord', function () {
                layer.open({
                    title: '签到情况',
                    type: 2,
                    area: ["1100px", "710px"],
                    content: CheckRecordURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority + "&target_pt_id=" + target_pt_id
                });
            });

            if (target_id != user_id || target_authority != user_authority) {
                document.getElementById("checkin").style.display = "none";
            }

            document.getElementById("target_head_img").src = (target_hd_img == "" ? "../../img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_head_img").style.border = "1px solid #6e7474";

            document.getElementById("username").innerText = target_name;
            document.getElementById("gender").innerHTML = target_gender == "男" ? '<i class="layui-icon layui-icon-male" style="height:100px; color: #1E9FFF; font-size:40px; margin-left: 20px;"></i>' : '<i class="layui-icon layui-icon-female" style="height:100px; color: #fd5087; font-size:40px; margin-left: 20px;"></i>'
            document.getElementById("school_a").innerText += target_school_name;
            document.getElementById("major").innerText += target_major;
            document.getElementById("grade").innerText += target_grade;
            document.getElementById("major").href = "https://baike.baidu.com/item/" + major;
            document.getElementById("school_a").href = "https://baike.baidu.com/item/" + target_school_name;
        },
        error: function (res) {
            console.log("获取用户基本信息失败");
        }
    });
});

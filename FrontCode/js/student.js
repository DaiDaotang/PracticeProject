//变量
var user_hasChecked = false
    , target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""           
    , target_school_id = -1
    , target_school_name = ""
    , target_grade = ""
    , target_major = ""
    , target_pt_id = -1
    , target_item_id = -1;

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

    //监听置顶
    $(document).on('click', '#turntop', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
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

            //获取团队信息
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
                    console.log(res);
                    if (res.isSuccess) {        //有团队
                        target_item_id = res.resData.projectId
                            , target_pt_id = res.resData.practiceId;

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
                                                "studentId": user_id,
                                                "authority": "Student",
                                                "date": diary_time,
                                                "title": diary_name,
                                                "content": diary_content,
                                                "projectId": target_pt_id
                                            }
                                        }),
                                        dataType: "json",
                                        success: function (res) {
                                            if (res.isSuccess) {
                                                layer.msg("发布成功！", { time: 1000 })
                                                console.log(res);
                                                setTimeout("layer.closeAll()", 500)
                                                setTimeout("location.reload()", 500)
                                            }
                                            else {
                                                layer.msg("还未到时间，不可以发布")
                                                setTimeout("layer.closeAll()", 1000);
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

                    } else {              //没团队
                        target_item_id = -1
                        document.getElementById("write_diary_btn").style.display = "none";
                    }

                    var extra_url = "&target_item_id=" + target_item_id + "&target_pt_id=" + target_pt_id;
                    document.getElementById("target_homepage").href = StudentHomepageURL + basic_extra_url + extra_url;
                    document.getElementById("target_diary").href = StudentDiaryURL + basic_extra_url + extra_url;
                    document.getElementById("target_history").href = StudentHistoryURL + basic_extra_url + extra_url;
                    document.getElementById("target_resume").href = StudentResumeURL + basic_extra_url + extra_url;
                },
                error: function (res) {
                    console.log("获取团队信息失败");
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
                document.getElementById("write_diary_btn").style.display = "none";
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
})

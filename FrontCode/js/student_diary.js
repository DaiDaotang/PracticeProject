// JavaScript source code
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    var target_item_id = t_param[`target_item_id`]
        , target_pt_id = t_param[`target_pt_id`]
        , week = -1;

    //表单初始赋值
    form.val('diary_form', {
        "search_diary_input": ""
        , "search_diary_data": ""
    })

    //获取周数
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
            console.log(res)
            week = res.resData.weeks;
            //监听写日志
            $(document).on('click', '#write_diary_btn', function () {
                layer.open({
                    title: '日志',
                    type: 2,
                    area: ["500px", "500px"],
                    content: WriteDiaryURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&user_item_id=" + target_item_id + "&week=" + week,
                    btn: '发布',
                    btnAlign: 'c',
                    yes: function () {
                        var diary_name = window.localStorage.diary_name
                            , diary_week = window.localStorage.diary_time
                            , diary_content = window.localStorage.diary_content;

                        if (diary_week == "") {
                            layer.msg("请选择周数")
                            return false;
                        } else if (diary_content.length < 100) {
                            layer.msg("至少填写100字")
                            return false;
                        } else if (diary_name == "") {
                            layer.msg("请填写标题")
                            return false;
                        } else {
                            console.log(target_item_id)
                            $.ajax({
                                type: "POST",
                                url: UploadDiaryURL,
                                async: true,
                                data: JSON.stringify({
                                    "reqId": "",
                                    "reqParam": {
                                        "studentId": user_id,
                                        "authority": "Student",
                                        "title": diary_name,
                                        "content": diary_content,
                                        "projectId": target_item_id,
                                        "week": diary_week
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
                    }
                });
            });
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
});

//laydate区
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#search_diary_data'
    });
});

//flow区
layui.use(['flow', 'layer'], function () {
    var flow = layui.flow
        , $ = layui.jquery
        , layer = layui.layer;

    var diary_page = 0
        , target_item_id = t_param[`target_item_id`];

    flow.load({
        elem: '#diary_flow' //流加载容器
        , done: function (page, next) { //执行下一页的回调

            $.ajax({
                type: "POST",
                url: GetStudentDiaryURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": {
                        "studentId": target_id,
                        "authority": "Student",
                        "index": diary_page,
                        "count": 8,
                        "projectId": target_item_id
                    }
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.isSuccess) {
                        diary_page += 1;
                        //模拟数据插入
                        setTimeout(function () {
                            var lis = [];
                            var str = ""
                            for (var i = 0; i < res.resData.length; i++) {
                                str = '<li><div style="width:auto; height: auto; margin: 20px; background-color:#e7f6f7; border-radius: 20px; border: 1px solid #d4dadb;"><div style="width:auto; height: auto; margin: 20px;"><div class="layui-row" style="height:auto;"><div class="layui-col-md8" style="height:100px;"><div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;"><span style="font-size:30px;">'
                                str += res.resData[i].title
                                str += '</span><hr class="layui-bg-blue"></div></div><div class="layui-col-md4" style="height:auto; text-align:right;"><div class="grid-demo grid-demo-bg1" style="margin-top:5px;"><p style="font-size:20px;">'
                                str += '项目:' + res.resData[i].projectName
                                str += '</p><p style="font-size:20px;">'
                                str += '第' + res.resData[i].week + '周'
                                str += '</p><p style="font-size:20px;">'
                                str += res.resData[i].date
                                str += '</p></div></div></div></div><div style="width:auto; height: auto; margin: 20px; padding:20px; font-size:24px;"><pre>'
                                str += res.resData[i].content;
                                str += '</pre>'
                                if (user_id == target_id && user_authority == target_authority) {
                                    str += '<hr class="layui-bg-blue">'
                                    str += `<div style="width:auto; height: auto;font-size:18px;"><p>评分:` + (res.resData[i].score == "" ? "暂未批阅" : res.resData[i].score) + `</p><p>评语:` + (!res.resData[i].isReviewed ? "暂无" : res.resData[i].comment) + `</div>`;
                                }
                                str += '</div ></div ></li > '
                                lis.push(str);
                            }

                            //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                            //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                            next(lis.join(''), page < 100); //假设总页数为 10
                        }, 300);
                    }
                    else {
                        layer.msg("已无更多日志！")
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

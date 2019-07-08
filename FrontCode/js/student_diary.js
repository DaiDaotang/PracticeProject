// JavaScript source code
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //表单初始赋值
    form.val('diary_form', {
        "search_diary_input": ""
        , "search_diary_data": ""
    })
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
layui.use('flow', function () {
    var flow = layui.flow
        , $ = layui.jquery;

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
                                str += '</span><hr class="layui-bg-blue"></div></div > <div class="layui-col-md4" style="height:auto; text-align:right;"><div class="grid-demo grid-demo-bg1" style="margin-top:35px;"><span style="font-size:30px;">'
                                str += res.resData[i].date
                                str += '</span></div></div></div></div><div style="width:auto; height: auto; margin: 20px; padding:20px; font-size:24px;"><pre>'
                                str += res.resData[i].content;
                                str += '</pre></div></div></li>'
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

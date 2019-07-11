// JavaScript source code
var max = 3
    , checked_tab_id = 0
    , task_res = []
    , target_team_id = t_param[`target_team_id`]
    , target_pt_id = t_param[`target_pt_id`]
    , week_now = -1
    , week_total = -1
    , work_total_max = -1
    , work_total_week = -1
    , whole_tab_count = 1;

var checked_task_id = []
    , checked_task_is_tq = []
    , checked_task_is_done = [];

layui.use(['element', 'jquery', 'table', 'layer'], function () {
    var $ = layui.jquery
        , table = layui.table
        , layer = layui.layer
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    element.on('tab(tabTeamProcess)', function (data) {
        checked_tab_id = data.index;

        setTaskTable(checked_tab_id);
        setCategory(checked_tab_id);

        checked_task_id = [];
        checked_task_is_tq = [];
        checked_task_is_done = [];
    });

    //加载标签页模板
    $.ajax({
        type: "POST",
        url: GetTotalWeek,
        async: true,
        data: JSON.stringify({
            "reqId": 0,
            "reqParam": target_pt_id
        }),
        dataType: "json",
        success: function (res) {
            //console.log(res)
            week_total = res.resData.week;
            $.ajax({
                type: "POST",
                url: GetTotalWeek,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": target_pt_id
                }),
                dataType: "json",
                success: function (res) {
                    //console.log(res)
                    week_now = res.resData.week;
                    var temp = "";
                    for (var i = 1; i < week_now + 1; i++) {
                        temp += `<li>第` + i + `周</li>`
                        whole_tab_count++;
                    }
                    document.getElementById("tab_ul").innerHTML += temp;
                    temp = "";
                    for (var i = 1; i < week_now + 1; i++) {
                        temp += `
                            <div class="layui-tab-item">
                                <table class="layui-hide" id="task_table_` + i + `" lay-filter="task_table_` + i + `"></table>
                                <div id="task_container_` + i + `" style="width:100%;height: 550px"></div>
                            </div>`
                    }
                    document.getElementById("tab_div").innerHTML += temp;
                    document.getElementById("first").click();
                },
                error: function (res) {
                    //console.log("error");
                    //console.log(res);
                }
            });
        },
        error: function (res) {
            //console.log("error");
            //console.log(res);
        }
    });

    var param_task_existed = function (index) {
        return {
            elem: '#task_table_' + index
            , url: GetTaskURL
            , title: '项目列表'
            , toolbar: "#toolbar_task"
            , contentType: 'application/json'
            , method: "POST"
            , where: {
                "reqId": ""
                , "reqParam": target_team_id
            }
            , deal: function (res) {
                //console.log(res)
                //获取每一周总的工作量
                if (index > 0) {
                    work_total_week = 0;
                    var i = 0;
                    while (i < res.resData.length) {
                        if (res.resData[i].taskWeek != index) {
                            res.resData.splice(i, 1);
                            continue;
                        }
                        work_total_week += res.resData[i].taskAmount;
                        i++;
                    }
                }
                //获取实训总的工作量
                else {
                    work_total_max = 0;
                    for (var i = 0; i < res.resData.length; i++) {
                        work_total_max += res.resData[i].taskAmount;
                    }
                }
                return {
                    code: 0
                    , msg: ""
                    , count: 1000
                    , data: res.resData
                }
            }
            , cols: [[
                { type: 'checkbox' }
                , { field: 'taskId', title: 'ID', hide: true}
                , { field: 'taskName', title: '名称'}
                , { field: 'taskWeek', title: '周数', sort: true}
                , { field: 'taskContent', title: '概述', hide: true}
                , { field: 'taskAmount', title: '任务量', sort: true}
                , { field: 'taskPriority', title: '优先级', sort: true}
                , { field: 'finishTime', title: '完成时间', sort: true, hide: true }
            ]]
            , done: function (res) {
                //console.log(res.data);
                if (index > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].taskWeek < week_now) {
                            $(".layui-table tr[data-index=" + i + "] input[type='checkbox']").prop('disabled', true);
                            $(".layui-table tr[data-index=" + i + "] input[type='checkbox']").next().addClass('layui-btn-disabled');
                        }
                    }
                }
            }
        }
    }

    function setTaskTable(index) {
        table = $.extend(table, { config: { checkName: 'isFinished' } });
        table.render(param_task_existed(index))

        //监听行双击事件
        table.on('rowDouble(task_table_' + index + ')', function (obj) {
            //console.log(obj)

            window.localStorage.taskName = obj.data.taskName;
            window.localStorage.taskAmount = obj.data.taskAmount;
            window.localStorage.taskContent = obj.data.taskContent;
            window.localStorage.taskPriority = obj.data.taskPriority;
            window.localStorage.taskWeek = obj.data.taskWeek;
            window.localStorage.finishTime = obj.data.finishTime;
            window.localStorage.taskId = obj.data.taskId;

            //任务总览
            if (index == 0) {
                layer.open({
                    title: '任务详情',
                    type: 2,
                    area: ["500px", "500px"],
                    content: AddTaskURL + "?select=edit" + "&week=" + week_total,
                    btn: ['确定修改', '删除任务', '关闭'],
                    btnAlign: 'c', //按钮居中,
                    yes: function (index, layero) {
                        //console.log(window.localStorage.finishTime)
                        if (window.localStorage.finishTime == "" || window.localStorage.finishTime == "undefined") {
                            $.ajax({
                                type: "POST",
                                url: ModifyTaskURL,
                                async: true,
                                data: JSON.stringify({
                                    "reqId": "",
                                    "reqParam": {
                                        "taskName": window.localStorage.taskName,
                                        "taskContent": window.localStorage.taskContent,
                                        "taskAmount": window.localStorage.taskAmount,
                                        "taskPriority": window.localStorage.taskPriority,
                                        "taskWeek": window.localStorage.taskWeek,
                                        "teamId": target_team_id,
                                        "taskId": obj.data.taskId
                                    }
                                }),
                                dataType: "json",
                                success: function (res) {
                                    //console.log(res);
                                    //console.log(window.localStorage)
                                    if (res.isSuccess) {
                                        layer.msg("修改成功！", { time: 500 })
                                        obj.update({
                                            taskName: window.localStorage.taskName,
                                            taskContent: window.localStorage.taskContent,
                                            taskAmount: window.localStorage.taskAmount,
                                            taskPriority: window.localStorage.taskPriority,
                                            taskWeek: window.localStorage.taskWeek
                                        })
                                        resetLocalStorage();
                                        layer.close(index);
                                    }
                                },
                                error: function (res) {
                                    //console.log("error");
                                    //console.log(res);
                                }
                            });
                        }
                        else {
                            layer.msg("任务已完成，不可修改", { time: 750 })
                            layer.close(index);
                            resetLocalStorage();
                        }
                    },
                    btn2: function (index, layero) {
                        layer.confirm('确定要删除吗？', function () {
                            //删除任务接口
                            $.ajax({
                                type: "POST",
                                url: DeleteTaskURL,
                                async: true,
                                data: JSON.stringify({
                                    "reqId": "",
                                    "reqParam": window.localStorage.taskId
                                }),
                                dataType: "json",
                                success: function (res) {
                                    resetLocalStorage();
                                    layer.msg("删除成功！", { time: 750 })
                                },
                                error: function (res) {
                                    //console.log("error");
                                    //console.log(res);
                                }
                            });
                            obj.del();
                            layer.closeAll();
                        });
                    },
                    btn3: function (index, layero) {
                        layer.closeAll();
                    },
                    end: function () {
                        //console.log(window.localStorage)
                    }
                });
            }
            //周
            else {
                layer.open({
                    title: '任务详情',
                    type: 2,
                    area: ["500px", "500px"],
                    content: AddTaskURL + "?select=detail" + "&week=" + week_total,
                    btn: [ '关闭'],
                    btnAlign: 'c', //按钮居中,
                    yes: function (index, layero) {
                        layer.close(index);
                    },
                    end: function () {
                        resetLocalStorage();
                    }
                });
            }
        });

        //监听复选框选中
        table.on('checkbox(task_table_' + index + ')', function (obj) {
            if (obj.checked) {
                //选中任务的周数是这周之前还是之后
                if (obj.data.taskWeek > index) {
                    checked_task_is_tq.push(true);
                } else {
                    checked_task_is_tq.push(false);
                }
                //添加到数组中
                checked_task_id.push(obj.data)
                //标记已完成
                checked_task_is_done.push(true);
            }
            else {
                var i = 0;
                var found = false;
                for (; i < checked_task_id.length; i++) {
                    if (checked_task_id[i].taskId == obj.data.taskId) {
                        found = true;
                        break;
                    }
                }
                //若是点击取消
                if (found) {
                    checked_task_id.splice(i, 1)
                    checked_task_is_tq.splice(i, 1);
                }
                //若是取消完成的
                else {
                    //添加到数组中
                    checked_task_id.push(obj.data)
                    //标记已完成
                    checked_task_is_done.push(false);
                }
            }
            //console.log(checked_task_id)
        });

        //头工具栏事件
        table.on('toolbar(task_table_' + index + ')', function (obj) {
            switch (obj.event) {
                case 'addTask':
                    layer.open({
                        title: '添加任务',
                        type: 2,
                        area: ["500px", "500px"],
                        content: AddTaskURL + "?select=add" + "&week=" + week_total,
                        end: function () {
                            table.render(param_task_existed(checked_tab_id));
                            setCategory(checked_tab_id)
                        },
                        btn: '添加任务',
                        btnAlign: 'c', //按钮居中,
                        yes: function () {
                            //console.log(window.localStorage)
                            if (window.localStorage.task_name == "") {
                                layer.msg("请输入任务名称")
                            } else if (window.localStorage.task_week == -1) {
                                layer.msg("请选择周数")
                            } else if (window.localStorage.task_amount == -1) {
                                layer.msg("请填写任务量")
                            } else if (window.localStorage.task_priority == -1) {
                                layer.msg("请填写优先级")
                            } else {
                                $.ajax({
                                    type: "POST",
                                    url: CreateTaskURL,
                                    async: true,
                                    data: JSON.stringify({
                                        "reqId": "",
                                        "reqParam": {
                                            "taskName": window.localStorage.taskName,
                                            "taskContent": window.localStorage.taskContent,
                                            "taskAmount": window.localStorage.taskAmount,
                                            "taskPriority": window.localStorage.taskPriority,
                                            "taskWeek": window.localStorage.taskWeek,
                                            "isFinished": false,
                                            "teamId": target_team_id
                                        }
                                    }),
                                    dataType: "json",
                                    success: function (res) {
                                        //console.log(res);
                                        layer.msg("添加成功！", { time: 750 })
                                        //console.log(window.localStorage)
                                        resetLocalStorage();
                                        table.render(param_task_existed(checked_tab_id));
                                        setCategory(checked_tab_id)
                                        setTimeout("layer.closeAll()", 500);
                                    }
                                });
                            }
                        }
                    });
                    break;
                case 'finishTask':
                    //根据数组完成任务
                    if (checked_task_id.length > 0) {
                        for (var i = 0; i < checked_task_id.length; i++) {
                            if (checked_task_is_done[i])
                                modifyFinishedOrNot(checked_task_id[i], i);
                        }
                        layer.msg("提交成功！", { time: 750 });
                    }
                    break;
                case 'drawbackTask':
                    setTaskTable(checked_tab_id);
                    setCategory(checked_tab_id)
                    break;
            };
        });
    }

    function modifyFinishedOrNot(obj, index) {
        $.ajax({
            type: "POST",
            url: ModifyTaskURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "taskName": obj.taskName,
                    "taskContent": obj.taskContent,
                    "taskAmount": obj.taskAmount,
                    "taskPriority": obj.taskPriority,
                    "taskWeek": week_now,
                    "isFinished": true,
                    "teamId": target_team_id,
                    "taskId": obj.taskId
                }
            }),
            dataType: "json",
            success: function (res) {
                //console.log(res);
                setCategory(checked_tab_id)
            },
            error: function (res) {
                //console.log("error");
                //console.log(res);
            }
        });
    }

    function setCategory(index) {
        $.ajax({
            type: "POST",
            url: GetXYURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "teamId": target_team_id,
                    "practiceId": target_pt_id
                }
            }),
            dataType: "json",
            success: function (res) {
                var temp_x = []
                    , temp_y = [];

                if (res.resData.length < 5 && index == 0) {
                    var x = [], y = [], x_t = [], y_t = [];
                    for (var i = 0; i < res.resData.length; i++) {
                        x.push(res.resData[i].dates);
                        y.push(res.resData[i].works);
                        x[i][0] = "总"
                        if (i == 0) {
                            x_t.push("总");
                            y_t.push(0);
                        }
                        for (var j = 1; j < res.resData[i].dates.length; j++) {
                            x_t.push(res.resData[i].dates[j])
                            y_t.push(0)
                        }
                    }
                    var temp_index = y_t.length - 1
                        , temp_value = 0;
                    for (var i = y.length - 1; i >= 0; i--) {
                        for (var j = y[i].length - 1; j >= 0; j--) {
                            if (j == y[i].length - 1 && y[i][j] > 0) {
                                for (var k = temp_index; k < y_t.length; k++) {
                                    y_t[k] += y[i][j];
                                }
                            }
                            y_t[temp_index] = temp_value + y[i][j];
                            if(j > 0)
                                temp_index -= 1;
                        }
                        temp_value = y_t[temp_index];
                    }
                    console.log(x_t)
                    console.log(y_t)
                    temp_x = x_t
                        , temp_y = y_t;
                }
                else {
                    var x = [], y = [], x_t = [], y_t = [];
                    for (var i = 0; i < res.resData.length; i++) {
                        x.push(res.resData[i].dates);
                        y.push(res.resData[i].works);
                        x[i][0] = "总"
                        if (i == 0) {
                            x_t.push("总");
                            y_t.push(0);
                        }
                        x_t.push("第" + (i + 1) + "周")
                        y_t.push(0)
                        y_t[0] += y[i][0]
                    }
                    for (var i = 0; i < y.length; i++) {
                        y_t[i + 1] = y_t[i] - y[i][0] + y[i][y[i].length - 1]
                    }
                    temp_x = index == 0 ? x_t : x[index - 1]
                        , temp_y = index == 0 ? y_t : y[index - 1];
                }

                setCategoryDetail(temp_x, temp_y, index);
            },
            error: function (res) {
                console.log("error");
                console.log(res);
            }
        });
    }

    function resetLocalStorage() {
        window.localStorage.taskId = ""
        window.localStorage.taskName = ""
        window.localStorage.taskAmount = ""
        window.localStorage.taskContent = ""
        window.localStorage.taskPriority = ""
        window.localStorage.taskWeek = ""
        window.localStorage.finishTime = ""
    }

    function setCategoryDetail(x, y, index) {
        var dom = document.getElementById("task_container_" + index);
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        option = {
            title: {
                text: "任务流程图"
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: x
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: y,
                type: 'line',
                areaStyle: {}
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        myChart.on('click', function (params) {
            console.log(params)
            console.log(params.data)
            console.log(params.name)
        });
    }
});

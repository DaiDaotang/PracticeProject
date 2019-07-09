// JavaScript source code
var max = 3
    , checked_tab_id = 0
    , task_res = []
    , target_team_id = t_param[`target_team_id`];

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
    });

    var param_task_existed = function (res0) {
        return {
            elem: '#task_table_' + res0
            , url: GetTaskURL
            , title: '项目列表'
            , toolbar: "#toolbar_task"
            , contentType: 'application/json'
            , method: "POST"
            , height: 550
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
                console.log(res.data);
                //选中
                //$('xxx').attr('checked', true);
                //form.render();
                //取消
                //$('xxx').removeAttr('checked');
                //form.render();
            }
        }
    }

    //头工具栏事件
    table.on('toolbar(task_table_0)', function (obj) {
        switch (obj.event) {
            case 'addTask':
                console.log("add task")
                layer.open({
                    title: '添加任务',
                    type: 2,
                    area: ["500px", "500px"],
                    content: AddTaskURL + "?select=add",
                    end: function () {
                        table.render(param_task_existed(checked_tab_id));
                        setCategory(checked_tab_id)
                    },
                    btn: '添加任务',
                    btnAlign: 'c', //按钮居中,
                    yes: function () {
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
                                        "taskName": window.localStorage.task_name,
                                        "taskContent": window.localStorage.task_content,
                                        "taskAmount": window.localStorage.task_amount,
                                        "taskPriority": window.localStorage.task_priority,
                                        "taskWeek": window.localStorage.task_week,
                                        "isFinished": false,
                                        "teamId": target_team_id
                                    }
                                }),
                                dataType: "json",
                                success: function (res) {
                                    console.log(res);
                                    layer.msg("添加成功！", { time: 750 })
                                    setTimeout("layer.closeAll()", 500);
                                }
                            });
                        }
                    }
                });
                break;
            case 'finishTask':
                console.log("finish")
                break;
            case 'drawbackTask':
                setTaskTable(checked_tab_id);
                break;
        };
    });

    document.getElementById("first").click();

    function setTaskTable(index) {
        table = $.extend(table, { config: { checkName: 'isFinished' } });
        table.render(param_task_existed(index))
        //监听行双击事件
        table.on('rowDouble(task_table_' + index + ')', function (obj) {
            console.log(obj.tr)     //得到当前行元素对象
            console.log(obj.data)   //得到当前行数据
            console.log(obj)

            window.localStorage.taskName = obj.data.taskName;
            window.localStorage.taskAmount = obj.data.taskAmount;
            window.localStorage.taskContent = obj.data.taskContent;
            window.localStorage.taskPriority = obj.data.taskPriority;
            window.localStorage.taskWeek = obj.data.taskWeek;
            window.localStorage.finishTime = obj.data.finishTime

            layer.open({
                title: '任务详情',
                type: 2,
                area: ["500px", "500px"],
                content: AddTaskURL + "?select=edit",
                btn: ['确定修改', '删除任务', '关闭'],
                btnAlign: 'c', //按钮居中,
                yes: function (index, layero) {
                    if (window.localStorage.finishTime == "" || window.localStorage.finishTime == "undefined" || window.localStorage.taskWeek == ) {
                        layer.msg("任务已完成或已过期，不可修改")
                    }
                    else {
                        
                    }
                },
                btn2: function (index, layero) {

                },
                btn3: function (index, layero) {
                    layer.closeAll();
                },
                end: function () {
                }
            });

            //obj.del();            //删除当前行
            //obj.update(fields)    //修改当前行数据
        });

        //监听复选框选中
        table.on('checkbox(task_table_' + index + ')', function (obj) {
            console.log(obj.checked); //当前是否选中状态
            console.log(obj.data); //选中行的相关数据
            console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
            if (obj.data.taskWeek < 10) {
                layer.msg("时间未到")
                obj.checked = !obj.checked;
            }
        });
    }
});

function setCategory(index) {
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

    myChart.on('click', function (params) {
        console.log(params)
        console.log(params.data)
        console.log(params.name)
    });
}

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
        table.render(param_task_existed(checked_tab_id))
        setCategory(data.index)
    });

    var param_task_existed = function (res0) {
        return {
            elem: '#task_table_' + res0
            , url: "../../json/task_table.json"
            , title: '项目列表'
            , toolbar: "#toolbar_task"
            , contentType: 'application/json'
            , method: "POST"
            , height: 550
            , where: {
                "reqId": ""
                , "reqParam": ""
            }
            , deal: function (res) {
                return {
                    code: 0
                    , msg: ""
                    , count: 1000
                    , data: res.resData
                }
            }
            , cols: [[
                { type: 'checkbox' }
                , { field: 'id', title: 'ID', hide: true , edit:'text'}
                , { field: 'name', title: '名称', edit: 'text'}
                , { field: 'week', title: '周数', hide: true, sort: true, edit: 'text'}
                , { field: 'content', title: '概述', hide: true, edit: 'text'}
                , { field: 'amount', title: '任务量', sort: true, edit: 'text'}
                , { field: 'priority', title: '优先级', sort: true, edit: 'text'}
                , { field: 'finishTime', title: '完成时间', sort: true, edit: 'text'}
            ]]
            , done: function (res) {
                console.log(res.data);
            }
        }
    }

    console.log(task_res)

    //监听复选框选中
    table.on('checkbox(test)', function (obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one

    });

    //头工具栏事件
    table.on('toolbar(task_table_0)', function (obj) {
        switch (obj.event) {
            case 'addTask':
                console.log("add task")
                layer.open({
                    title: '添加任务',
                    type: 2,
                    area: ["500px", "500px"],
                    content: AddTaskURL,
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
        };
    });

    //编辑单元格
    table.on('edit(task_table_0)', function (obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        console.log(obj.value); //得到修改后的值
        console.log(obj.field); //当前编辑的字段名
        console.log(obj.data); //所在行的所有相关数据  
    });

    document.getElementById("first").click();
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

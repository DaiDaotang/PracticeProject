// JavaScript source code
var max = 3
    , checked_tab_id = 0
    , task_res = [];

layui.use(['element', 'jquery', 'table'], function () {
    var $ = layui.jquery
        , table = layui.table
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //添加周数
    for (var i = 0; i < max; i++) {
        element.tabAdd('tabTeamProcess', {
            title: '第' + (i + 1) + '周' //用于演示
            , content: '<div class="layui-tab-item layui-show">你可以监听tab事件（阅读下文档就是了）</div>'
            , id: (i + 1) //实际使用一般是规定好的id，这里以时间戳模拟下
        })
    }

    //触发事件
    var active = {
        tabAddOneWeek: function () {
            //新增一个Tab项
            element.tabAdd('tabTeamProcess', {
                title: '第' + 1 + '周' //用于演示
                , content: '内容'
                , id: new Date().getSeconds //实际使用一般是规定好的id，这里以时间戳模拟下
            })

        }
        , tabDeleteThisWeek: function (othis) {
            element.tabDelete('tabTeamProcess', checked_tab_id); //删除被选中一栏
            //othis.addClass('layui-btn-disabled');
            console.log(checked_tab_id)
        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    element.on('tab(tabTeamProcess)', function (data) {
        //console.log(this); //当前Tab标题所在的原始DOM元素
        //console.log(data.index); //得到当前Tab的所在下标
        //console.log(data.elem); //得到当前的Tab大容器

        console.log($(".layui-tab-title .layui-this").attr("lay-id"));

        checked_tab_id = data.index;
    });

    var param_task_existed = function (res) {
        return {
            elem: '#task_table'
            , url: "../../json/task_table.json"
            , title: '项目列表'
            , toolbar: "#toolbar_item"
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
                , { field: 'id', title: 'ID', hide: true }
                , { field: 'name', title: '名称' }
                , { field: 'week', title: '周数', hide: true, sort: true }
                , { field: 'content', title: '概述', hide: true }
                , { field: 'amount',title: '任务量',sort: true }
                , { field: 'priority',title: '优先级', sort: true }
            ]]
            , done: function (res) {
                console.log(res.data);
            }
        }
    }

    console.log(task_res)

    table.render(param_task_existed(1))

    //监听复选框选中
    table.on('checkbox(test)', function (obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one


    });
});

var dom = document.getElementById("task_container");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
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
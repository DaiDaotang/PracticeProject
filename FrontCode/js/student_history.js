var total = document.documentElement.clientHeight;
var colHeight = total;
document.getElementById("div_whole").style.height = colHeight + "px";

var target_id = t_param[`target_id`];

layui.use(['jquery', 'layer', 'table'], function () {
    var $ = layui.jquery
        , layer = layui.layer
        , table = layui.table;

    var target_item_id = -1
        , targe_pt_id = -1
        , target_team_id = -1;

    var param_history = function (res) {
        return {
            elem: '#history_pt_table'
            , url: GetHistoryPTURL
            , title: '历史实训'
            , tool: true
            , contentType: 'application/json'
            , method: "POST"
            , where: {
                "reqId": "",
                "reqParam": target_id
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
                { type: 'numbers' }
                , { field: 'practiceId', title: '实训ID', hide: true }
                , { field: 'practiceName', title: '实训名称' }
                , { field: 'projectName', title: '项目名称' }
                , { field: 'teamId', title: '团队ID', hide: true }
                , { field: 'teamName', title: '团队名称' }
                , { field: 'teamScores', title: '团队分数', sort: true }
                , { field: 'studentScores', title: '个人分数', sort: true }
                , { fixed: 'right', title: '操作', toolbar: '#bar_detail', width: 60 }
            ]]
            , done: function (res) {
            }
        }
    }

    table.render(param_history(1))

    //监听行双击事件
    table.on('rowDouble(history_pt_table)', function (obj) {
        var extra_url = "&target_team_id=" + obj.data.teamId + "&target_pt_id=" + obj.data.practiceId;
        window.open(GroupURL + basic_extra_url + extra_url);
    });

    //监听工作条
    table.on('tool(history_pt_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'detail') { //查看
            var extra_url = "&target_team_id=" + obj.data.teamId + "&target_pt_id=" + obj.data.practiceId + "&history=yes";
            window.open(GroupURL + basic_extra_url + extra_url);
        }
    });

});
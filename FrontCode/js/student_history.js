var target_id = t_param[`target_id`];

layui.use(['jquery', 'layer', 'table'], function () {
    var $ = layui.jquery
        , layer = layui.layer
        , table = layui.table;

    var param_history = function (res) {
        return {
            elem: '#history_pt_table'
            , url: GetHistoryPTURL
            , title: '历史实训'
            , tool: true
            , contentType: 'application/json'
            , method: "POST"
            , width: 700
            , where: {
                "reqId": "",
                "reqParam": target_id
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
                { type: 'numbers' }
                , { field: 'id', width: 75, title: 'ID', hide: true }
                , { field: 'name', width: 120, title: '名称' }
                , { field: 'sex', width: 100, title: '性别' }
                , {
                    field: 'projectInCharge', title: '负责项目', templet: function (d) {
                        return '<div id="projectInCharge_' + d.id + '"></div>'
                    }, event: 'lookProjectInChargeDetail'
                }
                , { fixed: 'right', title: '操作', toolbar: '#bar_teacher_detail_delete', width: 65 }
            ]]
            , done: function (res) {
            }
        }
    }

    table.render(param_history(1))

    //监听行双击事件
    table.on('rowDouble(task_table_' + index + ')', function (obj) {
        var extra_url = "&target_team_id=" + target_group_id + "&target_pt_id=" + target_pt_id;
        window.open(GroupURL + basic_extra_url + extra_url);
    });
});
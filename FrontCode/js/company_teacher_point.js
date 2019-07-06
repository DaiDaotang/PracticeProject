//变量
var user_id = t_param[`user_id`]
    , user_authority = t_param[`user_authority`]
    , pt_id = t_param[`pt_id`]
    , item_id = t_param[`item_id`];

//区
layui.use(['form', 'jquery', 'laydate', 'table', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , laydate = layui.laydate
        , table = layui.table
        , layer = layui.layer;

    $.ajax({
        type: "POST",
        url: GetTeamInProjectURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": {
                "projectId": 33
            }
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.resData.length > 0) {
                for (var i = 0; i < res.resData.length; i++) {

                }
            } else {
                layer.msg("暂无队伍");
            }
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
});

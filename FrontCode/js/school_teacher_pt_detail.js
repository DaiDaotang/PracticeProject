var target_pt_id = t_param[`target_pt_id`]
    , last_item_id = ""
    , target_item_id = -1;

target_pt_id = 20;

layui.use(['form', 'jquery', 'layer', 'table'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer
        , table = layui.table;

    $.ajax({
        type: "POST",
        url: GetItemListURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": target_pt_id
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            var temp = "";
            for (var i = 0; i < res.resData.length; i++) {
                console.log(res.resData[i].id)
                temp += `
                            <dd>
                                <a id="a_item_` + res.resData[i].id + `">
                                    <input type='button' onclick='change_item(this)' id="item_` + res.resData[i].id + `" style="cursor:pointer;font-size:16px; background:none;border:none; color:#d4dadb; text-align: left; width:190px; padding-top:7px;" value="` + res.resData[i].name + `" />
                                </a>
                            </dd>`;
            }
            document.getElementById("item_dl").innerHTML = temp;
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
});

function change_item(obj) {
    console.log(obj.id)
    if (last_item_id != "" && document.getElementById(last_item_id).classList) {
        document.getElementById(last_item_id).classList.remove("layui-this")
    }
    document.getElementById("a_" + obj.id).classList.add("layui-this");
    last_item_id = "a_" + obj.id;

    target_item_id = obj.id.split("_")[1]

    layui.use(['table', 'jquery'], function () {
        var table = layui.table
            , $ = layui.jquery;

        var param_group = function (res) {
            return {
                elem: '#team_table'
                , url: GetTeamInProjectURL
                , title: '队伍列表'
                , contentType: 'application/json'
                , method: "POST"
                , where: {
                    "reqId": ""
                    , "reqParam": {
                        "projectId": target_item_id
                    }
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
                    , { field: 'teamId', title: '团队ID', hide: true}
                    , { field: 'teamName',  title: '团队名称' }
                    , { field: 'teamScores', title: '团队成绩' }
                    , { fixed: 'right', title: '操作', toolbar: '#bar_detail', width: 65 }
                ]]
            }
        }

        table.render(param_group(1))

        table.on('tool(team_table)', function (obj) {
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象

            var target_team_id = obj.data.teamId;

            if (layEvent === 'detail') { //删除
                var extra_url = "&target_team_id=" + target_team_id + "&target_pt_id=" + target_pt_id;
                window.open(GroupURL + basic_extra_url + extra_url);
            }
        })
    });
}

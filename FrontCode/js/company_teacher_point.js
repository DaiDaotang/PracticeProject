//变量
var user_id = t_param[`user_id`]
    , user_authority = t_param[`user_authority`]
    , pt_id = t_param[`pt_id`]
    , item_id = t_param[`item_id`];

var all_team_id = [];

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
            var str1 = ''
                , str2 = '';
            if (res.resData.length > 0) {
                for (var i = 0; i < res.resData.length; i++) {
                    all_team_id.push(parseInt(res.resData[i].teamId));
                    if (i == 0) {
                        str1 += '<li class="layui-this">' + res.resData[i].teamName + '</li>'
                        str2 += '<div class="layui-tab-item layui-show">'
                    }
                    else {
                        str1 += '<li>' + res.resData[i].teamName + '</li>'
                        str2 += '<div class="layui-tab-item">'
                    }
                    str2 += `<form class="layui-form" action="" lay-filter="team_score_form">`
                    str2 += '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px; margin-bottom: 10px;"><legend style="font-size:32px;">团队</legend></fieldset>'
                    str2 += `<div class="layui-row" style="height:100px;">
                            <div class="layui-col-md6" style="height:100px;">
                                <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                    <div class="layui-form-item" style="margin: 0 auto 15px auto; position:relative; right: 50px;">
                                        <label class="layui-form-label">团队名称</label>
                                        <div class="layui-input-block">
                                            <input type="text" name="team_name" lay-filter="team_name" disabled id="team_name" autocomplete="off" placeholder="请输入团队名" class="layui-input" style="width:270px;" value=` + res.resData[i].teamName + `>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md6" style="height:100px;">
                                <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                    <div class="layui-form-item" style="margin: 0 auto 15px auto; position:relative; right: 50px;">
                                        <label class="layui-form-label">得分</label>
                                        <div class="layui-input-block">
                                            <input type="text" name="team_score" lay-filter="team_score" required lay-verify="required" id="team_score" autocomplete="off" placeholder="请输入分数" class="layui-input" style="width:270px;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
`
                    str2 += '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px; margin-bottom: 10px;"><legend style="font-size:32px;">队员</legend></fieldset>'
                    str2 += `<div class="layui-form-item" style="text-align:center;"><button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="upload" id="upload" style="font-size:26px; border-radius: 20px; margin-top:50px; margin-bottom:50px;">Done!</button></div></form>`
                    str2 += '</div>';
                }

                document.getElementById("team_tab").innerHTML += str1;
                document.getElementById("team_tab_content").innerHTML += str2;
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

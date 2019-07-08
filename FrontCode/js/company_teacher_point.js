//变量
var user_id = t_param[`user_id`]
    , user_authority = t_param[`user_authority`]
    , target_item_id = t_param[`target_item_id`]
    , target_pt_id = t_param[`target_pt_id`];

var all_team_id = []
    , all_team_member_id = [];

//当前选中的队伍的序号
var checked_team_index = 0;

//区
layui.use(['element', 'form', 'jquery', 'laydate', 'table', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , element = layui.element
        , laydate = layui.laydate
        , table = layui.table
        , layer = layui.layer;

    //获取所有团队的ID和名称
    $.ajax({
        type: "POST",
        url: GetTeamInProjectURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": {
                "projectId": target_item_id
            }
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.resData.length > 0) {
                for (var i = 0; i < res.resData.length; i++) {
                    var str1 = ''
                        , str2 = '';
                    all_team_id.push(parseInt(res.resData[i].teamId));
                    all_team_member_id.push([]);
                    if (i == 0) {
                        str1 += '<li class="layui-this" id="first">' + res.resData[i].teamName + '</li>'
                        str2 += '<div class="layui-tab-item layui-show">'
                    }
                    else {
                        str1 += '<li>' + res.resData[i].teamName + '</li>'
                        str2 += '<div class="layui-tab-item">'
                    }
                    str2 += `
                        <form class="layui-form" action="" lay-filter="team_score_form" id="team_score_form_` + i + `>
                            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px; margin-bottom: 10px;"><legend style="font-size:32px;">团队</legend></fieldset>
                                <div class="layui-row" style="height:100px;">
                                    <div class="layui-col-md4" style="height:100px;">
                                        <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                            <div class="layui-form-item" style="margin: 0 auto 15px auto; position:relative; right: 50px;">
                                                <label class="layui-form-label">团队名称</label>
                                                <div class="layui-input-block">
                                                    <input type="text" name="team_name" lay-filter="team_name" disabled id="team_name" autocomplete="off" placeholder="请输入团队名" class="layui-input" style="width:270px;" value=` + res.resData[i].teamName + `>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="layui-col-md4" style="height:100px;">
                                        <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                            <div class="layui-form-item" style="margin: 0 auto 15px auto; position:relative; right: 50px;">
                                                <label class="layui-form-label">得分</label>
                                                <div class="layui-input-block">
                                                    <input type="text" name="team_score" lay-filter="team_score" required lay-verify="required" id="team_score" autocomplete="off" placeholder="请输入分数" class="layui-input" style="width:270px;" value=` + (res.resData[i].teamScores == 0 ? "" : res.resData[i].teamScores) + `>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="layui-col-md2" style="height:100px;">
                                        <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                            <div class="layui-form-item" style="margin: 0 auto 15px auto;">
                                                <span style="font-size:24px;"><a href="../Team/homepage_team.html?user_id=` + user_id + `&user_authority=` + user_authority + `&target_id=` + target_id + `&target_authority=` + target_authority + `&target_team_id=` + all_team_id[i] + `&target_item_id=` + target_item_id + `&target_pt_id=` + target_pt_id + `" target="_blank">
                                                    主页→
                                                </a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px; margin-bottom: 10px;">
                                    <legend style="font-size:32px;">队员</legend>
                                </fieldset>
                                <div id="team_tab_member_` + i + `"></div>
                                <div class="layui-form-item" style="text-align:center;">
                                    <button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="upload" id="upload" style="font-size:26px; border-radius: 20px; margin-top:50px; margin-bottom:50px;">Done!</button>
                                </div>
                            </form>
                        </div>`;
                    document.getElementById("team_tab").innerHTML += str1;
                    document.getElementById("team_tab_content").innerHTML += str2;
                    document.getElementById("first").click();
                }
            }
            else {
                layer.msg("暂无队伍");
            }
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });

    //监听点击选项卡
    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });
    element.on('tab(score_form)', function (data) {
        initialMemberTag(data.index);
        checked_team_index = data.index;
    });

    //监听提交
    form.on('submit(upload)', function (data) {
        if (data.field.team_score != "") {
            $.ajax({
                type: "POST",
                url: ScoreForTeamURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": {
                        "teamScores": data.field.team_score,
                        "teamId": all_team_id[checked_team_index]
                    }
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    for (var i = 0; i < all_team_member_id[checked_team_index].length; i++) {
                        var member_score = "data.field.member_score_" + i;
                        $.ajax({
                            type: "POST",
                            url: ScoreForStudentURL,
                            async: true,
                            data: JSON.stringify({
                                "reqId": "",
                                "reqParam": {
                                    "studentScores": eval(member_score),
                                    "teamId": all_team_id[checked_team_index],
                                    "studentId": all_team_member_id[checked_team_index][i]

                                }
                            }),
                            dataType: "json",
                            success: function (res) {
                                console.log(res);
                                if (res.isSuccess) {
                                    layer.msg("打分成功！")
                                }
                            }
                        });
                    }
                }
            });
        }
        else {
            layer.msg('请注意打分')
        }
        return false;
    })

    //初始化队伍打分项目
    function initialMemberTag(index) {
        $.ajax({
            type: "POST",
            url: GetTeamMemberListURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": all_team_id[index]
            }),
            dataType: "json",
            success: function (res) {
                console.log(res);
                var member_id = [];
                var str = ""
                for (var j = 0; j < res.resData.students.length; j++) {
                    member_id.push(res.resData.students[j].id);
                    str += `
                        <div class="layui-row" style="height:100px;">
                            <div class="layui-col-md4" style="height:60px;">
                                <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                    <div class="layui-form-item" style="margin: 0 auto 15px auto; position:relative; right: 50px;">
                                        <label class="layui-form-label">名称</label>
                                        <div class="layui-input-block">
                                            <input type="text" disabled name="member_name_` + j + `" lay-filter="member_name_` + j + `" required lay-verify="required" id="member_name_` + j + `" autocomplete="off" class="layui-input" style="width:270px;" value=` + res.resData.students[j].name + `>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4" style="height:60px;">
                                <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                    <div class="layui-form-item" style="margin: 0 auto 15px auto; position:relative; right: 50px;">
                                        <label class="layui-form-label">学号</label>
                                        <div class="layui-input-block">
                                            <input type="text" disabled name="member_number_` + j + `" lay-filter="member_number_` + j + `" required lay-verify="required" id="member_number_` + j + `" autocomplete="off" class="layui-input" style="width:270px;" value=` + res.resData.students[j].number + `>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4" style="height:60px;">
                                <div class="grid-demo grid-demo-bg1" style="height:auto; margin: 20px 0 20px 20px;">
                                    <div class="layui-form-item" style="margin: 0 auto 15px auto; position:relative; right: 50px;">
                                        <label class="layui-form-label">得分</label>
                                        <div class="layui-input-block">
                                            <input type="text" name="member_score_` + j + `" lay-filter="member_score_` + j + `" required lay-verify="required" id="member_score_` + j + `" autocomplete="off" placeholder="请输入分数" class="layui-input" style="width:270px;" value=` + (res.resData.students[j].score != 0 ? res.resData.students[j].score : "") + `>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }
                all_team_member_id.splice(index, 1, member_id);
                document.getElementById("team_tab_member_" + index).innerHTML = str;
            },
            error: function (res) {
                console.log("error");
                console.log(res);
            }
        });
    }
});
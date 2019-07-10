var total = document.documentElement.clientHeight;
var colHeight = total;
document.getElementById("body_whole").style.height = colHeight + "px";

var target_item_id = t_param[`target_item_id`]
    , target_pt_id = t_param[`target_pt_id`];

var checked_week = -1
    , checked_student_id = -1
    , checked_studetn_diary_id = -1
    , checked_student_sort = "";

var last_team_id = "";

function change_week(obj) {
    checked_week = obj.id.split("_")[1]
    layui.use('jquery', function () {
        var $ = layui.jquery;
        var t1 = false, t2 = false;
        //刷新左导航
        $.ajax({
            type: "POST",
            url: GetStudentInItemURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "projectId": target_item_id,
                    "week": checked_week,
                    "isReviewed": false
                }
            }),
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.isSuccess) {
                    var temp = "";
                    for (var i = 0; i < res.resData.length; i++) {
                        temp += `
                            <dd>
                                <a id="a_nr_` + res.resData[i].id + `">
                                    <input type='button' onclick='change_diary(this)' id="nr_` + res.resData[i].id + `" style="font-size:16px; background:none;border:none; color:#d4dadb; text-align: left; width:190px; padding-top:7px;" value="` + res.resData[i].name + `" />
                                </a>
                            </dd>`
                    }
                    document.getElementById("not_reviewed_dl").innerHTML = temp;
                } 
                else {
                    checked_studetn_diary_id = -1;
                    document.getElementById("student_diary_title").innerText = '';
                    document.getElementById("student_diary_week").innerText = '';
                    document.getElementById("student_diary_time").innerText = '';
                    document.getElementById("student_diary_content").innerText = '';
                    document.getElementById("score").value = '';
                    document.getElementById("content").innerText = '';
                    document.getElementById("not_reviewed_dl").innerHTML = "";
                }
                t1 = true;
            },
            error: function (res) {
                console.log("error");
                console.log(res);
            }
        });
        $.ajax({
            type: "POST",
            url: GetStudentInItemURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "projectId": target_item_id,
                    "week": checked_week,
                    "isReviewed": true
                }
            }),
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.isSuccess) {
                    var temp = "";
                    for (var i = 0; i < res.resData.length; i++) {
                        temp += `
                            <dd>
                                <a id="a_r_` + res.resData[i].id + `">
                                    <input type='button' onclick='change_diary(this)' id="r_` + res.resData[i].id + `" style="font-size:16px; background:none;border:none; color:#d4dadb; text-align: left; width:190px; padding-top:7px;" value="` + res.resData[i].name + `" />
                                </a>
                            </dd>`
                    }
                    document.getElementById("reviewed_dl").innerHTML = temp;
                }
                else {
                    checked_studetn_diary_id = -1;
                    document.getElementById("student_diary_title").innerText = '';
                    document.getElementById("student_diary_week").innerText = '';
                    document.getElementById("student_diary_time").innerText = '';
                    document.getElementById("student_diary_content").innerText = '';
                    document.getElementById("score").value = '';
                    document.getElementById("content").innerText = '';
                    document.getElementById("reviewed_dl").innerHTML = ""
                }
                t2 = true;
            },
            error: function (res) {
                layer.msg("暂无学生")
                console.log("error");
                console.log(res);
            }
        });

        while (t1 || t2);
        layer.msg("加载学生名单成功", { time: 750 })
    });
}

function change_diary(obj) {
    console.log(obj.id)
    if (last_team_id != "" && document.getElementById(last_team_id).classList) {
        document.getElementById(last_team_id).classList.remove("layui-this")
    }
    document.getElementById("a_" + obj.id).classList.add("layui-this");
    console.log(document.getElementById(obj.id).classList)
    last_team_id = "a_" + obj.id;
    checked_student_sort = obj.id.split("_")[0];
    checked_student_id = obj.id.split("_")[1];
    layui.use('jquery', function () {
        var $ = layui.jquery;

        //刷新左导航
        $.ajax({
            type: "POST",
            url: GetStudentDiaryByPTandWeekURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "studentId": checked_student_id,
                    "projectId": target_item_id,
                    "week": checked_week
                }
            }),
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.isSuccess) {
                    var temp = res.resData[res.resData.length - 1]
                    checked_studetn_diary_id = temp.Id;
                    document.getElementById("student_diary_title").innerText = temp.title;
                    document.getElementById("student_diary_week").innerText = "第" + (temp.week + 1) + "周";
                    document.getElementById("student_diary_time").innerText = temp.date;
                    document.getElementById("student_diary_content").innerText = temp.content;
                    if (checked_student_sort == "r") {
                        document.getElementById("score").value = temp.score;
                        document.getElementById("content").innerText = temp.comment;
                    }
                } else {
                    layer.msg("暂未提交", { time: 750 })
                    checked_studetn_diary_id = -1;
                    document.getElementById("student_diary_title").innerText = '';
                    document.getElementById("student_diary_week").innerText = '';
                    document.getElementById("student_diary_time").innerText = '';
                    document.getElementById("student_diary_content").innerText = '';
                    document.getElementById("score").value = '';
                    document.getElementById("content").innerText = '';
                }
            },
            error: function (res) {
                console.log("error");
                console.log(res);
            }
        });
    });
}

layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    form.on('submit(upload)', function (data) {
        console.log(data.field);
        if (checked_student_id == -1 || checked_week == -1 || checked_studetn_diary_id == -1) {
            layer.msg('请选择周数、学生')
            return false;
        }
        $.ajax({
            type: "POST",
            url: CompanyTeacherReviewDiaryURL,
            async: true,
            data: JSON.stringify({
                "reqId": "",
                "reqParam": {
                    "Id": checked_studetn_diary_id,
                    "score": data.field.score,
                    "comment": data.field.content
                }
            }),
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.isSuccess) {
                    layer.msg("批阅成功！", { time: 750 })
                    document.getElementById("week_" + checked_week).click();
                    setTimeout(function restore() {
                        checked_studetn_diary_id = -1;
                        document.getElementById("student_diary_title").innerText = '';
                        document.getElementById("student_diary_week").innerText = '';
                        document.getElementById("student_diary_time").innerText = '';
                        document.getElementById("student_diary_content").innerText = '';
                        document.getElementById("score").value = '';
                        document.getElementById("content").innerText = '';
                    }, 750)
                }
            },
            error: function (res) {
                console.log("error");
                console.log(res);
            }
        });
        return false;
    });

    $.ajax({
        type: "POST",
        url: GetPTWeekURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": target_pt_id
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            week = res.resData.week;
            var temp = "";
            for (var i = 1; i <= week; i++) {
                temp += `
                            <dd>
                                <a>
                                    <input type='button' onclick='change_week(this)' id="week_` + i + `" style="font-size:16px; background:none;border:none; color:#d4dadb; text-align: left; width:190px; padding-top:7px;" value="第` + i + `周" />
                                </a>
                            </dd>`;
            }
            document.getElementById("week_dl").innerHTML = temp;
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });
});
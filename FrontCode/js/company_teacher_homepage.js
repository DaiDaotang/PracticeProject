// JavaScript source code
var target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_company_id = -1
    , target_company_name = ""
    , target_pt_id = []
    , target_pt_name = []
    , temp_code = "";

//form区 + 大区
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //获取信息
    $.ajax({
        type: "POST",
        url: GetCompanyTeacherInfoURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": target_id
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            target_name = res.resData.name
                , target_gender = res.resData.sex
                , target_company_id = res.resData.company
                , target_company_name = res.resData.companyName
                , target_hd_img = res.resData.head ? res.resData.head : "";
            document.getElementById("target_hd_img").src = (target_hd_img == "" ? "../../img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_hd_img").style.border = "1px solid #6e7474";

            document.getElementById("username").innerText = target_name;
            document.getElementById("gender").innerHTML = (target_gender == "男") ? '<i class="layui-icon layui-icon-male" style="height:100px; color: #1E9FFF; font-size:40px; margin-left: 20px;"></i>' : '<i class="layui-icon layui-icon-female" style="height:100px; color: #fd5087; font-size:40px; margin-left: 20px;"></i>'

            //监听写日志
            $(document).on('click', '#write_diary_btn', function () {
                layer.open({
                    title: '日志',
                    type: 2,
                    area: ["500px", "500px"],
                    content: CompanyTeacherWriteDiaryURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&user_item_id=" + target_item_id + "&user_team_id=" + target_team_id,
                    end: function () {

                    },
                    btn: '发布',
                    btnAlign: 'c',
                    yes: function () {
                        var diary_name = window.localStorage.diary_name
                            , diary_time = window.localStorage.diary_time
                            , diary_content = window.localStorage.diary_content;

                        $.ajax({
                            type: "POST",
                            url: UploadDiaryURL,
                            async: true,
                            data: JSON.stringify({
                                "reqId": "",
                                "reqParam": {
                                    "teamId": target_team_id,
                                    "authority": "Team",
                                    "date": diary_time,
                                    "title": diary_name,
                                    "content": diary_content
                                }
                            }),
                            dataType: "json",
                            success: function (res) {
                                console.log(res)
                                if (res.isSuccess) {
                                    layer.msg("发布成功！", { time: 1000 })
                                    setTimeout("layer.closeAll()", 500)
                                    setTimeout("location.reload()", 500)
                                }
                            },
                            error: function (res) {
                                console.log("error");
                                console.log(res);
                            }
                        });
                    }
                });
            });

            //获取公司名称
            $.ajax({
                type: "POST",
                url: GetCompanyNameURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": target_company_id
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    target_company_name = res.resData.name;
                    document.getElementById("company_name").innerText = target_company_name;
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });

            //获取负责的实训ID
            $.ajax({
                type: "POST",
                url: GetPTInChargeURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": target_id
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    for (var i = 0; i < res.resData.length; i++) {
                        target_pt_id.push(res.resData[i].id);
                        target_pt_name.push(res.resData[i].name);
                    }
                    temp_code = addItemInCharge(0, temp_code)
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });

            //添加负责项目栏
            function addItemInCharge(index, temp) {
                $.ajax({
                    type: "POST",
                    url: GetItemInChargeURL,
                    async: true,
                    data: JSON.stringify({
                        "reqId": "",
                        "reqParam": {
                            "id": target_id,
                            "practice": target_pt_id[index],
                            "canModify": true
                        }
                    }),
                    dataType: "json",
                    success: function (res) {
                        console.log(res);

                        for (var i = 0; i < res.resData.length; i++) {
                            temp += `
                                <li>
                                    <div style="height:auto; margin: 20px 0 20px 20px;">
                                        <i class="layui-icon layui-icon-form" style="height:100px; color: #1E9FFF; font-size:24px; margin-right: 20px;"></i>
                                        <a id="group_a" href="company_teacher_point.html?user_id=` + user_id + `&user_authority=` + user_authority + `&target_id=` + target_id + `&target_authority=` + target_authority + `&target_item_id=` + res.resData[i].id + `&target_pt_id=` + target_pt_id[index] + `" target="_blank" title="项目名称">
                                            <span style="font-size: 24px;" id="pt_item_name_now">` + res.resData[i].name + `</span>
                                        </a>
                                    </div>
                                </li>`;
                        }

                        index += 1;
                        if (index >= target_pt_id.length) {
                            document.getElementById("pt_item_in_charge_now").innerHTML = temp;
                            return false;
                        }
                        temp = addItemInCharge(index, temp);
                        return temp;
                    },
                    error: function (res) {
                        console.log("error");
                        console.log(res);
                    }
                });

            }
        },
        error: function (res) {
            console.log("获取用户基本W信息失败");
        }
    });
});
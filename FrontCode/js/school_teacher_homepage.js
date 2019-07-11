// JavaScript source code
//�� 
var target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_school_id = -1
    , target_school_name = "";

layui.use(['layer', 'jquery', 'form'], function () {
    var layer = layui.layer
        , $ = layui.jquery
        , form = layui.form;

    $.ajax({
        type: "POST",
        url: GetSchoolTeacherInfoURL,
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
                , target_hd_img = res.resData.head ? GetHeadImgURL + target_hd_img : "../../img/defaultHead.jpg"
                , target_school_id = res.resData.school
                , target_school_name = res.resData.schoolName;

            document.getElementById("username").innerText = target_name;
            document.getElementById("gender").innerHTML = (target_gender == "��") ? '<i class="layui-icon layui-icon-male" style="height:100px; color: #1E9FFF; font-size:40px; margin-left: 20px;"></i>' : '<i class="layui-icon layui-icon-female" style="height:100px; color: #fd5087; font-size:40px; margin-left: 20px;"></i>'
            document.getElementById("school_name").innerText = target_school_name;
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });

    //�����ö�
    $(document).on('click', '#turntop', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    //��ȡ�����ʵѵID����
    $.ajax({
        type: "POST",
        url: GetPTInChargeURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": ""
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            var temp = "";
            for (var i = 0; i < res.resData.length; i++) {
                temp += `
                                <li>
                                    <div class="layui-row" style="height:100px;  font-size:24px; margin-right: 20px;">
                                        <div class="layui-col-md10">
                                            <div class="grid-demo grid-demo-bg1">
                                                <div style="height:auto; margin: 20px 0 20px 20px;">
                                                    <i class="layui-icon layui-icon-form" style="font-size:26px;color: #1E9FFF;"></i>
                                                    <span style="font-size: 26px; color= #000">` + res.resData[i].name + `</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="layui-col-md2">
                                            <div class="grid-demo" style="height:auto; margin: 20px 0 20px 20px;">
                                                <input type='button' class="layui-btn layui-btn-normal" onclick='check_detail(this)' id="check_detail_` + target_pt_id[index] + `_` + res.resData[i].id + `" id="check_detail_` + target_pt_id[index] + `_` + res.resData[i].idi + `" style="font-size:20px;" value="ʵѵ����"/>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;

            }
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });

    //�����ť�����¼�
    function score_team(obj) {
        console.log(obj.id)
        var strs = obj.id.split("_");
        var extra_url = "&target_item_id=" + strs[3] + "&target_pt_id=" + strs[2];
        window.open(CompanyTeacherScoreURL + basic_extra_url + extra_url)
    }
})

//laydate��
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //ִ��һ��laydateʵ��
    laydate.render({
        elem: '#search_diary_data'
    });
});

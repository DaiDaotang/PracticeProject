// JavaScript source code
//�� 
var CreateNewPTURL = "school_teacher_publish_pt.html"
    , SchoolPTListURL = "school_pt_list.html"
    , ModifyPTURL = "school_teacher_modify_pt.html"
    , HomepageURL = "homepage_school_teacher.html"
    , GetSchoolTeacherInfoURL = "http://localhost:8080/GetSchoolTeacherInformationServlet";

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
                , target_hd_img = res.resData.head ? res.resData.head : ""
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

})

//form�� + ����
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //����ʼ��ֵ
    form.val('diary_form', {
        "search_diary_input": ""
        , "search_diary_data": ""
    })

    //��������
    form.on('submit(search_diary_btn)', function (data) {
        console.log(data.field);
        //layer.msg(JSON.stringify(data.field));
        return false;
    });

    //�����ö�
    $(document).on('click', '#turntop', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

});

//laydate��
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //ִ��һ��laydateʵ��
    laydate.render({
        elem: '#search_diary_data'
    });
});

//flow��
layui.use('flow', function () {
    var flow = layui.flow
        , $ = layui.jquery;

    flow.load({
        elem: '#diary_flow' //����������
        , done: function (page, next) { //ִ����һҳ�Ļص�

            //ģ�����ݲ���
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 8; i++) {
                    lis.push('<li><div style="width:auto; height: 200px; margin: 20px; background-color:#d4dadb; border-radius: 20px;"><p>' + ((page - 1) * 8 + i + 1) + '</p></div></li>')
                }

                //ִ����һҳ��Ⱦ���ڶ�����Ϊ�����㡰���ظ��ࡱ�����������������з�ҳ
                //pagesΪAjax���ص���ҳ����ֻ�е�ǰҳС����ҳ��������£��Ż�������ּ��ظ���
                next(lis.join(''), page < 10); //������ҳ��Ϊ 10
            }, 300);
        }
    });
});


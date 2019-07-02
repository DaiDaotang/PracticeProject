//// JavaScript source code
var GetCompanyTeacherInfoURL = "http://localhost:8080/GetCompanyTeacherInformationServlet"
    , GetCompanyNameURL = "http://localhost:8080/GetCompanyInformationServlet"
    , ProjectInChargeURL = "company_teacher_project_in_charge.html"
    , CreateNewPTURL = "company_teacher_publish_pt.html"
    , ModifyPTURL = "company_teacher_modify_pt.html"
    , HomepageURL = "homepage_company_teacher.html"
    , CompanyPTListURL = "company_pt_list.html";

//����
var target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_company_id = -1
    , target_company_name = "";

//���Ա���
var test_style = "1px solid #000";

//form�� + ����
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

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

    //��ȡ��Ϣ
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
            target_company_id = res.resData.company;
            document.getElementById("target_homepage").href = HomepageURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`];
            document.getElementById("target_company_pt_doing").href = CompanyPTListURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&temp=doing" + "&target_company_id=" + target_company_id;
            document.getElementById("target_company_pt_done").href = CompanyPTListURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&temp=done" + "&target_company_id=" + target_company_id;
            document.getElementById("target_create_pt").href = CreateNewPTURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&user_company_id=" + target_company_id;
            document.getElementById("target_modify_pt").href = ModifyPTURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&user_company_id=" + target_company_id;
            document.getElementById("target_project_in_charge").href = ProjectInChargeURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&user_company_id=" + target_company_id;
        },
        error: function (res) {
            console.log("��ȡ�û�������Ϣʧ��");
        }
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

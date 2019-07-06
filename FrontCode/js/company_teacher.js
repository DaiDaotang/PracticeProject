//// JavaScript source code
//变量
var user_id = parseInt(t_param[`user_id`])
    , user_authority = t_param[`user_authority`]
    , target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_company_id = -1
    , target_company_name = "";

//测试变量
var test_style = "1px solid #000";

//form区 + 大区
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //监听搜索
    form.on('submit(search_diary_btn)', function (data) {
        console.log(data.field);
        return false;
    });

    //监听置顶
    $(document).on('click', '#turntop', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

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
            target_company_id = res.resData.company;
            document.getElementById("target_homepage").href = CompanyTeacherHomepageURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`];
            document.getElementById("target_company_pt").href = CompanyPTListURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] +  "&target_company_id=" + target_company_id;
            document.getElementById("target_create_pt").href = CompanyTeacherCreateNewPTURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&user_company_id=" + target_company_id;
            document.getElementById("target_modify_pt").href = CompanyTeacherModifyPTURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`] + "&user_company_id=" + target_company_id;
        },
        error: function (res) {
            console.log("获取用户基本信息失败");
        }
    });
});

//laydate区
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#search_diary_data'
    });
});

//flow区
layui.use('flow', function () {
    var flow = layui.flow
        , $ = layui.jquery;

    flow.load({
        elem: '#diary_flow' //流加载容器
        , done: function (page, next) { //执行下一页的回调

            //模拟数据插入
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 8; i++) {
                    lis.push('<li><div style="width:auto; height: 200px; margin: 20px; background-color:#d4dadb; border-radius: 20px;"><p>' + ((page - 1) * 8 + i + 1) + '</p></div></li>')
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < 10); //假设总页数为 10
            }, 300);
        }
    });
});

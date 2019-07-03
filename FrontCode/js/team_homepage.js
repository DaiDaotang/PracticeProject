var AddMemberURL = "http://localhost:8080/AddStudentServlet";

var param_member_existed = function (res) {
    return {
        elem: '#team_member_table'
        , url: GetTeamMemberURL
        , title: '队员列表'
        , contentType: 'application/json'
        , toolbar: "#toolbar_item"
        , method: "POST"
        , where: {
            "reqId": ""
            , "reqParam": ""
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
            { field: 'id', title: '实训ID', sort: true }
            , { field: 'name', title: '实训名称' }
            , { field: 'schoolName', title: '主办学校' }
            , {
                field: 'type', title: '承包公司', templet: function (d) {
                    return '<div id="company_' + d.id + '"></div>'
                }
            }
            , { field: 'content', title: '实训概述', event: 'lookIntroDetail' }
            , { field: 'startTime', title: '开始时间' }
            , { field: 'endTime', title: '结束时间', event: 'lookIntroDetail' }
            , { fixed: 'right', title: '操作', toolbar: '#bar_change_delete', width: 120 }
        ]]
        , done: function (res) {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                document.getElementById('company_' + res.data[i].id).innerText = target_company_name;
            }
        }
    }
}

layui.use(['form', 'table', 'layer', 'jquery'], function () {
    var table = layui.table
        , layer = layui.layer
        , form = layui.form
        , $ = layui.jquery;

    $(document).on('click', '#addMember', function () {
        layer.prompt({
            formType: 0,
            value: '',
            title: '请输入电话号',
            area: ['300px', '350px'] //自定义文本域宽高
        }, function (value, index, elem) {
            //alert(value); //得到value
            console.log(target_team_id)
            console.log(value);
            console.log(target_pt_id)
            console.log(target_item_id)
            $.ajax({
                type: "POST",
                url: AddMemberURL,
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": {
                        "teamId": target_team_id,
                        "telephone": value,
                        "practiceId": target_pt_id,
                        "projectId": target_item_id
                    }
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    layer.close(index);
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });
        });
    })

    table.render(param_member_existed(1));
});
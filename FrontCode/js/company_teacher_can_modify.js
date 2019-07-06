// JavaScript source code
var target_name = ""
    , target_gender = ""
    , target_hd_img = ""
    , target_company_id = -1
    , target_company_name = "";

var param_item_existed = function (res0) {
    return {
        elem: '#pt_table'
        , url: GetModifyItemURL
        , title: '项目列表'
        , contentType: 'application/json'
        , toolbar: "#toolbar_item"
        , method: "POST"
        , where: {
            "reqId": ""
            , "reqParam": {
                "id": user_id
                , "canModify": true
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
            { field: 'id', title: '实训ID', sort: true , hide:true}
            , { field: 'name', title: '实训名称' }
            , { field: 'schoolName', title: '主办学校' }
            , {
                field: 'type', title: '承包公司', templet: function (d) {
                    return '<div id="company_' + d.id + '"></div>'
                }
            }
            , { field: 'content', title: '实训概述', event: 'lookIntroDetail' }
            , { field: 'startTime', title: '开始时间' }
            , { field: 'endTime', title: '结束时间'}
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
    , param_item_past = function (res0) {
        return {
            elem: '#pt_table_past'
            , url: GetModifyItemURL
            , title: '项目列表'
            , contentType: 'application/json'
            , toolbar: "#toolbar_item_past"
            , method: "POST"
            , where: {
                "reqId": ""
                , "reqParam": {
                    "id": user_id
                    , "canModify":false
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
                { field: 'id', title: '实训ID', sort: true, hide: true}
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

    //获取信息
    $.ajax({
        type: "POST",
        url: GetCompanyTeacherInfoURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": user_id
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
                    target_company_name = res.resData.name;
                    document.getElementById("company_name").innerText = target_company_name;

                    table.render(param_item_existed(1));
                    table.render(param_item_past(1))
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });
        },
        error: function (res) {
            console.log("获取用户基本信息失败");
        }
    });

    //监听工具条
    table.on('tool(pt_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'del') { //删除
            layer.confirm('真的删除这一实训吗？', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存

                ////向服务端发送删除指令
                $.ajax({
                    type: "POST",
                    url: DeletePTURL,
                    async: true,
                    data: JSON.stringify({
                        "reqId": "",
                        "reqParam": {
                            "id": data.id,
                            "companyTeacherId": user_id
                        }
                    }),
                    dataType: "json",
                    success: function (res) {
                        layer.close(index);
                        table.render(param_item_existed(1));
                    },
                    error: function (res) {
                        console.log("error");
                        console.log(res);
                    }
                });
            });
        }
        else if (layEvent === 'edit') { //编辑
            console.log(data)
            window.location.href = CompanyTeacherModifyPTDetailURL + "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_pt_id=" + parseInt(data.id) + "&target_id=" + target_id + "&target_authority=" + target_authority;
        }
        else if (layEvent === 'lookIntroDetail') {
            layer.open({
                type: 1
                , title: '详情'
                , area: ['500px', '500px']
                , id: 'layerDemo'//防止重复弹出
                , content: '<div style="padding: 20px 20px;"><pre style="font-size:16px; font-family:\'Microsoft YaHei\'">' + data.content + '</pre></div>'
                , btn: '确定'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });
        }
    });
});
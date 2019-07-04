//获取传参
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var t_param = GetRequest();
console.log(t_param)

var pt_id = t_param[`pt_id`]
    , pt_company_id = parseInt(t_param[`pt_company_id`])
    , user_id = parseInt(t_param[`user_id`])
    , item_id = parseInt(t_param[`item_id`])
    , temp_choose = t_param[`temp`];

//参数
var difficulty = 6
    , pt_company_teacher_len = 0
    , pt_company_teacher_id = [];
var GetCompanyTeacherURL = "http://localhost:8080/GetCompanyTeacherByCompanyIdServlet"
    , CreateNewProjectURL = "http://localhost:8080/CreateProjectServlet";
var checked_company_teacher = [];

window.localStorage.new_item_difficulty = 6

//区
layui.use(['form', 'jquery', 'layer', 'rate', 'table'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer
        , rate = layui.rate
        , table = layui.table;

    //评分
    rate.render({
        elem: '#new_item_difficulty'
        , value: 3
        , text: true
        , half: true
        , theme: '#1E9FFF'
        , setText: function (value) { //自定义文本的回调
            var arrs = {
                '0.5': 1
                , '1': 2
                , '1.5': 3
                , '2': 4
                , '2.5': 5
                , '3': 6
                , '3.5': 7
                , '4': 8
                , '4.5': 9
                , '5': 10
            };
            this.span.text(arrs[value] || (value + "星"));
        }
        , choose: function (value) {
            difficulty = value * 2;
            window.localStorage.new_item_difficulty = value * 2;
        }
    })

    function renderStar(id, score) {
        layui.use('rate', function () {
            var rate = layui.rate;

            //渲染
            var ins1 = rate.render({
                elem: '#' + id  //绑定元素
                , length: 5
                , value: score
                , half: true
                //, readonly: true
                , setText: function (value) { //自定义文本的回调
                    var arrs = {
                        '0.5': 1
                        , '1': 2
                        , '1.5': 3
                        , '2': 4
                        , '2.5': 5
                        , '3': 6
                        , '3.5': 7
                        , '4': 8
                        , '4.5': 9
                        , '5': 10
                    };
                    this.span.text(arrs[value] || (value + "星"));
                }
                , choose: function (value) {
                    layer.alert("当前难度:" + value * 2)
                }
            });
        })
    }

    function renderStar_d(id, score) {
        layui.use('rate', function () {
            var rate = layui.rate;

            //渲染
            var ins1 = rate.render({
                elem: '#' + id  //绑定元素
                , length: 5
                , value: score
                , half: true
                , readonly: true
                , setText: function (value) { //自定义文本的回调
                    var arrs = {
                        '0.5': 1
                        , '1': 2
                        , '1.5': 3
                        , '2': 4
                        , '2.5': 5
                        , '3': 6
                        , '3.5': 7
                        , '4': 8
                        , '4.5': 9
                        , '5': 10
                    };
                    this.span.text(arrs[value] || (value + "星"));
                }
                , choose: function (value) {
                    layer.alert("当前难度:" + value * 2)
                }
            });
        })
    }

    if (item_id) {
        console.log("has item_id")
        var GetTeamInfoURL = "http://localhost:8080/GetProjectInformationServlet"
        $.ajax({
            type: "POST",
            url: GetTeamInfoURL,
            async: true,
            data: JSON.stringify({
                "reqId": "111",
                "reqParam": item_id
            }),
            dataType: "json",
            success: function (res) {
                console.log(res);
                document.getElementById("new_item_name").value = res.resData.name;
                document.getElementById("new_item_type").value = res.resData.type;
                document.getElementById("new_item_introduce").value = res.resData.introduce;
                document.getElementById("new_item_base_content").value = res.resData.baseContent;
                document.getElementById("new_item_extend_content").value = res.resData.extendContent ? res.resData.extendContent : "暂无";
                document.getElementById("new_item_advance_content").value = res.resData.advanceContent ? res.resData.advanceContent : "暂无";

                window.localStorage.new_item_name = res.resData.name;
                window.localStorage.new_item_type = res.resData.type;
                window.localStorage.new_item_introduce = res.resData.introduce;
                window.localStorage.new_item_base_content = res.resData.baseContent;
                window.localStorage.new_item_extend_content = res.resData.extendContent ? res.resData.extendContent : "暂无";
                window.localStorage.new_item_advance_content = res.resData.advanceContent ? res.resData.advanceContent : "暂无";
                window.localStorage.new_item_difficulty = res.resData.difficulty;

                if (temp_choose == "edit") {
                    console.log("edit")
                    //评分
                    rate.render({
                        elem: '#new_item_difficulty'
                        , value: res.resData.difficulty / 2
                        , text: true
                        , half: true
                        , theme: '#1E9FFF'
                        , setText: function (value) { //自定义文本的回调
                            var arrs = {
                                '0.5': 1
                                , '1': 2
                                , '1.5': 3
                                , '2': 4
                                , '2.5': 5
                                , '3': 6
                                , '3.5': 7
                                , '4': 8
                                , '4.5': 9
                                , '5': 10
                            };
                            this.span.text(arrs[value] || (value + "星"));
                        }
                        , choose: function (value) {
                            difficulty = value * 2;
                            window.localStorage.new_item_difficulty = value * 2;
                        }
                    })

                    for (var i = 0; i < res.resData.companyTeachers.length; i++) {
                        console.log(res.resData.companyTeachers[i])
                        checked_company_teacher.push(res.resData.companyTeachers[i].id)
                    }
                    console.log(checked_company_teacher)
                    window.localStorage.checked_company_teacher = checked_company_teacher;
                    var param_company_teacher = function (res) {
                        return {
                            elem: '#ni_company_teacher_table'
                            , url: GetCompanyTeacherURL
                            , title: '企业老师'
                            , toolbar: '#toolbar_company_teacher'
                            , defaultToolbar: ['filter']
                            , contentType: 'application/json'
                            , method: "POST"
                            , where: {
                                "reqId": "",
                                "reqParam": pt_company_id
                            }
                            , deal: function (res) {
                                console.log(res)
                                pt_company_teacher_len = res.resData.length;
                                for (var i = 0; i < pt_company_teacher_len; i++) {
                                    pt_company_teacher_id.push(res.resData[i].id)
                                    for (var j = 0; j < checked_company_teacher.length; j++) {
                                        if (res.resData[i].id == checked_company_teacher[j]) {
                                            res.resData[i].LAY_CHECKED = true;
                                        }
                                    }
                                }
                                return {
                                    code: 0
                                    , msg: ""
                                    , count: 1000
                                    , data: res.resData
                                }
                            }
                            , cols: [[
                                { type: 'checkbox' }
                                , { field: 'id', width: 75, title: 'ID', hide: true }
                                , { field: 'name', title: '名称' }
                                , { field: 'sex', title: '性别' }
                            ]]
                        }
                    }
                    table.render(param_company_teacher(1))
                }
                else if (temp_choose == "detail") {
                    console.log("detail")
                    document.getElementById("new_item_name").disabled = "disabled";
                    document.getElementById("new_item_type").disabled = "disabled";
                    renderStar_d("new_item_difficulty", res.resData.difficulty / 2);
                    document.getElementById("new_item_introduce").disabled = "disabled";
                    document.getElementById("new_item_base_content").disabled = "disabled";
                    document.getElementById("new_item_extend_content").disabled = "disabled";
                    document.getElementById("new_item_advance_content").disabled = "disabled";
                    document.getElementById("new_item_advance_content").disabled = "disabled";
                    document.getElementById("ni_company_teacher_table").style.display = "none";

                    var temptemp = "<pre style='padding-top:11px'>";
                    for (var i = 0; i < res.resData.companyTeachers.length; i++) {
                        temptemp += res.resData.companyTeachers[i].name;
                        temptemp += "  "
                    }
                    temptemp += "</pre>"
                    document.getElementById("teacher_info").innerHTML += temptemp;
                }

            },
            error: function (res) {
                console.log("error");
                console.log(res);
            }
        });
    }
    else {
        var param_company_teacher = function (res) {
            return {
                elem: '#ni_company_teacher_table'
                , url: GetCompanyTeacherURL
                , title: '企业老师'
                , toolbar: '#toolbar_company_teacher'
                , defaultToolbar: ['filter']
                , contentType: 'application/json'
                , method: "POST"
                , where: {
                    "reqId": "",
                    "reqParam": pt_company_id
                }
                , deal: function (res) {
                    console.log(res)
                    pt_company_teacher_len = res.resData.length;
                    for (var i = 0; i < pt_company_teacher_len; i++) {
                        pt_company_teacher_id.push(res.resData[i].id)
                    }
                    return {
                        code: 0
                        , msg: ""
                        , count: 1000
                        , data: res.resData
                    }
                }
                , cols: [[
                    { type: 'checkbox' }
                    , { field: 'id', width: 75, title: 'ID', hide: true }
                    , { field: 'name', title: '名称' }
                    , { field: 'sex', title: '性别' }
                ]]
            }
        }
        table.render(param_company_teacher(1))
    }

    //监听复选框
    table.on('checkbox(ni_company_teacher_table)', function (obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        if (obj.type == "all") {
            if (obj.checked) {
                checked_company_teacher = []
                for (var i = 0; i < pt_company_teacher_len; i++) {
                    checked_company_teacher.push(pt_company_teacher_id[i])
                }
            }
            else {
                checked_company_teacher = [];
            }
        }
        else {
            if (obj.checked) {
                checked_company_teacher.push(obj.data.id)
            }
            else {
                var i = 0;
                for (i = 0; i < checked_company_teacher.length; i++) {
                    if (checked_company_teacher[i] == obj.data.id)
                        break;
                }
                checked_company_teacher.splice(i, 1);
            }
        }
        window.localStorage.checked_company_teacher = checked_company_teacher;
        console.log(window.localStorage.checked_company_teacher)
    });

    //监听input
    document.getElementById('new_item_name').onchange = function () {
        console.log(document.getElementById('new_item_name').value)
        window.localStorage.new_item_name = document.getElementById('new_item_name').value
    };
    document.getElementById('new_item_type').onchange = function () {
        console.log(document.getElementById('new_item_type').value)
        window.localStorage.new_item_type = document.getElementById('new_item_type').value
    };
    document.getElementById('new_item_introduce').onchange = function () {
        console.log(document.getElementById('new_item_introduce').value)
        window.localStorage.new_item_introduce = document.getElementById('new_item_introduce').value
    };
    document.getElementById('new_item_base_content').onchange = function () {
        console.log(document.getElementById('new_item_base_content').value)
        window.localStorage.new_item_base_content = document.getElementById('new_item_base_content').value
    };
    document.getElementById('new_item_extend_content').onchange = function () {
        console.log(document.getElementById('new_item_extend_content').value)
        window.localStorage.new_item_extend_content = document.getElementById('new_item_extend_content').value
    };
    document.getElementById('new_item_advance_content').onchange = function () {
        console.log(document.getElementById('new_item_advance_content').value)
        window.localStorage.new_item_advance_content = document.getElementById('new_item_advance_content').value
    };

});

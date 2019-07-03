// JavaScript source code
function renderStar(id, score) {
    layui.use('rate', function () {
        var rate = layui.rate;

        //渲染
        var ins1 = rate.render({
            elem: '#' + id  //绑定元素
            , length: 5
            , value: score
            , half: true
            , readonly: true
            , choose: function (value) {
                layer.alert("当前难度:" + value)
            }
        });
    })
}

var pt_id = t_param[`pt_id`]
    , pt_name = ""
    , pt_school_id = -1
    , pt_school_name = ""
    , pt_company_id = -1
    , pt_company_name = "";

var GetExistedItemURL = "http://localhost:8080/GetProjectinPracticeServlet"
    , GetSchoolTeacherURL = "http://localhost:8080/GetSchoolTeacherByPracticeIdServlet"
    , GetCompanyTeacherURL = "http://localhost:8080/GetCompanyTeacherByPracticeIdServlet"
    , ItemDetailURL = "login.html"
    , TeacherHomePageURL = "login.html"
    , AddItemURL = "teacher_add_pt_new_item.html"
    , GetPTInfoURL = "http://localhost:8080/GetPracticeInformationServlet"
    , AddCompanyTeacherURL = "teacher_add_pt_teacher.html?authority=CompanyTeacher&companyId=" + pt_company_id
    , AddSchoolTeacherURL = "teacher_add_pt_teacher.html?authority=SchoolTeacher";

var param_item_existed = function (res) {
    return {
        elem: '#item_table'
        , url: GetExistedItemURL
        , title: '项目列表'
        , toolbar: "#toolbar_item"
        , contentType: 'application/json'
        , method: "POST"
        , width: 1100
        , height: 500
        , where: {
            "reqId": ""
            , "reqParam": pt_id
        }
        , deal: function (res) {
            return {
                code: 0
                , msg: ""
                , count: 1000
                , data: res.resData
            }
        }
        , cols: [[
            { type: 'numbers' }
            , { field: 'id', width: 150, title: '项目ID', hide: true }
            , { field: 'name', width: 150, title: '项目名称' }
            , { field: 'type', width: 150, title: '项目类型' }
            , {
                field: 'difficulty', width: 150, title: '项目难度', sort: true, templet: function (d) {
                    return '<div id="star_' + d.id + '"></div>'
                }
            }
            , { field: 'introduce', title: '项目概述', event: 'lookIntroDetail' }
            , { field: 'baseContent', title: '基本功能', hide: true, event: 'lookBaseDetail' }
            , { field: 'extendContent', title: '扩展功能', hide: true, event: 'lookExtendDetail' }
            , { field: 'advanceContent', title: '高级功能', hide: true, event: 'lookAdvanceDetail' }
            , {
                field: 'teachers', title: '负责老师', templet: function (d) {
                    return '<div id="companyTeacher_' + d.id + '"></div>';
                }
            }
            , { fixed: 'right', title: '操作', toolbar: '#bar_change_delete', width: 160 }
        ]]
        , done: function (res) {
            for (var i = 0; i < res.data.length; i++) {
                renderStar('star_' + res.data[i].id, res.data[i].difficulty / 2);
                var temptemp = ""
                for (var j = 0; j < res.data[i].teacherNames.length; j++) {
                    temptemp += res.data[i].teacherNames[j] + ' ';
                }
                document.getElementById('companyTeacher_' + res.data[i].id).innerText = temptemp;
            }
        }
    }
}
    , param_pt_school_teacher = function (res) {
        return {
            elem: '#school_teacher_table'
            , url: GetSchoolTeacherURL
            , title: '校园老师'
            , toolbar: "#toolbar_school_teacher"
            , contentType: 'application/json'
            , method: "POST"
            , width: 380
            , where: {
                "reqId": "",
                "reqParam": pt_id
            }
            , deal: function (res) {
                return {
                    code: 0
                    , msg: ""
                    , count: 1000
                    , data: res.resData
                }
            }
            , cols: [[
                { type: 'numbers' }
                , { field: 'id', title: 'ID', hide: true }
                , { field: 'name',  title: '名称' }
                , { field: 'sex', title: '性别' }
                , { fixed: 'right', title: '操作', toolbar: '#bar_teacher_detail_delete', width: 65 }
            ]]
        }
    }
    , param_pt_company_teacher = function (res) {
        return {
            elem: '#company_teacher_table'
            , url: GetCompanyTeacherURL
            , title: '企业老师'
            , toolbar: "#toolbar_company_teacher"
            , contentType: 'application/json'
            , method: "POST"
            , width: 700
            , where: {
                "reqId": "",
                "reqParam": pt_id
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
                { type: 'numbers' }
                , { field: 'id', width: 75, title: 'ID', hide: true }
                , { field: 'name', width: 120, title: '名称' }
                , { field: 'sex', width: 100, title: '性别' }
                , {
                    field: 'projectInCharge', title: '负责项目', templet: function (d) {
                        return '<div id="projectInCharge_' + d.id + '"></div>'
                    }, event: 'lookProjectInChargeDetail'
                }
                , { fixed: 'right', title: '操作', toolbar: '#bar_teacher_detail_delete', width: 65 }
            ]]
            , done: function (res) {
                console.log(res.data)
                console.log(res)

                //为每个老师添加负责项目
                for (var i = 0; i < res.data.length; i++) {
                    var dataTemp = res.data[i]
                    console.log(dataTemp)
                    var temptemp = "无"
                    if (dataTemp.projects.length > 0) {
                        temptemp = dataTemp.projects[0].name;
                        for (var j = 1; j < dataTemp.projects.length; j++) {
                            temptemp += "...\n";
                            temptemp += dataTemp.projects[j].name;
                        }

                    }
                    document.getElementById("projectInCharge_" + dataTemp.id).innerText = temptemp;
                }
            }
        }
    }

layui.use(['form', 'jquery', 'layer', 'table'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer
        , table = layui.table;

    //获取实训信息
    $.ajax({
        type: "POST",
        url: GetPTInfoURL,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": pt_id
        }),
        dataType: "json",
        success: function (res) {
            pt_name = res.resData.name
                , pt_school_id = res.resData.school
                , pt_school_name = res.resData.schoolName
                , pt_company_id = res.resData.company
                , pt_company_name = res.resData.companyName
            document.getElementById("school_name").innerText = pt_school_name;
            document.getElementById("company_name").innerText = pt_company_name;
            document.getElementById("pt_name").innerText = pt_name;
        },
        error: function (res) {
            console.log("error");
            console.log(res);
        }
    });

    //头工具栏事件
    table.on('toolbar(item_table)', function (obj) {
        switch (obj.event) {
            case 'addItem':
                //console.log('addItem')
                layer.open({
                    title: '添加项目',
                    type: 2,
                    area: ["500px", "500px"],
                    content: AddItemURL + "?pt_id=" + pt_id + "&pt_company_id=" + pt_company_id + "&pt_user_id" + user_id,
                    end: function () {
                        table.render(param_item_existed(1));
                        table.render(param_pt_company_teacher(1));
                    },
                    btn: '添加项目',
                    btnAlign: 'c', //按钮居中,
                    yes: function () {
                        var new_item_name = window.localStorage.new_item_name
                            , new_item_type = window.localStorage.new_item_type
                            , new_item_difficulty = parseInt(window.localStorage.new_item_difficulty)
                            , new_item_introduce = window.localStorage.new_item_introduce
                            , new_item_base_content = window.localStorage.new_item_base_content
                            , new_item_extend_content = window.localStorage.new_item_extend_content
                            , new_item_advance_content = window.localStorage.new_item_advance_content
                            , new_item_teachers = [];

                        var temptemptemp = window.localStorage.checked_company_teacher;
                        var str = temptemptemp.substr(0);
                        var strs = str.split(",");
                        for (var i = 0; i < strs.length; i++) {
                            new_item_teachers.push(parseInt(strs[i]))
                        }

                        if (new_item_teachers.length == 0) {
                            layer.msg("请选择企业老师", { time: 1000 })
                        }
                        else if (window.localStorage.new_item_name == "") {
                            layer.msg("请填写项目名称", { time: 1000 })
                        }
                        else if (window.localStorage.new_item_type == "") {
                            layer.msg("请填写项目类型", { time: 1000 })
                        }
                        else if (window.localStorage.new_item_introduce == "") {
                            layer.msg("请填写项目概述", { time: 1000 })
                        }
                        else if (window.localStorage.new_base_content == "") {
                            layer.msg("请填写项目简单功能", { time: 1000 })
                        }
                        else {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:8080/CreateProjectServlet",
                                async: true,
                                data: JSON.stringify({
                                    "reqId": "",
                                    "reqParam": {
                                        "name": new_item_name,
                                        "type": new_item_type,
                                        "difficulty": new_item_difficulty,
                                        "introduce": new_item_introduce,
                                        "baseContent": new_item_base_content,
                                        "extendContent": new_item_extend_content,
                                        "advanceContent": new_item_advance_content,
                                        "practiceId": pt_id,
                                        "teachers": new_item_teachers
                                    }
                                }),
                                dataType: "json",
                                success: function (res) {
                                    //console.log(res);
                                    layer.msg('添加成功', { time: 1000 })
                                    window.localStorage.new_item_name = ""
                                    window.localStorage.new_item_type = ""
                                    window.localStorage.new_item_difficulty = ""
                                    window.localStorage.new_item_introduce = ""
                                    window.localStorage.new_item_base_content = ""
                                    window.localStorage.new_item_extend_content = ""
                                    window.localStorage.new_item_advance_content = ""
                                    window.localStorage.checked_company_teacher = ""

                                    setTimeout(function sign_up_fun() {
                                        layer.closeAll();
                                    }, 1000);
                                }
                            });
                        }
                    }
                });
                break;
        };
    });
    table.on('toolbar(school_teacher_table)', function (obj) {
        switch (obj.event) {
            case 'addSchoolTeacher':
                layer.open({
                    title: '添加学校老师',
                    type: 2,
                    area: ["500px", "500px"],
                    content: AddSchoolTeacherURL + "&pt_school_id=" + pt_school_id + "&pt_id=" + pt_id + "&user_id=" + user_id,
                    end: function () {
                        table.render(param_pt_school_teacher);
                    },
                    btn: '添加老师',
                    btnAlign: 'c', //按钮居中,
                    yes: function () {
                        var new_school_teachers = [];

                        var temptemptemp = window.localStorage.checked_school_teacher;
                        var str = temptemptemp.substr(0);
                        var strs = str.split(",");
                        for (var i = 0; i < strs.length; i++) {
                            new_school_teachers.push(parseInt(strs[i]))
                        }

                        if (new_school_teachers.length == 0) {
                            layer.msg("请选择要添加的学校老师", { time: 1000 })
                        }
                        else {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:8080/AddSchoolTeacherToPracticeServlet",
                                async: true,
                                data: JSON.stringify({
                                    "reqId": "",
                                    "reqParam": {
                                        "id": pt_id,
                                        "schoolTeachers": new_school_teachers
                                    }
                                }),
                                dataType: "json",
                                success: function (res) {
                                    //console.log(res);
                                    layer.msg('添加成功', { time: 1000 })
                                    window.localStorage.checked_school_teacher = ""
                                    table.render(param_pt_school_teacher(1));
                                    setTimeout(function sign_up_fun() {
                                        layer.closeAll();
                                    }, 1000);
                                }
                            });
                        }
                    }
                });
                break;
        };
    });
    table.on('toolbar(company_teacher_table)', function (obj) {
        switch (obj.event) {
            case 'addCompanyTeacher':
                layer.open({
                    title: '添加企业老师',
                    type: 2,
                    area: ["500px", "500px"],
                    content: AddCompanyTeacherURL
                });
                break;
        };
    });

    //监听工具条
    table.on('tool(item_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'detail') { //查看
            layer.open({
                title: data.projectName,
                type: 2,
                area: ["500px", "500px"],
                content: ItemDetailURL
            });

        }
        else if (layEvent === 'del') { //删除
            layer.confirm('真的删除这一项目吗？', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);

                ////向服务端发送删除指令

                table.render(param_item_existed);
            });
        }
        else if (layEvent === 'edit') { //编辑
            //do something

            layer.open({
                title: data.projectName,
                type: 2,
                area: ["500px", "500px"],
                content: ItemDetailURL,
                end: function () {
                    table.render(param_item_existed);
                }
            });

            //同步更新缓存对应的值
            obj.update({
                projectName: '123'
            });
        }
        else if (layEvent === 'addItem') {
            console.log("addItem");
        }
        else if (layEvent === 'lookIntroDetail') {
            layer.open({
                type: 1
                , title: '详情'
                , area: ['500px', '500px']
                , id: 'layerDemo'//防止重复弹出
                , content: '<div style="padding: 20px 20px;"><pre style="font-size:16px; font-family:\'Microsoft YaHei\'">' + data.introduce + '</pre></div>'
                , btn: '确定'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });
        }
        else if (layEvent === 'lookBaseDetail') {
            layer.open({
                type: 1
                , title: '详情'
                , area: ['500px', '500px']
                , id: 'layerDemo'//防止重复弹出
                , content: '<div style="padding: 20px 20px;"><pre style="font-size:16px; font-family:\'Microsoft YaHei\'">' + data.baseContent + '</pre></div>'
                , btn: '确定'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });
        }
        else if (layEvent === 'lookExtendDetail') {
            layer.open({
                type: 1
                , title: '详情'
                , area: ['500px', '500px']
                , id: 'layerDemo'//防止重复弹出
                , content: '<div style="padding: 20px 20px;"><pre style="font-size:16px; font-family:\'Microsoft YaHei\'">' + data.extendContent + '</pre></div>'
                , btn: '确定'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });
        }
        else if (layEvent === 'lookAdvanceDetail') {
            layer.open({
                type: 1
                , title: '详情'
                , area: ['500px', '500px']
                , id: 'layerDemo'//防止重复弹出
                , content: '<div style="padding: 20px 20px;"><pre style="font-size:16px; font-family:\'Microsoft YaHei\'">' + data.advanceContent + '</pre></div>'
                , btn: '确定'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });
        }
    });
    table.on('tool(school_teacher_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'detail') { //查看
            console.log("detail")
            window.open(TeacherHomePageURL + "?id=" + data.schoolTeacherId)
        }
        else if (layEvent === 'del') { //删除
            console.log("delete")
            layer.confirm('真的删除这位老师吗？', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);

                ////向服务端发送删除指令

                table.render(param_item_existed);
            });
        }
    });
    table.on('tool(company_teacher_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        console.log(data)
        if (layEvent === 'detail') { //查看
            console.log("detail")
            console.log(data.companyTeacherId);
            window.open(TeacherHomePageURL + "?id=" + data.companyTeacherId)
        }
        else if (layEvent === 'del') { //删除
            console.log("delete")
            layer.confirm('真的删除这位老师吗？', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);

                ////向服务端发送删除指令

                table.render(param_item_existed);
            });
        }
        else if (layEvent === 'lookProjectInChargeDetail') {
            layer.open({
                type: 1
                , title: '详情'
                , id: 'layerDemo'//防止重复弹出
                , content: '<div style="padding: 20px 60px;"><pre style="font-size:16px; font-family:\'Microsoft YaHei\'">' + document.getElementById("projectInCharge_" + data.id).innerText + '</pre></div>'
                , btn: '确定'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });

        }
    });

    //监听排序(刷新评分渲染)
    table.on('sort(item_table)', function (obj) {
        table.reload('item_table', {
            initSort: obj
        });
    });

    table.render(param_item_existed(1));
    table.render(param_pt_school_teacher(1));
    table.render(param_pt_company_teacher(1));

});

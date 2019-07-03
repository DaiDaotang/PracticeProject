var AddMemberURL = "http://localhost:8080/AddStudentServlet"
    , GetTeamMemberURL = "http://localhost:8080/GetStudentByTeamIdServlet";

var target_team_id = parseInt(t_param[`team_id`])
    , user_is_captain = false
    , user_id = t_param[`user_id`];

layui.use(['form', 'table', 'layer', 'jquery'], function () {
    var table = layui.table
        , layer = layui.layer
        , form = layui.form
        , $ = layui.jquery;
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
                , "reqParam": target_team_id
            }
            , deal: function (res) {
                console.log(res)
                return {
                    code: 0
                    , msg: ""
                    , count: 1000
                    , data: res.resData.students
                }
            }
            , cols: [[
                { field: 'id', title: 'ID', sort: true, hide: true }
                , { field: 'name', title: '姓名' }
                , { field: 'sex', title: '性别' }
                , { field: 'number', title: '学号' }
                , { field: 'grade', title: '年级' }
                , { fixed: 'right', title: '操作', toolbar: '#bar_trans_del', width: 140 }
            ]]
            , done: function (res) {
                console.log(res.data)
            }
        }
    }

    $(document).on('click', '#addMember', function () {
        layer.prompt({
            formType: 0,
            value: '',
            title: '请输入电话号',
            area: ['300px', '350px'], //自定义文本域宽高,
            end: function () {
                table.render(param_member_existed(1))
            }
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
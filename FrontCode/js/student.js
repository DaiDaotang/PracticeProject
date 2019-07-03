// JavaScript source code
var HomepageURL = "homepage_student.html"
    , StudentDiaryURL = "student_diary.html"
    , StudentHistoryURL = "student_history.html"
    , StudentResumeURL = "student_resume.html"
    , CheckRecordURL = "login.html"
    , SchoolURL = "login.html"
    , CheckInOutURL = "http://localhost:8080/SigninServlet"
    , ChangeHeadURL = "login.html"
    , WriteDiaryURL = "student_write_diary.html";

//变量
var user_hasChecked = false
    , target_id = parseInt(t_param[`target_id`])
    , target_authority = t_param[`target_authority`]
    , target_name = ""
    , target_gender = ""
    , target_hd_img = ""           
    , target_school_id = -1
    , target_school_name = ""
    , target_grade = ""
    , target_major = "";

var default_target_pt_id = -1;

//区
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //监听置顶
    $(document).on('click', '#turntop', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    //监听写日志
    $(document).on('click', '#write_diary_btn', function () {
        layer.open({
            title: '日志',
            type: 2,
            area: ["500px", "500px"],
            content: WriteDiaryURL + "?user_id=" + user_id + "&user_authority=" + user_authority
        });
    });

    //获取信息
    $.ajax({
        type: "POST",
        url: GetStudentServletURL,
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
                , target_school_name = res.resData.schoolName
                , target_grade = res.resData.grade
                , target_major = res.resData.major
                , target_hd_img = res.resData.head ? res.resData.head : "";

            //设置签到
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/GetAtWorkServlet",
                async: true,
                data: JSON.stringify({
                    "reqId": "",
                    "reqParam": user_id
                }),
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.resData) {
                        user_hasChecked = true;
                        document.getElementById("checkin").innerText = "Check Out";
                    }
                    else {
                        user_hasChecked = false;
                        document.getElementById("checkin").innerText = "Check In";
                    }
                },
                error: function (res) {
                    console.log("error");
                    console.log(res);
                }
            });
            if (target_id != user_id || target_authority != user_authority) {
                document.getElementById("checkin").style.display = "none";
                document.getElementById("write_diary_btn").style.display = "none";
            }

            document.getElementById("target_head_img").src = (target_hd_img == "" ? "./img/defaultHead.jpg" : GetHeadImgURL + target_hd_img);
            document.getElementById("target_head_img").style.border = "1px solid #6e7474";

            document.getElementById("username").innerText = target_name;
            document.getElementById("gender").innerHTML = target_gender == "男" ? '<i class="layui-icon layui-icon-male" style="height:100px; color: #1E9FFF; font-size:40px; margin-left: 20px;"></i>' : '<i class="layui-icon layui-icon-female" style="height:100px; color: #fd5087; font-size:40px; margin-left: 20px;"></i>'
            document.getElementById("school_a").innerText += target_school_name;
            document.getElementById("major").innerText += target_major;
            document.getElementById("grade").innerText += target_grade;
            document.getElementById("major").href = "https://baike.baidu.com/item/" + major;
            document.getElementById("school_a").href = "https://baike.baidu.com/item/" + target_school_name;


            var basic_extra_url = "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&target_id=" + t_param[`target_id`] + "&target_authority=" + t_param[`target_authority`];
            document.getElementById("target_homepage").href = HomepageURL + basic_extra_url;
            document.getElementById("target_diary").href = StudentDiaryURL + basic_extra_url;
            document.getElementById("target_history").href = StudentHistoryURL + basic_extra_url;
            document.getElementById("target_resume").href = StudentResumeURL + basic_extra_url;
        },
        error: function (res) {
            console.log("获取用户基本信息失败");
        }
    });
})

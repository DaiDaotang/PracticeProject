// JavaScript source code
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
console.log(t_param);

//共有变量
var user_hd_img = "./img/defaultHead.jpg"
    , user_id = parseInt(t_param[`user_id`])
    , user_authority = t_param[`user_authority`];

//测试变量
var test_style = "1px solid #000";

//共有URL
var HomepageURL = ""
    , QuitURL = "login.html"
    , ChangeInfoURL = "login.html"
    , SafetyURL = "safety_info.html"
    , GetStudentServletURL = "http://localhost:8080/GetStudentInformationServlet"
    , GetCompanyTeacherServletURL = "http://localhost:8080/GetCompanyTeacherInformationServlet"
    , GetSchoolTeacherServletURL = "http://localhost:8080/GetSchoolTeacherInformationServlet"
    , GetCompanyServletURL = "http://localhost:8080/GetCompanyInformationServlet"
    , GetAnyUserServlet = ""
    , GetHeadImgURL = "http://localhost:8080/DownloadServlet?head=";

//获取个人信息
layui.use(['jquery', 'layer'], function () {
    var $ = layui.jquery
        , layer = layui.layer;

    //获取本人信息
    switch (user_authority) {
        case "Student":
            GetAnyUserServlet = GetStudentServletURL;
            break;
        case "Teacher":
            GetAnyUserServlet = GetCompanyTeacherServletURL
            break;
        case "School":
            GetAnyUserServlet = GetSchoolTeacherServletURL
            break;
        case "Company":
            GetAnyUserServlet = GetCompanyServletURL
            break;
    }
    $.ajax({
        type: "POST",
        url: GetAnyUserServlet,
        async: true,
        data: JSON.stringify({
            "reqId": "",
            "reqParam": user_id
        }),
        dataType: "json",
        success: function (res) {
            console.log(res);
            user_hd_img = res.resData.head ? res.resData.head : "";
            document.getElementById("user_hd_img").src = (user_hd_img == "" ? "./img/defaultHead.jpg" : GetHeadImgURL + user_hd_img);
        },
    });
});

//element区
layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    //监听导航点击
    element.on('nav(me)', function (elem) {
        console.log(elem)
        layer.msg(elem.text());
    });
});

//基础区
switch (user_authority) {
    case "Student":
        HomepageURL = "homepage_student.html?user_id=" + user_id + "&user_authority=Student&target_id=" + user_id + "&target_authority=Student"
        break;
    case "Teacher":
        HomepageURL = "homepage_company_teacher.html?user_id=" + user_id + "&user_authority=Teacher&target_id=" + user_id + "&target_authority=Teacher"
        break;
    case "School":
        HomepageURL = "homepage_school_teacher.html?user_id=" + user_id + "&user_authority=School&target_id=" + user_id + "&target_authority=School"
        break;
    case "Company":
        break;
    default:
        HomepageURL = "login.html"
        break;
}
document.getElementById("user_homepage_a").href = HomepageURL;
document.getElementById("change_info_a").href = ChangeInfoURL;
document.getElementById("safety_info_a").href = SafetyURL;
document.getElementById("quit_a").href = QuitURL;

//隐藏参数传参
function submitForm(url, data) {
    var eleForm = document.body.appendChild(document.createElement('form'));
    eleForm.action = url;
    for (var property in data) {
        var hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = property;
        hiddenInput.value = data[property];
        eleForm.appendChild(hiddenInput);
    }
    this.eleForm = eleForm;
    if (!submitForm._initialized) {
        submitForm.prototype.post = function () {
            this.eleForm.method = 'post';
            this.eleForm.submit();
        };
        submitForm._initialized = true;
    }
}

function Onclick() {
    //location.href = "/Activity/ActivityInformation?a_id=" + "1"; // Url中会带有参数
    new submitForm('basic.html', { a_id: "1" }).post(); // Url中的参数被隐藏
}

console.log(Request.QueryString)
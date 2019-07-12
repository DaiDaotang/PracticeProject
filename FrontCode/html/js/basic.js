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
var t_param = GetRequest()
    , user_id = t_param[`user_id`]
    , user_authority = t_param[`user_authority`]
    , user_hd_img = "../../img/defaultHead.jpg"
    , target_id = t_param[`target_id`]
    , target_authority = t_param[`target_authority`];

var basic_extra_url = "?user_id=" + user_id + "&user_authority=" + user_authority + "&target_id=" + target_id + "&target_authority=" + target_authority;

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
            document.getElementById("user_hd_img").src = (user_hd_img == "" ? "../../img/defaultHead.jpg" : GetHeadImgURL + user_hd_img);
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
        HomepageURL = "../Student/" + StudentHomepageURL + "?user_id=" + user_id + "&user_authority=Student&target_id=" + user_id + "&target_authority=Student"
        break;
    case "Teacher":
        HomepageURL = "../CompanyTeacher/" + CompanyTeacherHomepageURL + "?user_id=" + user_id + "&user_authority=Teacher&target_id=" + user_id + "&target_authority=Teacher"
        break;
    case "School":
        HomepageURL = "../SchoolTeacher/" + SchoolTeacherHomepageURL + "?user_id=" + user_id + "&user_authority=School&target_id=" + user_id + "&target_authority=School"
        break;
    case "Company":
        break;
    default:
        HomepageURL = "login.html"
        break;
}
document.getElementById("user_homepage_a").href = HomepageURL;
document.getElementById("change_info_a").href = ChangeInfoURL + basic_extra_url;
document.getElementById("safety_info_a").href = SafetyURL + basic_extra_url;
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

function getIndex(time) {
    var strs = time.split(" ")
        , hms = strs[1]
        , h = hms.split(":")[0]
        , m = hms.split(":")[1]
        , a = parseInt(h * 4 + m / 15);

    return a;
}

var t = getIndex("2019-07-29 08:29:00")
console.log(t)

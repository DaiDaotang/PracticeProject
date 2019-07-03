// JavaScript source code
//��ȡ����
function GetRequest() {
    var url = location.search; //��ȡurl��"?"������ִ�
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

//���б���
var user_hd_img = "./img/defaultHead.jpg"
    , user_id = parseInt(t_param[`user_id`])
    , user_authority = t_param[`user_authority`];

//���Ա���
var test_style = "1px solid #000";

//����URL
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

//��ȡ������Ϣ
layui.use(['jquery', 'layer'], function () {
    var $ = layui.jquery
        , layer = layui.layer;

    //��ȡ������Ϣ
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

//element��
layui.use('element', function () {
    var element = layui.element; //������hoverЧ���������˵��ȹ��ܣ���Ҫ����elementģ��

    //�����������
    element.on('nav(me)', function (elem) {
        console.log(elem)
        layer.msg(elem.text());
    });
});

//������
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

//���ز�������
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
    //location.href = "/Activity/ActivityInformation?a_id=" + "1"; // Url�л���в���
    new submitForm('basic.html', { a_id: "1" }).post(); // Url�еĲ���������
}

console.log(Request.QueryString)
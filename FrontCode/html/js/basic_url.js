//Sign in & Sign up
var LoginURL = "http://42.159.228.113:8081/BackCode_war/LoginServlet"
    , SchoolTeacherSighUpURL = "http://42.159.228.113:8081/BackCode_war/SchoolTeacherSignupServlet"
    , CompanyTeacherSignUpURL = "http://42.159.228.113:8081/BackCode_war/CompanyTeacherSignupServlet"
    , CompanySignUpURL = "http://42.159.228.113:8081/BackCode_war/CompanySignupServlet"
    , StudentSignUpURL = "http://42.159.228.113:8081/BackCode_war/StudentSignupServlet"
    , GetSchoolListURL = "http://42.159.228.113:8081/BackCode_war/GetSchoolServlet"
    , GetCompanyListURL = "http://42.159.228.113:8081/BackCode_war/GetCompanyServlet";

//Student
var GetStudentTeamURL = "http://42.159.228.113:8081/BackCode_war/StudentCheckTeamServlet"
    , GetPTListByStudentIdURL = "http://42.159.228.113:8081/BackCode_war/GetPracticeByStudentIdServlet"
    , CheckInOutURL = "http://42.159.228.113:8081/BackCode_war/SigninServlet"
    , UploadDiaryURL = "http://42.159.228.113:8081/BackCode_war/WriteDiaryServlet"
    , SetCheckInOutURL = "http://42.159.228.113:8081/BackCode_war/GetAtWorkServlet"
    , GetSignInsURL = "http://42.159.228.113:8081/BackCode_war/GetSigninByStudentServlet"
    , GetItemListURL = "http://42.159.228.113:8081/BackCode_war/GetProjectinPracticeServlet"
    , CreateTeamURL = "http://42.159.228.113:8081/BackCode_war/CreateTeamServlet"
    , GetStudentDiaryURL = "http://42.159.228.113:8081/BackCode_war/GetDiaryServlet"
    , GetHistoryPTURL = "http://42.159.228.113:8081/BackCode_war/GetAllPastInformationServlet";

var GroupURL = "../Team/homepage_team.html"
    , CreateGroupURL = "student_create_team.html"
    , WriteDiaryURL = "student_write_daily_dairy.html"
    , StudentHomepageURL = "homepage_student.html"
    , StudentDiaryURL = "student_diary.html"
    , StudentHistoryURL = "student_history.html"
    , StudentResumeURL = "student_resume.html"
    , CheckRecordURL = "student_check_record.html"
    , ChangeHeadURL = ""
    , ItemDetailURL = "../Teacher/teacher_add_pt_new_item.html";

//Team
var GetTeamMemberListURL = "http://42.159.228.113:8081/BackCode_war/GetStudentByTeamIdServlet"
    , AddMemberURL = "http://42.159.228.113:8081/BackCode_war/AddStudentServlet"
    , ModifyCaptainURL = "http://42.159.228.113:8081/BackCode_war/ModifyCaptainServlet"
    , DelMemberURL = "http://42.159.228.113:8081/BackCode_war/DeleteStudentFromTeamServlet"
    , GetCompanyTeacherURL = "http://42.159.228.113:8081/BackCode_war/GetCompanyTeacherByCompanyIdServlet"
    , ModifyTeamURL = "http://42.159.228.113:8081/BackCode_war/ModifyTeamInformationServlet"
    , CreateTaskURL = "http://42.159.228.113:8081/BackCode_war/CreateTaskServlet"
    , GetTaskURL = "http://42.159.228.113:8081/BackCode_war/GetTaskServlet"
    , GetTotalWeek = "http://42.159.228.113:8081/BackCode_war/GetWeekByPracticeIdServlet"
    , ModifyTaskURL = "http://42.159.228.113:8081/BackCode_war/ModifyTaskServlet"
    , DeleteTaskURL = "http://42.159.228.113:8081/BackCode_war/DeleteTaskServlet"
    , GetTotalWorkURL = "http://42.159.228.113:8081/BackCode_war/GetTotalWorkServlet"
    , GetWeekTotalWorkURL = "http://42.159.228.113:8081/BackCode_war/GetTotalWorkAWeekServlet"
    , GetXYURL = "http://42.159.228.113:8081/BackCode_war/GetXYByTeamServlet";

var TeamHomepageURL = "homepage_team.html"
    , TeamDiaryURL = "team_diary.html"
    , TeamMemberURL = "team_list.html"
    , TeamProgressURL = "team_progress.html"
    , MemberHomepageURL = "../Student/" + StudentHomepageURL
    , TeamerWriteDiaryURL = "../Student/" + WriteDiaryURL
    , EditTeamInfoURL = "team_edit.html"
    , AddTaskURL = "team_add_task.html";

//School Teacher
var GetSchoolTeacherInfoURL = "http://42.159.228.113:8081/BackCode_war/GetSchoolTeacherInformationServlet"
    , GetSchoolTeacherModifyItemURL = "http://42.159.228.113:8081/BackCode_war/GetCanModifiedPracticeBySchoolTeacherIdServlet"
    , GetPTListInSTChargeURL = "http://42.159.228.113:8081/BackCode_war/GetPracticeNowBySchoolTeacherIdServlet";

var CreateNewPTURL = "school_teacher_publish_pt.html"
    , SchoolPTListURL = "school_pt_list.html"
    , ModifyPTURL = "school_teacher_modify_pt.html"
    , SchoolTeacherHomepageURL = "homepage_school_teacher.html"
    , SchoolTeacherAddPTItemURL = "school_teacher_add_pt_item.html"
    , SchoolTeacherModifyPTDetailURL = "school_teacher_add_pt_item.html"
    , SchoolTeacherPTInChargeURL = "school_teacher_pt_detail.html";

//CompanyTeacher
var GetTeamInProjectURL = "http://42.159.228.113:8081/BackCode_war/GetTeamInProjectServlet"
    , GetCompanyTeacherInfoURL = "http://42.159.228.113:8081/BackCode_war/GetCompanyTeacherInformationServlet"
    , GetCompanyNameURL = "http://42.159.228.113:8081/BackCode_war/GetCompanyInformationServlet"
    , GetSchoolTeacherInPTURL = "http://42.159.228.113:8081/BackCode_war/GetSchoolTeacherByPracticeIdServlet"
    , GetCompanyTeacherInPTURL = "http://42.159.228.113:8081/BackCode_war/GetCompanyTeacherByPracticeIdServlet"
    , GetCompanyTeacherModifyItemURL = "http://42.159.228.113:8081/BackCode_war/GetCanModifiedPracticeByCompanyTeacherIdServlet"
    , DeletePTURL = "http://42.159.228.113:8081/BackCode_war/DeletePracticeServlet"
    , CreatePTURL = "http://42.159.228.113:8081/BackCode_war/CreatePracticeServlet"
    , ModifyItemURL = "http://42.159.228.113:8081/BackCode_war/ModifyProjectServlet"
    , DeleteItemURL = "http://42.159.228.113:8081/BackCode_war/DeleteProjectServlet"
    , GetPTInfoURL = "http://42.159.228.113:8081/BackCode_war/GetPracticeInformationServlet"
    , CreateItemURL = "http://42.159.228.113:8081/BackCode_war/CreateProjectServlet"
    , AddSchoolTeacherToItemURL = "http://42.159.228.113:8081/BackCode_war/AddSchoolTeacherToPracticeServlet"
    , DeleteTeacherFromPTURL = "http://42.159.228.113:8081/BackCode_war/DeleteTeacherFromPracticeServlet"
    , ScoreForTeamURL = "http://42.159.228.113:8081/BackCode_war/ScoreForTeamServlet"
    , ScoreForStudentURL = "http://42.159.228.113:8081/BackCode_war/ScoreForStudentServlet"
    , GetPTInChargeURL = "http://42.159.228.113:8081/BackCode_war/GetPracticeNowByCompanyTeacherIdServlet"
    , GetItemInChargeURL = "http://42.159.228.113:8081/BackCode_war/GetCanScoredProjectServlet"
    , GetStudentInItemURL = "http://42.159.228.113:8081/BackCode_war/GetStudentsByProjectIdServlet"
    , GetPTWeekURL = "http://42.159.228.113:8081/BackCode_war/GetWeekByPracticeIdServlet"
    , GetStudentDiaryByPTandWeekURL = "http://42.159.228.113:8081/BackCode_war/GetDiaryByStudentProjectWeekServlet"
    , CompanyTeacherReviewDiaryURL = "http://42.159.228.113:8081/BackCode_war/ReviewDiaryServlet";

var ProjectInChargeURL = "company_teacher_project_in_charge.html"
    , CompanyTeacherCreateNewPTURL = "company_teacher_publish_pt.html"
    , CompanyTeacherModifyPTURL = "company_teacher_modify_pt.html"
    , CompanyTeacherHomepageURL = "homepage_company_teacher.html"
    , CompanyPTListURL = "company_pt_list.html"
    , CompanyTeacherWriteDiaryURL = "../Student" + WriteDiaryURL
    , CompanyTeacherModifyPTDetailURL = "company_teacher_add_pt_item.html"
    , TeacherAddNewItemURL = "../Teacher/teacher_add_pt_new_item.html"
    , AddSchoolTeacherURL = "../Teacher/teacher_add_pt_teacher.html?authority=SchoolTeacher"
    , CompanyTeacherScoreURL = "company_teacher_point.html"
    , CompanyTeacherCheckDiaryURL = "company_teacher_check_diary.html";

//Teacher
var GetSchoolTeacherListURL = "http://42.159.228.113:8081/BackCode_war/GetSchoolTeacherBySchoolIdServlet"
    , AddSchoolTeacherToPTURL = "http://42.159.228.113:8081/BackCode_war/AddSchoolTeacherToPracticeServlet";

//Company

//共有URL
var HomepageURL = ""
    , QuitURL = "../login.html"
    , ChangeInfoURL = "../change_info.html"
    , SafetyURL = "../safety_info.html"
    , GetStudentServletURL = "http://42.159.228.113:8081/BackCode_war/GetStudentInformationServlet"
    , GetCompanyTeacherServletURL = "http://42.159.228.113:8081/BackCode_war/GetCompanyTeacherInformationServlet"
    , GetSchoolTeacherServletURL = "http://42.159.228.113:8081/BackCode_war/GetSchoolTeacherInformationServlet"
    , GetCompanyServletURL = "http://42.159.228.113:8081/BackCode_war/GetCompanyInformationServlet"
    , GetAnyUserServlet = ""
    , GetHeadImgURL = "http://42.159.228.113:8081/BackCode_war/DownloadServlet?head=";

var ChangeStudentServletURL = "http://42.159.228.113:8081/BackCode_war/ModifyStudentServlet"
    , ChangeCompanyTeacherServletURL = "http://42.159.228.113:8081/BackCode_war/ModifyCompanyTeacherServlet"
    , ChangeSchoolTeacherServletURL = "http://42.159.228.113:8081/BackCode_war/ModifySchoolTeacherServlet"
    , ChangeHdImgURL = "http://42.159.228.113:8081/BackCode_war/UploadServlet?type=head"
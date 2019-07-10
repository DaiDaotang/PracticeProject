//Sign in & Sign up
var LoginURL = "http://localhost:8080/LoginServlet"
    , SchoolTeacherSighUpURL = "http://localhost:8080/SchoolTeacherSignupServlet"
    , CompanyTeacherSignUpURL = "http://localhost:8080/CompanyTeacherSignupServlet"
    , CompanySignUpURL = "http://localhost:8080/CompanySignupServlet"
    , StudentSignUpURL = "http://localhost:8080/StudentSignupServlet"
    , GetSchoolListURL = "http://localhost:8080/GetSchoolServlet"
    , GetCompanyListURL = "http://localhost:8080/GetCompanyServlet";

//Student
var GetStudentTeamURL = "http://localhost:8080/StudentCheckTeamServlet"
    , GetPTListByStudentIdURL = "http://localhost:8080/GetPracticeByStudentIdServlet"
    , CheckInOutURL = "http://localhost:8080/SigninServlet"
    , UploadDiaryURL = "http://localhost:8080/WriteDiaryServlet"
    , SetCheckInOutURL = "http://localhost:8080/GetAtWorkServlet"
    , GetSignInsURL = "http://localhost:8080/GetSigninByStudentServlet"
    , GetItemListURL = "http://localhost:8080/GetProjectinPracticeServlet"
    , CreateTeamURL = "http://localhost:8080/CreateTeamServlet"
    , GetStudentDiaryURL = "http://localhost:8080/GetDiaryServlet";

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
var GetTeamMemberListURL = "http://localhost:8080/GetStudentByTeamIdServlet"
    , AddMemberURL = "http://localhost:8080/AddStudentServlet"
    , ModifyCaptainURL = "http://localhost:8080/ModifyCaptainServlet"
    , DelMemberURL = "http://localhost:8080/DeleteStudentFromTeamServlet"
    , GetCompanyTeacherURL = "http://localhost:8080/GetCompanyTeacherByCompanyIdServlet"
    , ModifyTeamURL = "http://localhost:8080/ModifyTeamInformationServlet"
    , CreateTaskURL = "http://localhost:8080/CreateTaskServlet"
    , GetTaskURL = "http://localhost:8080/GetTaskServlet"
    , GetTotalWeek = "http://localhost:8080/GetWeekByPracticeIdServlet"
    , ModifyTaskURL = "http://localhost:8080/ModifyTaskServlet"
    , DeleteTaskURL = "http://localhost:8080/DeleteTaskServlet"
    , GetTotalWorkURL = "http://localhost:8080/GetTotalWorkServlet"
    , GetWeekTotalWorkURL = "http://localhost:8080/GetTotalWorkAWeekServlet";

var TeamHomepageURL = "homepage_team.html"
    , TeamDiaryURL = "team_diary.html"
    , TeamMemberURL = "team_list.html"
    , TeamProgressURL = "team_progress.html"
    , MemberHomepageURL = "../Student/" + StudentHomepageURL
    , TeamerWriteDiaryURL = "../Student/" + WriteDiaryURL
    , EditTeamInfoURL = "team_edit.html"
    , AddTaskURL = "team_add_task.html";

//School Teacher
var GetSchoolTeacherInfoURL = "http://localhost:8080/GetSchoolTeacherInformationServlet"
    , GetSchoolTeacherModifyItemURL = "http://localhost:8080/GetCanModifiedPracticeBySchoolTeacherIdServlet";

var CreateNewPTURL = "school_teacher_publish_pt.html"
    , SchoolPTListURL = "school_pt_list.html"
    , ModifyPTURL = "school_teacher_modify_pt.html"
    , SchoolTeacherHomepageURL = "homepage_school_teacher.html"
    , SchoolTeacherAddPTItemURL = "school_teacher_add_pt_item.html"
    , SchoolTeacherModifyPTDetailURL = "school_teacher_add_pt_item.html";

//CompanyTeacher
var GetTeamInProjectURL = "http://localhost:8080/GetTeamInProjectServlet"
    , GetCompanyTeacherInfoURL = "http://localhost:8080/GetCompanyTeacherInformationServlet"
    , GetCompanyNameURL = "http://localhost:8080/GetCompanyInformationServlet"
    , GetSchoolTeacherInPTURL = "http://localhost:8080/GetSchoolTeacherByPracticeIdServlet"
    , GetCompanyTeacherInPTURL = "http://localhost:8080/GetCompanyTeacherByPracticeIdServlet"
    , GetCompanyTeacherModifyItemURL = "http://localhost:8080/GetCanModifiedPracticeByCompanyTeacherIdServlet"
    , DeletePTURL = "http://localhost:8080/DeletePracticeServlet"
    , CreatePTURL = "http://localhost:8080/CreatePracticeServlet"
    , ModifyItemURL = "http://localhost:8080/ModifyProjectServlet"
    , DeleteItemURL = "http://localhost:8080/DeleteProjectServlet"
    , GetPTInfoURL = "http://localhost:8080/GetPracticeInformationServlet"
    , CreateItemURL = "http://localhost:8080/CreateProjectServlet"
    , AddSchoolTeacherToItemURL = "http://localhost:8080/AddSchoolTeacherToPracticeServlet"
    , DeleteTeacherFromPTURL = "http://localhost:8080/DeleteTeacherFromPracticeServlet"
    , ScoreForTeamURL = "http://localhost:8080/ScoreForTeamServlet"
    , ScoreForStudentURL = "http://localhost:8080/ScoreForStudentServlet"
    , GetPTInChargeURL = "http://localhost:8080/GetPracticeNowByCompanyTeacherIdServlet"
    , GetItemInChargeURL = "http://localhost:8080/GetCanScoredProjectServlet"
    , GetStudentInItemURL = "http://localhost:8080/GetStudentsByProjectIdServlet"
    , GetPTWeekURL = "http://localhost:8080/GetWeekByPracticeIdServlet"
    , GetStudentDiaryByPTandWeekURL = "http://localhost:8080/GetDiaryByStudentProjectWeekServlet"
    , CompanyTeacherReviewDiaryURL = "http://localhost:8080/ReviewDiaryServlet";

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
var GetSchoolTeacherListURL = "http://localhost:8080/GetSchoolTeacherBySchoolIdServlet"
    , AddSchoolTeacherToPTURL = "http://localhost:8080/AddSchoolTeacherToPracticeServlet";

//Company

//共有URL
var HomepageURL = ""
    , QuitURL = "../login.html"
    , ChangeInfoURL = "../login.html"
    , SafetyURL = "../safety_info.html"
    , GetStudentServletURL = "http://localhost:8080/GetStudentInformationServlet"
    , GetCompanyTeacherServletURL = "http://localhost:8080/GetCompanyTeacherInformationServlet"
    , GetSchoolTeacherServletURL = "http://localhost:8080/GetSchoolTeacherInformationServlet"
    , GetCompanyServletURL = "http://localhost:8080/GetCompanyInformationServlet"
    , GetAnyUserServlet = ""
    , GetHeadImgURL = "http://localhost:8080/DownloadServlet?head=";
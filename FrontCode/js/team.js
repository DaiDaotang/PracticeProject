// JavaScript source code
var HomepageURL = "homepage_team.html"
    , TeamDiaryURL = "team_diary.html"
    , TeamMemberURL = "team_list.html"
    , TeamProgressURL = "team_progress.html";

document.getElementById("team_homepage").href = HomepageURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&team_id=" + t_param[`team_id`];
document.getElementById("team_diary").href = TeamDiaryURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&team_id=" + t_param[`team_id`];
document.getElementById("team_progress").href = TeamProgressURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&team_id=" + t_param[`team_id`];
document.getElementById("team_list_whole").href = TeamMemberURL + "?user_id=" + t_param[`user_id`] + "&user_authority=" + t_param[`user_authority`] + "&team_id=" + t_param[`team_id`];

//��ȡ��Ա���ֲ�����˵���
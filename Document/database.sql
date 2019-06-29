/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : database

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 29/06/2019 12:00:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company`  (
  `companyId` int(11) NOT NULL AUTO_INCREMENT,
  `companyPhone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `companyPassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `companyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `companyHead` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`companyId`) USING BTREE,
  UNIQUE INDEX `companyPhone_UNIQUE`(`companyPhone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES (1, '789789789', '12345687', '好公司', 'b549cd34-4fb3-47e9-a258-2b338d17fcb3.jpg');
INSERT INTO `company` VALUES (9, '879789789', '45645645', '不好公司', NULL);
INSERT INTO `company` VALUES (10, '15035749969', '46456456', '健身房的', NULL);
INSERT INTO `company` VALUES (11, '12478945611', '123456', '阀手动', NULL);
INSERT INTO `company` VALUES (12, '12347778989', '123456', '的说法为', NULL);

-- ----------------------------
-- Table structure for companyteacher
-- ----------------------------
DROP TABLE IF EXISTS `companyteacher`;
CREATE TABLE `companyteacher`  (
  `teacherId` int(11) NOT NULL AUTO_INCREMENT,
  `teacherPhone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacherPassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacherName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacherSex` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacherHead` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `companyId` int(11) NOT NULL,
  PRIMARY KEY (`teacherId`) USING BTREE,
  UNIQUE INDEX `tel_UNIQUE`(`teacherPhone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of companyteacher
-- ----------------------------
INSERT INTO `companyteacher` VALUES (1, '789789789', '12345687', '好老师', '女', '83ebbd8c-c6a1-486d-9b3d-916b6744554a.jpg', 1);
INSERT INTO `companyteacher` VALUES (15, '12345678988', '123456', '123', '男', NULL, 9);
INSERT INTO `companyteacher` VALUES (19, '12345678989', '123456', '范文芳', '男', NULL, 9);

-- ----------------------------
-- Table structure for pracctrelation
-- ----------------------------
DROP TABLE IF EXISTS `pracctrelation`;
CREATE TABLE `pracctrelation`  (
  `practiceId` int(11) NOT NULL,
  `companyTeacherId` int(11) NOT NULL,
  `isMain` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`practiceId`, `companyTeacherId`) USING BTREE,
  INDEX `pracctTeacherId_idx`(`companyTeacherId`) USING BTREE,
  CONSTRAINT `pracctPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiceid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pracctTeacherId` FOREIGN KEY (`companyTeacherId`) REFERENCES `companyteacher` (`teacherid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pracctrelation
-- ----------------------------
INSERT INTO `pracctrelation` VALUES (14, 15, '1');

-- ----------------------------
-- Table structure for pracstrelation
-- ----------------------------
DROP TABLE IF EXISTS `pracstrelation`;
CREATE TABLE `pracstrelation`  (
  `practiceId` int(11) NOT NULL,
  `schoolTeacherId` int(11) NOT NULL,
  `isMain` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`practiceId`, `schoolTeacherId`) USING BTREE,
  INDEX `practTeacherId_idx`(`schoolTeacherId`) USING BTREE,
  CONSTRAINT `pracstPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiceid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pracstTeacherId` FOREIGN KEY (`schoolTeacherId`) REFERENCES `schoolteacher` (`schoolteacherid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pracstrelation
-- ----------------------------
INSERT INTO `pracstrelation` VALUES (13, 2, '1');

-- ----------------------------
-- Table structure for practice
-- ----------------------------
DROP TABLE IF EXISTS `practice`;
CREATE TABLE `practice`  (
  `practiceId` int(11) NOT NULL AUTO_INCREMENT,
  `practiceName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `practiceContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `starttime` date NOT NULL,
  `endtime` date NOT NULL,
  `template` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`practiceId`) USING BTREE,
  INDEX `practiecId`(`practiceId`) USING BTREE,
  INDEX `practiecId_2`(`practiceId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of practice
-- ----------------------------
INSERT INTO `practice` VALUES (4, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', '武汉大学模板20190628-17-42-14.doc');
INSERT INTO `practice` VALUES (5, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (6, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (7, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (8, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (9, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (10, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (11, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (12, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (13, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);
INSERT INTO `practice` VALUES (14, '2017实训', '我法术等级分厘卡积分哦i我激烈是链接发啦上看见分厘卡十分到家啦十九分', '2017-05-09', '2017-05-09', NULL);

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `projectId` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectDifficulty` int(11) NOT NULL,
  `projectIntroduce` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectBaseContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectExtendContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `projectAdvanceContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `projectPracticeId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`) USING BTREE,
  INDEX `practiceId_idx`(`projectPracticeId`) USING BTREE,
  INDEX `projectId`(`projectId`) USING BTREE,
  CONSTRAINT `practiceId` FOREIGN KEY (`projectPracticeId`) REFERENCES `practice` (`practiceId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (2, '实训平台开发', '数据分析', 5, '开发一个实训平台', '开发开发开发一个实训平台噢噢噢噢', NULL, NULL, 4);
INSERT INTO `project` VALUES (3, '实训平台开发', '数据分析', 8, '开发一个实训平台', '开发开发开发一个实训平台噢噢噢噢', NULL, '人脸识别', 4);
INSERT INTO `project` VALUES (4, '实训平台开发', '数据分析', 4, '开发一个实训平台', '开发开发开发一个实训平台噢噢噢噢', NULL, '人脸识别', 4);
INSERT INTO `project` VALUES (5, '实训平台开发', '数据分析', 6, '开发一个实训平台', '开发开发开发一个实训平台噢噢噢噢', NULL, '人脸识别', 4);
INSERT INTO `project` VALUES (14, '实训平台开发', '数据分析', 4, '开发一个实训平台', '开发开发开发一个实训平台噢噢噢噢', NULL, '人脸识别', 4);

-- ----------------------------
-- Table structure for projtrelation
-- ----------------------------
DROP TABLE IF EXISTS `projtrelation`;
CREATE TABLE `projtrelation`  (
  `projectId` int(11) NOT NULL,
  `companyTeacherId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`, `companyTeacherId`) USING BTREE,
  INDEX `projtTeacherId_idx`(`companyTeacherId`) USING BTREE,
  CONSTRAINT `projtProjectId` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `projtTeacherId` FOREIGN KEY (`companyTeacherId`) REFERENCES `companyteacher` (`teacherid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projtrelation
-- ----------------------------
INSERT INTO `projtrelation` VALUES (2, 1);
INSERT INTO `projtrelation` VALUES (14, 1);
INSERT INTO `projtrelation` VALUES (2, 15);
INSERT INTO `projtrelation` VALUES (14, 15);
INSERT INTO `projtrelation` VALUES (4, 19);
INSERT INTO `projtrelation` VALUES (14, 19);

-- ----------------------------
-- Table structure for pscrelation
-- ----------------------------
DROP TABLE IF EXISTS `pscrelation`;
CREATE TABLE `pscrelation`  (
  `practiceId` int(11) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  PRIMARY KEY (`practiceId`, `schoolId`, `companyId`) USING BTREE,
  INDEX `schoolId_idx`(`schoolId`) USING BTREE,
  INDEX `companyId_idx`(`companyId`) USING BTREE,
  CONSTRAINT `pscCompanyId` FOREIGN KEY (`companyId`) REFERENCES `company` (`companyid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pscPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiceId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pscSchoolId` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pscrelation
-- ----------------------------
INSERT INTO `pscrelation` VALUES (4, 1, 1);
INSERT INTO `pscrelation` VALUES (5, 1, 1);
INSERT INTO `pscrelation` VALUES (6, 1, 1);
INSERT INTO `pscrelation` VALUES (7, 1, 1);
INSERT INTO `pscrelation` VALUES (8, 1, 1);
INSERT INTO `pscrelation` VALUES (9, 1, 1);
INSERT INTO `pscrelation` VALUES (10, 1, 1);
INSERT INTO `pscrelation` VALUES (11, 1, 1);
INSERT INTO `pscrelation` VALUES (12, 1, 1);
INSERT INTO `pscrelation` VALUES (13, 1, 1);
INSERT INTO `pscrelation` VALUES (14, 1, 1);

-- ----------------------------
-- Table structure for school
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school`  (
  `schoolId` int(11) NOT NULL AUTO_INCREMENT,
  `schoolName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`schoolId`) USING BTREE,
  UNIQUE INDEX `schoolName_UNIQUE`(`schoolName`) USING BTREE,
  INDEX `schoolId`(`schoolId`) USING BTREE,
  INDEX `schoolId_2`(`schoolId`) USING BTREE,
  INDEX `schoolId_3`(`schoolId`) USING BTREE,
  INDEX `schoolId_4`(`schoolId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES (3, '华中师范大学');
INSERT INTO `school` VALUES (2, '华中科技大学');
INSERT INTO `school` VALUES (1, '武汉大学');

-- ----------------------------
-- Table structure for schoolteacher
-- ----------------------------
DROP TABLE IF EXISTS `schoolteacher`;
CREATE TABLE `schoolteacher`  (
  `schoolteacherId` int(11) NOT NULL AUTO_INCREMENT,
  `schoolteacherPhone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolteacherPassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolteacherName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolTeacherSex` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolteacherHead` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `schoolId` int(11) NOT NULL,
  PRIMARY KEY (`schoolteacherId`) USING BTREE,
  UNIQUE INDEX `schoolteacherPhone_UNIQUE`(`schoolteacherPhone`) USING BTREE,
  INDEX `stSchoolId_idx`(`schoolId`) USING BTREE,
  CONSTRAINT `stSchoolId` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schoolteacher
-- ----------------------------
INSERT INTO `schoolteacher` VALUES (2, '789789789', '12345687', '好老师', '女', NULL, 1);
INSERT INTO `schoolteacher` VALUES (3, '15827082200', '123456', '龙哥', '男', NULL, 1);
INSERT INTO `schoolteacher` VALUES (4, '15827082118', '123456', '戴经理', '男', NULL, 1);
INSERT INTO `schoolteacher` VALUES (5, '15022225555', 'ccc999', '坏老师', '女', NULL, 2);
INSERT INTO `schoolteacher` VALUES (29, '15022225556', '123456', '大哥', '男', NULL, 2);
INSERT INTO `schoolteacher` VALUES (81, '12345678900', '123456', '123', '男', NULL, 3);
INSERT INTO `schoolteacher` VALUES (82, '17588889999', '456789', '士大夫', '男', NULL, 3);
INSERT INTO `schoolteacher` VALUES (83, '12347778989', '123456', 'i微软也', '男', '1393a4e6-6654-4149-802b-07d6cb649a71.jpg', 3);

-- ----------------------------
-- Table structure for signin
-- ----------------------------
DROP TABLE IF EXISTS `signin`;
CREATE TABLE `signin`  (
  `signinId` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `signinDate` date NOT NULL,
  `signinTime` time(0) NULL DEFAULT NULL,
  `atwork` tinyint(1) NOT NULL,
  PRIMARY KEY (`signinId`) USING BTREE,
  INDEX `signStudentId_idx`(`studentId`) USING BTREE,
  CONSTRAINT `signStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of signin
-- ----------------------------
INSERT INTO `signin` VALUES (1, 25, '2017-05-10', '11:59:44', 1);
INSERT INTO `signin` VALUES (2, 25, '2017-05-10', '11:59:47', 1);
INSERT INTO `signin` VALUES (3, 25, '2017-06-28', '11:59:50', 0);

-- ----------------------------
-- Table structure for stprelation
-- ----------------------------
DROP TABLE IF EXISTS `stprelation`;
CREATE TABLE `stprelation`  (
  `studentId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `studentscores` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`studentId`, `teamId`, `projectId`) USING BTREE,
  INDEX `stpTeamId_idx`(`teamId`) USING BTREE,
  INDEX `stpProject_idx`(`projectId`) USING BTREE,
  CONSTRAINT `stpProject` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stpStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stpTeamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stprelation
-- ----------------------------
INSERT INTO `stprelation` VALUES (35, 3, 3, NULL);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `studentId` int(11) NOT NULL AUTO_INCREMENT,
  `studentPhone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentPassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolId` int(11) NOT NULL,
  `studentNumber` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentGrade` year NOT NULL,
  `studentMajor` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentHead` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `studentSex` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`studentId`) USING BTREE,
  UNIQUE INDEX `studentPhone_UNIQUE`(`studentPhone`) USING BTREE,
  INDEX `studentId`(`studentId`) USING BTREE,
  INDEX `studentId_2`(`studentId`) USING BTREE,
  INDEX `studentId_3`(`studentId`) USING BTREE,
  INDEX `studentId_4`(`studentId`) USING BTREE,
  INDEX `studentId_5`(`studentId`) USING BTREE,
  INDEX `studentId_6`(`studentId`) USING BTREE,
  INDEX `studentId_7`(`studentId`) USING BTREE,
  INDEX `studentId_8`(`studentId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '789789789', '12345687', '好学生', 1, '2017302584444', 2017, '计算机学院', '', '女');
INSERT INTO `student` VALUES (25, '12345655500', '123456789', '士大夫', 3, '1231654', 2017, '撒旦飞洒', NULL, '男');
INSERT INTO `student` VALUES (26, '45632166600', '123456', '222', 2, '222', 2017, '222', NULL, '男');
INSERT INTO `student` VALUES (27, '22255588800', '222222', '222', 2, '222', 2017, '222', NULL, '男');
INSERT INTO `student` VALUES (28, '66688899977', '000000', '第三方', 1, '564654', 2017, '564654654', NULL, '男');
INSERT INTO `student` VALUES (29, '77755544400', '123456', '萨尔', 3, '98787897897', 2017, '撒旦飞洒', NULL, '男');
INSERT INTO `student` VALUES (30, '12347778989', '123456', '语文阅', 3, '789456123', 2017, '遥感', NULL, '男');
INSERT INTO `student` VALUES (34, '78954554555', '123456', '风味儿', 3, '45645', 2017, '456456', 'd4aca98d-28bf-4ca7-8e09-ff7caae9dd17.jpg', '男');
INSERT INTO `student` VALUES (35, '15035749969', 'cjx991027', '常佳鑫', 1, '2017302580168', 2017, '软件工程', NULL, '男');

-- ----------------------------
-- Table structure for studentdiary
-- ----------------------------
DROP TABLE IF EXISTS `studentdiary`;
CREATE TABLE `studentdiary`  (
  `studentdiaryId` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `studentDiaryDate` date NOT NULL,
  `studentDiaryTitle` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentDiaryContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isweeklyreport` tinyint(1) NOT NULL,
  `projectId` int(11) NOT NULL,
  PRIMARY KEY (`studentdiaryId`) USING BTREE,
  INDEX `sdStudentId_idx`(`studentId`) USING BTREE,
  INDEX `sdProjectId`(`projectId`) USING BTREE,
  CONSTRAINT `sdStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sdProjectId` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for teacherdiary
-- ----------------------------
DROP TABLE IF EXISTS `teacherdiary`;
CREATE TABLE `teacherdiary`  (
  `teacherdiaryId` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) NOT NULL,
  `teacherDiaryDate` date NOT NULL,
  `teacherDiaryTitle` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacherDiaryContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teacherdiaryId`) USING BTREE,
  INDEX `tdTeacherId_idx`(`teacherId`) USING BTREE,
  CONSTRAINT `tdTeacherId` FOREIGN KEY (`teacherId`) REFERENCES `companyteacher` (`teacherid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team`  (
  `teamId` int(11) NOT NULL AUTO_INCREMENT,
  `teamName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `captainId` int(11) NOT NULL,
  `teamScores` int(11) NULL DEFAULT NULL,
  `githubLink` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`teamId`) USING BTREE,
  INDEX `teamCaptainId_idx`(`captainId`) USING BTREE,
  INDEX `teamId`(`teamId`) USING BTREE,
  CONSTRAINT `teamCaptainId` FOREIGN KEY (`captainId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES (3, '王者3缺2', 35, NULL, NULL);

-- ----------------------------
-- Table structure for teamdiary
-- ----------------------------
DROP TABLE IF EXISTS `teamdiary`;
CREATE TABLE `teamdiary`  (
  `teamdiaryId` int(11) NOT NULL AUTO_INCREMENT,
  `teamId` int(11) NOT NULL,
  `teamDiaryDate` date NOT NULL,
  `isweeklyreport` tinyint(1) NOT NULL,
  `teamDiaryTitle` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teamDiaryContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teamdiaryId`) USING BTREE,
  INDEX `tdTeamId_idx`(`teamId`) USING BTREE,
  CONSTRAINT `tdTeamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

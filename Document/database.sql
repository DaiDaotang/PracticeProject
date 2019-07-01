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

 Date: 01/07/2019 11:57:34
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
  UNIQUE INDEX `tel_UNIQUE`(`teacherPhone`) USING BTREE,
  INDEX `companyTeacherCompanyID`(`companyId`) USING BTREE,
  CONSTRAINT `companyTeacherCompanyID` FOREIGN KEY (`companyId`) REFERENCES `company` (`companyid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
  CONSTRAINT `sdProjectId` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sdStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT
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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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

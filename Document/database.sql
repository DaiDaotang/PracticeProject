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

 Date: 27/06/2019 09:21:58
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
  `companyHead` blob NULL,
  PRIMARY KEY (`companyId`) USING BTREE,
  UNIQUE INDEX `companyPhone_UNIQUE`(`companyPhone`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for companyteacher
-- ----------------------------
DROP TABLE IF EXISTS `companyteacher`;
CREATE TABLE `companyteacher`  (
  `teacherId` int(11) NOT NULL AUTO_INCREMENT,
  `teacherPhone` int(11) NOT NULL,
  `teacherPassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacherName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `companyId` int(11) NOT NULL,
  `teacherHead` blob NULL,
  `teacherSex` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teacherId`) USING BTREE,
  UNIQUE INDEX `tel_UNIQUE`(`teacherPhone`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for practice
-- ----------------------------
DROP TABLE IF EXISTS `practice`;
CREATE TABLE `practice`  (
  `practiecId` int(11) NOT NULL AUTO_INCREMENT,
  `practiceName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `practiecContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `starttime` date NOT NULL,
  `endtime` date NOT NULL,
  PRIMARY KEY (`practiecId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for practiceproject
-- ----------------------------
DROP TABLE IF EXISTS `practiceproject`;
CREATE TABLE `practiceproject`  (
  `projectId` int(11) NOT NULL AUTO_INCREMENT,
  `projectType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectDifficulty` int(11) NOT NULL,
  `projectIntroduce` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectBaseContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectExtendContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `projectAdvanceContent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `projectPracticeId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`) USING BTREE,
  INDEX `practiceId_idx`(`projectPracticeId`) USING BTREE,
  CONSTRAINT `practiceId` FOREIGN KEY (`projectPracticeId`) REFERENCES `practice` (`practiecid`) ON DELETE RESTRICT ON UPDATE RESTRICT
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
  CONSTRAINT `pscPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiecid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
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
  INDEX `schoolId`(`schoolId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for schoolteacher
-- ----------------------------
DROP TABLE IF EXISTS `schoolteacher`;
CREATE TABLE `schoolteacher`  (
  `schoolteacherId` int(11) NOT NULL AUTO_INCREMENT,
  `schoolteacherPhone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolteacherPassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolteacherName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolteacherHead` blob NULL,
  `schoolTeacherSex` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolId` int(11) NOT NULL,
  PRIMARY KEY (`schoolteacherId`) USING BTREE,
  UNIQUE INDEX `schoolteacherPhone_UNIQUE`(`schoolteacherPhone`) USING BTREE,
  INDEX `stSchoolId_idx`(`schoolId`) USING BTREE,
  CONSTRAINT `stSchoolId` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for signin
-- ----------------------------
DROP TABLE IF EXISTS `signin`;
CREATE TABLE `signin`  (
  `signinId` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `signinDate` date NOT NULL,
  `signinTime` datetime(0) NOT NULL,
  `atwork` tinyint(1) NOT NULL,
  PRIMARY KEY (`signinId`) USING BTREE,
  INDEX `signStudentId_idx`(`studentId`) USING BTREE,
  CONSTRAINT `signStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for stprelation
-- ----------------------------
DROP TABLE IF EXISTS `stprelation`;
CREATE TABLE `stprelation`  (
  `studentId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `practiceId` int(11) NOT NULL,
  `studentscores` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`studentId`, `teamId`, `practiceId`) USING BTREE,
  INDEX `stpPracticeId_idx`(`practiceId`) USING BTREE,
  INDEX `stpTeamId_idx`(`teamId`) USING BTREE,
  CONSTRAINT `stpPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiecid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stpStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stpTeamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `studentId` int(11) NOT NULL AUTO_INCREMENT,
  `studentPhone` int(11) NOT NULL,
  `studentPassword` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schoolId` int(11) NOT NULL,
  `studentNumber` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentGrade` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `studentMajor` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentHead` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `studentSex` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`studentId`) USING BTREE,
  UNIQUE INDEX `studentPhone_UNIQUE`(`studentPhone`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for studentdiary
-- ----------------------------
DROP TABLE IF EXISTS `studentdiary`;
CREATE TABLE `studentdiary`  (
  `studentdiaryId` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `studentDiaryDate` date NOT NULL,
  `studentDiaryContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isweeklyreport` tinyint(1) NOT NULL,
  PRIMARY KEY (`studentdiaryId`) USING BTREE,
  INDEX `sdStudentId_idx`(`studentId`) USING BTREE,
  CONSTRAINT `sdStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for teacherdiary
-- ----------------------------
DROP TABLE IF EXISTS `teacherdiary`;
CREATE TABLE `teacherdiary`  (
  `teacherdiaryId` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) NOT NULL,
  `teacherDiaryDate` date NOT NULL,
  `teacherDiaryContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teacherdiaryId`) USING BTREE,
  INDEX `tdTeacherId_idx`(`teacherId`) USING BTREE,
  CONSTRAINT `tdTeacherId` FOREIGN KEY (`teacherId`) REFERENCES `companyteacher` (`teacherId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
  CONSTRAINT `teamCaptainId` FOREIGN KEY (`captainId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for teamdiary
-- ----------------------------
DROP TABLE IF EXISTS `teamdiary`;
CREATE TABLE `teamdiary`  (
  `teamdiaryId` int(11) NOT NULL AUTO_INCREMENT,
  `teamId` int(11) NOT NULL,
  `teamDiaryDate` date NOT NULL,
  `isweeklyreport` tinyint(1) NOT NULL,
  `teamDiaryContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teamdiaryId`) USING BTREE,
  INDEX `tdTeamId_idx`(`teamId`) USING BTREE,
  CONSTRAINT `tdTeamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

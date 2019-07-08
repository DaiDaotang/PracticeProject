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

 Date: 08/07/2019 18:58:51
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
  UNIQUE INDEX `companyPhone_UNIQUE`(`companyPhone`) USING BTREE,
  INDEX `companyId`(`companyId`) USING BTREE,
  INDEX `companyId_2`(`companyId`) USING BTREE,
  INDEX `companyId_3`(`companyId`) USING BTREE,
  INDEX `companyId_4`(`companyId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES (1, '42345678901', '123456', '爱学记（北京）咨询服务有限公司', NULL);
INSERT INTO `company` VALUES (2, '42345678902', '123456', '凡诺软件技术有限公司', NULL);
INSERT INTO `company` VALUES (3, '42345678903', '123456', '巨人网络游戏公司', NULL);

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
  INDEX `teacherId`(`teacherId`) USING BTREE,
  INDEX `teacherId_2`(`teacherId`) USING BTREE,
  INDEX `teacherId_3`(`teacherId`) USING BTREE,
  CONSTRAINT `companyTeacherCompanyID` FOREIGN KEY (`companyId`) REFERENCES `company` (`companyid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of companyteacher
-- ----------------------------
INSERT INTO `companyteacher` VALUES (1, '22345678901', '123456', '企1老师', '女', NULL, 1);
INSERT INTO `companyteacher` VALUES (2, '22345678902', '123456', '企2老师', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (3, '22345678903', '123456', '企3老师', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (4, '22345678904', '123456', '企4老师', '女', NULL, 1);
INSERT INTO `companyteacher` VALUES (5, '22345678905', '123456', '企5老师', '男', NULL, 1);

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
  CONSTRAINT `pracctPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiceid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pracctTeacherId` FOREIGN KEY (`companyTeacherId`) REFERENCES `companyteacher` (`teacherid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pracctrelation
-- ----------------------------
INSERT INTO `pracctrelation` VALUES (19, 1, '1');
INSERT INTO `pracctrelation` VALUES (19, 2, '0');
INSERT INTO `pracctrelation` VALUES (19, 3, '0');
INSERT INTO `pracctrelation` VALUES (19, 4, '0');
INSERT INTO `pracctrelation` VALUES (19, 5, '0');
INSERT INTO `pracctrelation` VALUES (20, 1, '1');
INSERT INTO `pracctrelation` VALUES (20, 3, '0');
INSERT INTO `pracctrelation` VALUES (20, 4, '0');
INSERT INTO `pracctrelation` VALUES (20, 5, '0');
INSERT INTO `pracctrelation` VALUES (21, 1, '1');
INSERT INTO `pracctrelation` VALUES (21, 2, '0');
INSERT INTO `pracctrelation` VALUES (21, 3, '0');
INSERT INTO `pracctrelation` VALUES (21, 4, '0');
INSERT INTO `pracctrelation` VALUES (21, 5, '0');
INSERT INTO `pracctrelation` VALUES (23, 1, '1');
INSERT INTO `pracctrelation` VALUES (24, 1, '1');
INSERT INTO `pracctrelation` VALUES (24, 2, '0');
INSERT INTO `pracctrelation` VALUES (24, 3, '0');
INSERT INTO `pracctrelation` VALUES (24, 4, '0');
INSERT INTO `pracctrelation` VALUES (25, 1, '0');
INSERT INTO `pracctrelation` VALUES (25, 2, '0');
INSERT INTO `pracctrelation` VALUES (25, 3, '0');
INSERT INTO `pracctrelation` VALUES (25, 4, '0');
INSERT INTO `pracctrelation` VALUES (25, 5, '0');

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
  CONSTRAINT `pracstPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiceid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pracstTeacherId` FOREIGN KEY (`schoolTeacherId`) REFERENCES `schoolteacher` (`schoolteacherid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pracstrelation
-- ----------------------------
INSERT INTO `pracstrelation` VALUES (19, 1, '0');
INSERT INTO `pracstrelation` VALUES (19, 2, '0');
INSERT INTO `pracstrelation` VALUES (19, 3, '0');
INSERT INTO `pracstrelation` VALUES (19, 4, '0');
INSERT INTO `pracstrelation` VALUES (20, 1, '1');
INSERT INTO `pracstrelation` VALUES (20, 3, '0');
INSERT INTO `pracstrelation` VALUES (20, 4, '0');
INSERT INTO `pracstrelation` VALUES (21, 1, '1');
INSERT INTO `pracstrelation` VALUES (21, 2, '0');
INSERT INTO `pracstrelation` VALUES (21, 3, '0');
INSERT INTO `pracstrelation` VALUES (21, 4, '0');
INSERT INTO `pracstrelation` VALUES (24, 2, '0');
INSERT INTO `pracstrelation` VALUES (24, 3, '0');
INSERT INTO `pracstrelation` VALUES (24, 4, '0');
INSERT INTO `pracstrelation` VALUES (25, 1, '1');

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
  INDEX `practiecId_2`(`practiceId`) USING BTREE,
  INDEX `practiceId`(`practiceId`) USING BTREE,
  INDEX `practiceId_2`(`practiceId`) USING BTREE,
  INDEX `practiceId_3`(`practiceId`) USING BTREE,
  INDEX `practiceId_4`(`practiceId`) USING BTREE,
  INDEX `practiceId_5`(`practiceId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of practice
-- ----------------------------
INSERT INTO `practice` VALUES (19, '2017级第一次实训', '第一次实训', '2019-07-05', '2019-07-20', NULL);
INSERT INTO `practice` VALUES (20, '2017级第二次实训', '第二次', '2019-07-01', '2019-07-20', NULL);
INSERT INTO `practice` VALUES (21, '2017级第三次实训', '啊啊啊', '2019-07-01', '2019-07-16', NULL);
INSERT INTO `practice` VALUES (23, '发电方式大', '撒旦发射点发大水发射点发', '2019-01-18', '2019-02-09', NULL);
INSERT INTO `practice` VALUES (24, '2019八月实训', '八月实训', '2019-08-01', '2019-08-10', NULL);
INSERT INTO `practice` VALUES (25, '2019九月实训', '九月实训', '2019-09-06', '2019-09-30', NULL);

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `projectId` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectDifficulty` int(11) NOT NULL,
  `projectIntroduce` varchar(1500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectBaseContent` varchar(1500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `projectExtendContent` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `projectAdvanceContent` varchar(750) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `projectPracticeId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`) USING BTREE,
  INDEX `practiceId_idx`(`projectPracticeId`) USING BTREE,
  INDEX `projectId`(`projectId`) USING BTREE,
  INDEX `projectId_2`(`projectId`) USING BTREE,
  INDEX `projectId_3`(`projectId`) USING BTREE,
  INDEX `projectId_4`(`projectId`) USING BTREE,
  INDEX `projectId_5`(`projectId`) USING BTREE,
  INDEX `projectId_6`(`projectId`) USING BTREE,
  INDEX `projectId_7`(`projectId`) USING BTREE,
  INDEX `projectId_8`(`projectId`) USING BTREE,
  INDEX `projectId_9`(`projectId`) USING BTREE,
  CONSTRAINT `practiceId` FOREIGN KEY (`projectPracticeId`) REFERENCES `practice` (`practiceid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (17, '高校学者发现系统', 'Web，数据挖掘，数据分析', 6, '首先，知识图谱是一种特殊的图数据。\n其次，知识图谱是一种人类可识别且对机器友好的知识表示。\n再次，知识图谱自带语义，蕴涵逻辑含义和规则。\n作为一种应用型技术，知识图谱支撑了很多行业中的具体应用。例如：- 信息检索：搜索引擎中对实体信息的精准聚合和匹配、对关键词的理解以及对搜索意图的语义分析等；- 自然语言理解：知识图谱中的知识作为理解自然语言中实体和关系的背景信息；- 问答系统：匹配问答模式和知识图谱中知识子图之间的映射；- 推荐系统：将知识图谱作为一种辅助信息集成到推荐系统中以提供更加精准的推荐选项；利用网络爬虫技术，从国内外各大高校公开的网站和资源上，搜寻并下载各个高校专家，教授等学者信息，并为这些学者研究方向建立画像系统。用户可以按学校，专业，学科，论文，研究方向等各个维度去查看和对比各位学者的研究领域信息。\n', '本项目主要分为7个模块：专家主页数据爬取、论文信息爬取、基于专家画像的信息抽取、专家搜索引擎、专家研究方向提取、专家自我网络中主题圈发现、数据可视化\n	专家主页数据爬取：对各大高校的老师主页进行主页信息的爬取。\n	论文信息爬取：对“百度学术”/各个高校文摘系统上的海量论文进行论文摘要的爬取。\n	基于专家画像的信息抽取：对爬取的信息选择合适的机器学习算法进行分类训练、信息抽取。通过整合互联网上的专家数据，基于基本信息、任职生涯、研究方向等多方面构建出精准的专家画像。\n	专家搜索引擎：可以根据用户搜索词，匹配主题关键词并对主题内专家进行排序，使用户直观的获取所需专家信息，高效地解决了用户的专家搜索需求。\n	专家研究方向提取：通过数据挖掘技术，发现专家的研究兴趣方向变化情况，为学者分配具体的研究领域标签，便于考生更方便的找到合适的专家。\n	专家自我网络中主题圈发现：根据专家之间的合著关系，构建特定专家的自我网络，然后在此网络的基础上，挖掘出因隐性的主题圈，提取出每个主题圈的研究主题，以及存在于这个主题圈的专家有哪些。\n	数据可视化：对分析得到的各项信息进行数据可视化，以更直观的形式呈现在用户眼前\n', '1、	专家高级知识图谱\n2、	专家索引系统\n3、	根据用户搜索记录，自动推荐对应学者专家\n', '1、	对话式专家问答系统\n2、	基于知识图谱系统的模糊搜索功能\n3、	专家学术圈人脉分析\n', 20);
INSERT INTO `project` VALUES (18, '大学公共课程共享资源管理平台', 'Web/移动 ，数据分析', 6, '大学通识教育是这几年流行起来的一种教学方法。各个大学，各个院系各自有各自的教育资源和擅长的课程，但学生如果跨院系甚至跨学校来了解和参与这些课程，没有好的统一的一个平台来发现和参与。本系统提供一个将多个大学，多个院系的选修课集中在一起进行发布和管理的一个平台，学生可以在上面选择不同学校和不同院系的课程来参与.', '1.用户管理:学生用户和教师用户分类注册和管理，包括用户信息记录，用户登录/验证，用户注册，密码找回等。 \n2.课程管理 管理员可以录入各个学院的专业课程，提供课程信息录入，课程查询，课程详细信息描述等。 每个学校，院系管理员可以录入自己院校课程的课程信息\n3.网络爬虫  利用爬虫技术，从各个院系官网自动寻找课程信息的增加，修改和课程内容。\n4.系统管理 安全管理和基本信息管理； \n5 晒课功能：每个院系管理员可以讲推荐的精品课程推送首页\n6 推荐和评分功能：学生可以给每个课程或者老师进行评分，并可以把自己认为较好的课程分享到微信/QQ等社交平台\n\n', '1 自动分析热点课程和热点资源\n2 课程更新后，自动获取更新信息\n3 根据课程点击率和每个课程的推荐数目以及停留时间，自动判定精品课程\n4 语义分析，自动判断和屏蔽不符合政策和规定的言论。\n5 情绪分析，根据留言判断留言的类别(乐观/悲观)。\n', '1 学生学习轨迹记录\n2 每个学生对每个课程的学习记录\n3 建立资源中心，为所有老师学生提供教学和学习资源\n', 20);
INSERT INTO `project` VALUES (19, '高校实训实习管理平台', 'Web，数据分析，移动应用', 10, '高校学生的实习和实训，涉及到学生，实训公司，实习公司和校方多个单位。学生在企业实训实习时，一般采用企业管理制度，和学校的管理方法不一致。很多实习都在外地进行，校方很难直接对学生管理。这样学生在实习和实训期间就脱离了校方老师的管理，容易出现问题。学生的实习和实训流程，都由企业负责，学校只能到最后才能得到结果。所以需要一个平台，可以把企业，学生和学校三者联系在一起。企业可以通过该平台创建和管理实训项目，学习加入实训实习项目后，在该平台提交各个文档和资料，学校可以实时查看每个学生的实习实训进度，有任何问题，可以直接通过该平台沟通三方。\n（该项目为实际需求的商业项目，学生完成后如果通过验收，瑞通公司可以购买或者推荐给类似实习企业使用，或者可以帮助学生直接建立一个第三方平台，为有需求的学校和企业使用。）\n', '1 企业管理功能：\n实训/实习管理：注册和企业管理员指定；创建实训项目，定义实训内容和实训验收标准，制定实训流程和资源库，创建实训学校和团队。创建实训文档模板。团队实训结果评分，个人实训成绩评分。\n2 教师管理功能：\n实现学生动态全掌握，控制学生外出安全风险\n通过实习日志、总结，全面了解学生实习进程和状态\n在线指导、评价评分，快速便捷指导学生\n记录工作，实习数据生成，随时查看学生的进度和工作情况\n2 学生管理功能：\n加入实训团队，选择实训项目，选择和下载实训资源。日志提交，交流反馈，实训代码提交，实训模板下载。实训总结提交，团队记录查看，团队其他人流程查看等\n3 学校管理功能：\n实训/实习指导老师注册和登录。查看实训团队和成员信息，查看每个团队/个人的日志以及实训提交资料。直接与团队或者学生沟通。查看实训结果，对实训成果评分和评价；实现学生动态全掌握，控制学生外出安全风险；多角色在线实时协同，解决沟通不畅效率低下问题\n多维度数据统计报告，为评优、学科建设、招生就业等提供科学决策依据\n\n', '1提供学生和教师的APP版本。\n2 提供数据统计分析功能，实时数据流程图\n3 提供企业招聘入口\n4 提供学生简历生成和职位自动投递功能\n\n\n', '1 风险预警：学生签到异常或者日志提交异常时，自动触发风险预警机制。 \n2 人脸识别和GPS定位签到功能\n\n', 20);
INSERT INTO `project` VALUES (20, '自创项目', 'Web', 1, '暂无', '暂无', '暂无', '暂无', 20);
INSERT INTO `project` VALUES (21, '课程资源共享平台', 'web', 6, '啊啊啊', '啊啊啊啊', '', '', 21);
INSERT INTO `project` VALUES (28, '第一项目啊', '数据', 2, '第一个项目啊范德萨发文丰富的第三方巅峰赛阿斯蒂芬撒旦阀手动发顺丰暗室逢灯', '基本地方就爱上了放假啦违法解耦i有偶是法兰克福吉林省地方就啊', '扩展爱上发动机昂克赛拉', '高级', 19);
INSERT INTO `project` VALUES (29, '第二项目', '第二', 10, '式打法是', '士大夫阿斯蒂芬阿斯蒂芬', '阿斯蒂芬阿斯蒂阀手动', '啊沙发沙发大苏打阀手动阀手动发', 19);
INSERT INTO `project` VALUES (33, '萨芬的发', '撒旦发生第三方', 6, '士大夫的发射点阀手动发', '', '暂无', '暂无', 19);
INSERT INTO `project` VALUES (34, '我对你们的', '数据分析', 10, '的撒法撒旦发生', '士大夫手动阀手动发', '1、	专家高级知识图谱\n2、	专家索引系统\n3、	根据用户搜索记录，自动推荐对应学者专家\n', '1、	对话式专家问答系统\n2、	基于知识图谱系统的模糊搜索功能\n3、	专家学术圈人脉分析\n', 24);
INSERT INTO `project` VALUES (35, '我带你们打', '平台', 10, '手动阀手动阀手动阀', '撒旦飞洒阀手动阀手动撒旦发', '暂无', '暂无', 24);
INSERT INTO `project` VALUES (36, '梵蒂冈梵蒂冈地方官地方官', '覆盖豆腐干反对', 1, '手动阀手动阀', '士大夫阿斯蒂芬', '', '', 24);
INSERT INTO `project` VALUES (37, '第一', '安安', 6, '安安 ', '士大夫', '暂无', '暂无', 25);
INSERT INTO `project` VALUES (38, '第四个项目', '安安', 6, '第三方', '手动阀手动', '1提供学生和教师的APP版本。\n2 提供数据统计分析功能，实时数据流程图\n3 提供企业招聘入口\n4 提供学生简历生成和职位自动投递功能\n\n\n', '1 风险预警：学生签到异常或者日志提交异常时，自动触发风险预警机制。 \n2 人脸识别和GPS定位签到功能\n\n', 24);

-- ----------------------------
-- Table structure for projtrelation
-- ----------------------------
DROP TABLE IF EXISTS `projtrelation`;
CREATE TABLE `projtrelation`  (
  `projectId` int(11) NOT NULL,
  `companyTeacherId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`, `companyTeacherId`) USING BTREE,
  INDEX `projtTeacherId_idx`(`companyTeacherId`) USING BTREE,
  CONSTRAINT `projtProjectId` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projtTeacherId` FOREIGN KEY (`companyTeacherId`) REFERENCES `companyteacher` (`teacherid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projtrelation
-- ----------------------------
INSERT INTO `projtrelation` VALUES (17, 1);
INSERT INTO `projtrelation` VALUES (19, 1);
INSERT INTO `projtrelation` VALUES (20, 1);
INSERT INTO `projtrelation` VALUES (21, 1);
INSERT INTO `projtrelation` VALUES (28, 1);
INSERT INTO `projtrelation` VALUES (37, 1);
INSERT INTO `projtrelation` VALUES (29, 2);
INSERT INTO `projtrelation` VALUES (33, 2);
INSERT INTO `projtrelation` VALUES (34, 2);
INSERT INTO `projtrelation` VALUES (36, 2);
INSERT INTO `projtrelation` VALUES (37, 2);
INSERT INTO `projtrelation` VALUES (18, 3);
INSERT INTO `projtrelation` VALUES (19, 3);
INSERT INTO `projtrelation` VALUES (29, 3);
INSERT INTO `projtrelation` VALUES (34, 3);
INSERT INTO `projtrelation` VALUES (35, 3);
INSERT INTO `projtrelation` VALUES (37, 3);
INSERT INTO `projtrelation` VALUES (38, 3);
INSERT INTO `projtrelation` VALUES (18, 4);
INSERT INTO `projtrelation` VALUES (19, 4);
INSERT INTO `projtrelation` VALUES (29, 4);
INSERT INTO `projtrelation` VALUES (33, 4);
INSERT INTO `projtrelation` VALUES (34, 4);
INSERT INTO `projtrelation` VALUES (37, 4);
INSERT INTO `projtrelation` VALUES (19, 5);
INSERT INTO `projtrelation` VALUES (29, 5);
INSERT INTO `projtrelation` VALUES (33, 5);
INSERT INTO `projtrelation` VALUES (37, 5);

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
  CONSTRAINT `pscCompanyId` FOREIGN KEY (`companyId`) REFERENCES `company` (`companyid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pscPracticeId` FOREIGN KEY (`practiceId`) REFERENCES `practice` (`practiceid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pscSchoolId` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pscrelation
-- ----------------------------
INSERT INTO `pscrelation` VALUES (19, 1, 1);
INSERT INTO `pscrelation` VALUES (20, 1, 1);
INSERT INTO `pscrelation` VALUES (21, 1, 1);
INSERT INTO `pscrelation` VALUES (23, 1, 1);
INSERT INTO `pscrelation` VALUES (24, 1, 1);
INSERT INTO `pscrelation` VALUES (25, 1, 1);

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
  INDEX `schoolId_4`(`schoolId`) USING BTREE,
  INDEX `schoolId_5`(`schoolId`) USING BTREE,
  INDEX `schoolId_6`(`schoolId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES (3, '华中师范大学');
INSERT INTO `school` VALUES (2, '华中科技大学');
INSERT INTO `school` VALUES (1, '武汉大学');
INSERT INTO `school` VALUES (4, '武汉理工大学');
INSERT INTO `school` VALUES (5, '麻省理工大学');

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
  INDEX `schoolteacherId`(`schoolteacherId`) USING BTREE,
  CONSTRAINT `stSchoolId` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schoolteacher
-- ----------------------------
INSERT INTO `schoolteacher` VALUES (1, '32345678901', '123456', '学1老师', '男', NULL, 1);
INSERT INTO `schoolteacher` VALUES (2, '32345678902', '123456', '学2老师', '女', NULL, 1);
INSERT INTO `schoolteacher` VALUES (3, '32345678903', '123456', '学3老师', '男', NULL, 1);
INSERT INTO `schoolteacher` VALUES (4, '32345678904', '123456', '学4老师', '女', NULL, 1);

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
  CONSTRAINT `signStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of signin
-- ----------------------------
INSERT INTO `signin` VALUES (1, 1, '2019-07-01', '14:17:48', 1);
INSERT INTO `signin` VALUES (2, 1, '2019-07-01', '17:17:51', 0);
INSERT INTO `signin` VALUES (60, 1, '2019-07-05', '14:22:28', 1);
INSERT INTO `signin` VALUES (61, 1, '2019-07-06', '09:13:28', 1);
INSERT INTO `signin` VALUES (62, 1, '2019-07-06', '09:14:06', 0);
INSERT INTO `signin` VALUES (65, 1, '2019-07-04', '14:20:20', 1);
INSERT INTO `signin` VALUES (66, 1, '2019-07-04', '14:20:22', 0);
INSERT INTO `signin` VALUES (67, 1, '2019-07-04', '14:22:48', 1);
INSERT INTO `signin` VALUES (68, 1, '2019-07-06', '14:30:15', 1);
INSERT INTO `signin` VALUES (69, 1, '2019-07-08', '09:19:05', 1);
INSERT INTO `signin` VALUES (70, 1, '2019-07-06', '17:27:56', 0);
INSERT INTO `signin` VALUES (71, 1, '2019-07-07', '08:29:03', 1);
INSERT INTO `signin` VALUES (72, 1, '2019-07-07', '12:05:47', 0);
INSERT INTO `signin` VALUES (73, 1, '2019-07-07', '14:31:04', 1);
INSERT INTO `signin` VALUES (74, 1, '2019-07-07', '17:31:18', 0);
INSERT INTO `signin` VALUES (77, 1, '2019-07-08', '13:27:40', 0);
INSERT INTO `signin` VALUES (78, 1, '2019-07-08', '13:27:42', 1);
INSERT INTO `signin` VALUES (79, 1, '2019-07-08', '13:27:50', 0);
INSERT INTO `signin` VALUES (80, 1, '2019-07-08', '13:31:41', 1);
INSERT INTO `signin` VALUES (81, 1, '2019-07-08', '13:31:42', 0);
INSERT INTO `signin` VALUES (82, 1, '2019-07-08', '14:19:06', 1);

-- ----------------------------
-- Table structure for stprelation
-- ----------------------------
DROP TABLE IF EXISTS `stprelation`;
CREATE TABLE `stprelation`  (
  `studentId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `studentscores` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`studentId`, `teamId`) USING BTREE,
  INDEX `stpTeamId_idx`(`teamId`) USING BTREE,
  INDEX `stpProject_idx`(`projectId`) USING BTREE,
  CONSTRAINT `stpProject` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stpStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stpTeamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stprelation
-- ----------------------------
INSERT INTO `stprelation` VALUES (1, 12, 19, 100);
INSERT INTO `stprelation` VALUES (2, 12, 19, 100);
INSERT INTO `stprelation` VALUES (3, 12, 19, 100);
INSERT INTO `stprelation` VALUES (4, 12, 19, 100);
INSERT INTO `stprelation` VALUES (36, 6, 17, NULL);
INSERT INTO `stprelation` VALUES (37, 12, 19, 100);
INSERT INTO `stprelation` VALUES (44, 16, 37, NULL);

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
  INDEX `studentId_8`(`studentId`) USING BTREE,
  INDEX `studentId_9`(`studentId`) USING BTREE,
  INDEX `studentId_10`(`studentId`) USING BTREE,
  INDEX `studentId_11`(`studentId`) USING BTREE,
  INDEX `studentSchoolId`(`schoolId`) USING BTREE,
  INDEX `studentId_12`(`studentId`) USING BTREE,
  INDEX `studentId_13`(`studentId`) USING BTREE,
  INDEX `studentId_14`(`studentId`) USING BTREE,
  INDEX `studentId_15`(`studentId`) USING BTREE,
  INDEX `studentId_16`(`studentId`) USING BTREE,
  INDEX `studentId_17`(`studentId`) USING BTREE,
  INDEX `studentId_18`(`studentId`) USING BTREE,
  CONSTRAINT `studentSchoolId` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '12345678901', '123456', '常佳鑫', 1, '20170000001', 2017, '软件工程', '41f09f54-81c5-422e-8a6b-02690dc46f02.jpg', '男');
INSERT INTO `student` VALUES (2, '12345678902', '123456', '洪龙熙', 1, '20170000002', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (3, '12345678903', '123456', '戴道瑭', 1, '20170000003', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (4, '12345678904', '123456', '唐元鸣', 1, '20170000004', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (36, '01234567890', '123456', '啊啊啊', 1, '123456', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (37, '12345678905', '123456', '第五人', 1, '123456789705', 2017, '软件工程', NULL, '女');
INSERT INTO `student` VALUES (44, '12345678906', '123456', '第六人', 1, '201700000006', 2017, '软件工程', NULL, '男');

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
  `projectId` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `score` int(11) NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`studentdiaryId`) USING BTREE,
  INDEX `sdStudentId_idx`(`studentId`) USING BTREE,
  INDEX `sdProjectId`(`projectId`) USING BTREE,
  CONSTRAINT `sdProjectId` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sdStudentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentdiary
-- ----------------------------
INSERT INTO `studentdiary` VALUES (1, 1, '2019-07-05', '第一篇日志', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (2, 1, '2019-07-05', '2', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (3, 1, '2019-07-05', '3', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (4, 1, '2019-07-05', '4', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (5, 1, '2019-07-05', '第一篇日志', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (6, 1, '2019-07-05', '6', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (7, 1, '2019-07-05', '第一篇日志', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (8, 1, '2019-07-05', '2', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (9, 1, '2019-07-05', '3', '十九分零四大家flask积分', 19, 1, NULL, NULL);
INSERT INTO `studentdiary` VALUES (10, 1, '2019-07-05', '4', '十九分零四大家flask积分', 19, 1, NULL, NULL);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `taskId` int(11) NOT NULL AUTO_INCREMENT,
  `taskName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `taskContent` varchar(1023) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `taskAmount` int(11) NOT NULL,
  `taskPriority` int(11) NOT NULL,
  `taskWeek` int(11) NOT NULL,
  `isFinished` tinyint(4) NOT NULL,
  `teamId` int(11) NOT NULL,
  `finishTime` date NULL DEFAULT NULL,
  PRIMARY KEY (`taskId`) USING BTREE,
  INDEX `taskTeamId_idx`(`teamId`) USING BTREE,
  CONSTRAINT `taskTeamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  CONSTRAINT `tdTeacherId` FOREIGN KEY (`teacherId`) REFERENCES `companyteacher` (`teacherid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacherdiary
-- ----------------------------
INSERT INTO `teacherdiary` VALUES (1, 1, '2019-07-05', '第一天', '1');
INSERT INTO `teacherdiary` VALUES (2, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (3, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (4, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (5, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (6, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (7, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (8, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (9, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (10, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (11, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (12, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (13, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (14, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (15, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (16, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (17, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (18, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (19, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (20, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (21, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (22, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (23, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (24, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (25, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (26, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (27, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (28, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (29, 1, '2019-07-05', '第三方', '手动阀手动阀');
INSERT INTO `teacherdiary` VALUES (30, 1, '2019-07-05', '第三方', '手动阀手动阀');

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
  INDEX `teamId_2`(`teamId`) USING BTREE,
  INDEX `teamId_3`(`teamId`) USING BTREE,
  INDEX `teamId_4`(`teamId`) USING BTREE,
  INDEX `teamId_5`(`teamId`) USING BTREE,
  INDEX `teamId_6`(`teamId`) USING BTREE,
  INDEX `teamId_7`(`teamId`) USING BTREE,
  INDEX `teamId_8`(`teamId`) USING BTREE,
  INDEX `teamId_9`(`teamId`) USING BTREE,
  INDEX `teamId_10`(`teamId`) USING BTREE,
  INDEX `teamId_11`(`teamId`) USING BTREE,
  INDEX `teamId_12`(`teamId`) USING BTREE,
  CONSTRAINT `teamCaptainId` FOREIGN KEY (`captainId`) REFERENCES `student` (`studentid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES (5, '王者四缺一队大锅饭大概', 1, 100, 'www.87987987.com');
INSERT INTO `team` VALUES (6, '王者四缺一队', 36, 100, 'www.baiduaaa.com');
INSERT INTO `team` VALUES (12, '王者四缺一', 2, 100, 'https://github.com/DaiDaotang/PracticeProject');
INSERT INTO `team` VALUES (16, '释放空间为了', 44, NULL, '');

-- ----------------------------
-- Table structure for teamdiary
-- ----------------------------
DROP TABLE IF EXISTS `teamdiary`;
CREATE TABLE `teamdiary`  (
  `teamdiaryId` int(11) NOT NULL AUTO_INCREMENT,
  `teamId` int(11) NOT NULL,
  `teamDiaryDate` date NOT NULL,
  `teamDiaryTitle` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teamDiaryContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teamdiaryId`) USING BTREE,
  INDEX `tdTeamId_idx`(`teamId`) USING BTREE,
  CONSTRAINT `tdTeamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teamdiary
-- ----------------------------
INSERT INTO `teamdiary` VALUES (1, 12, '2019-07-06', '我带你们打王者', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈\n上王者了\n哈哈哈哈');

SET FOREIGN_KEY_CHECKS = 1;

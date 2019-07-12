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

 Date: 12/07/2019 15:41:17
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
INSERT INTO `companyteacher` VALUES (1, '22345678901', '123456', '刘兆生', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (2, '22345678902', '123456', '马忠宝', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (3, '22345678903', '123456', '朱明虎', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (4, '22345678904', '123456', '梁鹏', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (5, '22345678905', '123456', '郑重', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (6, '22345678906', '123456', '姜焱', '男', NULL, 1);
INSERT INTO `companyteacher` VALUES (7, '22345678907', '123456', '张凡诺', '男', NULL, 2);
INSERT INTO `companyteacher` VALUES (8, '22345678908', '123456', '田晓辉', '男', NULL, 1);

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
INSERT INTO `pracctrelation` VALUES (1, 7, '1');
INSERT INTO `pracctrelation` VALUES (2, 1, '1');
INSERT INTO `pracctrelation` VALUES (2, 2, '0');
INSERT INTO `pracctrelation` VALUES (2, 3, '0');
INSERT INTO `pracctrelation` VALUES (2, 4, '0');
INSERT INTO `pracctrelation` VALUES (2, 5, '0');
INSERT INTO `pracctrelation` VALUES (2, 6, '0');

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
INSERT INTO `pracstrelation` VALUES (1, 1, '0');
INSERT INTO `pracstrelation` VALUES (1, 2, '0');
INSERT INTO `pracstrelation` VALUES (1, 3, '0');
INSERT INTO `pracstrelation` VALUES (1, 4, '0');
INSERT INTO `pracstrelation` VALUES (2, 1, '1');
INSERT INTO `pracstrelation` VALUES (2, 2, '0');
INSERT INTO `pracstrelation` VALUES (2, 3, '0');
INSERT INTO `pracstrelation` VALUES (2, 4, '0');

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
INSERT INTO `practice` VALUES (1, '2017级大一实训', '第一次实训', '2018-08-20', '2018-08-31', NULL);
INSERT INTO `practice` VALUES (2, '2017级大二实训', '第二次实训', '2019-06-24', '2019-07-15', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (1, '贪吃蛇', '游戏', 6, '贪吃蛇游戏', '实现贪吃蛇', '多种模式', '自动吃金币', 1);
INSERT INTO `project` VALUES (2, '坦克大战', '游戏', 10, '坦克大战游戏', '实现坦克大战', '增加道具', '自动驾驶', 1);
INSERT INTO `project` VALUES (3, '黄金矿工', '游戏', 6, '黄金矿工游戏', '实现黄金矿工', '增加道具', '自动挖矿', 1);
INSERT INTO `project` VALUES (4, '赛车游戏', '游戏', 6, '开车', '实现开车', '增加道具', '自动驾驶', 1);
INSERT INTO `project` VALUES (5, '2D RPG游戏', '游戏', 5, 'RPG游戏', '实现RPG游戏', '多个关卡', '自动通关', 1);
INSERT INTO `project` VALUES (6, '飞机大战', '游戏', 5, '飞机大战游戏', '实现飞机大战', '增加道具', '自动通关', 1);
INSERT INTO `project` VALUES (7, '万年历', '实用工具', 5, '桌面小部件万年历', '实现万年历', '增加闹钟', '自动提醒', 1);
INSERT INTO `project` VALUES (22, '大学公共课程共享资源管理平台', 'Web/移动 ，数据分析', 6, '大学通识教育是这几年流行起来的一种教学方法。各个大学，各个院系各自有各自的教育资源和擅长的课程，但学生如果跨院系甚至跨学校来了解和参与这些课程，没有好的统一的一个平台来发现和参与。本系统提供一个将多个大学，多个院系的选修课集中在一起进行发布和管理的一个平台，学生可以在上面选择不同学校和不同院系的课程来参与.', '1.用户管理:学生用户和教师用户分类注册和管理，包括用户信息记录，用户登录/验证，用户注册，密码找回等。 \n2.课程管理 管理员可以录入各个学院的专业课程，提供课程信息录入，课程查询，课程详细信息描述等。 每个学校，院系管理员可以录入自己院校课程的课程信息\n3.网络爬虫  利用爬虫技术，从各个院系官网自动寻找课程信息的增加，修改和课程内容。\n4.系统管理 安全管理和基本信息管理； \n5 晒课功能：每个院系管理员可以讲推荐的精品课程推送首页\n6 推荐和评分功能：学生可以给每个课程或者老师进行评分，并可以把自己认为较好的课程分享到微信/QQ等社交平台\n\n', '1 自动分析热点课程和热点资源\n2 课程更新后，自动获取更新信息\n3 根据课程点击率和每个课程的推荐数目以及停留时间，自动判定精品课程\n4 语义分析，自动判断和屏蔽不符合政策和规定的言论。\n5 情绪分析，根据留言判断留言的类别(乐观/悲观)。\n', '1 学生学习轨迹记录\n2 每个学生对每个课程的学习记录\n3 建立资源中心，为所有老师学生提供教学和学习资源\n', 2);
INSERT INTO `project` VALUES (23, '高校实训实习管理平台', 'Web，数据分析，移动应用', 10, '高校学生的实习和实训，涉及到学生，实训公司，实习公司和校方多个单位。学生在企业实训实习时，一般采用企业管理制度，和学校的管理方法不一致。很多实习都在外地进行，校方很难直接对学生管理。这样学生在实习和实训期间就脱离了校方老师的管理，容易出现问题。学生的实习和实训流程，都由企业负责，学校只能到最后才能得到结果。所以需要一个平台，可以把企业，学生和学校三者联系在一起。企业可以通过该平台创建和管理实训项目，学习加入实训实习项目后，在该平台提交各个文档和资料，学校可以实时查看每个学生的实习实训进度，有任何问题，可以直接通过该平台沟通三方。\n（该项目为实际需求的商业项目，学生完成后如果通过验收，瑞通公司可以购买或者推荐给类似实习企业使用，或者可以帮助学生直接建立一个第三方平台，为有需求的学校和企业使用。）\n', '1 企业管理功能：\n实训/实习管理：注册和企业管理员指定；创建实训项目，定义实训内容和实训验收标准，制定实训流程和资源库，创建实训学校和团队。创建实训文档模板。团队实训结果评分，个人实训成绩评分。\n2 教师管理功能：\n实现学生动态全掌握，控制学生外出安全风险\n通过实习日志、总结，全面了解学生实习进程和状态\n在线指导、评价评分，快速便捷指导学生\n记录工作，实习数据生成，随时查看学生的进度和工作情况\n2 学生管理功能：\n加入实训团队，选择实训项目，选择和下载实训资源。日志提交，交流反馈，实训代码提交，实训模板下载。实训总结提交，团队记录查看，团队其他人流程查看等\n3 学校管理功能：\n实训/实习指导老师注册和登录。查看实训团队和成员信息，查看每个团队/个人的日志以及实训提交资料。直接与团队或者学生沟通。查看实训结果，对实训成果评分和评价；实现学生动态全掌握，控制学生外出安全风险；多角色在线实时协同，解决沟通不畅效率低下问题\n多维度数据统计报告，为评优、学科建设、招生就业等提供科学决策依据\n\n', '1提供学生和教师的APP版本。\n2 提供数据统计分析功能，实时数据流程图\n3 提供企业招聘入口\n4 提供学生简历生成和职位自动投递功能\n\n\n', '1 风险预警：学生签到异常或者日志提交异常时，自动触发风险预警机制。 \n2 人脸识别和GPS定位签到功能\n\n', 2);
INSERT INTO `project` VALUES (24, '共享单车站点使用情况分析', 'Web，网络爬虫，数据分析', 8, '随着工业现代化的快速发展普及，上世纪七八十年代的自行车出行方式逐渐被汽车所替代。当前移动互联网技术的快速发展，让自行车出行重新成为民 众短距离出行的首选。在移动互联网等新技术的驱动下，城市慢行交通领域的创新逐渐显现出来。在出行领域，目前打车类应用软件的发展逐渐趋于稳定，但民众“最后一公里” 出行的问题，在此之前始终没有得到解决。共享单车的出现，让民众多了一种绿色的出行方式可以选择。共享单车引导政府部门重视慢行交通系统的建设，倡导民众更多选择绿色出行的方式，这些方面能在一定程度上缓解城市交通拥堵、改善城市环境。 本文选取美国Citibike项目提供的数据进行分析。Citibike是美国最大的共享计划，在曼哈顿，布鲁克林，皇后区和泽西市有大约1万辆单车和600多个站点。与其他共享单车项目一样，花旗单车同时面临着交通网络重新分配资源这一重大挑战。比如：一些站点在某些时间常常处于空置状态，而另一些则总是满的。这迫使顾客们往返于不同站点寻找空置的停车位或者是可利用的自行车。与其他共享单车项目一样，花旗单车同时面临着交通网络重新分配资源这一重大挑战。为了顾客能更好地安排他们的行程，以及Citibike能提前对车辆进行调度，我们的算法研究致力于探究不同环境下站点的使用情况，以及对站点未来五分钟停车位“满”还是“空”的情况进行预测。', '1 实验数据理解\r\n2 数据预处理\r\n3 单车使用情况描述性统计分析\r\n4 SVD+聚类模型进行站点分类\r\n', '使用多个模型对站点使用情况预测', '系统自动进行配置站点建议', 2);
INSERT INTO `project` VALUES (25, '房价分析系统', 'Web，网络爬虫，数据分析', 6, '本项目是基于经典的机器学习项目：Kaggle。在这个基础上，通过爬取政府土地管理局，各个房屋中介公司以及房地产公司数据，以及城市建设局网站数据，实现对指定城市的房价进行排序和分析，并结合一定规律进行预测.', '1.	按用户输入城市名称，爬取和显示城市不同小区，不同区域的房价，并用柱状图显示\r\n2.	按年份，月份，显示和分析某区域房价走向和趋势\r\n3.	对比相同价格下不同城市的房产品牌\r\n4.	对比不同城市房价走向，并进行归类分析\r\n1.	按用户输入城市名称，爬取和显示城市不同小区，不同区域的房价，并用柱状图显示\r\n2.	按年份，月份，显示和分析某区域房价走向和趋势\r\n3.	对比相同价格下不同城市的房产品牌\r\n4.	对比不同城市房价走向，并进行归类分析\r\n1.	按用户输入城市名称，爬取和显示城市不同小区，不同区域的房价，并用柱状图显示\r\n2.	按年份，月份，显示和分析某区域房价走向和趋势\r\n3.	对比相同价格下不同城市的房产品牌\r\n4.	对比不同城市房价走向，并进行归类分析\r\n1.	按用户输入城市名称，爬取和显示城市不同小区，不同区域的房价，并用柱状图显示\r\n2.	按年份，月份，显示和分析某区域房价走向和趋势\r\n3.	对比相同价格下不同城市的房产品牌\r\n4.	对比不同城市房价走向，并进行归类分析1.	按用户输入城市名称，爬取和显示城市不同小区，不同区域的房价，并用柱状图显示\r\n2.	按年份，月份，显示和分析某区域房价走向和趋势\r\n3.	对比相同价格下不同城市的房产品牌\r\n4.	对比不同城市房价走向，并进行归类分析\r\n', '实现房价波动的简单预测', '利用机器学习，对指定区域的房价给出指定时间段内的价格波动预测', 2);
INSERT INTO `project` VALUES (26, '上市公司新闻情感与股票价格的关系', 'Web，网络爬虫，数据分析，机器学习', 8, '互联网技术不断发展，给人类带来了更快速的信息传播媒介。在这个互联网时代，不仅是时事新闻，股市新闻传播地也更加快速，股价对一条新闻的反应速度也就更迅速。股市新闻中往往包含了大量信息，除了上市公司的财务数据外，还包括经营公告、行业动向、国家政策等大量文本信息，这些文本信息中常常包含了一定的情感倾向，会影响股民对公司股票未来走势的预期，进一步造成公司的股价波动。如果能够挖掘出这些新闻中蕴含的文本信息，对于指导投资有很大的作用。本文想要使用文本挖掘技术和机器学习算法，挖掘出新闻中蕴含的情感信息，将文本的情感分别判别为：\"positive\",\"neutral\",\"negative\"三种情感，未来可以利用股票的新闻情感对股票价格做预测。', '1 实验环境准备\r\n2 网络爬虫介绍和实践\r\n3 中文文本处理介绍\r\n4 机器学习做情感分析\r\n5 作词云图\r\n', '基于特定关键字的舆情监控', '自动进行股票波动报警', 2);
INSERT INTO `project` VALUES (27, 'OPEN-AI基于神经网络的游戏人工智能', '机器学习，神经网络', 10, '一个简单的动作游戏类AI，创建一个AI游戏操作者，可以通过学习，实现管理游戏角色，从不熟悉到最后的游戏高手。该游戏AI角色，要求可以被任何同类型的游戏使用。', '1.	使用神经网络来躲避对方\r\n2.	利用neuro-evolution算法来提高神经网络的性能，该算法核心类似于达尔文的进化论，随机生成种群后选择优秀个体进行杂交变异获得新的种群，如此反复循环。\r\n备注：可以使用任何对战类游戏\r\n', '通用游戏AI系统，可以适用于任何同类型游戏', '创建为程序包，发布到py网站，以供其他程序员使用', 2);
INSERT INTO `project` VALUES (28, '财务机器人', '创新项目', 10, '财务机器人', '财务机器人', NULL, NULL, 2);
INSERT INTO `project` VALUES (29, '金融领域AI对话机器人', '创新项目', 10, '金融领域AI对话机器人', '金融领域AI对话机器人', NULL, NULL, 2);
INSERT INTO `project` VALUES (30, '智能手写识别计算器', '创新项目', 10, '智能手写识别计算器', '智能手写识别计算器', NULL, NULL, 2);
INSERT INTO `project` VALUES (31, '企业智能风控', '创新项目', 10, '企业智能风控', '企业智能风控', NULL, NULL, 2);

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
INSERT INTO `projtrelation` VALUES (28, 1);
INSERT INTO `projtrelation` VALUES (29, 1);
INSERT INTO `projtrelation` VALUES (30, 1);
INSERT INTO `projtrelation` VALUES (31, 1);
INSERT INTO `projtrelation` VALUES (22, 2);
INSERT INTO `projtrelation` VALUES (23, 2);
INSERT INTO `projtrelation` VALUES (24, 3);
INSERT INTO `projtrelation` VALUES (25, 3);
INSERT INTO `projtrelation` VALUES (26, 3);
INSERT INTO `projtrelation` VALUES (27, 4);
INSERT INTO `projtrelation` VALUES (1, 7);
INSERT INTO `projtrelation` VALUES (2, 7);
INSERT INTO `projtrelation` VALUES (3, 7);
INSERT INTO `projtrelation` VALUES (4, 7);
INSERT INTO `projtrelation` VALUES (5, 7);
INSERT INTO `projtrelation` VALUES (6, 7);
INSERT INTO `projtrelation` VALUES (7, 7);
INSERT INTO `projtrelation` VALUES (27, 8);

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
INSERT INTO `pscrelation` VALUES (1, 1, 2);
INSERT INTO `pscrelation` VALUES (2, 1, 1);

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
INSERT INTO `schoolteacher` VALUES (1, '32345678901', '123456', '何国良', '男', NULL, 1);
INSERT INTO `schoolteacher` VALUES (2, '32345678902', '123456', '张文俊', '女', NULL, 1);
INSERT INTO `schoolteacher` VALUES (3, '32345678903', '123456', '李炳辉', '男', NULL, 1);
INSERT INTO `schoolteacher` VALUES (4, '32345678904', '123456', '窦贤康', '男', NULL, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 88 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of signin
-- ----------------------------
INSERT INTO `signin` VALUES (1, 1, '2019-07-01', '08:17:48', 1);
INSERT INTO `signin` VALUES (2, 1, '2019-07-01', '12:01:51', 0);
INSERT INTO `signin` VALUES (3, 1, '2019-07-01', '14:03:48', 1);
INSERT INTO `signin` VALUES (4, 1, '2019-07-01', '17:04:08', 0);
INSERT INTO `signin` VALUES (5, 1, '2019-07-01', '18:04:32', 1);
INSERT INTO `signin` VALUES (6, 1, '2019-07-01', '21:04:52', 0);
INSERT INTO `signin` VALUES (7, 1, '2019-07-02', '08:26:52', 1);
INSERT INTO `signin` VALUES (8, 1, '2019-07-02', '12:07:12', 0);
INSERT INTO `signin` VALUES (9, 1, '2019-07-02', '14:21:44', 1);
INSERT INTO `signin` VALUES (10, 1, '2019-07-02', '17:21:59', 0);
INSERT INTO `signin` VALUES (11, 1, '2019-07-02', '18:22:39', 1);
INSERT INTO `signin` VALUES (12, 1, '2019-07-02', '21:22:56', 0);
INSERT INTO `signin` VALUES (13, 1, '2019-07-03', '08:23:44', 1);
INSERT INTO `signin` VALUES (14, 1, '2019-07-03', '12:24:04', 0);
INSERT INTO `signin` VALUES (15, 1, '2019-07-03', '14:30:55', 1);
INSERT INTO `signin` VALUES (16, 1, '2019-07-03', '17:52:14', 0);
INSERT INTO `signin` VALUES (17, 1, '2019-07-03', '18:30:36', 1);
INSERT INTO `signin` VALUES (18, 1, '2019-07-03', '21:53:58', 0);
INSERT INTO `signin` VALUES (19, 1, '2019-07-04', '08:56:03', 1);
INSERT INTO `signin` VALUES (20, 1, '2019-07-04', '11:56:26', 0);
INSERT INTO `signin` VALUES (21, 1, '2019-07-04', '14:20:20', 1);
INSERT INTO `signin` VALUES (22, 1, '2019-07-04', '17:57:22', 0);
INSERT INTO `signin` VALUES (23, 1, '2019-07-04', '18:57:44', 1);
INSERT INTO `signin` VALUES (24, 1, '2019-07-04', '21:38:01', 0);
INSERT INTO `signin` VALUES (25, 1, '2019-07-05', '08:38:52', 1);
INSERT INTO `signin` VALUES (26, 1, '2019-07-05', '12:08:10', 0);
INSERT INTO `signin` VALUES (27, 1, '2019-07-05', '14:20:28', 1);
INSERT INTO `signin` VALUES (28, 1, '2019-07-05', '17:30:43', 0);
INSERT INTO `signin` VALUES (29, 1, '2019-07-05', '18:13:02', 1);
INSERT INTO `signin` VALUES (30, 1, '2019-07-05', '21:20:39', 0);
INSERT INTO `signin` VALUES (31, 1, '2019-07-06', '08:29:03', 1);
INSERT INTO `signin` VALUES (32, 1, '2019-07-06', '12:05:47', 0);
INSERT INTO `signin` VALUES (68, 1, '2019-07-06', '14:30:15', 1);
INSERT INTO `signin` VALUES (70, 1, '2019-07-06', '17:27:56', 0);
INSERT INTO `signin` VALUES (73, 1, '2019-07-06', '18:11:04', 1);
INSERT INTO `signin` VALUES (74, 1, '2019-07-06', '21:31:18', 0);
INSERT INTO `signin` VALUES (78, 1, '2019-07-08', '13:27:42', 1);
INSERT INTO `signin` VALUES (79, 1, '2019-07-08', '13:27:50', 0);
INSERT INTO `signin` VALUES (80, 1, '2019-07-08', '13:31:41', 1);
INSERT INTO `signin` VALUES (81, 1, '2019-07-08', '13:31:42', 0);
INSERT INTO `signin` VALUES (82, 1, '2019-07-08', '14:19:06', 1);
INSERT INTO `signin` VALUES (83, 1, '2019-07-09', '14:42:33', 1);
INSERT INTO `signin` VALUES (84, 1, '2019-07-10', '11:29:30', 1);
INSERT INTO `signin` VALUES (85, 1, '2019-07-11', '09:21:03', 1);
INSERT INTO `signin` VALUES (86, 1, '2019-07-11', '10:17:21', 0);
INSERT INTO `signin` VALUES (87, 1, '2019-07-11', '10:17:23', 1);
INSERT INTO `signin` VALUES (88, 1, '2019-07-12', '15:08:17', 1);

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
INSERT INTO `stprelation` VALUES (1, 1, 1, 100);
INSERT INTO `stprelation` VALUES (1, 2, 23, NULL);
INSERT INTO `stprelation` VALUES (2, 2, 23, NULL);
INSERT INTO `stprelation` VALUES (3, 2, 23, NULL);
INSERT INTO `stprelation` VALUES (4, 2, 23, NULL);
INSERT INTO `stprelation` VALUES (5, 1, 1, 100);
INSERT INTO `stprelation` VALUES (6, 1, 1, 100);
INSERT INTO `stprelation` VALUES (7, 1, 1, 100);
INSERT INTO `stprelation` VALUES (8, 1, 1, 100);
INSERT INTO `stprelation` VALUES (9, 3, 28, NULL);
INSERT INTO `stprelation` VALUES (10, 3, 28, NULL);
INSERT INTO `stprelation` VALUES (11, 3, 28, NULL);
INSERT INTO `stprelation` VALUES (12, 3, 28, NULL);
INSERT INTO `stprelation` VALUES (13, 4, 22, NULL);
INSERT INTO `stprelation` VALUES (14, 4, 22, NULL);
INSERT INTO `stprelation` VALUES (15, 4, 22, NULL);
INSERT INTO `stprelation` VALUES (16, 4, 22, NULL);
INSERT INTO `stprelation` VALUES (17, 5, 22, NULL);
INSERT INTO `stprelation` VALUES (18, 5, 22, NULL);
INSERT INTO `stprelation` VALUES (19, 5, 22, NULL);
INSERT INTO `stprelation` VALUES (20, 5, 22, NULL);

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
INSERT INTO `student` VALUES (1, '12345678901', '123456', '常佳鑫', 1, '20170000001', 2017, '软件工程', '2be0f448-038b-4991-97bd-b9287ea3c8d9.jpg', '男');
INSERT INTO `student` VALUES (2, '12345678902', '123456', '洪龙熙', 1, '20170000002', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (3, '12345678903', '123456', '戴道瑭', 1, '20170000003', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (4, '12345678904', '123456', '唐元鸣', 1, '20170000004', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (5, '12345678905', '123456', '周潜', 1, '20170000005', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (6, '12345678906', '123456', '陈卓群', 1, '20170000006', 2017, '软件工程', NULL, '女');
INSERT INTO `student` VALUES (7, '12345678907', '123456', '谢帅宇', 1, '20170000007', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (8, '12345678908', '123456', '朱方琪', 1, '20170000008', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (9, '12345678909', '123456', '黄家兴', 1, '20170000009', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (10, '12345678910', '123456', '张嘉吉', 1, '20170000010', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (11, '12345678911', '123456', '毛云麟', 1, '20170000011', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (12, '12345678912', '123456', '戢启瑞', 1, '20170000012', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (13, '12345678913', '123456', '张雷', 1, '20170000013', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (14, '12345678914', '123456', '彭英杰', 1, '20170000014', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (15, '12345678915', '123456', '马赞', 1, '20170000015', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (16, '12345678916', '12345', '余冠达', 1, '20170000016', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (17, '12345678917', '123456', '王瑞琪', 1, '20170000017', 2017, '软件工程', NULL, '女');
INSERT INTO `student` VALUES (18, '12345678918', '123456', '庞梦璐', 1, '20170000018', 2017, '软件工程', NULL, '女');
INSERT INTO `student` VALUES (19, '12345678919', '123456', '秦英然', 1, '20170000019', 2017, '软件工程', NULL, '男');
INSERT INTO `student` VALUES (20, '12345678920', '123456', '谢帅宇', 1, '20170000020', 2017, '软件工程', NULL, '男');

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
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentdiary
-- ----------------------------
INSERT INTO `studentdiary` VALUES (1, 1, '2019-06-29', '第一周周志', '第一周过的真开心！！！', 23, 1, 99, '写得真好，给99怕你骄傲');
INSERT INTO `studentdiary` VALUES (2, 1, '2019-07-05', '第二周周志', '第二周过的真开心！！！', 23, 2, 100, '写的比上周好！');
INSERT INTO `studentdiary` VALUES (3, 1, '2019-07-10', '第三周周志', '第三周过的更开心！！！', 23, 3, NULL, '');
INSERT INTO `studentdiary` VALUES (4, 2, '2017-06-29', '第一周周志', '第一周开心！', 23, 1, 60, '字数不够');
INSERT INTO `studentdiary` VALUES (5, 2, '2017-07-06', '第二周周志', '第二周真开心！', 23, 2, 70, '字数比上次多');
INSERT INTO `studentdiary` VALUES (6, 2, '2017-07-07', '第三周周志', '第三周更更更开心！！', 23, 3, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, '作为学生注册/登陆，以使用学生功能。', '', 4, 10, 1, 1, 2, '2019-06-24');
INSERT INTO `task` VALUES (2, '作为企业注册/登陆，以使用企业功能。', '', 4, 10, 1, 1, 2, '2019-06-25');
INSERT INTO `task` VALUES (3, '作为企业老师注册/登陆，以使用企业老师功能。', '', 4, 10, 1, 1, 2, '2019-06-26');
INSERT INTO `task` VALUES (4, '作为学校老师注册/登陆，以使用学校功能。', NULL, 4, 10, 1, 1, 2, '2019-06-27');
INSERT INTO `task` VALUES (5, '作为企业老师创建实训项目，并上传相关文档，以供学生团队组长选择。', NULL, 20, 10, 1, 1, 2, '2019-06-28');
INSERT INTO `task` VALUES (6, '作为企业验收项目，以对项目成果进行评价评分。', NULL, 8, 10, 2, 1, 2, '2019-07-02');
INSERT INTO `task` VALUES (7, '作为学生创建/加入团队，以确定学生组队信息。', NULL, 12, 10, 1, 1, 2, '2019-06-29');
INSERT INTO `task` VALUES (8, '作为学生组长选择实训项目，以为团队和组员选择项目。', NULL, 4, 10, 1, 1, 2, '2019-06-27');
INSERT INTO `task` VALUES (9, '作为企业老师查看学生周志并打分，以对学生平时进行考察。', NULL, 12, 10, 2, 1, 2, '2019-07-03');
INSERT INTO `task` VALUES (10, '作为学生提交周志，以记录进度和供老师进行考察。', NULL, 20, 10, 2, 1, 2, '2019-07-04');
INSERT INTO `task` VALUES (11, '作为学生签到，以掌握学生考勤情况。', NULL, 4, 10, 3, 1, 2, '2019-07-09');
INSERT INTO `task` VALUES (12, '作为学生组长提交团队周志。以记录团队进度，供老师和组员查看。', NULL, 12, 10, 2, 1, 2, '2019-07-05');
INSERT INTO `task` VALUES (13, '作为学校老师查看学生信息，以掌握学生组队和项目信息。', NULL, 12, 10, 2, 1, 2, '2019-07-05');
INSERT INTO `task` VALUES (14, '作为学校老师查看团队信息，以掌握团队构成和项目选择。', NULL, 12, 10, 2, 1, 2, '2019-07-06');
INSERT INTO `task` VALUES (15, '作为企业老师查看学生信息，以掌握学生组队和项目信息。', NULL, 12, 10, 2, 1, 2, '2019-07-06');
INSERT INTO `task` VALUES (16, '作为企业老师查看团队信息，以掌握团队构成和项目选择。', NULL, 12, 10, 2, 1, 2, '2019-07-06');
INSERT INTO `task` VALUES (17, '作为学校查看实训结果，以掌握实训完成情况。', NULL, 12, 10, 3, 1, 2, '2019-07-09');
INSERT INTO `task` VALUES (18, '作为企业老师查看学生动态，以掌握学生出勤情况。', NULL, 12, 10, 3, 1, 2, '2019-07-09');
INSERT INTO `task` VALUES (19, '作为学校老师查看学生动态，以掌握学生出勤情况，保证学生安全。', NULL, 12, 10, 3, 1, 2, '2019-07-10');
INSERT INTO `task` VALUES (20, '作为学校老师查看学生周志，掌握学生个人情况。', NULL, 12, 10, 3, 1, 2, '2019-07-11');
INSERT INTO `task` VALUES (21, '作为学校老师查看团队周志，掌握团队进度。', NULL, 12, 10, 3, 1, 2, '2019-07-11');
INSERT INTO `task` VALUES (22, '作为企业老师发布公告，以引导学生开始新阶段。', NULL, 20, 10, 3, 0, 2, NULL);
INSERT INTO `task` VALUES (23, '作为学生查看他人日志，以进行对比，并有利于吸取经验。', NULL, 20, 10, 3, 1, 2, '2019-07-12');
INSERT INTO `task` VALUES (24, '实现数据分析', NULL, 40, 5, 3, 0, 2, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacherdiary
-- ----------------------------
INSERT INTO `teacherdiary` VALUES (1, 1, '2019-06-24', '第一天', '同学们都很好');
INSERT INTO `teacherdiary` VALUES (2, 1, '2019-06-25', '第二天', '没给同学们发红包，大家都不开心');
INSERT INTO `teacherdiary` VALUES (3, 1, '2019-06-26', '第三天', '写日志太累了，不想写了');
INSERT INTO `teacherdiary` VALUES (4, 1, '2019-07-12', '最后一天', '明天就要验收了，大家做的好像都不错');

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
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES (1, '贪吃五人组', 1, 100, NULL);
INSERT INTO `team` VALUES (2, '王者四缺一', 1, 100, 'https://github.com/DaiDaotang/PracticeProject');
INSERT INTO `team` VALUES (3, '财务机器人', 9, NULL, NULL);
INSERT INTO `team` VALUES (4, '张雷队', 13, NULL, NULL);
INSERT INTO `team` VALUES (5, '伊万诺夫别摸我', 17, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teamdiary
-- ----------------------------
INSERT INTO `teamdiary` VALUES (1, 2, '2019-07-06', '今日任务', '完成了两个界面，写了5个servlet');
INSERT INTO `teamdiary` VALUES (2, 2, '2019-07-07', '今日任务', '完成另外两个界面，写了8个servlet');

SET FOREIGN_KEY_CHECKS = 1;

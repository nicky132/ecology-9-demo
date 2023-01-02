/*
Navicat SQL Server Data Transfer

Source Server         : 192.168.40.243_sql_server
Source Server Version : 105000
Source Host           : 192.168.40.243:1433
Source Database       : ecology9_test
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 105000
File Encoding         : 65001

Date: 2019-04-16 11:41:55
*/


-- ----------------------------
-- Table structure for ECOLOGY_PC_DEMO_WORKFOLW
-- ----------------------------
DROP TABLE [dbo].[ECOLOGY_PC_DEMO_WORKFOLW]
GO
CREATE TABLE [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] (
[id] varchar(255) NOT NULL ,
[requestname] varchar(255) NULL ,
[creater] varchar(255) NULL ,
[state] varchar(255) NULL ,
[creatertime] varchar(255) NULL ,
[type] varchar(255) NULL 
)


GO

-- ----------------------------
-- Records of ECOLOGY_PC_DEMO_WORKFOLW
-- ----------------------------
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'07066413-c1f5-4045-af74-70e3b06c3bb3', N'阿斯达四大', N'23', N'2', N'2019-04-11', N'1')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'14b8a6be-1cc0-4ea0-b4a3-c739685c5187', N'123213', N'14', N'2', N'2019-04-16', N'1')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'167ae63d-2c5c-4ec9-83c8-ebadba7e0142', N'sadasd', N'9', N'1', N'2019-04-11', N'2')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'1c93612a-1a35-4833-84a3-f90f7c8726a7', N'sdasd', N'5', N'2', N'2019-04-11', N'1')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'3ee44d27-cbd0-49ad-a596-351ed9399f17', N'dasd', N'23', N'1', N'2019-04-11', N'3')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'4cc17c8d-7ec5-41ee-8f0f-d1c76759deb4', N'ts02', N'', N'2', N'2019-04-11', N'1')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'715d7c69-22f4-4145-9980-d0ce9bf85ae7', N'人服务', N'9', N'2', N'2019-04-11', N'2')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'862c1cd4-3575-4dd3-b5c0-8323b778e748', N'01', N'9', N'3', N'2019-04-11', N'3')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'a475cb79-8cd2-4531-8ce6-bc1c748fb815', N'test', N'7', N'2', N'2019-04-11', N'1')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'ada987b2-1102-4f6e-80d5-0e4c4a990fed', N'9999', N'', N'2', N'2019-04-11', N'2')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'ce7a168c-c0e8-4068-8a38-5db2a135d809', N'阿斯达四大阿斯达四大啊实打实', N'23', N'1', N'2019-04-11', N'3')
GO
GO
INSERT INTO [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ([id], [requestname], [creater], [state], [creatertime], [type]) VALUES (N'e173fae3-df9c-4a10-b638-3e79b81b11f8', N'asdasd ', N'9', N'2', N'2019-04-11', N'1')
GO
GO

-- ----------------------------
-- Indexes structure for table ECOLOGY_PC_DEMO_WORKFOLW
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table ECOLOGY_PC_DEMO_WORKFOLW
-- ----------------------------
ALTER TABLE [dbo].[ECOLOGY_PC_DEMO_WORKFOLW] ADD PRIMARY KEY ([id])
GO

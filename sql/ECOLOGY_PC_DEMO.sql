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

Date: 2019-04-02 14:13:42
*/


-- ----------------------------
-- Table structure for ECOLOGY_PC_DEMO
-- ----------------------------
DROP TABLE [dbo].[ECOLOGY_PC_DEMO]
GO
CREATE TABLE [dbo].[ECOLOGY_PC_DEMO] (
[id] varchar(250) NOT NULL ,
[demo_input] varchar(250) NULL ,
[demo_textarea] varchar(250) NULL ,
[demo_select] varchar(250) NULL ,
[demo_datepicker] varchar(250) NULL ,
[demo_timepicker] varchar(250) NULL ,
[demo_rangepicker] varchar(250) NULL ,
[demo_browser] varchar(250) NULL ,
[demo_selectlinkage] varchar(250) NULL ,
[demo_checkbox] varchar(250) NULL ,
[fromDate] varchar(250) NULL ,
[toDate] varchar(250) NULL ,
[demo_colorpicker] varchar(250) NULL ,
[demo_upload] varchar(250) NULL ,
[demo_richtext] varchar(250) NULL ,
[demo_radio] varchar(250) NULL ,
[demo_password] varchar(250) NULL 
)


GO

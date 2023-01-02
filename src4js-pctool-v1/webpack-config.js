const argv = require('yargs').argv;
// 前台模块
const path_e9 = require('./config_weaver/weapath4e9').default;
// 公共组件
const path_e9_coms = require('./config_weaver/weapath4e9-coms').default;
// 后台模块
const path_e9_eng = require('./config_weaver/weapath4e9-eng').default;

// const paths = { ...path_e9, ...path_e9_coms, ...path_e9_eng };
// 此文件不支持对象解构的暂时请使用 Object.assign
const paths = Object.assign({}, path_e9, path_e9_coms, path_e9_eng);

/*
  请优先读取内置配置，可以覆盖部分参数，重新自定义config
  config

  entry: build 入口文件地址
  entry4single: build 单页 single 文件地址
  entry4debug: start 热调试入口文件地址
  buildPath: build 文件打包路径
  servedPath: build 服务器静态资源路径
  cssName: build 生成 css 文件名字
  jsName: build 生成 js 文件名字
  jsSingleName: build 生成 single 文件名字
  htmlName: build 生成 html 文件名字
  htmlTemplate: 模板 html
  library: 库名
  libraryTarget: 'umd'
*/

let config = {
  entry: '../src4js/pc4mobx/workflow/index.js',
  entry4single: '../src4js/pc4mobx/workflow/single.js',
  entry4debug: '../src4js/pc4mobx/workflow/debug.js',
  buildPath: '../spa/workflow/static',
  servedPath: '/spa/workflow/static',
  cssName: 'index.css',
  jsName: 'index.js',
  jsSingleName: 'index4single.js',
  htmlName: 'index.html',
  htmlTemplate: 'index_workflow.html',
  library: 'weaWorkflow',
  libraryTarget: 'umd'
};

config = {
  entry: '../src4js/pc4ns/demo01/index.js',
  entry4single: '../src4js/pc4ns/demo01/single.js',
  entry4debug: '../src4js/pc4ns/demo01/debug.js',
  buildPath: '../ecology/spa/nonstandard/demo01',
  servedPath: '/ecology/spa/nonstandard/demo01/',
  cssName: 'index.css',
  jsName: 'index.js',
  jsSingleName: 'index4single.js',
  htmlName: 'index.html',
  htmlTemplate: 'index.html',
  library: 'weansDemo01',
  libraryTarget: 'umd'
};

/*
  paths[appName]
y
  读取内置配置，appName详见下表

  可自定义config，参数如上

  可覆盖单个参数，如 config = { ...paths['workflow'], htmlTemplate: 'index_workflow.html' };
*/


config = paths[argv.pubModule || 'ns_demo01'];

module.exports = config;

// ************ APP NAME ************

/* 前台 A -> Z
  main - 入口
  blog - 微博
  cowork - 协作
  cpt - 资产
  crm - 客户
  crmReport - 客户报表
  demo - 示例
  develop - 二次开发
  document - 文档
  email - 邮件
  esearch - 微搜
  fna - 财务
  fnaSpecial - 财务流程
  hrm - 人力
  inte - 集成
  meeting - 会议
  odoc - 公文
  portal - 门户
  prj - 项目
  smallApp - 小模块
  theme - 主题
  workflow - 流程
  workflowForm - 表单
  workplan - 日程
  workrelate - 执行力
*/

/* 后台
  bs_main - 入口
  bs_cpt - 资产
  bs_crm - 客户
  bs_document - 文档
  bs_hrm - 人力
  bs_meeting - 会议
  bs_mobilemode - 移动建模
  bs_portal - 门户
  bs_theme - 门户主题
  bs_workflow - 流程
  bs_smallApp - 小应用
*/

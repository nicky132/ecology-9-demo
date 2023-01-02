const config = require('./weaconfig/weaconfig');
const path_e9 = require('./weaconfig/weapath4e9').default;
const path_e9_coms = require('./weaconfig/weapath4e9-coms').default;
const path_e9_eng = require('./weaconfig/weapath4e9-eng').default;
const argv = require('yargs').argv;

const getPath = ({ name, srcPath, runPath }, paths) => {
  if (!paths[name]) {
    console.error(`\n======
      请检查 src4js/webpack.config.js 的配置, 找不到 name 为 ${
      name} 的 APP ！！！！！\n======\n\n`);
    return;
  }
  const app = paths[name];
  const { entry, output, styleUrl } = app;
  return Object.assign(app, {
    entry: `${srcPath}${entry}`,
    output: `${runPath}${output}`,
  }, styleUrl ? { styleUrl: `${runPath}${styleUrl}` } : {});
};

// 运行模式：release打包模式，debug调试模式
let mode = 'release';
// mode = 'debug';

// 编译模式：production发布版、development开发版
let node_env = 'production';
// node_env = 'development';

// 是否是自定义路径模式，自定义模式可以自己写完整地址
const custom = true;

if (custom) {
  // 自定义路径
      const customAppName = 'more';
  module.exports = config.create(({
 //前台调试主入口
    "index":{
        entry: "./pc/main/index.js",
        output: "D:/weaver/ecology/spa/main/index.js",
        styleUrl: "D:/weaver/ecology/spa/main/index.css"
    },
    //前台调试主入口
    "portal":{
        entry: "./pc/portal/index.js",
        output: "E:/workspace/ecology/spa/portal/index.js",
        styleUrl: "E:/workspace/ecology/spa/portal/index.css",
        outputlib: {
            library: "weaPortal",
            libraryTarget: "umd"
        }
    },
    //前台调试主入口
    "portalengine":{
        entry: "./pc4backstage/portal4engine/index.js",
        output: "E:/workspace/ecology/spa/portal/static4engine/engine.js",
        styleUrl: "E:/workspace/ecology/spa/portal/static4engine/engine.css",
        outputlib: {
            library: "weaPortalEngine",
            libraryTarget: "umd"
        }
    },  
    //前台调试主入口
    "theme":{
        entry: "./pc4mobx/portal4theme/index.js",
        output: "E:/workspace/ecology/wui/theme/ecology9/js/index-mobx.js",
        styleUrl: "E:/workspace/ecology/wui/theme/ecology9/css/index-mobx.css",
        outputlib: {
            library: "weaPortalTheme",
            libraryTarget: "umd"
        }
    },
    //前台调试主入口
      "more":{
          entry: "./pc/portal/elementmore/single.js",
          output: "E:/workspace/ecology/spa/portal/index_more.js",
          styleUrl: "E:/workspace/ecology/spa/portal/index_more.css",
      },
    //前台调试主入口
      "single":{
          entry: "./pc/portal/single.js",
          output: "E:/workspace/ecology/spa/portal/index-indie.js",
          styleUrl: "E:/workspace/ecology/spa/portal/index-indie.css",
      },
    //E9 主题
    "E9_theme_mobx": {
        entry: "./pc4mobx/portal4theme/index.js",
        output: "E:/workspace/ecology/wui/theme/ecology9/js/index-mobx.js",
        styleUrl: "E:/workspace/ecology/wui/theme/ecology9/css/index-mobx.css",
        outputlib: {
            library: "weaPortalTheme",
            libraryTarget: "umd"
        }
    },
    //正式系统打包文件
    "portal_fs":{
        entry: "./pc/portal_fs_2/index.js",
        output: "E:/workspace/ecology/spa/portal_fs/index.js",
        styleUrl: "E:/workspace/ecology/spa/portal_fs/index.css",
        outputlib: {
            library: "weaPortal",
            libraryTarget: "umd"
        }
    },
    //前台调试主入口
    "mobx_index":{
        entry: "./pc4mobx/amain/index.js",
        output: "E:/workspace/ecology/spa/main/index-mobx.js",
    },
    //引擎主入口
    "engine_index":{
        entry: "./pc4backstage/amain/index.js",
        output: "E:/workspace/ecology/spa/main/engine.js",
    },
    //SAP集成
    "sapIntegration":{
        entry: "./pc4backstage/sapIntegration/index.js",
        output: "E:/workspace/ecology/spa/sapIntegration/index.js",
        styleUrl: "E:/workspace/ecology/spa/sapIntegration/index.css",
        outputlib: {
            library: "weaSapIntegration",
            libraryTarget: "umd"
        }
    },
    //SAP集成
    "sapBrowseConfiguration":{
        entry: "./pc4backstage/sapIntegration/public/index.js",
        output: "E:/workspace/ecology/spa/sapIntegration/index_sapBrowse.js",
        styleUrl: "E:/workspace/ecology/spa/sapIntegration/index_sapBrowse.css",
        outputlib: {
            library: "weaSapIntegrationPublic",
            libraryTarget: "umd"
        }
    },
  })[customAppName], mode, node_env);
} else {
  // 已内置配置
  const pathConfig = {
    name: 'document_redux', // 查阅底部注释列表
    srcPath: '../', // 本地源码路径，src4js 上一层, 或本地 svn 绝对路径 'D:/ecology'
    runPath: 'D:/ecology/ecology9/ecology', // 打包后路径，spa wui 等上一层, 或本地绝对路径 'D:/ecology'
    mode,
  };
  argv.pubModule && (pathConfig.name = argv.pubModule);
  module.exports = config.create(getPath(
    pathConfig,
    Object.assign(path_e9, path_e9_coms, path_e9_eng)
  ), mode, node_env);
}

// ************ APP NAME ************

/* 公共组件
  antd - antd
  ecCom - E9 基础组件库
  coms_demo - 组件库 API 文档 demo 页
  coms_mobx - mobx 公共组件
  coms_redux - 前台 redux 公共组件 （即将废弃）
  coms_global - 流程单页公共文件整合包
  weaCom - 云商店应用组件库
*/

/* 前台 A -> Z
  main - 主入口
  theme - 主题
  portal - 门户
  album_redux - 相册 redux （迁移后废弃）
  blog - 微博
  blog_single - 微博单页入口
  cowork - 协作
  cowork_single - 协作单页入口
  cpt - 资产
  cpt_single - 资产单页入口
  crm - 客户
  crm_single - 客户单页入口
  document - 文档
  document_single - 文档单页入口
  document_redux - 文档 redux（迁移后废弃）
  document_redux_single - 文档 redux 单页入口（迁移后废弃）
  email - 邮件
  email_single - 邮件单页入口
  esearch - 微搜
  esearch_single - 微搜单页入口
  fna - 财务
  fnaSpecial - 财务流程
  hrm - 人力
  hrm_single - 人力单页入口
  inte - 集成
  inte_single - 集成单页入口
  meeting - 会议
  meeting_single - 会议单页入口
  odoc - 公文
  odoc_single - 公文单页入口
  prj - 项目
  prj_single - 项目单页入口
  smallApp - 小模块
  smallApp_single - 小模块单页入口
  workplan - 日程
  workplan_single - 日程单页入口
  workflow - 流程
  workflow_single - 流程单页入口
  workflow_redux - 流程 redux（迁移后废弃）
  workflow_redux_single - 流程 redux 单页入口（迁移后废弃）
*/

/* 后台
  bs_main - 主入口
  bs_theme - 门户主题
  bs_portal - 门户
  bs_cpt - 资产
  bs_crm - 客户
  bs_hrm - 人力
  bs_hrm_single - 人力单页入口
  bs_mobilemode - 移动建模
  bs_workflow - 流程
  bs_workflow_single - 流程单页入口
  bs_smallApp - 小应用
  bs_smallApp_single -  小应用单页入口
*/

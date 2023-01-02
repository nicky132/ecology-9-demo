import { observable, action, toJS } from 'mobx';
import { message } from 'antd';
import { WeaForm, WeaTableNew } from 'comsMobx';

import * as API from '../apis'; // 引入API接口文件

const { TableStore } = WeaTableNew;

export class BaseTableStore {
  @observable tableStore = new TableStore(); // new table
  @observable form = new WeaForm(); // nrew 一个form
  @observable condition = []; // 存储后台得到的form数据
  @observable hasRight = true; // 判断用户是有权限查看当前页面： 没有权限渲染无权限页面，有权限渲染数据
  @observable showSearchAd = false; // 高级搜索面板显示
  @observable loading = true; // 数据加载状态
  @observable treeDatas = []; // 左侧树数据

  // 初始化操作
  @action
  doInit = () => {
    this.getCondition();
    this.getTableDatas();
  }

  // 获得高级搜索表单数据
  @action
  getCondition = () => {
    API.getCondition().then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.condition = res.condition;
        this.form.initFormFields(res.condition); // 渲染高级搜索form表单
        this.treeDatas = res.weaTree;
      } else {
        message.error(res.msg || '接口调用失败！')
      }
    }));
  }

  // 渲染table数据
  @action
  getTableDatas = (params) => {
    this.loading = true;
    const formParams = this.form.getFormParams() || {};
    params = params || formParams;
    API.getTableDatas(params).then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.tableStore.getDatas(res.datas); // table 请求数据
        this.hasRight = res.hasRight;
      } else {
        message.error(res.msg || '接口调用失败！')
      }
      this.loading = false;
    }));
  }

  @action
  setShowSearchAd = bool => this.showSearchAd = bool;

  // 高级搜索 - 搜索
  @action doSearch = () => {
    this.getTableDatas();
    this.showSearchAd = false;
  }

}
import { observable, action, toJS } from 'mobx';
import { message } from 'antd';
import { WeaForm, WeaLogView } from 'comsMobx';

import * as API from '../apis'; // 引入API接口文件

export class BaseFormStore {
  @observable form = new WeaForm(); // nrew 一个form
  @observable condition = []; // 存储后台得到的form数据
  @observable loading = true; // 页面初始化的loading状态：数据加载成功前后前使用
  @observable hasRight = true; // 判断用户是有权限查看当前页面： 没有权限渲染无权限页面，有权限渲染数据

  @action // 初始化操作： 一般用来初始化获取后台数据
  doInit = () =>{
    this.getBaseForm();
  }

  @action // 获得form配置数据
  getBaseForm = () => {
    API.getBaseForm().then(action(result => {
      this.loading = false;
      this.hasRight = result.hasRight;
      if (result.hasRight) {
        this.condition = result.condition;
        this.form.initFormFields(result.condition);
      }
    }));
  }
  
}
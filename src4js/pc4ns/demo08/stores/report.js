import { observable, action, toJS } from 'mobx';
import { message } from 'antd';
import { WeaForm } from 'comsMobx';

import * as API from '../apis'; // 引入API接口文件

export class ReportStore {
  @observable form =  new WeaForm(); // 搜索form
  @observable loading = true; // 页面初始化的loading状态：数据加载成功前后前使用
  @observable hasRight = true; // 判断用户是有权限查看当前页面： 没有权限渲染无权限页面，有权限渲染数据
  @observable condition = []; // 搜索数据
  @observable datas = []; // 报表数据
    @observable excel='';

  // 初始化操作
  @action
  doInit = () => {
    this.getCondition();
    this.getDatas({year: '2019'});
  }

  // 获得搜索表单数据
  @action
  getCondition = () => {
    API.getCondition().then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.condition = res.condition;
        this.form.initFormFields(res.condition); // 渲染搜索form表单
      } else {
        message.error(res.msg || '接口调用失败！')
      }
    }));
  }

  // 获取报表数据
  @action
  getDatas = (params) => {
    this.loading = true;
    API.getDatas(params).then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.datas = res.data;
        this.hasRight = res.hasRight;
      } else {
        message.error(res.msg || '接口调用失败！')
      }
      this.loading = false;
    }));
  }

  @action
  outExcel=(params)=>{
     this.excel=encodeURI('/api/demo08/weaReportOutExcel');
     window.location.href=`${location.origin}${this.excel}`
  }

}
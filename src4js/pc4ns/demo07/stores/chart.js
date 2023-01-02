import { observable, action, toJS } from 'mobx';
import { message } from 'antd';

import * as API from '../apis'; // 引入API接口文件

export class ChartStore {
  @observable loading = true; // 页面初始化的loading状态：数据加载成功前后前使用
  @observable hasRight = true; // 判断用户是有权限查看当前页面： 没有权限渲染无权限页面，有权限渲染数据
  @observable config = []; // radioGroup配置数据
  // 以下是 chart 相关
  @observable categories = []; // x 轴
  @observable series = []; // 柱状图数据
  @observable option = {}; // echats 的选项

  // 初始化操作
  @action
  doInit = () => {
    this.getRadioConfig();
    this.getEchartConfig({ dateFrom: 1 });
  }

  // 获取radio条件
  @action
  getRadioConfig = () => {
    API.getRadioConfig().then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.config = res.weaRadioGroup;
        this.hasRight = res.hasRight;
      } else {
        message.error(res.msg || '接口调用失败！')
      }
    }));
  }


  // WeaEchart图表数据
  @action
  getEchartConfig = (params) => {
    this.loading = true;
    API.getEchartConfig(params).then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.categories = res.data.categories;
        this.series = res.data.series;
      } else {
        message.error(res.msg || '接口调用失败！')
      }
      this.loading = false;
    }));
  }

}
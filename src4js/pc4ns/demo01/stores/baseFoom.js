import { observable, action, toJS } from 'mobx';
import { message } from 'antd';
import { WeaForm, WeaLogView } from 'comsMobx';
import { WeaLocaleProvider } from 'ecCom';

import * as API from '../apis'; // 引入API接口文件

const {LogStore} = WeaLogView;
const getLabel = WeaLocaleProvider.getLabel;

export class BaseFormStore {
  @observable form = new WeaForm(); // nrew 一个form
  @observable logStore = new LogStore();
  @observable condition = []; // 存储后台得到的form数据
  @observable saveLoading = false; // 保存状态处理：保证保存的时候接口只走一次
  @observable loading = true; // 页面初始化的loading状态：数据加载成功前后前使用
  @observable hasRight = true; // 判断用户是有权限查看当前页面： 没有权限渲染无权限页面，有权限渲染数据
  @observable logVisible = false; // 控制日志弹框的显影

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

  @action // 保存
  saveForm = () => {
    this.form.validateForm().then(action(f=>{ // 表单的校验: 直接使用form的validateForm方法即可
      if (f.isValid) { // 校验听过: 走保存接口
        this.saveLoading = true;
        const params = this.form.getFormParams();
        API.saveForm(params).then(action(
          result => {
            this.saveLoading = false
            if(result.api_status){ // 保存成功: 1、给出提示 2、刷新form数据
              message.success(`${getLabel(18758,'保存成功')}`);
              this.getBaseForm();
            }else {
              message.error(`${getLabel(22620,'保存失败')}`);
            }
          }
        ));
      } else {
        f.showErrors();
      }
    }));
  }

  @action
  setLogVisible = bool => this.logVisible = bool
  
}
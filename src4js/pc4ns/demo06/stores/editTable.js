import { observable, action, toJS } from 'mobx';
import { message } from 'antd';
import { WeaForm, WeaTableNew } from 'comsMobx';

import * as API from '../apis'; // 引入API接口文件

const { TableStore } = WeaTableNew;

export class EditTableStore {
  @observable tableStore = new TableStore(); // new table
  @observable form = new WeaForm(); // nrew 一个form
  @observable condition = []; // 高级搜索form数据
  @observable hasRight = true; // 判断用户是有权限查看当前页面： 没有权限渲染无权限页面，有权限渲染数据
  @observable showSearchAd = false; // 高级搜索面板显示

  @observable dialogForm = new WeaForm(); // 新建编辑弹框数据
  @observable dialogFormCondition = []; // 新建编辑弹框form数据
  @observable visible = false; // 新建编辑弹框显隐
  @observable editId = ''; // 编辑的id

  // 初始化操作
  @action
  doInit = () => {
    this.getCondition();
    this.getTableDatas();
    this.getDialogCondition();
  }

  // 批量更改observable的数据
  @action
  setState = (params) => {
    Object.keys(params).forEach(key => this[key] = params[key]);
  }

  // 获得高级搜索表单数据
  @action
  getCondition = () => {
    API.getCondition().then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.condition = res.condition;
        this.form.initFormFields(res.condition); // 渲染高级搜索form表单
      } else {
        message.error(res.msg || '接口调用失败！')
      }
    }));
  }

  // 渲染table数据
  @action
  getTableDatas = (toFirstPage = true) => { // toFirstPage: 是否回到第一页 （新增和删除不需要）
    const formParams = this.form.getFormParams() || {};
    API.getTableDatas(formParams).then(action(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        toFirstPage ? this.tableStore.getDatas(res.datas, 1) : this.tableStore.getDatas(res.datas); // table 请求数据
        this.hasRight = res.hasRight;
      } else {
        message.error(res.msg || '接口调用失败！')
      }
    }));
  }

  // 获取新增编辑弹框form数据
  @action
  getDialogCondition = () => {
    API.getDialogCondition().then(res => {
      if (res.api_status) { // 接口请求成功/失败处理
        this.dialogFormCondition = res.condition;
        this.dialogForm.initFormFields(res.condition); // 渲染新建编辑弹框form表单
      } else {
        message.error(res.msg || '接口调用失败！')
      }
    });
  }

  @action
  setShowSearchAd = bool => this.showSearchAd = bool;

  // 高级搜索 - 搜索
  @action
  doSearch = () => {
    this.getTableDatas();
    this.showSearchAd = false;
  }

  // 新增/编辑保存
  @action
  doSave = () => {
    this.dialogForm.validateForm().then(action(f=>{ // 表单的校验: 直接使用dialogForm的validateForm方法即可
      if (f.isValid) { // 校验通过: 走保存接口
        const params = this.dialogForm.getFormParams();
        if (this.isCreate) {
          this.doAdd(params);
        } else {
          const editParams = {
            ...params,
            id: this.editId,
          }
          this.doEdit(editParams);
        }
        this.visible = false;
      } else {
        f.showErrors();
      }
    }));
  }

  // 新增保存
  doAdd = (params) => {
    API.doAdd(params).then(action(res => {
      if (res.api_status) {
        this.getTableDatas(false);
        this.initDialogForm();
      } else {
        message.error(res.msg || '保存失败！');
      }
    }));
  }

  // 编辑保存
  doEdit = (editParams) => {
    API.doEdit(editParams).then(action(res => {
      if (res.api_status) {
        this.getTableDatas(false);
        this.initDialogForm();
      } else {
        message.error(res.msg || '保存失败！');
      }}
    ));
  }

  @action
  initDialogForm = () => {
    this.dialogForm.resetForm();
    this.dialogForm.initFormFields(toJS(this.dialogFormCondition));
  }

  // 批量删除
  @action
  doDelete = (id) => {
    const params = {
      id: id || toJS(this.tableStore.selectedRowKeys).join(',')
    }
    API.doDel(params).then(res => {
      if (res.api_status) {
        this.getTableDatas(false);
      } else {
        message.error(res.msg || '删除失败！');
      }
    });
  }

}
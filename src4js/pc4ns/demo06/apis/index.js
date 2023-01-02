import { WeaTools } from 'ecCom';

// 获取高级搜索条件
export const getCondition = params => {
  return WeaTools.callApi('/api/demo06/weatableConditonDemo', 'GET', params);
};

// 获取table数据
export const getTableDatas = params => {
  return WeaTools.callApi('/api/demo06/weatableDemo', 'GET', params);
};

// 获取新增编辑弹框form数据
export const getDialogCondition = params => {
  return WeaTools.callApi('/api/demo06/weatableFormDemo', 'GET', params);
};

// 新增保存
export const doAdd = params => {
  return WeaTools.callApi('/api/demo06/weatableAddDemo', 'POST', params);
};

// 编辑保存
export const doEdit = params => {
  return WeaTools.callApi('/api/demo06/weatableEditDemo', 'POST', params);
};
  
// 删除
export const doDel = params => {
  return WeaTools.callApi('/api/demo06/weatableDelDemo', 'POST', params);
};
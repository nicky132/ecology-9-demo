import { WeaTools } from 'ecCom';

// form基础数据
export const getBaseForm = params => {
  return WeaTools.callApi('/api/demo01/getFormDemo', 'GET', params);
};

// form保存
export const doSaveBaseSet = params => {
  return WeaTools.callApi('/api/demo01/saveFormDemo', 'POST', params);
};
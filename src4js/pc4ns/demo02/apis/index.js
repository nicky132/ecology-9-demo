import { WeaTools } from 'ecCom';

// form基础数据
export const getBaseForm = params => {
  return WeaTools.callApi('/api/demo02/getFormDemo', 'GET', params);
};
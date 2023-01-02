import { WeaTools } from 'ecCom';

// 获取radio条件
export const getRadioConfig = params => {
  return WeaTools.callApi('/api/demo07/analConditionDemo', 'GET', params);
};

// 获取图表数据
export const getEchartConfig = params => {
  return WeaTools.callApi('/api/demo07/analDataDemo', 'GET', params);
};
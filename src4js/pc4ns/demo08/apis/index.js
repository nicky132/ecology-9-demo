import { WeaTools } from 'ecCom';

// 获取高级搜索条件
export const getCondition = params => {
  return WeaTools.callApi('/api/demo08/weaReportConditionDemo', 'GET', params);
};

// 获取报表数据
export const getDatas = params => {
  return WeaTools.callApi('/api/demo08/weaReportDemo', 'GET', params);
};


//导出
export const outExcel = params => {
    return WeaTools.callApi('/api/demo08/weaReportOutExcel', 'GET', params);
};
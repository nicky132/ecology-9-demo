package com.engine.demo.demo06.service;

import java.util.Map;

public interface DemoService06 {
    /**
     * 获取form表单
     * @param params
     * @return
     */
    Map<String, Object> weatableDemo(Map<String, Object> params);

    /**
     * 获取高级搜索条件(含左侧树,weatab)
     * @param params
     * @return
     */
    Map<String,Object> weatableConditonDemo(Map<String, Object> params);


    /**
     * 获取form表单
     * @param params
     * @return
     */
    Map<String,Object> weatableFormDemo(Map<String, Object> params);

    /**
     * 增加
     * @param params
     * @return
     */
    Map<String,Object> weatableAddDemo(Map<String, Object> params);

    /**
     * 删除
     * @param params
     * @return
     */
    Map<String,Object> weatableDelDemo(Map<String, Object> params);

    /**
     * 修改
     * @param params
     * @return
     */
    Map<String,Object> weatableEditDemo(Map<String, Object> params);

    /**
     * 导入
     * @param params
     * @return
     */
    Map<String, Object> ImpExcelDemo(Map<String, Object> params);


}

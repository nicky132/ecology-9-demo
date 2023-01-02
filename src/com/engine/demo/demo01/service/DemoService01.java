package com.engine.demo.demo01.service;

import java.util.Map;

public interface DemoService01 {
    /**
     * 获取form表单
     * @param params
     * @return
     */
    Map<String, Object> getFormDemo(Map<String, Object> params);


    /**
     * 保存数据
     * @param params
     * @return
     */
    Map<String, Object> saveFormDemo(Map<String, Object> params);


}

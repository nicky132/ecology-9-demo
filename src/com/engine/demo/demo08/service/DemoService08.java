package com.engine.demo.demo08.service;

import cpcns.http.HttpRequest;
import cpcns.http.HttpResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.Map;

public interface DemoService08 {

    /**
     * 获取数据
     * @param params
     * @return
     */
    Map<String, Object> WeaReportDemo(Map<String, Object> params);

    /**
     * 获取条件
     * @param params
     * @return
     */
    Map<String, Object> WeaReportConditionDemo(Map<String, Object> params);


    /**
     * 导出excel
     *
     */
    InputStream WeaReportOutExcel(HttpServletRequest request, HttpServletResponse response);
}

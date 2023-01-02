package com.engine.demo.demo06.service.Impl;

import com.engine.core.impl.Service;
import com.engine.demo.demo06.cmd.*;
import com.engine.demo.demo06.service.DemoService06;

import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/19  11:47
 * @Version 1.0 :
 * @Description :
 **/
public class DemoServiceImpl06 extends Service implements DemoService06 {

    @Override
    public Map<String, Object> weatableDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> weatableConditonDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableConditonDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> weatableFormDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableFormDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> weatableAddDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableAddDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> weatableDelDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableDelDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> weatableEditDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableEditDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> ImpExcelDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableImpExcelDemoCmd(user,params));
    }
}

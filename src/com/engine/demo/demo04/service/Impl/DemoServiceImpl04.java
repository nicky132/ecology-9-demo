package com.engine.demo.demo04.service.Impl;

import com.engine.core.impl.Service;
import com.engine.demo.demo04.cmd.WeaTableDemoCmd;
import com.engine.demo.demo04.cmd.WeatableConditonDemoCmd;
import com.engine.demo.demo04.service.DemoService04;

import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/19  11:47
 * @Version 1.0 :
 * @Description :
 **/
public class DemoServiceImpl04 extends Service implements DemoService04 {

    @Override
    public Map<String, Object> weatableDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeaTableDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> weatableConditonDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeatableConditonDemoCmd(user,params));
    }
}

package com.engine.demo.demo07.service.Impl;

import com.engine.core.impl.Service;
import com.engine.demo.demo07.cmd.AnalConditionDemoCmd;
import com.engine.demo.demo07.cmd.AnalDataDemoCmd;
import com.engine.demo.demo07.service.DemoService07;

import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/19  11:47
 * @Version 1.0 :
 * @Description :
 **/
public class DemoServiceImpl07 extends Service implements DemoService07 {


    @Override
    public Map<String, Object> analConditionDemo(Map<String, Object> params) {
        return commandExecutor.execute(new AnalConditionDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> analDataDemo(Map<String, Object> params) {
        return commandExecutor.execute(new AnalDataDemoCmd(user,params));
    }
}

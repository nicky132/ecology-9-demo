package com.engine.demo.demo01.service.Impl;

import com.engine.core.impl.Service;
import com.engine.demo.demo01.cmd.GetFormDemoCmd;
import com.engine.demo.demo01.cmd.SaveFormDemoCmd;
import com.engine.demo.demo01.service.DemoService01;

import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/19  11:47
 * @Version 1.0 :
 * @Description :
 **/
public class DemoServiceImpl01 extends Service implements DemoService01 {
    @Override
    public Map<String, Object> getFormDemo(Map<String, Object> params) {
        return commandExecutor.execute(new GetFormDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> saveFormDemo(Map<String, Object> params) {
        return commandExecutor.execute(new SaveFormDemoCmd(user,params));
    }
}

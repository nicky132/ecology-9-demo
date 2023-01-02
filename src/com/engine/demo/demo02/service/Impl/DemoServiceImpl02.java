package com.engine.demo.demo02.service.Impl;

import com.engine.core.impl.Service;
import com.engine.demo.demo02.cmd.GetFormDemoCmd;
import com.engine.demo.demo02.service.DemoService02;

import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/19  11:47
 * @Version 1.0 :
 * @Description :
 **/
public class DemoServiceImpl02 extends Service implements DemoService02 {
    @Override
    public Map<String, Object> getFormDemo(Map<String, Object> params) {
        return commandExecutor.execute(new GetFormDemoCmd(user,params));
    }
}

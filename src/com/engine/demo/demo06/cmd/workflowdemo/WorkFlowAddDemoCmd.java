package com.engine.demo.demo06.cmd.workflowdemo;

import com.engine.common.biz.AbstractCommonCommand;
import com.engine.common.entity.BizLogContext;
import com.engine.core.interceptor.CommandContext;
import weaver.common.DateUtil;
import weaver.conn.RecordSet;
import weaver.general.Util;
import weaver.hrm.HrmUserVarify;
import weaver.hrm.User;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/*
 * @Author      :wyl
 * @Date        :2019/4/10  14:42
 * @Version 1.0 :
 * @Description :新增数据
 **/
public class WorkFlowAddDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WorkFlowAddDemoCmd(User user, Map<String,Object> params) {
        this.user = user;
        this.params = params;
    }

    @Override
    public BizLogContext getLogContext() {
        return null;
    }

    @Override
    public Map<String, Object> execute(CommandContext commandContext) {

        Map<String, Object> apidatas = new HashMap<String, Object>();
        //角色判断参考代码
//        if(!HrmUserVarify.checkUserRight("LogView:View", user)){
//            apidatas.put("hasRight", false);
//            return apidatas;
//        }

        if (null == user){
            apidatas.put("hasRight", false);
            return apidatas;
        }

        apidatas.put("hasRight", true);


        String id = UUID.randomUUID().toString();
        String requestname =  Util.null2String(params.get("requestname"));
        String creater =  Util.null2String(params.get("creater"));
        String state =  Util.null2String(params.get("state"));
        String date = DateUtil.getCurrentDate();
        String type = Util.null2String(params.get("type"));

        RecordSet recordSet = new RecordSet();
        String sql = "insert into ECOLOGY_PC_DEMO_WORKFOLW values(?,?,?,?,?,?)";
        recordSet.executeUpdate(sql,id,requestname,creater,state,date,type);

        return apidatas;
    }
}

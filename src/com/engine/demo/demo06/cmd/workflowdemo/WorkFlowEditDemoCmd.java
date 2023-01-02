package com.engine.demo.demo06.cmd.workflowdemo;

import com.engine.common.biz.AbstractCommonCommand;
import com.engine.common.entity.BizLogContext;
import com.engine.core.interceptor.CommandContext;
import weaver.conn.RecordSet;
import weaver.general.Util;
import weaver.hrm.HrmUserVarify;
import weaver.hrm.User;

import java.util.HashMap;
import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/10  14:44
 * @Version 1.0 :
 * @Description :
 **/
public class WorkFlowEditDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WorkFlowEditDemoCmd(User user, Map<String,Object> params) {
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

        String id =  Util.null2String(params.get("id"));
        String requestname =  Util.null2String(params.get("requestname"));
        String state =  Util.null2String(params.get("state"));

        RecordSet recordSet = new RecordSet();
        String sql = "update ECOLOGY_PC_DEMO_WORKFOLW set requestname = ?,state = ? where id = ?";
        recordSet.executeUpdate(sql,requestname,state,id);
        return apidatas;
    }
}

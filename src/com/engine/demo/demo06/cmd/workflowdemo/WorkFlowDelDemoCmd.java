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
 * @Description :删除数据
 **/
public class WorkFlowDelDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WorkFlowDelDemoCmd(User user, Map<String,Object> params) {
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

        RecordSet recordSet = new RecordSet();
        String sql = "delete from ECOLOGY_PC_DEMO_WORKFOLW where id = ?";
        recordSet.executeUpdate(sql,id);

        return apidatas;
    }
}

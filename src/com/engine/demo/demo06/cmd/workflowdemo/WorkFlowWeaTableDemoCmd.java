package com.engine.demo.demo06.cmd.workflowdemo;

import com.cloudstore.eccom.constant.WeaBoolAttr;
import com.cloudstore.eccom.pc.table.WeaTable;
import com.cloudstore.eccom.pc.table.WeaTableColumn;
import com.cloudstore.eccom.pc.table.WeaTableOperate;
import com.cloudstore.eccom.pc.table.WeaTableOperates;
import com.cloudstore.eccom.result.WeaResultMsg;
import com.engine.common.biz.AbstractCommonCommand;
import com.engine.common.entity.BizLogContext;
import com.engine.core.interceptor.CommandContext;
import org.apache.commons.lang.StringUtils;
import weaver.general.PageIdConst;
import weaver.general.Util;
import weaver.hrm.HrmUserVarify;
import weaver.hrm.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/9  17:25
 * @Version 1.0 :
 * @Description :
 **/
public class WorkFlowWeaTableDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WorkFlowWeaTableDemoCmd(User user, Map<String,Object> params) {
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

        try {
            //返回消息结构体
            WeaResultMsg result = new WeaResultMsg(false);

            String pageID = "17ecc14c-9d64-4a43-81a4-7b7c6f792857";
            String pageUid = pageID + "_" + user.getUID();
            String pageSize = PageIdConst.getPageSize(pageID, user.getUID());
            String sqlwhere = " 1=1 ";

            //新建一个weatable
            WeaTable table = new WeaTable();
            table.setPageUID(pageUid);
            table.setPageID(pageID);
            table.setPagesize(pageSize);

            String fileds = " w.id,w.requestname,w.state,w.creatertime,w.creater,w.type,h.lastname ";
            table.setBackfields(fileds);

            //搜索条件,这里可以放高级搜索的的条件
            String requestname =  Util.null2String(params.get("requestname"));
            if (StringUtils.isNotBlank(requestname)) {
                sqlwhere += " and w.requestname like '%" + requestname + "%' ";
            }

            //创建人
            String creater =  Util.null2String(params.get("creater"));
            if (StringUtils.isNotBlank(creater)) {
                sqlwhere += " and w.creater in '(" + creater + ")' ";
            }

            //状态
            String state =  Util.null2String(params.get("state"));
            if (StringUtils.isNotBlank(state) && !StringUtils.equals("0",state)) {
                sqlwhere += " and w.state = '" + state + "' ";
            }

            //类型
            String type =  Util.null2String(params.get("type"));
            if (StringUtils.isNotBlank(type) && !StringUtils.equals("0",type)) {
                sqlwhere += " and w.type = '" + type + "' ";
            }

            String creatertime =  Util.null2String(params.get("creatertime"));
            if(StringUtils.isNotBlank(creatertime)){

            }


            //创建时间 startDate endDate
//            String startDate = Util.null2String(params.get("startDate"));
//            String endDate = Util.null2String(params.get("endDate"));
//            if(StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)){
//                sqlwhere += " and creatertime>='" + startDate + "' and creatertime<='" + endDate + "' ";
//            }



            table.setSqlform(" ECOLOGY_PC_DEMO_WORKFOLW w LEFT JOIN HrmResource h on w.creater = h.id ");
            table.setSqlwhere(sqlwhere);
            table.setSqlorderby("id");
            table.setSqlprimarykey("id");
            table.setSqlisdistinct("false");

            table.getColumns().add(new WeaTableColumn("id").setDisplay(WeaBoolAttr.FALSE));   //设置为不显示
            table.getColumns().add(new WeaTableColumn("20%", "请求标题", "requestname","requestname"));
            table.getColumns().add(new WeaTableColumn("20%", "创建人", "lastname","lastname"));
            table.getColumns().add(new WeaTableColumn("20%", "状态", "state","state","com.engine.demo.cmd.workflowdemo.WorkFlowWeaTableTransMethod.testTransMethod"));
            table.getColumns().add(new WeaTableColumn("20%", "类型", "type","type","com.engine.demo.cmd.workflowdemo.WorkFlowWeaTableTransMethod.getType"));
            table.getColumns().add(new WeaTableColumn("20%", "创建日期", "creatertime","creatertime"));

            //增加右侧操作选项
            WeaTableOperates weaTableOperates = new WeaTableOperates();
            List<WeaTableOperate> operateList = new ArrayList<>();

            WeaTableOperate edit = new WeaTableOperate("编辑","","0");
            WeaTableOperate delete = new WeaTableOperate("删除","","1");
            operateList.add(edit);
            operateList.add(delete);

            weaTableOperates.setOperate(operateList);
            table.setOperates(weaTableOperates);

            result.putAll(table.makeDataResult());
            result.put("hasRight", true);
            result.success();
            apidatas = result.getResultMap();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return apidatas;
    }
}

package com.engine.demo.demo08.cmd;

import com.engine.common.biz.AbstractCommonCommand;
import com.engine.common.entity.BizLogContext;
import com.engine.core.interceptor.CommandContext;
import org.apache.commons.lang.StringUtils;
import weaver.general.Util;
import weaver.hrm.HrmUserVarify;
import weaver.hrm.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/23  10:17
 * @Version 1.0 :
 * @Description :报表
 **/
public class WeaReportDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WeaReportDemoCmd(User user, Map<String,Object> params) {
        this.user = user;
        this.params = params;
    }

    @Override
    public BizLogContext getLogContext() {
        return null;
    }

    @Override
    public Map<String, Object> execute(CommandContext commandContext) {

        //权限校验
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


        /**
         * 构造最外层,模拟数据，这里根据前端格式拼接数据
         */
        List<Object> list = new ArrayList<>();





        /**
         * 这里的所有模拟数据都是根据前端凭借的，开发者可以自定型
         */
        Map<String,Object> map = new HashMap<>();

        List<String> data = new ArrayList<>();

        data.add("开票金额");
        data.add("0.00");
        data.add("0.00");
        data.add("0.00");
        data.add("89.00");
        data.add("0.00");
        data.add("0.00");
        data.add("0.00");
        data.add("0.00");
        data.add("0.00");
        data.add("0.00");
        data.add("0.00");
        data.add("0.00");
        data.add("89.00");

        List<Object> child = new ArrayList<>();

        Map<String,Object> childMap01 = new HashMap<>();
        List<String> childData01 = new ArrayList<>();
        childData01.add("无票");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childData01.add("0.00");
        childMap01.put("data",childData01);
        child.add(childMap01);


        Map<String,Object> childMap02= new HashMap<>();
        List<String> childData02= new ArrayList<>();
        childData02.add("专票");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childData02.add("0.00");
        childMap02.put("data",childData02);
        child.add(childMap02);

        Map<String,Object> childMap03= new HashMap<>();
        List<String> childData03= new ArrayList<>();
        childData03.add("普票");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childData03.add("0.00");
        childMap03.put("data",childData03);
        child.add(childMap03);

        map.put("data",data);
        map.put("child",child);

        list.add(map);

        apidatas.put("data",list);
        return apidatas;
    }
}

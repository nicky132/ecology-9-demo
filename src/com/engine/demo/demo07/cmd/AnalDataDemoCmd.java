package com.engine.demo.demo07.cmd;

import com.engine.common.biz.AbstractCommonCommand;
import com.engine.common.entity.BizLogContext;
import com.engine.core.interceptor.CommandContext;
import org.apache.commons.lang.StringUtils;
import weaver.general.Util;
import weaver.hrm.HrmUserVarify;
import weaver.hrm.User;

import java.util.HashMap;
import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/10  10:01
 * @Version 1.0 :
 * @Description :
 **/
public class AnalDataDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public AnalDataDemoCmd(User user, Map<String,Object> params) {
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

        String dateFrom =  Util.null2String(params.get("dateFrom"));

        /**
         * 模拟数据
         */
        Map<String,Object> adjustColumnar = new HashMap<>();
        if(StringUtils.equals("1",dateFrom)){
            String []adjust_categories = new String[]{"衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"};  //x 轴
            int []adjust_series = new int[]{100, 200, 455, 233, 144, 266};                                 //series
            adjustColumnar.put("categories",adjust_categories);
            adjustColumnar.put("series",adjust_series);
        }

        apidatas.put("data",adjustColumnar);

        return apidatas;
    }
}

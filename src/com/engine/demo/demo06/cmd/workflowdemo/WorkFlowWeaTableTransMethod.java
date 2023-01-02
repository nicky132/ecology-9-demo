package com.engine.demo.demo06.cmd.workflowdemo;

import org.apache.commons.lang.StringUtils;

/*
 * @Author      :wyl
 * @Date        :2019/4/2  11:10
 * @Version 1.0 :
 * @Description :设置一个weatable的transmethod的方法
 **/
public class WorkFlowWeaTableTransMethod {

    public static String testTransMethod(String param){
        //在这里你可以实现你的任何业务逻辑
        if(StringUtils.equals(param,"1")){
            return "开始";
        }else if(StringUtils.equals(param,"2")){
            return "流转";
        }else if(StringUtils.equals(param,"3")){
            return "撤销";
        }else if(StringUtils.equals(param,"4")){
            return "结束";
        }
        return "";
    }

    public static String getType(String param){
        //在这里你可以实现你的任何业务逻辑
        if(StringUtils.equals(param,"1")){
            return "类型一";
        }else if(StringUtils.equals(param,"2")){
            return "类型二";
        }else if(StringUtils.equals(param,"3")){
            return "类型三";
        }
        return "";
    }
}

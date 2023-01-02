package com.engine.demo.demo07.web;

import com.alibaba.fastjson.JSONObject;
import com.engine.common.util.ParamUtil;
import com.engine.common.util.ServiceUtil;
import com.engine.demo.demo07.service.DemoService07;
import com.engine.demo.demo07.service.Impl.DemoServiceImpl07;
import weaver.hrm.HrmUserVarify;
import weaver.hrm.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/19  11:46
 * @Version 1.0 :
 * @Description :weatable  完整的增删改查
 **/
public class DemoAction07 {

    private DemoService07 getService(User user) {
        return (DemoServiceImpl07) ServiceUtil.getService(DemoServiceImpl07.class, user);
    }

    /**
     * 获取form表单
     * @param request
     * @param response
     * @return
     */
    @GET
    @Path("/analConditionDemo")
    @Produces({MediaType.TEXT_PLAIN})
    public String analConditionDemo(@Context HttpServletRequest request, @Context HttpServletResponse response){
        Map<String, Object> apidatas = new HashMap<String, Object>();
        try {
            //获取当前用户
            User user = HrmUserVarify.getUser(request, response);
            apidatas.putAll(getService(user).analConditionDemo(ParamUtil.request2Map(request)));
            apidatas.put("api_status", true);
        } catch (Exception e) {
            e.printStackTrace();
            apidatas.put("api_status", false);
            apidatas.put("api_errormsg", "catch exception : " + e.getMessage());
        }
        return JSONObject.toJSONString(apidatas);
    }


    /**
     * 获取数据
     * @param request
     * @param response
     * @return
     */
    @GET
    @Path("/analDataDemo")
    @Produces({MediaType.TEXT_PLAIN})
    public String analDataDemo(@Context HttpServletRequest request, @Context HttpServletResponse response){
        Map<String, Object> apidatas = new HashMap<String, Object>();
        try {
            //获取当前用户
            User user = HrmUserVarify.getUser(request, response);
            apidatas.putAll(getService(user).analDataDemo(ParamUtil.request2Map(request)));
            apidatas.put("api_status", true);
        } catch (Exception e) {
            e.printStackTrace();
            apidatas.put("api_status", false);
            apidatas.put("api_errormsg", "catch exception : " + e.getMessage());
        }
        return JSONObject.toJSONString(apidatas);
    }

}

package com.engine.demo.demo07.cmd;

import com.api.browser.bean.SearchConditionItem;
import com.api.browser.bean.SearchConditionOption;
import com.api.browser.util.ConditionType;
import com.engine.common.biz.AbstractCommonCommand;
import com.engine.common.entity.BizLogContext;
import com.engine.core.interceptor.CommandContext;
import weaver.hrm.HrmUserVarify;
import weaver.hrm.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/10  9:28
 * @Version 1.0 :
 * @Description :
 **/
public class AnalConditionDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public AnalConditionDemoCmd(User user, Map<String,Object> params) {
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

        List<SearchConditionItem> weaRadioGroup = new ArrayList<SearchConditionItem>();

        /**
         * 联动类型
         */
        SearchConditionItem demo_linkage = new SearchConditionItem();
        demo_linkage.setLabel("创建时间范围"); //label 标签的文本
        //设置选项值
        List<SearchConditionOption> selectlinkage_options = new ArrayList<>();  //设置联动
        selectlinkage_options.add(new SearchConditionOption("0","上一月"));
        selectlinkage_options.add(new SearchConditionOption("1","本季",true));
        selectlinkage_options.add(new SearchConditionOption("2","上一季"));
        selectlinkage_options.add(new SearchConditionOption("3","本年"));
        selectlinkage_options.add(new SearchConditionOption("4","上一年"));
        selectlinkage_options.add(new SearchConditionOption("5","指定日期范围"));
        demo_linkage.setOptions(selectlinkage_options);
        demo_linkage.setDomkey(new String[]{"dateFrom"}); //选择项的key
        SearchConditionItem demo_selectlinkage_1 = new SearchConditionItem(ConditionType.RANGEPICKER,"",new String[]{"startDate","endDate"});
        Map<String,SearchConditionItem> map1 = new HashMap<>();
        map1.put("5",demo_selectlinkage_1);
        demo_linkage.setSelectLinkageDatas(map1);   //设置联动组件配置
        demo_linkage.setLabelcol(6);                //label 标签布局，　
        demo_linkage.setFieldcol(18);               //右侧内容布局
        weaRadioGroup.add(demo_linkage);

        apidatas.put("weaRadioGroup",weaRadioGroup);

        return apidatas;
    }
}

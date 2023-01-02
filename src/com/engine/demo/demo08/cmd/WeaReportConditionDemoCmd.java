package com.engine.demo.demo08.cmd;

import com.api.browser.bean.SearchConditionGroup;
import com.api.browser.bean.SearchConditionItem;
import com.api.browser.bean.SearchConditionOption;
import com.api.browser.util.ConditionFactory;
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
 * @Date        :2019/4/23  11:05
 * @Version 1.0 :
 * @Description :搜索条件
 **/
public class WeaReportConditionDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WeaReportConditionDemoCmd(User user, Map<String,Object> params) {
        this.user = user;
        this.params = params;
    }

    @Override
    public BizLogContext getLogContext() {
        return null;
    }

    @Override
    public Map<String, Object> execute(CommandContext commandContext) {

        //定义返回数据
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

        ConditionFactory conditionFactory = new ConditionFactory(user);

        //条件组
        List<SearchConditionGroup> addGroups = new ArrayList<SearchConditionGroup>();

        List<SearchConditionItem> conditionItems = new ArrayList<SearchConditionItem>();


        //日期格式
        SearchConditionItem year = conditionFactory.createCondition(ConditionType.DATEPICKER,502227,"year");
        year.setColSpan(2);
        year.setFieldcol(12);
        year.setLabelcol(6);
        year.setViewAttr(2);
        year.setIsQuickSearch(true);
        year.setLabel("年份");
        year.setRules("required");
        year.setValue("2019");

        //扩展属性
        Map<String,Object> format = new HashMap<>();
        format.put("format","YYYY");

        year.setOtherParams(format);
        conditionItems.add(year);

        //下拉选择框类
        SearchConditionItem company = conditionFactory.createCondition(ConditionType.SELECT,502327,"company");
        List<SearchConditionOption> selectOptions = new ArrayList <>();  //设置选项值
        selectOptions.add(new SearchConditionOption("0","",true));
        selectOptions.add(new SearchConditionOption("1","A公司"));
        selectOptions.add(new SearchConditionOption("2","B公司"));
        company.setOptions(selectOptions);
        company.setColSpan(2);
        company.setFieldcol(16);
        company.setLabelcol(8);
        company.setIsQuickSearch(false);
        company.setLabel("公司");
        conditionItems.add(company);


        addGroups.add(new SearchConditionGroup("",true,conditionItems));

        apidatas.put("condition",addGroups);
        return apidatas;
    }
}

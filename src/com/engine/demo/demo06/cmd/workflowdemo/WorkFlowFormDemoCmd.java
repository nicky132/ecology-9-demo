package com.engine.demo.demo06.cmd.workflowdemo;

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
 * @Date        :2019/4/11  9:46
 * @Version 1.0 :
 * @Description :form表单
 **/
public class WorkFlowFormDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WorkFlowFormDemoCmd(User user, Map<String,Object> params) {
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

        ConditionFactory conditionFactory = new ConditionFactory(user);

        //条件组
        List<SearchConditionGroup> addGroups = new ArrayList<SearchConditionGroup>();

        List<SearchConditionItem> conditionItems = new ArrayList<SearchConditionItem>();

        //文本输入框
        SearchConditionItem requestname = conditionFactory.createCondition(ConditionType.INPUT,502327, "requestname");
        requestname.setColSpan(2);//定义一行显示条件数，默认值为2,当值为1时标识该条件单独占一行
        requestname.setFieldcol(16);	//条件输入框所占宽度，默认值18
        requestname.setLabelcol(8);
        requestname.setViewAttr(2);  //	 编辑权限  1：只读，2：可编辑， 3：必填   默认2
        requestname.setLabel("请求标题"); //设置文本值  这个将覆盖多语言标签的值
        conditionItems.add(requestname);


        //文本输入框
        SearchConditionItem creater = conditionFactory.createCondition(ConditionType.BROWSER,502327, "creater","17");
        creater.setColSpan(2);//定义一行显示条件数，默认值为2,当值为1时标识该条件单独占一行
        creater.setFieldcol(16);	//条件输入框所占宽度，默认值18
        creater.setLabelcol(8);
        creater.setViewAttr(2);  //	 编辑权限  1：只读，2：可编辑， 3：必填   默认2
        creater.setViewAttr(3);
        creater.setLabel("创建人"); //设置文本值  这个将覆盖多语言标签的值
        creater.setRules("required");
        conditionItems.add(creater);

        //下拉选择框类
        SearchConditionItem demo_select = conditionFactory.createCondition(ConditionType.SELECT,502327,"state");
        List<SearchConditionOption> selectOptions = new ArrayList <>();  //设置选项值
        selectOptions.add(new SearchConditionOption("0","",true));
        selectOptions.add(new SearchConditionOption("1","开始"));
        selectOptions.add(new SearchConditionOption("2","流转"));
        selectOptions.add(new SearchConditionOption("3","撤销"));
        selectOptions.add(new SearchConditionOption("4","结束"));
        demo_select.setOptions(selectOptions);
        demo_select.setColSpan(2);
        demo_select.setFieldcol(16);
        demo_select.setLabelcol(8);
        demo_select.setIsQuickSearch(false);
        demo_select.setLabel("状态");
        conditionItems.add(demo_select);

        //下拉选择框类
        SearchConditionItem type = conditionFactory.createCondition(ConditionType.SELECT,502327,"type");
        List<SearchConditionOption> typeOptions = new ArrayList <>();  //设置选项值
        typeOptions.add(new SearchConditionOption("0","",true));
        typeOptions.add(new SearchConditionOption("1","类型一"));
        typeOptions.add(new SearchConditionOption("2","类型二"));
        typeOptions.add(new SearchConditionOption("3","类型三"));
        type.setOptions(typeOptions);
        type.setColSpan(2);
        type.setFieldcol(16);
        type.setLabelcol(8);
        type.setIsQuickSearch(false);
        type.setLabel("类型");
        conditionItems.add(type);

        addGroups.add(new SearchConditionGroup("",true,conditionItems));

        apidatas.put("condition",addGroups);

        return apidatas;

    }
}

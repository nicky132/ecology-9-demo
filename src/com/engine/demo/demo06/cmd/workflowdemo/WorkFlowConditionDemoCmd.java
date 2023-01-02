package com.engine.demo.demo06.cmd.workflowdemo;

import com.api.browser.bean.SearchConditionGroup;
import com.api.browser.bean.SearchConditionItem;
import com.api.browser.bean.SearchConditionOption;
import com.api.browser.util.ConditionFactory;
import com.api.browser.util.ConditionType;
import com.cloudstore.eccom.constant.WeaBoolAttr;
import com.cloudstore.eccom.pc.tree.WeaTreeNode;
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
 * @Date        :2019/3/29  17:23
 * @Version 1.0 :
 * @Description :获取高级搜索条件
 * 高级搜索其实是和form表单一样的获取方式，这里就示范几个简单的，复杂操作可查看form表单操作
 *
 **/
public class WorkFlowConditionDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WorkFlowConditionDemoCmd(User user, Map<String,Object> params) {
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
        requestname.setFieldcol(12);	//条件输入框所占宽度，默认值18
        requestname.setViewAttr(2);  //	 编辑权限  1：只读，2：可编辑， 3：必填   默认2
        requestname.setLabel("请求标题"); //设置文本值  这个将覆盖多语言标签的值
        conditionItems.add(requestname);


        //文本输入框
        SearchConditionItem creater = conditionFactory.createCondition(ConditionType.BROWSER,502327, "creater","17");
        creater.setColSpan(2);//定义一行显示条件数，默认值为2,当值为1时标识该条件单独占一行
        creater.setFieldcol(12);	//条件输入框所占宽度，默认值18
        creater.setViewAttr(2);  //	 编辑权限  1：只读，2：可编辑， 3：必填   默认2
        creater.setLabel("创建人"); //设置文本值  这个将覆盖多语言标签的值
        conditionItems.add(creater);

        //下拉选择框类
        SearchConditionItem demo_select = conditionFactory.createCondition(ConditionType.SELECT,502327,"state");
        List<SearchConditionOption> selectOptions = new ArrayList <>();  //设置选项值
        selectOptions.add(new SearchConditionOption("0","全部",true));
        selectOptions.add(new SearchConditionOption("1","开始"));
        selectOptions.add(new SearchConditionOption("2","流转"));
        selectOptions.add(new SearchConditionOption("3","撤销"));
        selectOptions.add(new SearchConditionOption("4","结束"));
        demo_select.setOptions(selectOptions);
        demo_select.setColSpan(2);
        demo_select.setFieldcol(12);
        demo_select.setLabelcol(6);
        demo_select.setIsQuickSearch(false);
        demo_select.setLabel("状态");
        conditionItems.add(demo_select);


        SearchConditionItem type = conditionFactory.createCondition(ConditionType.SELECT,502327,"state");
        List<SearchConditionOption> selectTypes = new ArrayList <>();  //设置选项值
        selectTypes.add(new SearchConditionOption("0","全部",true));
        selectTypes.add(new SearchConditionOption("1","类型一"));
        selectTypes.add(new SearchConditionOption("2","类型二"));
        selectTypes.add(new SearchConditionOption("3","类型三"));
        type.setOptions(selectTypes);
        type.setColSpan(2);
        type.setFieldcol(12);
        type.setLabelcol(6);
        type.setIsQuickSearch(false);
        type.setLabel("类型");
        conditionItems.add(type);

        //日期区间
        SearchConditionItem date = conditionFactory.createCondition(ConditionType.DATE,502327,"creatertime");
        List<SearchConditionOption> dateOptions = new ArrayList <>();  //设置选项值
        dateOptions.add(new SearchConditionOption("0","全部",true));
        dateOptions.add(new SearchConditionOption("1","今天"));
        dateOptions.add(new SearchConditionOption("2","本周"));
        dateOptions.add(new SearchConditionOption("3","本月"));
        dateOptions.add(new SearchConditionOption("4","本季"));
        dateOptions.add(new SearchConditionOption("5","本年"));
        dateOptions.add(new SearchConditionOption("6","指定日期范围"));
        date.setOptions(dateOptions);
        date.setColSpan(2);
        date.setFieldcol(12);
        date.setLabelcol(6);
        date.setViewAttr(2);
        date.setLabel("日期搜索");
        conditionItems.add(date);

        addGroups.add(new SearchConditionGroup("",true,conditionItems));

        //tab分页组
        List<Map<String,Object>> list = new ArrayList<>();

        //每个tab页
        Map<String,Object> tab1 = new HashMap<>();
        tab1.put("color","#000000");
        tab1.put("groupid","flowAll");
        tab1.put("showcount",true);
        tab1.put("title","全部");
        tab1.put("state",0);
        list.add(tab1);

        Map<String,Object> tab2 = new HashMap<>();
        tab2.put("color","#flowNew");
        tab2.put("groupid","flowNew");
        tab2.put("showcount",true);
        tab2.put("title","开始");
        tab2.put("state",1);
        list.add(tab2);

        Map<String,Object> tab3 = new HashMap<>();
        tab3.put("color","#fea468");
        tab3.put("groupid","flowRes");
        tab3.put("showcount",true);
        tab3.put("title","流转");
        tab3.put("state",2);
        list.add(tab3);

        Map<String,Object> tab4 = new HashMap<>();
        tab4.put("color","#9766fd");
        tab4.put("groupid","flowOver");
        tab4.put("showcount",true);
        tab4.put("title","撤销");
        tab4.put("state",3);
        list.add(tab4);

        Map<String,Object> tab5 = new HashMap<>();
        tab5.put("color","#000000");
        tab5.put("groupid","flowSup");
        tab5.put("showcount",true);
        tab5.put("title","结束");
        tab5.put("state",4);
        list.add(tab5);

        //左侧树

        List<WeaTreeNode> fatherTreeNodeList = new ArrayList<>();

        WeaTreeNode fatherTreeNode = new WeaTreeNode();

        List<WeaTreeNode> childNodes = new ArrayList<>();

        WeaTreeNode childnode1 = new WeaTreeNode();
        childnode1.setDomid("wf_740");
        childnode1.setHaschild(WeaBoolAttr.FALSE);
        childnode1.setIsopen(WeaBoolAttr.FALSE);
        childnode1.setKey("1");
        childnode1.setName("类型一");
        childNodes.add(childnode1);

        WeaTreeNode childnode2 = new WeaTreeNode();
        childnode2.setDomid("wf_741");
        childnode2.setHaschild(WeaBoolAttr.FALSE);
        childnode2.setIsopen(WeaBoolAttr.FALSE);
        childnode2.setKey("2");
        childnode2.setName("类型二");
        childNodes.add(childnode2);

        WeaTreeNode childnode3 = new WeaTreeNode();
        childnode3.setDomid("wf_742");
        childnode3.setHaschild(WeaBoolAttr.FALSE);
        childnode3.setIsopen(WeaBoolAttr.FALSE);
        childnode3.setKey("3");
        childnode3.setName("类型三");
        childNodes.add(childnode3);



        fatherTreeNode.setName("类型");
        fatherTreeNode.setKey("100");
        fatherTreeNode.setIsopen(WeaBoolAttr.TRUE);
        fatherTreeNode.setHaschild(WeaBoolAttr.TRUE);
        fatherTreeNode.setDomid("type");
        fatherTreeNode.setChilds(childNodes);

        fatherTreeNodeList.add(fatherTreeNode);

        apidatas.put("weaTree",fatherTreeNodeList);
        apidatas.put("weaTab",list);
        apidatas.put("condition",addGroups);

        return apidatas;
    }
}

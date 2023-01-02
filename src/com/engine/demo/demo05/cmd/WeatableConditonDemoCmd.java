package com.engine.demo.demo05.cmd;

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
 * @Date        :2019/4/11  9:46
 * @Version 1.0 :
 * @Description :获取高级搜索条件(含左侧树)
 **/
public class WeatableConditonDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public WeatableConditonDemoCmd(User user, Map<String,Object> params) {
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

        /**
         * 高级搜索条件
         */
        ConditionFactory conditionFactory = new ConditionFactory(user);

        //条件组
        List<SearchConditionGroup> addGroups = new ArrayList<SearchConditionGroup>();

        List<SearchConditionItem> conditionItems = new ArrayList<SearchConditionItem>();

        //文本输入框
        SearchConditionItem requestname = conditionFactory.createCondition(ConditionType.INPUT,502327, "requestname");
        requestname.setColSpan(2);//定义一行显示条件数，默认值为2,当值为1时标识该条件单独占一行
        requestname.setFieldcol(16);	//条件输入框所占宽度，默认值18
        requestname.setLabelcol(8);
        requestname.setViewAttr(3);  //	 编辑权限  1：只读，2：可编辑， 3：必填   默认2
        requestname.setLabel("请求标题"); //设置文本值  这个将覆盖多语言标签的值
        requestname.setRules("required");
        conditionItems.add(requestname);


        //文本输入框
        SearchConditionItem creater = conditionFactory.createCondition(ConditionType.BROWSER,502327, "creater","17");
        creater.setColSpan(2);//定义一行显示条件数，默认值为2,当值为1时标识该条件单独占一行
        creater.setFieldcol(16);	//条件输入框所占宽度，默认值18
        creater.setLabelcol(8);
        creater.setViewAttr(2);  //	 编辑权限  1：只读，2：可编辑， 3：必填   默认2
        creater.setLabel("创建人"); //设置文本值  这个将覆盖多语言标签的值
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

        /**
         * 左侧树
         */
        List<WeaTreeNode> fatherTreeNodeList = new ArrayList<>();

        WeaTreeNode fatherTreeNode = new WeaTreeNode();

        List<WeaTreeNode> childNodes = new ArrayList<>();

        WeaTreeNode childnode1 = new WeaTreeNode();
        childnode1.setDomid("1");
        childnode1.setHaschild(WeaBoolAttr.FALSE);
        childnode1.setIsopen(WeaBoolAttr.FALSE);
        childnode1.setKey("1");
        childnode1.setName("类型一");
        childNodes.add(childnode1);

        WeaTreeNode childnode2 = new WeaTreeNode();
        childnode2.setDomid("2");
        childnode2.setHaschild(WeaBoolAttr.FALSE);
        childnode2.setIsopen(WeaBoolAttr.FALSE);
        childnode2.setKey("2");
        childnode2.setName("类型二");
        childNodes.add(childnode2);

        WeaTreeNode childnode3 = new WeaTreeNode();
        childnode3.setDomid("3");
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
        apidatas.put("condition",addGroups);

        return apidatas;

    }
}

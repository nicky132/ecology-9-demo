package com.engine.demo.demo01.cmd;

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
 * @Date        :2019/3/21  15:51
 * @Version 1.0 :
 * @Description : 表单示例的demo
 **/
public class GetFormDemoCmd extends AbstractCommonCommand<Map<String,Object>> {

    public GetFormDemoCmd(User user, Map<String,Object> params) {
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

        //输入框类
        List<SearchConditionItem> inputItems = new ArrayList<SearchConditionItem>();
        //日期时间类
        List<SearchConditionItem> dateTimeItems = new ArrayList<SearchConditionItem>();
        //选择框类
        List<SearchConditionItem> selectItems = new ArrayList<SearchConditionItem>();
        //其他
        List<SearchConditionItem> otherItems = new ArrayList<SearchConditionItem>();


        List<SearchConditionGroup> addGroups = new ArrayList<SearchConditionGroup>();

        /**
         *输入框类
         */
        //文本框设置
        //SearchConditionItem demo_input = new SearchConditionItem(ConditionType.INPUT,"文本框",new String[]{"demo_input"});
        //创建SearchConditionItem工厂方法
        SearchConditionItem demo_input = conditionFactory.createCondition(ConditionType.INPUT,502327, "input");
        demo_input.setColSpan(2);//定义一行显示条件数，默认值为2,当值为1时标识该条件单独占一行
        demo_input.setFieldcol(12);	//条件输入框所占宽度，默认值18
        demo_input.setViewAttr(3);  //	 编辑权限  1：只读，2：可编辑， 3：必填   默认2
        demo_input.setLength(10);    //  设置输入长度
        demo_input.setLabel("文本输入框"); //设置文本值  这个将覆盖多语言标签的值
        demo_input.setRules("required"); //设置字段填入规则
        demo_input.setValue("我是默认值"); //这里设置数据的默认值，开发可以通过从数据库取出数据传入
        inputItems.add(demo_input);

        //整数
        SearchConditionItem demo_inputnumber = conditionFactory.createCondition(ConditionType.INPUTNUMBER,502227, "inputNumber");
        demo_inputnumber.setColSpan(2);
        demo_inputnumber.setFieldcol(12);
        demo_inputnumber.setViewAttr(2);  //
        demo_inputnumber.setLabel("数字输入框");
        demo_inputnumber.setRules("required"); //设置字段填入规则
        inputItems.add(demo_inputnumber);


        //密码框设置
        SearchConditionItem demo_password = conditionFactory.createCondition(ConditionType.PASSWORD,502227,"password");
        demo_password.setColSpan(2);
        demo_password.setFieldcol(12);
        demo_password.setViewAttr(2);
        demo_password.setLabel("密码输入框");
        demo_password.setRules("required");
        demo_password.setIsQuickSearch(true);
        demo_password.setValue("");
        inputItems.add(demo_password);


//        //密码框设置
//        SearchConditionItem demo_inputsearch = conditionFactory.createCondition(ConditionType.INPUTSEARCH,502227,"inputSearch");
//        demo_inputsearch.setColSpan(2);
//        demo_inputsearch.setFieldcol(12);
//        demo_inputsearch.setViewAttr(2);
//        demo_inputsearch.setViewAttr(2);
//        demo_inputsearch.setLabel("带放大镜输入框");
//        demo_inputsearch.setRules("required");
//        demo_inputsearch.setIsQuickSearch(true);
//        inputItems.add(demo_inputsearch);

        //多行文本框设置
        SearchConditionItem demo_textarea = conditionFactory.createCondition(ConditionType.TEXTAREA,502227, "textarea");
        demo_textarea.setColSpan(2);
        demo_textarea.setFieldcol(12);
        demo_textarea.setLabelcol(6);
        demo_textarea.setViewAttr(2);
        demo_textarea.setIsQuickSearch(true);
        demo_textarea.setLabel("多行文本框");
        inputItems.add(demo_textarea);

        //浏览按钮
        SearchConditionItem demo_browser = conditionFactory.createCondition(ConditionType.BROWSER,502227,"browser","17");
        demo_browser.setValue("demo_browser");
        demo_browser.setColSpan(2);
        demo_browser.setFieldcol(12);
        demo_browser.setLabelcol(6);
        demo_browser.setViewAttr(2);
        demo_browser.setIsQuickSearch(false);
        demo_browser.setLabel("浏览按钮");
        demo_browser.setRules("required|string");
        inputItems.add(demo_browser);

        //富文本框
        SearchConditionItem demo_richtext = conditionFactory.createCondition(ConditionType.RICHTEXT,502227, "richText");
        demo_richtext.setColSpan(2);
        demo_richtext.setFieldcol(12);
        demo_richtext.setLabelcol(6);
        demo_richtext.setViewAttr(2);
        demo_richtext.setLabel("富文本");
        inputItems.add(demo_richtext);

        addGroups.add(new SearchConditionGroup("输入框类",true,inputItems));


        /**
         *时间日期类
         */
        //日期格式
        SearchConditionItem demo_datepicker = conditionFactory.createCondition(ConditionType.DATEPICKER,502227,"datePicker");
        demo_datepicker.setColSpan(2);
        demo_datepicker.setFieldcol(12);
        demo_datepicker.setLabelcol(6);
        demo_datepicker.setViewAttr(2);
        demo_datepicker.setIsQuickSearch(true);
        demo_datepicker.setLabel("日期");
        demo_datepicker.setRules("required");
        dateTimeItems.add(demo_datepicker);

        //日期组合
        SearchConditionItem demo_dategroup = conditionFactory.createCondition(ConditionType.DATE,502227,"dateGroup");
        demo_dategroup.setColSpan(2);
        demo_dategroup.setFieldcol(12);
        demo_dategroup.setLabelcol(6);
        demo_dategroup.setViewAttr(2);
        demo_dategroup.setIsQuickSearch(true);
        demo_dategroup.setLabel("日期组合");
        demo_dategroup.setRules("required");
        dateTimeItems.add(demo_dategroup);

        //日期区间
        SearchConditionItem demo_rangepicker = conditionFactory.createCondition(ConditionType.TIMEPICKER,502227,new String[]{"resourcename1","resourcename2"});
        demo_rangepicker.setColSpan(2);
        demo_rangepicker.setFieldcol(12);
        demo_rangepicker.setLabelcol(6);
        demo_rangepicker.setViewAttr(2);
        demo_rangepicker.setLabel("日期区间");
        demo_rangepicker.setRules("required");
        dateTimeItems.add(demo_rangepicker);

        //时间区间
        SearchConditionItem demo_timepicker = conditionFactory.createCondition(ConditionType.TIMERANGEPICKER,502227,new String[]{"seclevel1","seclevel2"});
        demo_timepicker.setColSpan(2);
        demo_timepicker.setFieldcol(12);
        demo_timepicker.setLabelcol(6);
        demo_timepicker.setViewAttr(2);
        demo_timepicker.setLabel("时间区间");
        demo_timepicker.setRules("required");
        dateTimeItems.add(demo_timepicker);

//        //时间选择断
//        SearchConditionItem demo_period = conditionFactory.createCondition(ConditionType.PERIOD,502227,new String[]{"startTime","endTime"});
//        demo_period.setColSpan(2);
//        demo_period.setFieldcol(12);
//        demo_period.setLabelcol(6);
//        demo_period.setViewAttr(2);
//        demo_period.setLabel("时间区间");
//        demo_period.setRules("required");
//        demo_period.setValue(new int[]{0,22});
//        dateTimeItems.add(demo_period);

        //联动组件
        //设置主值
        SearchConditionItem demo_selectlinkage = conditionFactory.createCondition(ConditionType.SELECT_LINKAGE,502227, new String[]{"seclevellink1","seclevellink2"});

        //设置选项值
        List<SearchConditionOption> selectlinkage_options = new ArrayList <>();  //设置联动
        selectlinkage_options.add(new SearchConditionOption("0","全部"));
        selectlinkage_options.add(new SearchConditionOption("1","今天",true));
        selectlinkage_options.add(new SearchConditionOption("2","本周"));
        selectlinkage_options.add(new SearchConditionOption("2","本年"));
        selectlinkage_options.add(new SearchConditionOption("4","上个月"));
        selectlinkage_options.add(new SearchConditionOption("5","上一年"));
        selectlinkage_options.add(new SearchConditionOption("6","指定日期范围"));
        demo_selectlinkage.setOptions(selectlinkage_options);

        //设置被联动出来的值
        SearchConditionItem demo_selectlinkage_0 = conditionFactory.createCondition(ConditionType.INPUT,502227,"INPUT");
        SearchConditionItem demo_selectlinkage_1 = conditionFactory.createCondition(ConditionType.CHECKBOX,502227,"CHECKBOX");
        SearchConditionItem demo_selectlinkage_2 = conditionFactory.createCondition(ConditionType.RANGEPICKER,502227,new String[]{"start","end"});
        Map<String,SearchConditionItem> map1 = new HashMap<>();
        map1.put("1",demo_selectlinkage_0);
        map1.put("2",demo_selectlinkage_1);
        map1.put("6",demo_selectlinkage_2);

        demo_selectlinkage.setColSpan(2);
        demo_selectlinkage.setFieldcol(12);
        demo_selectlinkage.setLabelcol(6);
//        demo_inputsearch.setViewAttr(2);
        demo_selectlinkage.setSelectLinkageDatas(map1);
        demo_selectlinkage.setLabel("联动组件");
        dateTimeItems.add(demo_selectlinkage);

        addGroups.add(new SearchConditionGroup("日期时间类",true,dateTimeItems));


        /**
         * 选择框类
         */
        //下拉选择框类
        SearchConditionItem demo_select = conditionFactory.createCondition(ConditionType.SELECT,502227,"SELECT");
        List<SearchConditionOption> selectOptions = new ArrayList <>();  //设置选项值
        selectOptions.add(new SearchConditionOption("0","",true));
        selectOptions.add(new SearchConditionOption("1","男"));
        selectOptions.add(new SearchConditionOption("2","女"));
        demo_select.setOptions(selectOptions);
        demo_select.setColSpan(2);
        demo_select.setFieldcol(12);
        demo_select.setLabelcol(6);
        demo_select.setIsQuickSearch(false);
        demo_select.setLabel("下拉选择框");
        selectItems.add(demo_select);

        //check框
        SearchConditionItem demo_checkbox = conditionFactory.createCondition(ConditionType.CHECKBOX,502227,"check");
        demo_checkbox.setColSpan(2);
        demo_checkbox.setFieldcol(12);
        demo_checkbox.setLabelcol(6);
        demo_checkbox.setViewAttr(2);
        demo_checkbox.setIsQuickSearch(false);
        demo_checkbox.setLabel("check框");
        demo_checkbox.setRules("required");
        selectItems.add(demo_checkbox);


        //switch框
        SearchConditionItem demo_switch = conditionFactory.createCondition(ConditionType.SWITCH,502227, "demo_switch");
        demo_switch.setColSpan(2);
        demo_switch.setFieldcol(12);
        demo_switch.setLabelcol(6);
        demo_checkbox.setViewAttr(2);
        demo_switch.setIsQuickSearch(false);
        demo_switch.setLabel("switch框");
        selectItems.add(demo_switch);

        addGroups.add(new SearchConditionGroup("选择框类",true,selectItems));


        /**
         * 其他
         */
        //安全级别
        SearchConditionItem demo_scope =  conditionFactory.createCondition(ConditionType.SCOPE,502227,new String[]{"seclevel","seclevelTo"});
        demo_scope.setColSpan(2);
        demo_scope.setFieldcol(12);
        demo_scope.setLabelcol(6);
        demo_scope.setEndValue("100");
        demo_scope.setIsQuickSearch(false);
        demo_scope.setLabel("安全级别");
        demo_scope.setStartValue("0");
        demo_scope.setPrecision(0);
        demo_scope.setRules("scopeRequired");
        otherItems.add(demo_scope);


        //颜色选择器
        SearchConditionItem demo_colorpicker = conditionFactory.createCondition(ConditionType.COLORPICKER,502227, "colorPicker");
        demo_colorpicker.setColSpan(2);
        demo_colorpicker.setFieldcol(12);
        demo_colorpicker.setLabelcol(6);
        demo_colorpicker.setViewAttr(2);
        demo_colorpicker.setLabel("颜色选择");
        otherItems.add(demo_colorpicker);

        //附件上传
        SearchConditionItem demo_upload = conditionFactory.createCondition(ConditionType.UPLOAD,502227, "upload");
        demo_upload.setColSpan(2);
        demo_upload.setFieldcol(12);
        demo_upload.setLabelcol(6);
        demo_upload.setIsQuickSearch(false);
        demo_upload.setLabel("附件上传");
        demo_upload.setRules("required");
        demo_upload.setViewAttr(2);
        demo_upload.setUploadUrl("/api/doc/upload/uploadFile");
        demo_upload.setCategory("string");
        demo_upload.setMaxUploadSize(100); //文件大小
        demo_upload.setMaxFilesNumber(10); //文件个数
        otherItems.add(demo_upload);

        //人力资源
        SearchConditionItem demo_taggroup = conditionFactory.createCondition(ConditionType.TAGGROUP,502227,"tagGroup","17");
        demo_taggroup.setValue("demo_taggroup");
        demo_taggroup.setColSpan(2);
        demo_taggroup.setFieldcol(12);
        demo_taggroup.setLabelcol(6);
        demo_taggroup.setIsQuickSearch(false);
        demo_taggroup.setLabel("标签组");
        demo_taggroup.setViewAttr(2);
        demo_taggroup.setRules("required|string");
        otherItems.add(demo_taggroup);
        addGroups.add(new SearchConditionGroup("其他",true,otherItems));

        apidatas.put("condition", addGroups );

        return apidatas;
    }

}

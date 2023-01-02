/**
 * User: 李三杰
 * Date: 14-3-18
 * Time: 下午8:01
 * 泛微-可编辑表格插件
 */
(function(){

    /**
     * 插件提供的公共方法(全部派生于原型)
     * @type {Array}
     */
    var publicMethods = [
        //可编辑表格构造函数,新建入口
        "WeaverEditTable",
        //生成col信息
        "generatorColInfo",
        //生成表头信息
        "generatorThead",
        //获取该可编辑表格对应的dom对象
        "getContainer",
        //添加一行
        "addRow",
        //删除行
        "deleteRows",
        //复制行操作
        "copyRows",
        //注册可编辑表格事件(例如点击添加行按钮事件等)
        "registerEvents",
        //获取可编辑表格的表单序列化信息
        "getTableSeriaData",
		//获取表格对应的json窜
		"getSimpleTableJson",
        //添加定制行
		"addCustomRow",
		//重新加载数据，仅针对ajax初始化数据的情形
		"reload"
    ];

    var privateMethods=[
        //内部类,主要提供字符串拼接功能:采用array实现,提高拼接性能
        "StringBuffer",
        //美化组件使用
        "beautyWithControls",
        //注册控件鼠标悬浮时的样式
        "registerTrMouseover"
    ];


    var colortstore=["e8_title_0","e8_title_1","e8_title_2","e8_title_3","e8_title_4","e8_title_5"];


    /**
     * 插件内置常量
     * @type {string}
     */
    //输入控件
    var ITEM_INPUT='input';
    //下拉框
    var ITEM_SELECT='select';
    //日期选项
    var ITEM_DATE='date';
    //浏览框控件
	var ITEM_BROWSER='browser';
	
	var ITEM_SPAN = "span";
	
	var ITEM_CHECKBOX = "checkbox";

    /**
     * 字符串拼接工具
     * @constructor
     */
    function  StringBuffer()
    {

        this.container=[];

    }
    StringBuffer.prototype.append=function(str)
    {
        this.container.push(str);
        return this;
    }

    StringBuffer.prototype.toString=function()
    {
        return this.container.join("");
    }

	function beautyWithWuiDate(tr){
		tr.find(".wuiDate").each(function(){
			if(jQuery(this).next("button").length>0)return;
			var z = jQuery(this), n = z.attr("name"), t = z.attr("type"),v = z.val(), b = z.attr("_button"), s = z.attr("_span"), f = z.attr("_callback"), r = z.attr("_isrequired");
			n = (n == undefined || n == null || n == "") ? new Date().getTime() + "_input" : n;
			b = (b == undefined || b == null || b == "") ? n + "ReleBtn_Autogrt" : b;
			s = (s == undefined || s == null || s == "") ? n + "ReleSpan_Autogrt" : s;
			var index = -1;
			if(n.indexOf("_")!=-1){			
				index =  n.substring(n.indexOf("_")+1,n.length);
			}
			if (t != "hidden") {
				z.css("display", "none");	
				z.attr("name", n+"_back");
			}
			if(index!=-1){
				s = s+"_"+index;
			}
			if(z.next("span.mustinput").length>0){
				r="yes";
				z.next("span.mustinput").remove();
			}
			var x = "<button class=\"calendar\" type=\"button\" name=" + b + "\" id=" + b + "\" onclick=\"_gdt('" + n + "', '" + s + "', '" + f + "');\"></button>";
			x += "<span id=\"" + s + "\" name=\"" + s + "\">" + v + "</span>";
			if (r != undefined && r != null && r == "yes") {
				x += "<span id=\"" + s + "img" + "\" name=\"" + s + "img" + "\">";
				if (v == undefined || v == null || v == "") {
					x += "<img align=\"absMiddle\" src=\"/images/BacoError_wev8.gif\"/>";
				}
				x += "</span>";
				z.bind("propertychange", function () {
					checkinput(n, s + "img");
				});
			}
			z.after(x);
		});
		var language=readCookie("languageidweaver");
		if(language==8)
			languageStr ="en";
		else if(language==9)
			languageStr ="zh-tw";
		else
			languageStr ="zh-cn";
	}

	/**
	*获取浏览框的配置信息
	*
	*/

	function getBrowserConfig(span){
		var config = {
			 name:jQuery(span).attr("name"),
			 isSingle:jQuery(span).attr("isSingle")==='true'?true:false,
			 browserUrl:jQuery(span).attr("browserUrl")||jQuery(span).attr("browserurl"),
			 completeUrl:jQuery(span).attr("completeUrl")||jQuery(span).attr("completeurl"),
			 width:jQuery(span).attr("width")||jQuery(span).attr("browserwidth")||"80%",
			 browserValue:jQuery(span).attr("browserValue")||jQuery(span).attr("browservalue")||"0",
			 browserSpanValue:jQuery(span).attr("browserSpanValue")||jQuery(span).attr("browserspanvalue")||"",
			 getBrowserUrlFn:jQuery(span).attr("getBrowserUrlFn"),
			 getBrowserUrlFnParams:jQuery(span).attr("getBrowserUrlFnParams"),
			 isMustInput:jQuery(span).attr("isMustInput")||"1",
			 hasInput : jQuery(span).attr("hasInput")==='true'?true:false,
			 hasAdd : jQuery(span).attr("hasAdd")==='true'?true:false,
			 addUrl : jQuery(span).attr("addUrl"),
			 viewType : jQuery(span).attr("viewType")||"0",
			 tempTitle : jQuery(span).attr("tempTitle"),
			 type : jQuery(span).attr("type"),
			language:jQuery(span).attr("language")||7,
			 linkUrl : jQuery(span).attr("linkUrl"),
			 extraParams : jQuery(span).attr("extraParams")||"",
			 _callback : jQuery(span).attr("_callback"),
			 _callbackParams : jQuery(span).attr("_callbackParams")||"",
			 _callbackForAdd : jQuery(span).attr("_callbackForAdd"),
			 _callbackForAddParams : jQuery(span).attr("_callbackForAddParams")||"",
			 dialogHeight : jQuery(span).attr("dialogHeight"),
			 dialogWidth : jQuery(span).attr("dialogWidth"),
			 browserDialogHeight : jQuery(span).attr("browserDialogHeight"),
			 browserDialogWidth : jQuery(span).attr("browserDialogWidth"),
			 beforeDelCallback : jQuery(span).attr("beforeDelCallback"),
			 beforeDelParams : jQuery(span).attr("beforeDelParams")||{},
			 afterDelCallback : jQuery(span).attr("afterDelCallback"),
			 afterDelParams : jQuery(span).attr("afterDelParams")||{},
			 needHidden : jQuery(span).attr("needHidden")==="false"?false:true,
			 display : jQuery(span).attr("display")||"",
			 idKey : jQuery(span).attr("idKey"),
			 nameKey : jQuery(span).attr("nameKey"),
			language: jQuery(span).attr("language"),
			addBtnID: jQuery(span).attr("addBtnID"),
			browserBtnID:jQuery(span).attr("browserBtnID")
		};
		return config;
		
	}

    /**
     * 美化控件
	  entry:数据条目
     */
    function  beautyWithControls(tr,group,entry)
    {


       //美化浏览框
        tr.find(".browser").each(function(){
				
			 var config = getBrowserConfig(this);

              var name = config.name;
			  if(group.options.openindex){
					var index = group.count-1;
					if(index<0)index=0;
					name = name+"_"+index;
				}
				config.name = name;
			  //以下添加回调函数

			/*var getBrowserUrlFn = jQuery(this).attr("getBrowserUrlFn");
			if(getBrowserUrlFn){
				config["getBrowserUrlFn"] = getBrowserUrlFn;
				var getBrowserUrlFnParams = jQuery(this).attr("getBrowserUrlFnParams");
				if(getBrowserUrlFnParams){
					config["getBrowserUrlFnParams"] = getBrowserUrlFnParams;
				}
			}
			

              var _callback=jQuery(this).attr("_callback");
              if(_callback)
			  {
                 config["_callback"]= _callback;
			  }
			  var _callbackParams=jQuery(this).attr("_callbackParams");
              if(_callbackParams)
			  {
                 config["_callbackParams"]= _callbackParams;
			  }
			  var addOnClick=jQuery(this).attr("addOnClick");
              if(addOnClick)
			  {
                 config["addOnClick"]= addOnClick;
			  }
			  var _callbackForAdd=jQuery(this).attr("_callbackForAdd");
              if(_callbackForAdd)
			  {
                 config["_callbackForAdd"]= _callbackForAdd;
			  }
			  var _callbackForAddParams=jQuery(this).attr("_callbackForAddParams");
              if(_callbackForAddParams)
			  {
                 config["_callbackForAddParams"]= _callbackForAddParams;
			  }
			  var browserOnClick=jQuery(this).attr("browserOnClick");
              if(browserOnClick)
			  {
                 config["browserOnClick"]= browserOnClick;
			  }
			  var onPropertyChange=jQuery(this).attr("onPropertyChange");
              if(onPropertyChange)
			  {
                 config["onPropertyChange"]= onPropertyChange;
			  }*/

			jQuery(this).e8Browser(config);
            //浏览框需先美化,后赋值
            if(entry)
			{
			    var id;
				var ids;
				var labels;
				var tmpName = "";
				for(var i=0;i<entry.length;i++)
			    {
					tmpName = entry[i].name;
					if(group.options.openindex){
						tmpName = tmpName + "_"+(group.count-1);
					}
				   if(name===tmpName)
				   {
                      id=entry[i].value;
					  ids=id.split(",");
                      labels=entry[i].label.split(",");
					  var sb=[];
                      for(var j=0,len=labels.length;j<len;j++)
					   {
                           sb.push("<a href='#"+ids[j]+"'>"+labels[j]+"</a>");     					   				 	  
					   }
                      var label=sb.join("");
					  var data={id:id,name:label};
                      
					  var dataHidden=jQuery("<span style='display:none' class='sids'>"+id+"</span>");
                      jQuery(this).append(dataHidden);
                      dataHidden=jQuery("<span style='display:none' class='slabels'>"+label+"</span>");
                      jQuery(this).append(dataHidden);
						
					  _writeBackData(name,1,data,{isSingle:false,hasInput:true,e8os:jQuery(this)}); 

				   }
				}
 			}

		});

        //采用jnice美化checkbox框
        tr.jNice();
        try{
		jQuery("input[type=checkbox]").each(function(){
			if(jQuery(this).attr("tzCheckbox")=="true"){
				jQuery(this).tzCheckbox({labels:['','']});
			}
		});
		}catch(e){}
      
        tr.find('input[type=radio]').each(function(){
			if(!jQuery(this).attr("_normalraido")){
				jQuery(this).tzRadio({labels:['','']});
			}
		});

        var selects=tr.find("select");


        for(var i= 0,len=selects.length;i<len;i++)
        {
            if("disabled"===jQuery(selects[i]).attr("disabled"))
            {
                jQuery(selects[i]).selectbox("disable");
            }else
            {
                jQuery(selects[i]).selectbox({onOpen:function(){

                    var optionsItems=jQuery(this).next().find(".sbOptions");
                    var selectValue=jQuery(this).val();

                    optionsItems.find("a").removeClass("selectorfontstyle");

                    var item=optionsItems.find("a[href='#"+selectValue+"']");

                    item.addClass("selectorfontstyle");


                }});
            }
        }

		//美化时间控件
		beautyWithWuiDate(tr);
	}
    /**
     *注册控件鼠标悬浮的样式
     * @param option
     * @constructor
     */
    function  registerTrMouseover(table,tr)
    {
        var that=table;
        var  tbody=  table.container.find("tbody");
        tr.mouseover(function(){

            that.container.find(".trmouseover").removeClass("trmouseover");

            tbody.find("input").removeClass("itemmouseover");
            tbody.find(".sbHolder").removeClass("itemmouseover");
            tbody.find("select").removeClass("itemmouseover");
            tbody.find(".sbSelector").removeClass("sbSelectorhover");
			tbody.find(".e8_innerShowContent").removeClass("itemmouseover");
			tbody.find(".e8_outScroll").removeClass("itemmouseoverleft");
			var $this = jQuery(this);
            if($this.next().find(".linesplit").is(":visible"))
            {
                $this.next().find(".linesplit").addClass("trmouseover");
            }else
            {
                that.container.find(".tablecontainer").addClass("trmouseover");
            }

            $this.find("input").each(function(){
            	if(!jQuery(this).hasClass("ac_input")){
            		jQuery(this).addClass("itemmouseover");
            	}
            });
            $this.find(".sbHolder").addClass("itemmouseover");
            $this.find("select").addClass("itemmouseover");
            $this.find(".sbSelector").addClass("sbSelectorhover");
			$this.find(".e8_innerShowContent").addClass("itemmouseover");
			$this.find(".e8_outScroll").addClass("itemmouseoverleft");

			if(tr.hasClass("contenttr")){
				tr.addClass("Selected");
			}

        });

		tr.mouseout(function(){
			tr.removeClass("Selected");
		});

    }

	 /**
     *注册控件拖拽事件
     * @param option
     * @constructor
     */
	 function registerMouseDrag(table,tr){
		var that = table.container.find("table.grouptable");
		var fixHelper = function(e, ui) {
            ui.children().each(function() { 
                jQuery(this).width(jQuery(this).width());     //在拖动时，拖动行的cell（单元格）宽度会发生改变。在这里做了处理就没问题了
                jQuery(this).height(jQuery(this).height());  
            });  
            return ui;  
        };
        
        var copyTR = null;
 		var startIdx = 0;
        
        that.find("tbody tr.contenttr").bind("mousedown",function(e){
			copyTR = jQuery(this).next("tr");
		});
        
         that.find("tbody").sortable({                //这里是talbe tbody，绑定 了sortable  
             helper: fixHelper,                  //调用fixHelper  
             axis:"y",  
             start:function(e, ui){
                 ui.helper.addClass("e8_hover_tr")     //拖动时的行，要用ui.helper  
                 if(ui.item.hasClass("notMove")){
                 	e.stopPropagation();
                 }
                 if(copyTR){
            		copyTR.hide();
            	}
            	startIdx = ui.item.get(0).rowIndex;
                 return ui;  
             },  
             stop:function(e, ui){
                 ui.item.removeClass("e8_hover_tr"); //释放鼠标时，要用ui.item才是释放的行  
                if(copyTR){
            	  if(ui.item.get(0).rowIndex>startIdx){
             	  	ui.item.before(copyTR.clone().show());
             	  }else{
             	  	ui.item.after(copyTR.clone().show());
             	  }
            	  copyTR.remove();
            	  copyTR = null;
            	}
				//对排序字段进行更新
				if(table.options.orderField){
					var trs = that.find("tbody tr.contenttr");
					trs.each(function(idx,obj){
						jQuery(obj).find("input[name^='"+table.options.orderField+"']").val(idx);
					});
				}
                return ui;  
             }  
         });  
	 }

    /**
     * 为行表单元素添加下标
     * @param weavertable
     */
   function  addRowIndex(weavertable,tr)
   {
       /**
        * 创建索引
        */
       if(weavertable.options.openindex)
       {
           var indexname="";
           tr.find("input").each(function(){

               var indexname=jQuery(this).attr("name")+"_"+ weavertable.count;
			   var id = jQuery(this).attr("id");
			   if(id){
				 jQuery(this).attr("id",id+"_"+weavertable.count);
			   }else{
				jQuery(this).attr("id",indexname);
			   }
               jQuery(this).attr("name",indexname);

           });
           tr.find("select").each(function(){
               var indexname=jQuery(this).attr("name")+"_"+ weavertable.count;
			   var id = jQuery(this).attr("id");
			    if(id){
				 jQuery(this).attr("id",id+"_"+weavertable.count);
			   }else{
				jQuery(this).attr("id",indexname);
			   }
               jQuery(this).attr("name",indexname);

           });
       }
	    weavertable.count++;
		weavertable.realCount++;
		weavertable.container.find("#weaverTableRows").val(weavertable.count);
		weavertable.container.find("#weaverTableRealRows").val(weavertable.realCount);

   }




    /**
     * 可编辑表格构造函数
     * @param option
     * @constructor
     */
    window.WeaverEditTable=function(option)
    {
		
		option = jQuery.extend({
			optionHeadDisplay:false,
			basictitle:"",
			addrowtitle:"",
			copyrowtitle:"",
			deleterowstitle:"",
			colItems:[],
			useajax:false,
			ajaxurl:"",
			ajaxparams:{},
			usesimpledata:false,
			initdatas:null,
			openindex:true,
			canDrag:false,
			orderField:"",
			addAccesskey:"",
			copyAccesskey:"",
			delAccesskey:"",
			visibility:"visible",
			configCheckBox:false,
			cloneConfigCheckbox:false,
			needDelConfirm:true,
			checkBoxItem:{}
		},option);

         this.count=0;
		 this.realCount = 0;
		 this.deleteRowIds = "";
        /**
         * 生成列宽度信息
         * @param colItems
         * @returns {*|jQuery|HTMLElement}
         */
        function  generatorColInfo(colItems)
        {
            var  str="";
            for(var i=0;i<colItems.length;i++)
            {
                str=str+"<col width='"+colItems[i].width+"'>";
            }
            return jQuery(str);
        }


        //组容器
        this.container=jQuery("<div class='optiongroup'></div>");
        this.options=option;
		if(option && option.visibility=="hidden"){
			this.container.css("visibility","hidden");
		}
        if(option  ||  option.basictitle)
        {
            var optionHead=jQuery("<div class='optionhead'></div>");

			if(option.optionHeadDisplay){
				optionHead.css("display",option.optionHeadDisplay);
			}

            if(option.basictitle)
            {


                //添加组标题
                var optionTitle;
                /*if(option.navcolor)

                    optionTitle=jQuery("<div class='optiontitle'><span class='middleHelper'></span><span class='navcolor' style='display: inline-block;margin-right: 3px;vertical-align: middle;height:10px; width:4px; background:"+option.navcolor+"'></span><span style='vertical-align: middle'>"+option.basictitle+"</span></div>");
                else
                {
                    var colorindex=jQuery(".navcolor").length%5;
                    var navcss=colortstore[colorindex];
                    optionTitle=jQuery("<div class='optiontitle'><span class='middleHelper'></span><span class='navcolor "+navcss+"' style='display: inline-block;margin-right: 3px;vertical-align: middle;height:10px; width:4px; '></span><span style='vertical-align: middle'>"+option.basictitle+"</span></div>");
                }*/
                optionTitle=jQuery("<div class='optiontitle'><span class='middleHelper'></span><span class='navcolor'></span><span class='e8_navtitle' style='vertical-align: middle'>"+option.basictitle+"</span></div>");
                optionHead.append(optionTitle);
            }


            if(option.toolbarshow===false)
            {
            }else{
				var addTitle = option.addrowtitle || SystemEnv.getHtmlNoteName(3575,readCookie("languageidweaver"));
				var delTitle = option.deleterowstitle ||SystemEnv.getHtmlNoteName(3576,readCookie("languageidweaver"));
				var copyTitle = option.copyrowtitle || SystemEnv.getHtmlNoteName(3577,readCookie("languageidweaver"));
				if(option.addAccesskey){
					addTitle+="(Alt+"+option.addAccesskey+")";
				}
				if(option.delAccesskey){
					delTitle+="(Alt+"+option.delAccesskey+")";
				}
				if(option.copyAccesskey){
					copyTitle+="(Alt+"+option.copyAccesskey+")";
				}
				if( !option.addrowtitle  &&  !option.deleterowstitle  && !option.copyrowtitle)
				{
					//添加工具栏
					var   optionToolbar=jQuery("<div class='optionToolbar'>" +
						"<span class='middleHelper'></span>" +
						"<img class='toolpic additem' title='"+addTitle+"' accesskey='"+option.addAccesskey+"' src='/wui/theme/ecology8/weaveredittable/img/add_wev8.png'><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/add2_wev8.png</span><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/add_wev8.png</span>" +
						"<img class='toolpic deleteitem' title='"+delTitle+"' accesskey='"+option.delAccesskey+"' src='/wui/theme/ecology8/weaveredittable/img/delete_wev8.png'><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/delete2_wev8.png</span><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/delete_wev8.png</span>" +
						"<img class='toolpic copy' title='"+copyTitle+"' accesskey='"+option.copyAccesskey+"' src='/wui/theme/ecology8/weaveredittable/img/copy_wev8.png'><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/copy2_wev8.png</span><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/copy_wev8.png</span></div>");
					optionHead.append(optionToolbar);
				}else
				{
					var sb=new StringBuffer();
					//设置添加行
					if(option.addrowtitle)
					{
						sb.append("<img class='toolpic additem' title='"+addTitle+"' accesskey='"+option.addAccesskey+"' src='/wui/theme/ecology8/weaveredittable/img/add_wev8.png'><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/add2_wev8.png</span><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/add_wev8.png</span>");
					}
					//设置删除行
					if(option.deleterowstitle)
					{
						sb.append("<img class='toolpic deleteitem' title='"+delTitle+"' accesskey='"+option.delAccesskey+"' src='/wui/theme/ecology8/weaveredittable/img/delete_wev8.png'><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/delete2_wev8.png</span><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/delete_wev8.png</span>");
					}
					//设置复制行
					if(option.copyrowtitle)
					{
						sb.append("<img class='toolpic copy' title='"+copyTitle+"' accesskey='"+option.copyAccesskey+"' src='/wui/theme/ecology8/weaveredittable/img/copy_wev8.png'><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/copy2_wev8.png</span><span class='hiddenspan'>/wui/theme/ecology8/weaveredittable/img/copy_wev8.png</span>");
					}


					var   optionToolbar=jQuery("<div class='optionToolbar'>" +
						"<span class='middleHelper'></span>" + sb.toString()+
						"</div>");

					//附加操作栏
					optionHead.append(optionToolbar);

				}
			}

			this.container.append(optionHead);
        }

		var weaverRows = jQuery("<input type='hidden' name='weaverTableRows' id='weaverTableRows'></input>");
		var weaverRealRows = jQuery("<input type='hidden' name='weaverTableRealRows' id='weaverTableRealRows'></input>");
		var weaverDeleteRows = jQuery("<input type='hidden' name='__weaverDeleteRows' id='__weaverDeleteRows'></input>");
		this.container.append(weaverRows);
		this.container.append(weaverRealRows);
		this.container.append(weaverDeleteRows);


        var cols=option.colItems || [];

        if(cols.length===0)
        {
			try{
				top.Dialog.alert(SystemEnv.getHtmlNoteName(3578,readCookie("languageidweaver")));
			}catch(e){
				alert(SystemEnv.getHtmlNoteName(3578,readCookie("languageidweaver")));
			}
            return ;
        }

        var checkitem;

        if(option.configCheckBox)
        {
            checkitem={width:option.checkBoxItem.width||"5%",colname:"<input name='_allselectcheckbox' type='checkbox'>",itemhtml:option.checkBoxItem.itemhtml||"<input class='groupselectbox' type='checkbox'>"};
        }
        else
        {
            checkitem={width:"5%",colname:"<input name='_allselectcheckbox' type='checkbox'>",itemhtml:"<input class='groupselectbox' type='checkbox'>"};
        }

        //添加选中条目
        if(option.hasCheckAll!==false)
         option.colItems.splice(0,0,checkitem);

        this.columns=option.colItems;


        var table="<div class='tablecontainer'><table class='grouptable'>"+this.generatorColInfo()+this.generatorThead()+"<tbody></tbody></table></div>";
		
        var tableinfo=jQuery(table);

		if(option.optionHeadDisplay=="none"){
			tableinfo.css("padding-left","0px");
		}

		//默认美化全选checkbox
		try{
			tableinfo.jNice();
		}catch(e){
			if(window.console)console.log(e+"---WeaverEditTable_wev8.js");
		}


        this.container.append(tableinfo);


        //根据ajax生成table
        if(option.useajax  &&  option.ajaxurl)
        {
            this.reload();
        }
        else  if(option.usesimpledata  &&  option.initdatas)
        {

            if(option.container)
			{
			   this.getContainer().appendTo(jQuery(option.container));
			}
            var   rsdata= option.initdatas;
            var entry;
            for(var i=0;i<rsdata.length;i++)
            {
                entry=rsdata[i];
                //添加一行
                this.addRow(entry);

            }
            //  this.addRow();

        }

        this.registerEvents();


    }

    /**
     * 添加列宽度
     * @returns {*|jQuery|HTMLElement}
     */
    WeaverEditTable.prototype.generatorColInfo=function()
    {
        var sb=new StringBuffer();
        var colItems=this.columns;
        var cols = 0;
        var allWidth = 100;
        for(var i=0;i<colItems.length;i++){
        	if(!colItems[i])continue;
        	var display = colItems[i].display;
			if(display=="none" || i==0){
				continue;
			}
			try{
				var width = colItems[i].width;
				if(width){
					if(width.indexOf("%")!=-1){
						width = parseInt(width.replace(/\D/g,""));
						cols++;
						allWidth-=width;
					}else if(width.indexOf("px")!=-1){
						width = parseInt(width.replace(/\D/g,""))/jQuery(window).width();
						allWidth-=width;
					}
				}
			}catch(e){}
        }
        for(var i=0;i<colItems.length;i++)
        {
        	if(!colItems[i])continue;
			var display = colItems[i].display;
			if(display!="none")display="";
			var width = colItems[i].width;
			try{
				if(i!=0 && display!="none" && width && width.indexOf("%")!=-1){
					width = (parseInt(width.replace(/\D/g,""))+(allWidth/cols))+"%";
				}
				sb.append("<col width='"+width+"' style='display:"+display+";'>");
			}catch(e){}
        }
        return sb.toString();
    }

    /**
     * 添加头信息
     */
    WeaverEditTable.prototype.generatorThead=function()
    {
        var sb=new StringBuffer();
        sb.append("<thead>");
        var colItems=this.columns;

        for(var i=0;i<colItems.length;i++)
        {
			try{
				if(!colItems[i])continue;
				var display = colItems[i].display;
				var style="";
				if(display!="none"){
					display="";
				}
				var style = "style='display:"+display+";'";
				if(colItems[i].tdclass)
				{
					sb.append("<th class='"+colItems[i].tdclass+"' "+style+">"+colItems[i].colname+"</th>");
				}
				else
					sb.append("<th "+style+">"+colItems[i].colname+"</th>");
			}catch(e){}
        }
        sb.append("</thead>");
        return sb.toString();
    }



    /**
     * 获取容器对象
     * @returns {*}
     */
    WeaverEditTable.prototype.getContainer=function()
    {
        return this.container;
    }

    /**
     * 插入定制行
     */
    WeaverEditTable.prototype.addCustomRow=function(trhtml)
    {

        var that=this;

        var tbody=this.container.find(".grouptable tbody");
        tbody.find("tr").show();
        var tr=jQuery(trhtml);
        tbody.append(tr);
        var columnlength=this.columns.length;
		/*padding-left:16px;取消中间不搭顶的效果*/
        var tr1=jQuery("<tr style='height:1px'><td colspan='"+columnlength+"' style='height: 1px '><div class='linesplit'></div></td></tr>")
        tbody.append(tr1);
       //显示之前的分割线
        tbody.find(".linesplit").show();
        //隐藏当前分割线
        tr1.find(".linesplit").hide();

        //美化组件
        beautyWithControls(tr,that);

        //注册组件鼠标悬浮时的样式
        registerTrMouseover(that,tr);

        return tr;

    }

	/**
	*重新加载数据
	*/
	 WeaverEditTable.prototype.reload=function(){
		 var _this  = this;
		 if(_this.options.useajax  &&  _this.options.ajaxurl)
        {
            //请求路劲
            var  url= _this.options.ajaxurl;

            var params='';
            if(_this.options.ajaxparams!=='')
                params=_this.options.ajaxparams;
            jQuery.ajax({
                type: "POST",
                url: url,
                data: params,
				beforeSend:function(xhr){
					try{
						e8showAjaxTips(SystemEnv.getHtmlNoteName(3579,readCookie("languageidweaver")),true);
					}catch(e){}
				},
				complete:function(xhr){
					e8showAjaxTips("",false);
				},
                success: function(data){
                    //注:返回的数据格式为[[{name:"组件名称 例如:username",value:"组件值 例如:张三",iseditable:"是否可编辑 true|false",type:"控件类型 例如:input|select"},{}],[]]
                    //参考格式()
//                    var ajaxdata=[
//                        [
//                            {name:"descinfo",value:"张三",iseditable:true,type:"input"},   ====><input type='text' value='张三' name='descinfo'>
//                            {name:"datafield",value:"字段信息1",iseditable:false,type:"input"},    ==>.....
//                            {name:"datalabel",value:"字段显示名1",iseditable:true,type:"input"},
//                            {name:"datatype",value:"0",iseditable:true,type:"select"},
//                            {name:"datalength",value:"1",iseditable:true,type:"input"},
//                            {name:"ctype",value:"1",iseditable:true,type:"select"},
//                            {name:"dataorder",value:"排序",iseditable:true,type:"input"}
//                        ]
//                    ];
					var tbody=_this.container.find(".grouptable tbody");
					tbody.children().remove();
                    var rsdata=null;
					try{
						rsdata = eval('('+data+')');
					}catch(e){
						rsdata = data;
					}
                    var entry;
                    var selector;
                    var newrow;
                    for(var i=0;i<rsdata.length;i++)
                    {
                        entry=rsdata[i];
                        //添加一行
                        _this.addRow(entry);

                    }
					_this.container.css("visibility","visible");

                },
                dataType: 'json'
            });


        }
	 }
	 /**
     * 添加一行
     */
    WeaverEditTable.prototype.addRow=function(entry)
    {

        var that=this;

        var tbody=this.container.find(".grouptable tbody");
        tbody.find("tr").show();
        var sb=new StringBuffer();
        sb.append("<tr class='contenttr'>");
        var colItems=this.columns;
        for(var i=0;i<colItems.length;i++)
        {
			try{
				if(!colItems[i])continue;
				var display = colItems[i].display;
				if(display!="none")display="";
				var style="style='display:"+display+";'";
				if(colItems[i].tdclass)
				{
					var itemhtml = colItems[i].itemhtml;
					if(itemhtml){
						itemhtml = itemhtml.replace(/#rowIndex#/g, that.count);
					}
					sb.append("<td class='"+colItems[i].tdclass+"' "+style+">"+itemhtml+"</td>");
				}
				else{
					var itemhtml = colItems[i].itemhtml;
					if(itemhtml){
						itemhtml = itemhtml.replace(/#rowIndex#/g, that.count);
					}
					sb.append("<td "+style+">"+itemhtml+"</td>");
				}
			}catch(e){}
        }
        sb.append("</tr>");
        var tr=jQuery(sb.toString());
        tbody.append(tr);
        var columnlength=this.columns.length;
		/*padding-left:16px;*/
        var tr1=jQuery("<tr style='height:1px'><td colspan='"+columnlength+"' style='height: 1px '><div class='linesplit'></div></td></tr>")

        tbody.append(tr1);

        //显示之前的分割线
        tbody.find(".linesplit").show();
        //隐藏当前分割线
        tr1.find(".linesplit").hide();

        /**
         * 绑定数据
         */
        if(entry)
        {
            var  selector;
            for(var j=0;j<entry.length;j++)
            {
            	if(!entry[j] || !entry[j].type)continue;
                selector=entry[j].type+"[name='"+ entry[j].name+"']";

                //如果是日期类型
                if(ITEM_DATE===entry[j].type)
                {
				   selector="input[name='"+ entry[j].name+"']";
                   tr.find(selector).prev("span.weadate").html(entry[j].value);
				   tr.find(selector).val(entry[j].value);
                   continue;
                }
                
                if(ITEM_SPAN===entry[j].type && entry[j].value){
                	tr.find(selector).html(entry[j].value);
                	continue;
                }
                
                if(ITEM_CHECKBOX===entry[j].type){
					if(entry[j].value!=null){
                		tr.find("input[name='"+entry[j].name+"']").attr("value",entry[j].value);
					}
					if(entry[j].checked=="true" || entry[j].checked==true){
						tr.find("input[name='"+entry[j].name+"']").attr("checked",entry[j].checked);
					}
					if(!entry[j].iseditable || entry[j].iseditable=="false"){
						var ck = tr.find("input[name='"+entry[j].name+"']")
						if(!ck.hasClass("groupselectbox")){
							ck.attr("disabled","disabled");
						}
					}
					if(entry[j].display){
						tr.find("input[name='"+entry[j].name+"']").css("display",entry[j].display);
					}
                	continue;
                }
                
				tr.find(selector).val(entry[j].value);

                if(ITEM_INPUT===entry[j].type  &&  entry[j].value  &&  tr.find(selector).next(".mustinput").length===1)
                {
                    tr.find(selector).next(".mustinput").hide();

                    //输入框失焦触发
                    tr.find(selector).blur(function(){

                        if(!jQuery(this).val())
                        {
                            jQuery(this).next(".mustinput").css("display",'inline-block');
                        }else
                        {
                            jQuery(this).next(".mustinput").hide();
                        }

                    }) ;
                }
			if( ITEM_INPUT === entry[j].type ){
                	if( entry[j].display ){
						tr.find("input[name='"+entry[j].name+"']").css("display",entry[j].display);
					}
					if( !entry[j].iseditable || entry[j].iseditable=="false"){
						tr.find(selector).attr("readonly","readonly"); //用readonly 方便表单提交取值
					}
                }
                
                //select 加载option
                if(ITEM_SELECT == entry[j].type){
	                tr.find(selector).attr("seleval",entry[j].value);
	                if(!entry[j].iseditable)
	                {
	                    tr.find(selector).attr('disabled','disabled');
	                    tr.find(selector).css("background","#fdfdf7");
	
	                }
	                if(entry[j].option){
	                	tr.find(selector).empty();
	                	tr.find(selector).append(entry[j].option);
	                }
                }
            }
        }else{

            var inputs= tr.find("input[type='text']");
            var input;
            for(var i=0;i<inputs.length;i++)
            {
                input=jQuery(inputs[i]);
                //输入框必填
                if(input.next(".mustinput").length===1)

                    input.blur(function(){

                        if(!jQuery(this).val())
                        {
                            jQuery(this).next(".mustinput").css("display",'inline-block');
                        }else
                        {
                            jQuery(this).next(".mustinput").hide();
                        }

                    }) ;
            }

		

        }

        /**
         * 创建索引
         */
        addRowIndex(that,tr);


        //美化组件
        beautyWithControls(tr,that,entry);

        //注册组件鼠标悬浮时的样式
        registerTrMouseover(that,tr);

        if(that.options.addrowCallBack)
        {
			try{
				that.options.addrowCallBack(this,tr,entry);
			}catch(e){
				that.options.addrowCallBack.call(this,tr,entry);
			}
        }


		if(typeof(addRowCallBackCustom)=="function"){
			if(entry){
				var treenodeid = "";
				for(var j=0;j<entry.length;j++){
					var name = entry[j].name;
					if(name.indexOf("treenodeid")!=-1){
						var value = entry[j].value;
						if(value!=""){
							treenodeid = value;
						}
						break;
					}
				}
				if(treenodeid==""){
					addRowCallBackCustom(tr);
				}else{
					addRowCallBackCustom(tr,treenodeid);
				}
			}else{
				addRowCallBackCustom(tr);
			} 
		}
        return tr;


    }
    /**
     * 删除行
     */
    WeaverEditTable.prototype.deleteRows=function(entry)
    {
        var checkeditems=this.container.find(".groupselectbox").next(".jNiceChecked");
        var that = this;
        if(checkeditems.length===0)
        {
			try{
				top.Dialog.alert(SystemEnv.getHtmlNoteName(3529,readCookie("languageidweaver")));
			}catch(e){
				alert(SystemEnv.getHtmlNoteName(3529,readCookie("languageidweaver")));
			}
        }
        else
        {
			if(that.options.needDelConfirm){
				top.Dialog.confirm(SystemEnv.getHtmlNoteName(3580,readCookie("languageidweaver")), function (){
					for(var i=0;i<checkeditems.length;i++)
					{
						var checkitemspan = jQuery(checkeditems[i]);
						var tr=checkitemspan.parent().parent().parent();
						var checkitem = checkitemspan.prev("input[type='checkbox']");
						if(checkitem.val()){
							if(!that.deleteRowIds){
								that.deleteRowIds = checkitem.val();
							}else{
								that.deleteRowIds = that.deleteRowIds+","+checkitem.val();
							}
						}
						var trline=tr.next("tr");
						tr.remove();
						trline.remove();
						that.realCount--;
					}
					that.container.find("#__weaverDeleteRows").val(that.deleteRowIds);
					that.container.find("#weaverTableRealRows").val(that.realCount);
					if(that.options.deleterowCallBack)
					{
						try{
							that.options.deleterowCallBack(that,tr,entry);
						}catch(e){
							that.options.deleterowCallBack.call(that,tr,entry);
						}
					}
				}, function () {}, 300, 90, true, null, null, null, null, null);
			}else{
				for(var i=0;i<checkeditems.length;i++)
					{
						var checkitemspan = jQuery(checkeditems[i]);
						var tr=checkitemspan.parent().parent().parent();
						var checkitem = checkitemspan.prev("input[type='checkbox']");
						if(checkitem.val()){
							if(!that.deleteRowIds){
								that.deleteRowIds = checkitem.val();
							}else{
								that.deleteRowIds = that.deleteRowIds+","+checkitem.val();
							}
						}
						var trline=tr.next("tr");
						tr.remove();
						trline.remove();
						that.realCount--;
					}
					that.container.find("#__weaverDeleteRows").val(that.deleteRowIds);
					that.container.find("#weaverTableRealRows").val(that.realCount);
					if(that.options.deleterowCallBack)
					{
						try{
							that.options.deleterowCallBack(that,tr,entry);
						}catch(e){
							that.options.deleterowCallBack.call(that,tr,entry);
						}
					}
			}
		}
    }

    /**
     * 复制行
     */
    WeaverEditTable.prototype.copyRows=function()
    {
        var that=this;
        var checkeditems=this.container.find(".groupselectbox").next(".jNiceChecked");

        if(checkeditems.length===0)
        {
           try{
				top.Dialog.alert(SystemEnv.getHtmlNoteName(3581,readCookie("languageidweaver")));
			}catch(e){
				alert(SystemEnv.getHtmlNoteName(3581,readCookie("languageidweaver")));
			}
        }
        else
        {

            var tbody=that.container.find("tbody");
            //显示之前的分割线
            tbody.find(".linesplit").show();
            tbody.find("tr").show();
            for(var i=0;i<checkeditems.length;i++)
            {
                var tr=jQuery(checkeditems[i]).parent().parent().parent();
                var trline=tr.next("tr");
                var trclone=tr.clone();
                var lineclone= trline.clone();

                /**
                 * 克隆需考虑具体使用的组件
                 */
				 if(!that.options.cloneConfigCheckbox){
					trclone.find(".sbHolder").remove();
					trclone.find(".jNiceWrapper").remove();
					trclone.find(".tzCheckBox").remove();
					if(that.options.configCheckBox)
						trclone.find("td").eq(0).html(that.options.checkBoxItem.itemhtml);
					else
						trclone.find("td").eq(0).html("<input class='groupselectbox' name='checkbox' type='checkbox' >");
				 }

                tbody.append(trclone);
                tbody.append(lineclone);
                if(i===checkeditems.length-1)
                {
                    lineclone.hide();
                }

                //预处理日期插件
              
			   trclone.find(".weadate").each(function(){
                   var hiddenarea=jQuery(this).next("input[type='hidden']");
				   if(that.options.openindex===true)
				   {
				    
					    var hiddenname=hiddenarea.attr("name");
						var name=hiddenname.substring(0,hiddenname.lastIndexOf("_"));
						hiddenarea.attr("name",name);
						hiddenarea.attr("id",name);
				   }
			   
			   });

               //处理input框
			   trclone.find("input").each(function(){
			      
				   var input=jQuery(this);
				   if(input.prev("span.weadate").length!=0){
				   
				   }else{
					   if(that.options.openindex===true)
					   {
							try{
								var hiddenname=input.attr("name");
								var name=hiddenname.substring(0,hiddenname.lastIndexOf("_"));
								input.attr("name",name);
								input.attr("id",name);
							}catch(e){
								if(window.console)console.log(e);
							}
					
					   }
					 }
			   
			   });
              //处理select框
			   trclone.find("select").each(function(idx,obj){
			      
				   var select=jQuery(this);
				   select.val(tr.find("select").eq(idx).val());
                   if(that.options.openindex===true)
				   {
				    
					    var hiddenname=select.attr("name");
						var name=hiddenname.substring(0,hiddenname.lastIndexOf("_"));
						select.attr("name",name);
						select.attr("id",name);
				   }
			   
			   });
              
			 

                /**
                 * 创建索引
                 */
                addRowIndex(that,trclone);


                //美化checkbox
                trclone.jNice();

                //美化radio
                trclone.find('input[type=radio]').tzRadio({labels:['','']});

     
                //美化browser

				trclone.find(".browser").each(function(){
 
                        var name=jQuery(this).attr("name");
						if(name==='')
							return;
                        var showitems=jQuery(this).find(".e8_showNameClass a");
                        var length=showitems.length;
						var id=jQuery(this).find("input[type='hidden']").val()+"";
						if(id.indexOf(",")===0)
                            id=id.substr(1);
						var ids=id.split(",");
						var labels=[];
					    for(var i=0;i<length;i++)
					    {
                          labels.push("<a href='#"+ids[i]+"'>"+jQuery(showitems[i]).html()+"</a>");
						}
                
						labels=labels.join("");

						//var isSingle=jQuery(this).attr("isSingle")==='true'?true:false;
						
						jQuery(this).html("");
						
						/*var browserurl=jQuery(this).attr("browserurl");
						var completeUrl=jQuery(this).attr("completeurl");
						var browserwidth=jQuery(this).attr("browserwidth");*/
						var config = getBrowserConfig(this);
						name = config.name;
						if(that.options.openindex){
							var idx = that.count-1;
							name = name+"_"+idx;
						}
						config.name = name;
						jQuery(this).e8Browser(config);
						/*jQuery(this).e8Browser({

							name:name,
							viewType:"0",
							browserValue:"0",
							isMustInput:"1",
							browserSpanValue:"",
							hasInput:true,
							linkUrl:"#",
							isSingle:isSingle,
							completeUrl:completeUrl,
						    browserUrl:browserurl,
							width:browserwidth||"80%",
							hasAdd:false

					   });*/

                      var data={id:id,name:labels};
					
					  _writeBackData(name,1,data,{isSingle:config.isSingle,hasInput:config.hasInput}); 

				});


                //美化下拉框
                var selects=trclone.find("select");
                for(var j= 0,len=selects.length;j<len;j++)
                {
                    if("disabled"===jQuery(selects[j]).attr("disabled"))
                    {
                        if(jQuery(selects[j]).attr("seleval"))
                            jQuery(selects[j]).val(jQuery(selects[j]).attr("seleval"));
                        jQuery(selects[j]).selectbox("disable");
                    }else
                    {
                        if(jQuery(selects[j]).attr("ishide")!=='1')
                        {
                            jQuery(selects[j]).css("display","inline-block");
                        }
                        jQuery(selects[j]).selectbox({onOpen:function(){

                            var optionsItems=jQuery(this).next().find(".sbOptions");
                            var selectValue=jQuery(this).val();

                            optionsItems.find("a").removeClass("selectorfontstyle");

                            var item=optionsItems.find("a[href='#"+selectValue+"']");

                            item.addClass("selectorfontstyle");


                        }});
                    }

					beautyWithWuiDate(trclone);
                }

                /**
                 * 注册输入框校验事件
                 * @type {*}
                 */
                var inputs= trclone.find("input[type='text']");
                var input;
                for(var m=0;m<inputs.length;m++)
                {
                    input=jQuery(inputs[m]);
                    //输入框必填
                    if(input.next(".mustinput").length===1)

                        input.blur(function(){

                            if(!jQuery(this).val())
                            {
                                jQuery(this).next(".mustinput").css("display",'inline-block');
                            }else
                            {
                                jQuery(this).next(".mustinput").hide();
                            }

                        }) ;
                }


                //添加鼠标事件
                registerTrMouseover(that,trclone);
                //复制行回调函数
				if(that.options.copyrowsCallBack)
				{
					that.options.copyrowsCallBack.call(that,trclone);
				}

            }

        }

    }
    /**
     * 注册事件
     */
    WeaverEditTable.prototype.registerEvents=function()
    {
        var that=this;
        //添加行
        this.container.find(".additem").click(function(){
            that.addRow();
        });

        //删除行
        this.container.find(".deleteitem").click(function(){
            that.deleteRows();
        });

        //复制
        this.container.find(".copy").click(function(){
            that.copyRows();
        });

        this.container.find(".grouptable").mouseleave(function(){
            that.container.find(".trmouseover").removeClass("trmouseover");
            that.container.find(".itemmouseover").removeClass("itemmouseover");
            that.container.find(".sbSelector").removeClass("sbSelectorhover");
			that.container.find(".e8_innerShowContent").removeClass("itemmouseover");
			that.container.find(".e8_outScroll").removeClass("itemmouseoverleft");
        });

        /**
         * 注册工具栏鼠标交互样式
         */
        this.container.find(".toolpic").mouseover(function(){

            jQuery(this).attr("src",jQuery(this).next().html());

        }).mouseleave(function(){

                jQuery(this).attr("src",jQuery(this).next().next().html());

            });

        this.container.find("input[name='_allselectcheckbox']").click(function(){

            if(jQuery(this).is(':checked'))
            {
                that.container.find("table").find(".groupselectbox").attr('checked','checked');
                that.container.find("table").find(".jNiceCheckbox").addClass("jNiceChecked");
            }
            else
            {
                that.container.find("table").find(".groupselectbox").removeAttr('checked');
                that.container.find("table").find(".jNiceCheckbox").removeClass("jNiceChecked");
            }

        });

		/*注册鼠标拖拽事件*/
		if(that.options.canDrag){
			registerMouseDrag(that,null);
		}
    }

    /**
     * 获取序列化表单数据
     */
    WeaverEditTable.prototype.getTableSeriaData=function()
    {

        //序列化输入框的值
        var inputItems=this.container.find(".grouptable").find("input[type='text']");
        var sb=new StringBuffer();
        for(var i= 0,len=inputItems.length;i<len;i++)
        {
            sb.append(jQuery(inputItems[i]).attr("name")+"="+escape(jQuery(inputItems[i]).val())+"&");
        }
        var inputParams=sb.toString();
        if(inputItems.length>0)
        {
            inputParams=inputParams.substring(0,inputParams.length-1);
        }
        
		//隐藏域
		inputItems=this.container.find(".grouptable").find("input[type='hidden']");
        var sb=new StringBuffer();
        for(var i= 0,len=inputItems.length;i<len;i++)
        {
            sb.append(jQuery(inputItems[i]).attr("name")+"="+escape(jQuery(inputItems[i]).val())+"&");
        }
        var inputHiddenParams=sb.toString();
        if(inputItems.length>0)
        {
            inputHiddenParams=inputHiddenParams.substring(0,inputHiddenParams.length-1);
        }

        //序列化下拉框的值
        var selectItems=this.container.find(".grouptable").find("select");
        sb=new StringBuffer();
        for(var i= 0,len=selectItems.length;i<len;i++)
        {
            sb.append(jQuery(selectItems[i]).attr("name")+"="+escape(jQuery(selectItems[i]).val())+"&");
        }
        var selectParams=sb.toString();
        if(selectItems.length>0)
        {
            selectParams=selectParams.substring(0,selectParams.length-1);
        }

        //序列化输入框的值
        var inputRadioItems=this.container.find(".grouptable").find("input[type='radio']:checked");
        sb=new StringBuffer();
        for(var i= 0,len=inputRadioItems.length;i<len;i++)
        {
            sb.append(jQuery(inputRadioItems[i]).attr("name")+"="+escape(jQuery(inputRadioItems[i]).val())+"&");
        }
        var inputRadioParams=sb.toString();
        if(inputRadioParams.length>0)
        {
            inputRadioParams=inputRadioParams.substring(0,inputRadioParams.length-1);
        }

		//序列化checkbox框的值
		var inputCheckboxItems=this.container.find(".grouptable").find("input[type='checkbox'][class^='groupselectbox']");
        sb=new StringBuffer();
		 for(var i= 0,len=inputCheckboxItems.length;i<len;i++)
        {
            sb.append(jQuery(inputCheckboxItems[i]).attr("name")+"="+escape(jQuery(inputCheckboxItems[i]).val())+"&");
        }
        var inputCheckboxParams=sb.toString();
        if(inputCheckboxParams.length>0)
        {
            inputCheckboxParams=inputCheckboxParams.substring(0,inputCheckboxParams.length-1);
        }

		//序列化checkbox框的值
		var inputCheckboxItems2=this.container.find(".grouptable").find("input[type='checkbox']:checked");
        sb=new StringBuffer();
		 for(var i= 0,len=inputCheckboxItems2.length;i<len;i++)
        {
			 if(jQuery(inputCheckboxItems2[i]).hasClass("groupselectbox"))continue;
			 			var val = "";
						if(jQuery(inputCheckboxItems2[i]).attr("checked")){
							val = jQuery(inputCheckboxItems2[i]).val();
						}
            sb.append(jQuery(inputCheckboxItems2[i]).attr("name")+"="+escape(val)+"&");
        }
        var inputCheckboxParams2=sb.toString();
        if(inputCheckboxParams2.length>0)
        {
            inputCheckboxParams2=inputCheckboxParams2.substring(0,inputCheckboxParams2.length-1);
        }

        if(selectParams.length>0)
        {
            selectParams="&"+selectParams;
        }
		 if(inputHiddenParams.length>0)
        {
            inputHiddenParams="&"+inputHiddenParams;
        }
        if(inputRadioParams.length>0)
        {
            inputRadioParams="&"+inputRadioParams;
        }
		if(inputCheckboxParams.length>0)
        {
            inputCheckboxParams="&"+inputCheckboxParams;
        }
		if(inputCheckboxParams2.length>0)
        {
            inputCheckboxParams2="&"+inputCheckboxParams2;
        }
        //返回输入框和下拉框插件值参数
        var params=inputParams+inputHiddenParams+selectParams+inputRadioParams+inputCheckboxParams+inputCheckboxParams2;
        // console.log(inputParams+"&"+selectParams);
        return    params;

    }
    /**
     * 插件自身提供:验证表单是否合法
     */
    WeaverEditTable.prototype.isValid=function()
    {
        var ismustinput=this.container.find(".mustinput");
        var isvalid=true;
        if(ismustinput.length===0)
        {
            isvalid=false;
        }
        for(var i= 0,len=ismustinput.length;i<len;i++)
        {
            if(jQuery(ismustinput[i]).is(":visible"))
            {
                isvalid=false;
                break;
            }
        }
        return   isvalid;

    },
    /**
     * 插件自身提供:返回table对应的json(格式为:[[],[]])
     */
	  WeaverEditTable.prototype.getTableJson=function()
    {

       var  trs=this.container.find(".grouptable  tbody  .contenttr");
       var sb=[];
       trs.each(function(){
	       
		   var con=jQuery(this);
		   var csb=new StringBuffer();
           csb.append("[");
		   //普通文本框
           var inputTexts=con.find("input[type='text']");
           for(var i= 0,len=inputTexts.length;i<len;i++)
           {
            csb.append("{\""+jQuery(inputTexts[i]).attr("name")+"\":\""+jQuery(inputTexts[i]).val()+"\"},");
           }
		   //隐藏域
           inputTexts=con.find("input[type='hidden']");
           for(var i= 0,len=inputTexts.length;i<len;i++)
           {
            csb.append("{\""+jQuery(inputTexts[i]).attr("name")+"\":\""+jQuery(inputTexts[i]).val()+"\"},");
           }
		   //下拉框
            var selectItems=con.find("select");
			for(var i= 0,len=selectItems.length;i<len;i++)
			{
				csb.append("{\""+jQuery(selectItems[i]).attr("name")+"\":\""+jQuery(selectItems[i]).val()+"\"},");
			}
           //序列化输入框的值
			var inputRadioItems=con.find("input[type='radio']:checked");
			for(var i= 0,len=inputRadioItems.length;i<len;i++)
			{
				csb.append("{\""+jQuery(inputRadioItems[i]).attr("name")+"\":\""+jQuery(inputRadioItems[i]).val()+"\"},");
			}
			//序列化checkbox的值
			var inputCheckboxItems=con.find("input[type='checkbox'][class^='groupselectbox']");
			for(var i= 0,len=inputCheckboxItems.length;i<len;i++)
			{
				csb.append("{\""+jQuery(inputCheckboxItems[i]).attr("name")+"\":\""+jQuery(inputCheckboxItems[i]).val()+"\"},");
			}
			var inputCheckboxItems2=con.find("input[type='checkbox']");
			for(var i= 0,len=inputCheckboxItems2.length;i<len;i++)
			{
				if(jQuery(inputCheckboxItems2[i]).hasClass("groupselectbox"))continue;
				var val = "";
				if(jQuery(inputCheckboxItems2[i]).attr("checked")){
					val = jQuery(inputCheckboxItems2[i]).val();
				}
				csb.append("{\""+jQuery(inputCheckboxItems2[i]).attr("name")+"\":\""+val+"\"},");
			}
		    var rdata=csb.toString();
			if(rdata.length>0)
			{
				rdata=rdata.substring(0,rdata.length-1)+"]";
            }
            sb.push(rdata);
	   });
          
       var rs="["+sb.join(",")+"]";

       return    eval('('+rs+")");

    },
	/**
     * 插件自身提供:返回table对应的json(格式为[{},{}])
     */
	  WeaverEditTable.prototype.getSimpleTableJson=function()
    {

       var  trs=this.container.find(".grouptable  tbody  .contenttr");
       var sb=[];
       trs.each(function(){
	       
		   var con=jQuery(this);
		   var csb=new StringBuffer();
           csb.append("{");
		   //普通文本框
           var inputTexts=con.find("input[type='text']");
           for(var i= 0,len=inputTexts.length;i<len;i++)
           {
            csb.append("\""+jQuery(inputTexts[i]).attr("name")+"\":\""+jQuery(inputTexts[i]).val()+"\",");
           }
		   //隐藏域
           inputTexts=con.find("input[type='hidden']");
           for(var i= 0,len=inputTexts.length;i<len;i++)
           {
            csb.append("\""+jQuery(inputTexts[i]).attr("name")+"\":\""+jQuery(inputTexts[i]).val()+"\",");
           }
		   //下拉框
            var selectItems=con.find("select");
			for(var i= 0,len=selectItems.length;i<len;i++)
			{
				csb.append("\""+jQuery(selectItems[i]).attr("name")+"\":\""+jQuery(selectItems[i]).val()+"\",");
			}
           //序列化输入框的值
			var inputRadioItems=con.find("input[type='radio']");
			for(var i= 0,len=inputRadioItems.length;i<len;i++)
			{
				csb.append("\""+jQuery(inputRadioItems[i]).attr("name")+"\":\""+jQuery(inputRadioItems[i]).val()+"\",");
			}
			//序列化checkbox的值
			var inputCheckboxItems=con.find("input[type='checkbox'][class^='groupselectbox']");
			for(var i= 0,len=inputCheckboxItems.length;i<len;i++)
			{
				csb.append("\""+jQuery(inputCheckboxItems[i]).attr("name")+"\":\""+jQuery(inputCheckboxItems[i]).val()+"\",");
			}
			var inputCheckboxItems2=con.find("input[type='checkbox']");
			for(var i= 0,len=inputCheckboxItems2.length;i<len;i++)
			{
				if(jQuery(inputCheckboxItems2[i]).hasClass("groupselectbox"))continue;
				var val = "";
				if(jQuery(inputCheckboxItems2[i]).attr("checked")){
					val = jQuery(inputCheckboxItems2[i]).val();
				}
				csb.append("\""+jQuery(inputCheckboxItems2[i]).attr("name")+"\":\""+val+"\",");
			}
		    var rdata=csb.toString();
			if(rdata.length>0)
			{
				rdata=rdata.substring(0,rdata.length-1)+"}";
            }
            sb.push(rdata);
	   });
          
       var rs="["+sb.join(",")+"]";

       return    eval('('+rs+")");

    }

})();
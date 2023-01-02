/**
*jQuery modalDialog plugin v0.1  
* author：张凡杭 
* Date:2011/10/25
*/
(function($){
	$.fn.modalDialog=function(){
		var defaults={
			_dwidth:'550px',//宽度
			_dheight:'550px',//高度
			_url:'about:blank',//窗口地址
			_param : "",//js参数
			_scroll:"no",//滚动条
			_dialogArguments:"",//
			_callBack:callBack,
			_beforeShow:beforeShow,
			_displayTemplate:"#b{name}",
			_displaySelector:"",
			_required:"no",
			_displayText:"",
			value:"",
			_initEnd:initEnd,
			_editable:"yes",
			_trimLeftComma:"no"//当存在左边逗号时去掉逗号
		};
		
		$this=$(this);//当前节点
		if($this.length>1){
			$this.each(function(){
				$(this).modalDialog();
			});
			return;
		}
		$this.before("<button class='browser Browser' type='button' id='"+($this.attr("id")||$this.attr("name"))+"Btn"+"'></button>");
		
		$this.css("display","none");
//		/alert($this.attr("_displayText"));
		if($this.attr("_editable")=="no"){
			$this.prev().hide();
			$this.attr("readonly","true");
		}
		if($this.attr("_required")=="yes"&&!$.trim($this.val())){
			$this.after("<span id='"+($this.attr("id")?$this.attr("id"):$this.attr("name"))+"Span' ><img align='absMiddle' src='/images/BacoError_wev8.gif'/></span>");
		}else{
			$this.after("<span id='"+($this.attr("id")?$this.attr("id"):$this.attr("name"))+"Span' ></span>");
		}
		if($this.val()!=""){
			var tem=$this.attr("_displayTemplate")?$this.attr("_displayTemplate"):defaults._displayTemplate;
			
			tem=tem.replace(new RegExp("(#b{id})","g"),$this.val());
			tem=tem.replace(new RegExp("(#b{name})","g"),$this.attr("_displayText")?$this.attr("_displayText"):"");
			tem=tem.replace(/#b\{([\w]+)\}/g,$this.attr("_displayText")?$this.attr("_displayText"):"");
			$this.next().html(tem);
		}
		if($this.attr("_initEnd")){
			try{
				eval($this.attr("_initEnd"))();
			}catch (e) {
				
			}
		}
		$this.removeAttr("class");
		var opts;
		//var opts = $.extend(defaults, options);
		
		$this.prev().click(function(e){
			target=e.srcElement||e.target;
			opts=(function($this,defaults){
				options={};
				for(var item in defaults){
					if($this.attr(item)!=undefined){
						options[item]=$this.attr(item);
					}
				}
				opts = $.extend(defaults, options);
				var iTop = (window.screen.availHeight-30-parseInt(opts._dheight))/2+"px"; //获得窗口的垂直位置;
				var iLeft = (window.screen.availWidth-10-parseInt(opts._dwidth))/2+"px"; //获得窗口的水平位置;
				opts.top=iTop;
				opts.left=iLeft;
				return opts;
			})($(target).next(),defaults);
			
			try{
				eval(opts._beforeShow)(opts,e);
			}catch (e) {
				//eval(opts._callBack);
			}
			datas=window.showModalDialog(opts._url,opts._dialogArguments,"addressbar=no;status=0;scroll="+opts._scroll+";dialogHeight="+opts._dheight+";dialogWidth="+opts._dwidth+";dialogLeft="+opts.left+";dialogTop="+opts.top+";resizable=0;center=1;");
			templateOperation(datas,e);
			try{
				eval(opts._callBack)(datas,e);
			}catch (e) {
				//eval(opts._callBack);
			}
			
		});
		function callBack(datas,e){};
		
		function beforeShow(opts,e){
			if(opts.value!=""){
				var tempUrl;
				if(opts._url.indexOf("url=")!=-1){
					tempUrl=opts._url.substr(opts._url.indexOf("url="));
				}else{
					tempUrl=opts._url;
				}
				if(tempUrl.indexOf("?")!=-1){
					if (opts._param) {
						opts._url+= "&" + opts._param + "=" + opts.value;
					} else if(tempUrl.indexOf("?selectedids=")!=-1){
						opts._url+=opts.value;
					} else {
						opts._url+="&selectedids="+opts.value;
					}
				}else{
					if (opts._param) {
						opts._url+= "?" + opts._param + "=" + opts.value;
					} else {
						opts._url+="?selectedids="+opts.value;
					}
				}
				
			}
		};
		function templateOperation(datas,e){
			valFiled=$(e.srcElement||e.target).next();
			if (datas&&datas.id!=""&&datas.id!=0){
				var resourceids = datas.id;
				var sHtml = "";
				ids=resourceids.split(",");
				var tags=new Array();
				for(var tag in datas){
					tags.push(tag);
				}
				for(var i=0;i<ids.length;i++){
					if(ids[i]=="") continue;
					curHtml=opts._displayTemplate;
					for(var j=0;j<tags.length;j++){
						curHtml=curHtml.replace(new RegExp("(#b{"+tags[j]+"})","g"),datas[tags[j]].split(",")[i]);
					}
					sHtml += " "+curHtml;
				}
				$(valFiled).next().html(sHtml);
				
				if(resourceids!=""&&resourceids.charAt(0)==","){
				   resourceids=resourceids.substr(1);
				}
				valFiled.val(resourceids);
			}
			else if(datas){	
				
				valFiled.val("");
				if(opts._required=="yes"){
					$(valFiled).next().html("<img align='absMiddle' src='/images/BacoError_wev8.gif'/>");
				}else{
					$(valFiled).next().html("");
				}
			};
		};
		function initEnd(){
			
		};
		
		$.fn.modalDialog.templateOperation=templateOperation;
		$.fn.modalDialog.defaults=defaults;
	
	};
})(jQuery);
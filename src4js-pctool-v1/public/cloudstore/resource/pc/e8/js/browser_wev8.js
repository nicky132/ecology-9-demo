window.changeFunctions = new Array();

var  __browserNamespace__ = (function (){
    return (function(){

	   return {
	   		setIsMust:function(selector, isMust){
	   			if(isMust==2){
	   				jQuery(selector+"spanimg").html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
	   			}else{
	   				jQuery(selector+"spanimg").html("");
	   			}
	   		},
	   		changeStatus:function(selector,isMust,browserButtonId,addButtonId){
	   			var $obj = jQuery(selector);
	   			__browserNamespace__.setIsMust(selector,isMust);
	   			if(!browserButtonId)browserButtonId = selector+"_browserbtn";
	   			if(!addButtonId)addButtonId = selector+"_addbtn";
	   			var browserBtn = jQuery(browserButtonId);
	   			var addBtn = jQuery(addButtonId);
	   			if(isMust!=0){
					browserBtn.css("opacity","1").css("filter","alpha(opacity=100)").css("cursor","pointer").removeAttr("disabled");	   
					if(addBtn.length>0){
						addBtn.css("opacity","1").css("filter","alpha(opacity=100)").css("cursor","pointer").removeAttr("disabled");	 
					}				
	   			}else{
	   				browserBtn.css("opacity","0").css("filter","alpha(opacity=0)").css("cursor","default").attr("disabled",true);
	   				if(addBtn.length>0){
	   					addBtn.css("opacity","0").css("filter","alpha(opacity=0)").css("cursor","default").attr("disabled",true);
	   				}
	   			}
	   		},
			del:function(evt,obj,isMustInput,needHidden,options){
				if(jQuery.browser.msie && jQuery.browser.version=="8.0")  
				{ 
					evt = window.event;
				}
				try{		
					if(window._userBeforeDelCallback){
						var flag = _userBeforeDelCallback(jQuery(obj).closest("span.e8_showNameClass").find("a:first").text(),jQuery(obj).closest("span.e8_showNameClass").parent("span").attr("id").replace("span",""));
						if(!flag)return;
					}
					if(options && options.beforeDelCallback){
						var flag = true;
						if(typeof options.beforeDelCallback == "string"){
							var beforeDelCallback = window[options.beforeDelCallback];
							if(!!beforeDelCallback){
								flag = beforeDelCallback(jQuery(obj).closest("span.e8_showNameClass").find("a:first").text(),jQuery(obj).closest("span.e8_showNameClass").parent("span").attr("id").replace("span",""),options.beforeDelParams||null);
							}
						}else{
							flag = options.beforeDelCallback(jQuery(obj).closest("span.e8_showNameClass").find("a:first").text(),jQuery(obj).closest("span.e8_showNameClass").parent("span").attr("id").replace("span",""),options.beforeDelParams||null);				
						}
						if(!flag)return;
					}
					var innerDiv = jQuery(obj).closest("div.e8_innerShow");
					var input = innerDiv.find("input[type=text]")
					//input.show().focus();
					var id = ","+jQuery(obj).attr("id")+",";
					var ele = jQuery(obj).closest("span.e8_showNameClass").parent("span").attr("id");
					
					var targetinputobj = innerDiv.find("#"+ele.replace("span",""));
					
					var ids = ","+targetinputobj.val()+",";
					var fieldid = ele.replace("span","");
					if(needHidden==false){
						targetinputobj = jQuery("#"+ele.replace("span",""));
						try{
							if(targetinputobj.length==0){
								targetinputobj=jQuery("input[name='"+ele.replace("span","")+"']");
							}
						} catch (e) {
						}
						ids = ","+targetinputobj.val()+",";
					}
					var newids = ids.replace(id,",");
					
					newids = newids.substring(1,newids.length-1);
					if(newids==","){
						newids="";
					}
					
					targetinputobj.val(newids);
					
					try {
						//---------------------------------------------------------
						// 当删除brow内容时，手动触发其onpropertychange事件(请勿删除)
						//---------------------------------------------------------
						if(!isIE()) {
							eval(jQuery("#"+ele.replace("span","")).attr('onpropertychange'));
						}
						eval(jQuery("#"+ele.replace("span","") + "__").attr('onpropertychange'));
						try {
							jQuery("#"+ele.replace("span","") + "__").trigger('onpropertychange');
						} catch (e_9) {}
						
						//eval(jQuery(obj).closest("div.e8_innerShow").find("#"+ele.replace("span","")).attr('onpropertychange'));
						//eval(jQuery(obj).closest("div.e8_innerShow").find("#"+ele.replace("span","") + "__").attr('onpropertychange'));
					} catch (e) {
					}
					try{
						//after del item,call user default method
						//params: item name
						//params: browser input hidden id
						 _userDelCallback(jQuery(obj).closest("span.e8_showNameClass").find("a:first").text(),ele.replace("span",""));
					}catch(e){
						if(window.console)console.log(e+"--/js/jquery-autocomplete/browser.js-->del");
					}
					if(options && options.afterDelCallback){
						if(typeof options.afterDelCallback == "string"){
							var afterDelCallback = window[options.afterDelCallback];
							if(!!afterDelCallback){
								afterDelCallback(jQuery(obj).closest("span.e8_showNameClass").find("a:first").text(),jQuery(obj).closest("span.e8_showNameClass").parent("span").attr("id").replace("span",""),options.afterDelParams||null);
							}
						}else{
							options.afterDelCallback(jQuery(obj).closest("span.e8_showNameClass").find("a:first").text(),jQuery(obj).closest("span.e8_showNameClass").parent("span").attr("id").replace("span",""),options.afterDelParams||null);
						}
					}
					if(newids==""){
						if(isMustInput==2){//2：必须输入 ；1：可编辑
							jQuery(obj).closest("div.e8_os").children("div.e8_innerShowMust").children("span").html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
							jQuery(obj).closest("div.e8_os").find("#"+fieldid+"spanimg").html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
						}
						var isMustInputAttr = jQuery(obj).closest("div.e8_os").find("#"+fieldid).attr("isMustInput");
						if(isMustInputAttr==2){
							jQuery(obj).closest("div.e8_os").find("#"+fieldid+"spanimg").html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
						}
					}
					jQuery(obj).closest("span.e8_showNameClass").remove();
					jQuery("#"+fieldid).closest("#innerContent"+fieldid+"div").perfectScrollbar("update");
				}catch(e){
					if(window.console)console.log(e+"--/js/jquery-autocomplete/browser.js-->del");
				}
				try{
					evt.stopPropagation();
					evt.preventDefault();
				}catch(e){
					window.event.cancelBubble = true;
					return false;
				}
			},
			delByBS:function(e,inputName,isMustInput,needHidden,options){
				var event = e;
				if(jQuery.browser.msie && jQuery.browser.version=="8.0")  
				{ 
					event = window.event;
				}
				options = jQuery.extend({},options);
				if(event.keyCode==8){//回退键
					try{
						var ina = null;
						var hidden = null;
						var hiddenName = inputName.replace(/__$/,"");
						var browserBox = null;
						if(options.browserBoxId){
							browserBox = jQuery("#"+options.browserBoxId);
						}
						if(needHidden==false||!browserBox|| browserBox.length==0){
							ina = jQuery("#"+inputName);
							hidden = jQuery("#"+hiddenName+"span");
						}else{
							ina = browserBox.find("#"+inputName);
							hidden = browserBox.find("#"+hiddenName+"span");
						}
						if(ina.val()==null||ina.val()==""){
							var spans = hidden.find("span.e8_delClass");
							var obj = spans.eq(spans.length-1);
							del(event,obj,isMustInput,needHidden,options);
						}
					}catch(e){
						if(window.console)console.log(e);
					}
				}else if(event.keyCode==13){
					try{
						event.stopPropagation();
						event.preventDefault();
					}catch(e){
						window.event.cancelBubble = true;
						return false;
					}
					return false;
				}
			},
			__callback:function(id,fieldid,isMustInput,hasInput,options){
			    var type = options.type;
				var span = jQuery("span#"+fieldid+"span");
				var spans = jQuery("span[name='"+span.attr("name")+"']");
				options = jQuery.extend({needHidden:true},options);
				spans.each(function(){
					var spanObj = jQuery(this);
					var a = jQuery(this).children("a:not(:empty)");
					var isSingle = true;
					var innerDiv = jQuery(this).closest("div.e8_innerShow");
					var input = innerDiv.find("input[type=text]");
					if(!input.length){
						isSingle = false;
					}
					var maxWidth = getMaxWidth(innerDiv,isSingle);
					if(a.length>0){
						jQuery(this).closest("div.e8_os").children("div.e8_innerShowMust").children("span").html("");
					}else if(jQuery(this).children().length==0 && !jQuery(this).html()){
						if(isMustInput==2){
							jQuery(this).closest("div.e8_os").children("div.e8_innerShowMust").children("span").html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
						}else{
							jQuery(this).html("");
						}
					}else if(jQuery(this).html()){
						
					}else{
						var formatAs = spanObj.find("span.e8_showNameClass a:not(:empty)");
						formatAs.each(function(){
							if(!!isSingle){
								//jQuery(this).css("max-width",maxWidth/formatAs.length-2);
							}else{
								//jQuery(this).css("max-width",maxWidth);
							}
							jQuery(this).attr("title",jQuery(this).text());
						});
						if(!!isSingle){
							setInputWidth(innerDiv,input,"#"+fieldid+"span");
						}
					}	
					a.each(function(){
						var href = jQuery(this).attr("href");
						//jQuery(this).css("max-width",maxWidth);
						jQuery(this).attr("title",jQuery(this).text());
						var value='';
						if(!!href){
							if(href.toLowerCase().indexOf("javascript:")>-1 || href.toLowerCase().indexOf("#")>-1){
								if(href.toLowerCase().indexOf("#")>-1){
									value = href.replace(/#/g,"");
								}else{
									value = href.replace(/\D/g,"");
								}
							}else{
								var x = href.toLowerCase().match(/id=\d+/);
								if(!!x){
									value = x.toString().replace(/\D/g,"");
								}else{
									value = "";
								}
							}
						}else{
							value = jQuery(this).attr("_id");
						}
						if(true || !!value){
							//var closeSpan = jQuery("\n<span id=\""+value+"\" class='e8_delClass' onclick='del(event,this,"+isMustInput+","+options.needHidden+","+stringify(options)+");'>&nbsp;x&nbsp;</span>\n");
							var closeSpan = jQuery("<span>",{
								id:value
							}).addClass("e8_delClass").bind("click",function(e){
										del(e,this,isMustInput,options.needHidden,options);
							}).html("x");
							var showNameSpan =jQuery( "<span class='e8_showNameClass'></span>");
							showNameSpan.append(jQuery(this));
							if(hasInput){
								showNameSpan.append(closeSpan);
							}else{
								showNameSpan.addClass("e8_showNameClassPadding");
							}
							if(type==256 || type == 257){
							    //showNameSpan.append(closeSpan);
							}	
							hoverShowNameSpan(showNameSpan);
							spanObj.append(showNameSpan);
							if(!!isSingle){
								//setInputWidth(innerDiv,input,"#"+fieldid+"span");
							}
						}
					});	
				});
				jQuery("#"+fieldid).closest("#innerContent"+fieldid+"div").perfectScrollbar("update");
				//触发onpropertychange事件
				if(!options || !options.__isInit){
					try {
						if(!isIE()) {
							eval(jQuery("#"+ fieldid).attr('onpropertychange'));
						}
					} catch (e) {
					}
					try {
						eval(jQuery("#"+ fieldid + "__").attr('onpropertychange'));
					} catch (e) {
					}
				}
				try{
					jQuery("#src_box_middle").perfectScrollbar("update");
					jQuery("#dest_box_middle").perfectScrollbar("update")
				}catch(e){
					
				}
			},
			hoverShowNameSpan:function(obj){
				jQuery(obj).hover(function(){
					var _this = jQuery(this);
					_this.addClass("e8_showNameHoverClass");
					_this.children(".e8_delClass").css({
						"visibility":"visible",
						"opacity":1
					});
				},function(){
					var _this = jQuery(this);
					_this.removeClass("e8_showNameHoverClass");
					_this.children(".e8_delClass").css({
						"visibility":"hidden"
					});
				});
			},
			_writeBackData:function(fieldid,isMustInput,data,_options){
				try{
					var options = jQuery.extend({
						hasInput:false,
						replace:false,
						isSingle:true,
						isedit:false,
						e8os: null
					},_options);
					var hidden = jQuery("#"+fieldid);
					var span = jQuery("#"+fieldid+"span");
					var e8os = options.e8os;
					if(e8os){
						hidden = e8os.find("#"+fieldid);
						span = e8os.find("#"+fieldid+"span");
					}else{
						hidden = jQuery("#"+fieldid);
						span = jQuery("#"+fieldid+"span");
					}
					var img = null;
					if(isMustInput==2){
						if(e8os){
							img = e8os.find("#"+fieldid+"spanimg");
						}else{
							img = jQuery("#"+fieldid+"spanimg");
						}
					}
					if(data){
						if(options.isSingle || options.replace){
							hidden.val(data.id);
							var name = data.name;
							var tmpids = data.id.split(",");
							var tempnames = "";
							if(options.replace){
								if(name){
									name = name.split(",");
									for(var i=0;i<name.length;i++){
										if(name[i].indexOf("</a>")==-1){
											name[i] = "<a href='#"+tmpids[i]+"' onclick='return false;'>"+name[i]+"</a>";
										}
										if(!tempnames){
											tempnames = name[i];
										}else{
											tempnames +=","+ name[i];
										}
									}
									if(img && img.length>0){
										img.html("");
									}
								}
							}else{
								if(name){
									if(name.indexOf("</a>")==-1){
										name = "<a href='#"+data.id+"' onclick='return false;'>"+name+"</a>";
									}
								}
								tempnames = name;
							}
							
							span.html(tempnames);
							if(!data.id && isMustInput==2){
								if(img && img.length>0){
									span.html("");
									img.html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
								}else{
									span.html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
								}
							}
						}else{
							var ids = hidden.val();
							var names = span.html();
							if(options.isedit){
								jQuery("span#"+data.id).prev("a").html(data.name);
							}else{
								if(!!ids){
									ids = ids+","+data.id;
								}else{
									ids = data.id;
								}
								if(!ids){
									if(isMustInput==2){
										if(img && img.length>0){
											span.html("");
											img.html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
										}else{
											span.html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
										}
									}
								}else{
									var name = data.name;
									var tmpids = data.id.split(",");
									var tempnames = "";
									if(name){
										name = name.split(",");
										for(var i=0;i<name.length;i++){
											if(name[i].indexOf("</a>")==-1){
												name[i] = "<a href='#"+tmpids[i]+"' onclick='return false;'>"+name[i]+"</a>";
											}
											if(!tempnames){
												tempnames = name[i];
											}else{
												tempnames +=","+ name[i];
											}
										}
										if(img && img.length>0){
											img.html("");
										}
									}
									names += tempnames;
									hidden.val(ids);
									span.html(names);
								}
							}
						}
						__browserNamespace__.__callback(fieldid,fieldid,isMustInput,options.hasInput,options);
					}
				}catch(e){
					if(window.console)console.log(e);
				}
			},
			showModalDialogForBrowser:function(e,url,linkUrl,fieldid,isSingle,isMustInput,params,options){
				var evt = e;
				if(jQuery.browser.msie && jQuery.browser.version=="8.0")  
				{ 
					evt = window.event;
				}
				var target = null;
				try{
					target = evt.srcElement||evt.target;
				}catch(e){}
				var e8os = document;
				if(options.needHidden===false||options.needHidden==="false"){
				}else{
					e8os = jQuery(target).closest("div.e8_os");
				}
				
				if(url.match(/#id#/)){
					var _value = jQuery("#"+fieldid,e8os).val();
					if(_value===null||_value===undefined)_value="";
					url = url.replace(/#id#/g,_value);
				}else if(url.match(/=$/)){
					var _value = jQuery("#"+fieldid,e8os).val();
					if(_value===null||_value===undefined)_value="";
					url += _value;
				}
				/*try{
					if(options.getBrowserUrlFn){
						var tempurl = null;
						try{
							tempurl = window[options.getBrowserUrlFn](options.getBrowserUrlFnParams);
						}catch(e){
							tempurl = options.getBrowserUrlFn(options.getBrowserUrlFnParams);
						}
						if(tempurl){
							url = tempurl;
						}
					}
				}catch(e){
					if(window.console)console.log(e,"/js/jquery-autocomplete/browser.js#showModalDialogForBrowser");
				}*/
				try{
					var dialogTitle = options.dialogTitle;
					if(!dialogTitle)dialogTitle="";
					/*if(readCookie("languageidweaver")==8){
						dialogTitle = "Please Select " + dialogTitle;
					}else if(readCookie("languageidweaver")==9){
						dialogTitle = "請選擇" + dialogTitle;
					}else{
						dialogTitle = "请选择" + dialogTitle;
					}*/
					if(dialogTitle == ""){
					    dialogTitle = SystemEnv.getHtmlNoteName(3418,languageid)+dialogTitle;
					}
					options.dialogTitle = dialogTitle;
				}catch(e){
					if(window.console)console.log(e,"/js/jquery-autocomplete/browser.js#showModalDialogForBrowser");
				}
				showModalDialogCommon(e,url,linkUrl,fieldid,isSingle,false,isMustInput,params,options);
			},
			showModalDialogForAdd:function(e,url,linkUrl,fieldid,isSingle,isMustInput,params,options){
				try{
					var dialogTitle = options.dialogTitle;
					if(!dialogTitle)dialogTitle="";
					/*if(readCookie("languageidweaver")==8){
						dialogTitle = "New " + dialogTitle;
					}else if(readCookie("languageidweaver")==9){
						dialogTitle = "新建" + dialogTitle;
					}else{
						dialogTitle = "新建" + dialogTitle;
					}*/
					if(dialogTitle == ""){
					    dialogTitle = SystemEnv.getHtmlNoteName(3418,languageid)+dialogTitle;
					}
					options.dialogTitle = dialogTitle;
				}catch(e){
					if(window.console)console.log(e,"/js/jquery-autocomplete/browser.js#showModalDialogForAdd");
				}
				showModalDialogCommon(e,url,linkUrl,fieldid,isSingle,true,isMustInput,params,options);
			},
		    showModalDialogCommon:function(e,url,linkUrl,fieldid,isSingle,isAdd,isMustInput,params,options){
				try{
					if(options.getBrowserUrlFn){
						var tempurl = null;
						try{
							tempurl = window[options.getBrowserUrlFn](options.getBrowserUrlFnParams);
						}catch(e){
							tempurl = options.getBrowserUrlFn(options.getBrowserUrlFnParams);
						}
						if(tempurl){
							//tempurl="/systeminfo/BrowserMain.jsp?url=/hrm/resources/SingleResource.jsp?selectids=1";
							url = tempurl;
						}
					}
				}catch(e){
					if(window.console)console.log(e+"--/js/jquery-autocomplete/browser.js-->showModalDialogCommon()");
				}
				
				if(url && url.indexOf("/MutiResourceBrowser.jsp")!=-1){
				options.dialogWidth=648;
			  }else if(url && url.indexOf("/HrmJobTitlesAdd.jsp")!=-1){
				options.dialogWidth=700;
			  }
			  
				if(!url || url==="null"||url=="NULL"){
					return;
				}
				var preUrl = "";
				var afterUrl = "";
				if(url.indexOf("?url")==-1){
					preUrl = url.substring(0,url.indexOf("&url")+1);
					afterUrl = url.substring(url.indexOf("&url")+1,url.length);
				}else{
					preUrl = url.substring(0,url.indexOf("?url")+1);
					afterUrl = url.substring(url.indexOf("?url")+1,url.length);
				}
				var evt = e;
				if(jQuery.browser.msie && jQuery.browser.version=="8.0")  
				{ 
					evt = window.event;
				}
				var target = null;
				try{
					target = evt.srcElement||evt.target;
				}catch(e){}
				var dialogArguments = options.arguments;
				var zDialog = options.zDialog;
				var userCallBack = options.userCallBack;
				var hasInput = options.hasInput;
				var idKey = options.idKey;
				var nameKey = options.nameKey;
				var dialogWidth = options.dialogWidth;
				var dialogHeight = options.dialogHeight;
				var dialogMaxiumnable = options.maxiumnable;
				if(dialogWidth){
					dialogWidth = parseInt((""+dialogWidth).replace(/\D/g,""));
				}
				if(dialogHeight){
					dialogHeight = parseInt((""+dialogHeight).replace(/\D/g,""));
				}
				if(afterUrl.indexOf("&")>-1){
					var apreUrl = afterUrl.substring(0,afterUrl.indexOf("?"));
					var aaUrl = afterUrl.substring(afterUrl.indexOf("?"),afterUrl.length);
					if(url.indexOf("?url")!=-1||url.indexOf("&url")!=-1){
						afterUrl = apreUrl+uescape(aaUrl);
					}else{
						afterUrl = apreUrl+aaUrl;
					}
					url = preUrl + afterUrl; 
				}
				if(!zDialog && !!dialogArguments){
					datas = window.showModalDialog(url,window,dialogArguments);
				}else{
					if(zDialog){
						try{
							var _parentWin = window;
						    while (_parentWin != _parentWin.parent) {
						        if (_parentWin.parent.document.getElementsByTagName("FRAMESET").length > 0 && _parentWin == _parentWin.parent) break;
						        _parentWin = _parentWin.parent;
						    }
						    if(_parentWin.document.getElementsByTagName("FRAMESET").length > 0){
						    	browserDialog = new Dialog();
						    }else{
						    	browserDialog = new _parentWin.Dialog();
						    }
						}catch(e){
							browserDialog = new Dialog();
						}
						browserDialog.currentWindow = window;
						browserDialog.Width = dialogWidth || 550;
						browserDialog.Height = dialogHeight || 600;
						if(dialogMaxiumnable&&dialogMaxiumnable==true){
							browserDialog.maxiumnable=true;
						}
						browserDialog.URL = url;
						browserDialog.Title = options.dialogTitle||"";
						browserDialog.checkDataChange = false;
						browserDialog.show();
					}else{
						datas = window.showModalDialog(url,window);
					}
				}
				var e8os = jQuery(target).closest("div.e8_os");
				if(zDialog){
					var browserConfig = {
						_event:evt,
						e8os:e8os,
						linkUrl:linkUrl,
						isAdd:isAdd,
						fieldid:fieldid,
						isMustInput:isMustInput,
						options:options,
						params:params,
						wuiUtil:wuiUtil,
						isSingle:isSingle,
						__callback:__browserNamespace__.__callback,
						_writeBackData:__browserNamespace__._writeBackData,
						_target:target,
						__document:document
					};
					browserDialog.browserConfig = browserConfig;
				}else{
					if (datas){
						var ids = wuiUtil.getJsonValueByIndex(datas,0);
						if(idKey){
							ids = datas[idkey];
						}
						if (ids!= ""){
							if(nameKey){
								names = datas[nameKey];
							}
							var idArr = ids.split(",");
							var nameArr = names.split(",");
							var showNames = "";
							for(var i=0;i<idArr.length;i++){
								var showname = "<a href='#"+idArr[i]+"' onclick='return false;'>"+nameArr[i]+"</a>";
								if(!!linkUrl&&linkUrl!="#"){
									if(linkUrl.toLowerCase().indexOf("javascript:")>-1){
										var pre = linkUrl.substring(0,linkUrl.indexOf("$"));
										var after = linkUrl.substring(linkUrl.lastIndexOf("$")+1,linkUrl.length);
										showname = "<a href='"+pre+idArr[i]+after+";' onclick='pointerXY(event);'>"+nameArr[i]+"</a>";
									}else{
										if(linkUrl.match(/#id#/)){
											var _linkUrl = linkUrl.replace(/#id#/g,idArr[i]);
											showname = "<a href=\""+_linkUrl+"\" target='_blank'>"+nameArr[i]+"</a>";
										}else{
											if(linkUrl.match(/=$/) || linkUrl.match(/#$/)){
												showname = "<a href=\""+linkUrl+idArr[i]+"\" target='_blank' >"+nameArr[i]+"</a>";
											}else{
												showname = "<a href=\""+linkUrl+"?id="+idArr[i]+"\" target='_blank' >"+nameArr[i]+"</a>";
											}
										}
									}	
								}
								showNames += showname;
							}
							if(isAdd){
								_writeBackData(fieldid,isMustInput,datas,false,isSingle,false);
							}else{
								e8os.find("#"+fieldid+"span").html(showNames);
								e8os.find("#"+fieldid).val(ids);
								e8os.find("#"+fieldid+"spanimg").html("");
							}
						}
						else{
								if(isAdd){
									_writeBackData(fieldid,isMustInput,datas,false,isSingle,false);
								}else{
									e8os.find("#"+fieldid+"span").html("");
									e8os.find("#"+fieldid).val("");
									if(isMustInput==2){
										e8os.find("#"+fieldid+"spanimg").html("<img align='absmiddle' src='/images/BacoError_wev8.gif'>");
									}
								}
						}
						if(!!userCallBack){
							userCallBack(event,datas,fieldid,params);
						}
						
						__browserNamespace__.__callback(name,fieldid,isMustInput,hasInput,options);
					}
				}
			},
			setInputPosition:function(obj,fieldid,hasAdd){
				var isSingle = jQuery(obj).attr("issingle");
				jQuery(obj).css("width","17px");
				jQuery(obj).css({border:"none"});
				var fieldObj = null;
				if(typeof fieldid == "string"){
					fieldObj = jQuery("#"+fieldid);
				}else{
					fieldObj = jQuery(fieldid);
				}
				if(!fieldObj.hasClass("ps-container")){
					fieldObj.perfectScrollbar();
				}
			},
			getMaxWidth:function(innerDiv,isSingle){
				if(isSingle==false){
					return jQuery(innerDiv).width()-15;
				}else{
					var detaWidth = 15;
					return jQuery(innerDiv).width()-detaWidth;
				}
			},
			setInputWidth:function(innerDiv,inputName,nameAndIdSpan){
				jQuery(inputName).width(jQuery(innerDiv).width()-jQuery(nameAndIdSpan).width()-2);
			},
			getNameAndIdVal:function(container,name){
				var result = jQuery("#"+name).val();
				var obj = jQuery(container).find("#"+name);
				if(container && obj.length>0){
					result = obj.val();
				}
				if(!result)result = "";
				return result;
			},
			e8autocomplete: function(_options){
				var options = jQuery.extend({
					isSingle:true,
					needHidden:true,
					hasAdd:false,
					extraParams:{}
				},_options);
				var nameAndId = options.nameAndId;
				var inputNameAndId = options.inputNameAndId;
				var hasAdd = options.hasAdd;
				var completeUrl = options.completeUrl;
				var isSingle = options.isSingle;
				var extraParams = options.extraParams;
				var row_height = options.row_height;
				var linkUrl = options.linkUrl;
				var isMustInput = options.isMustInput;
				var needHidden = options.needHidden;
				var sb = options.sb;
				var _callbackParams = options._callbackParams||"";
				if(!!sb){
					if(typeof sb == "string"){
						try{
							sb = eval('('+sb+')');
						}catch(e){
							if(window.console)console.log(e,"/js/jquery-autocomplete/e8autocomplete");
						}
					}
				}
				var _callback = options._callback;
				var type=options.type;
				var browserBox = options.browserBox;
				if(browserBox && typeof browserBox == "string"){
					browserBox = jQuery("#"+browserBox);
				}
				var  e8browserIsHrm = function(type){
						if(type==1||type==17){
							return "javascript:openhrm($id$);";
						}
						return "";
					}
				var outDiv = null;
				var ina = null;
				var innerDiv = null;
				var innerContentDiv = null;
				var nameAndIdSpan = null;
				var nameAndIdHidden = null;
				var nameAndIdSpanImg = null;
				if(browserBox.length>0 && needHidden!=false){
					outDiv = browserBox.find("#out"+nameAndId+"div");
					ina = browserBox.find("#"+inputNameAndId);
					innerDiv = browserBox.find("#inner"+nameAndId+"div");
					innerContentDiv = browserBox.find("#innerContent"+nameAndId+"div");
					nameAndIdSpan = browserBox.find("#"+nameAndId+"span");
					nameAndIdHidden = browserBox.find("#"+nameAndId);
					nameAndIdSpanImg = browserBox.find("#"+nameAndId+"spanimg");
				}else{
					outDiv = jQuery("#out"+nameAndId+"div");
					ina = jQuery("#"+inputNameAndId);
					innerDiv = jQuery("#inner"+nameAndId+"div");
					innerContentDiv = jQuery("#innerContent"+nameAndId+"div");
					nameAndIdSpan = jQuery("#"+nameAndId+"span");
					nameAndIdHidden = jQuery("#"+nameAndId);
					try{
						if(nameAndIdHidden.length==0){
							nameAndIdHidden = jQuery("input[name='"+nameAndId+"']");
						}
					}catch(e){
					}
					
					nameAndIdSpanImg = jQuery("#"+nameAndId+"spanimg");
				}
				ina.width(17).bind("blur",function(){setAutocompleteOff(this);});
				outDiv.bind('click',
					function(e){
						setAutoCompleteOn(nameAndId,inputNameAndId,{hasAdd:hasAdd,outDiv:jQuery(this)});
				});
				var _container = window;
				if(jQuery('.zDialog_div_content').length>0){
					_container='.zDialog_div_content';
				};
				ina.bind("focus",function(e){
					jQuery(this).width(17);
					var _this = this;
					var time = setInterval(function(){
						var val = jQuery(_this).val();
						var len = val.getBytesLength();
						if(len>0){
							jQuery(_this).width((17+(len-1)*10));
						}else{
							jQuery(_this).width(17);
						}
					},100);
					jQuery(this).data("_intervaltime",time);
				}).bind("blur",function(e){
					jQuery(this).width(17);
					var time = jQuery(this).data("_intervaltime");
					if(time){
						clearInterval(time);  
					}
				}).autocomplete(completeUrl,	{
					selectFirst: true,
					autoFill:false,
					dataType:'json',
					multiple: !isSingle,
					multipleSeparator:' ',
					extraParams:extraParams,
					divID:innerDiv,
					nameAndId:nameAndId,
					browserBox:browserBox,
					//fixHeight:(isSingle==false?row_height:0),
					parse:function(data){
						return jQuery.map(data,function(row){
							return {data:row,
										value:row.id,
										result:row.name
							}
						});
					},
					formatItem:function(row,i,max){
						return row.name;
					},
					formatResult:function(row){
						return [row.id,row.name];
					}
				});
				ina.result(function(e,data,formatted){
					e = e||window.event;
					var showName = '';
					var maxWidth = getMaxWidth(innerDiv,isSingle);
					if(!(e8browserIsHrm(type)=="")){
							linkUrl = e8browserIsHrm(type);
						}
						if(linkUrl.toLowerCase().indexOf("javascript:")>-1){
							var pre = linkUrl.substring(0,linkUrl.indexOf("$"));
							var after = linkUrl.substring(linkUrl.lastIndexOf("$")+1,linkUrl.length);
							showName = "<a href='"+pre+formatted+after+";' onclick='pointerXY(event);'>"+data.name+"</a>";
						}else if(linkUrl=="" || linkUrl=="#"){
							if(typeof(data.href)=="string"&&data.href!=""){
								if (data.href.indexOf("toformtab")>-1) {
									showName="<a href='"+data.href+"'>"+data.name+"</a>";
								} else {
									showName="<a href='"+data.href+"' target='_blank' >"+data.name+"</a>";
								}
							}else{
								showName="<a href='#"+data.id+"' onclick='return false;'>"+data.name+"</a>";
							}
						}else{
							if(linkUrl.match(/#id#/)){
								var _linkUrl=linkUrl;
								_linkUrl = _linkUrl.replace(/#id#/g,data.id);
								showName = "<a href='"+_linkUrl+"' target='_blank'>"+data.name+"</a>";
							}else{
								if(linkUrl.match(/=$/)){
									showName = "<a href='"+linkUrl+formatted+"' target='_blank'>"+data.name+"</a>";
								}else{
									showName = "<a href='"+linkUrl+"?id="+formatted+"' target='_blank'>"+data.name+"</a>";
								}
							}
						}
						//var newSpan = "<span class='e8_showNameClass'>"+showName;
						var newSpan = jQuery("<span>").addClass("e8_showNameClass");
						newSpan.html(showName);
						var closeSpan = jQuery("<span>",{
							id:formatted
						}).addClass("e8_delClass").bind("click",function(e){
							del(e,this,isMustInput,needHidden,sb);
						}).html("x");
						newSpan.append(closeSpan);
						/*
						"<span class='e8_delClass' id='"+formatted+"' ";
						newSpan += "onclick=\"del(event,this,"+isMustInput+","+needHidden+","+sb+");\">&nbsp;x&nbsp;</span>";
						*/
						//newSpan += "</span>";
						var html = nameAndIdSpan.html();
						nameAndIdSpanImg.html('');
						if(html==null || html.toLowerCase().indexOf('<img')>-1){
							html = '';
						}
						if(isSingle==false){
							var hidden = nameAndIdHidden.val();
							if((','+hidden+',').indexOf(','+formatted+',')<0){
								nameAndIdHidden.val(hidden?(hidden+','+formatted):formatted);
								nameAndIdSpan.append(newSpan);
								try {
									eval(nameAndIdHidden.attr('onpropertychange'));
								} catch (e) {}
								try {
									eval(ina.attr('onpropertychange'));
								} catch (e) {}
							}
						}else{
							nameAndIdHidden.val(formatted);
							nameAndIdSpan.html("").append(newSpan);
							
							try {
								eval(nameAndIdHidden.attr('onpropertychange'));
							} catch (e) {}
							
							try {
								eval(ina.attr('onpropertychange'));
							} catch (e) {}
							
							setInputWidth(innerDiv,ina,nameAndIdSpan);
						}
						hoverShowNameSpan(newSpan);
						if(!!_callback){
							try{
								if(typeof(_callback) == "string"){
									window[_callback](e,data,nameAndId,_callbackParams);
								}else{
									_callback(e,data,nameAndId,_callbackParams);
								}
							}catch(e){
								if(window.console)console.log(e+"-->"+_callback);
							}
						}
						//setInputPosition(ina,outDiv,hasAdd);
						innerContentDiv.perfectScrollbar('update');
						var innerHeight = innerDiv.height();
						var scrollHeight = outDiv.height();
						outDiv.scrollTop(innerHeight-scrollHeight);
						ina.val('')
						jQuery(this).width(17);
						if(isSingle==false){
							ina.show().focus();
						}
						try{
							jQuery("#src_box_middle").perfectScrollbar("update");
							jQuery("#dest_box_middle").perfectScrollbar("update")
						}catch(e){
							
						}
				});
			},
			e8formatInitData: function(_options){
				var options = jQuery.extend({
					isMustInput:"0",
					hasInput:false
				},_options);
				var nameAndId = options.nameAndId;
				var name = options.name;
				var isMustInput = options.isMustInput;
				var hasInput = options.hasInput;
				var browserBox = options.browserBox;
				if(browserBox && typeof browserBox == "string"){
					browserBox = jQuery("#"+browserBox);
				}
				try{
					if(browserBox.length>0){
						browserBox.find("#innerContent"+nameAndId+"div").perfectScrollbar();
					}else{
						jQuery("#innerContent"+nameAndId+"div").perfectScrollbar();
					}
				}catch(e){
					if(window.console)console.log("/js/jquery-autocomplete/browser_wev8.js#e8formatInitData--->"+e);
				}
				try{
					__browserNamespace__.__callback(name,nameAndId,isMustInput,hasInput,{__isInit:true});
				}catch(e){
					if(window.console)console.log(e);
				}
			},
			setAutocompleteOff:function(obj){
				jQuery(obj).hide();
				jQuery(obj).val('');
			},
			setAutoCompleteOn:function(nameAndId,inputNameAndId,options){
				options = jQuery.extend({
					hasAdd:false,
					outDiv:null
				},options);
				var inputNameAndIdObj = null;
				if(options.outDiv && options.outDiv.length>0){
					inputNameAndIdObj = options.outDiv.find("#"+inputNameAndId);
					if(options.outDiv.siblings(".e8_innerShow_button").find(".e8_browflow:first").attr("disabled")){
						return false;
					}else{
						inputNameAndIdObj.css("display","inline-block");
						inputNameAndIdObj.focus();
					}
				}else{
					if(jQuery("#"+nameAndId+"_browserbtn").attr("disabled")){
						return false;
					}else{
						inputNameAndIdObj = jQuery("#"+inputNameAndId);
						inputNameAndIdObj.css("display","inline-block");
						inputNameAndIdObj.focus();
					}
				}
			}			
	    }  
	 })();		
})();

/**
 * 删除选定的对象
 * @param obj
 * @param isMustInput
 * @return
 */
 //@deprecated
function del(evt,obj,isMustInput,needHidden,options){
		__browserNamespace__.del(evt,obj,isMustInput,needHidden,options);
}
/**
 * 按Backspace键的处理
 * @param e
 * @param inputName
 * @param isMustInput
 * @return
 */
 //@deprecated
function delByBS(e,inputName,isMustInput,needHidden,options){
	__browserNamespace__. delByBS(e,inputName,isMustInput,needHidden,options);
}

/**
 * 单击浏览按钮后的回调方法
 * @return
 */
 //@deprecated
function __callback(id,fieldid,isMustInput,hasInput,options){
	__browserNamespace__.__callback(id,fieldid,isMustInput,hasInput,options);
}

//@deprecated
function hoverShowNameSpan(obj){
	__browserNamespace__.hoverShowNameSpan(obj);
}

//@deprecated
function _writeBackData(fieldid,isMustInput,data,_options){
	__browserNamespace__._writeBackData(fieldid,isMustInput,data,_options);
}


function uescape(url){
    return escape(url);
}

/**
*/
//@deprecated
function showModalDialogForBrowser(e,url,linkUrl,fieldid,isSingle,isMustInput,params,options){
	__browserNamespace__.showModalDialogForBrowser(e,url,linkUrl,fieldid,isSingle,isMustInput,params,options);
}

/**
*/
//@deprecated
function showModalDialogForAdd(e,url,linkUrl,fieldid,isSingle,isMustInput,params,options){
	__browserNamespace__.showModalDialogForAdd(e,url,linkUrl,fieldid,isSingle,isMustInput,params,options);
}

var browserDialog = null;

function closeDialog(){
	if(browserDialog)
		browserDialog.close();
}

function getBrowserDialog(){
	return browserDialog;
}

//@deprecated
function showModalDialogCommon(e,url,linkUrl,fieldid,isSingle,isAdd,isMustInput,params,options){
	__browserNamespace__.showModalDialogCommon(e,url,linkUrl,fieldid,isSingle,isAdd,isMustInput,params,options);
}

//@deprecated
function setInputPosition(obj,fieldid,hasAdd){
	__browserNamespace__.setInputPosition(obj,fieldid,hasAdd);
}

//@deprecated
function getMaxWidth(innerDiv,isSingle){
	__browserNamespace__.getMaxWidth(innerDiv,isSingle);
}

//@deprecated
function setInputWidth(innerDiv,inputName,nameAndIdSpan){
	__browserNamespace__.setInputWidth(innerDiv,inputName,nameAndIdSpan);
}

//@deprecated
function getNameAndIdVal(container,name){
	return __browserNamespace__.getNameAndIdVal(container,name);
}

function layzyFunctionLoad(){
	if (window.changeFunctions) {
		window.setTimeout(function () {
			for (var f = 0; f < window.changeFunctions.length; f++) {
				try {
					//window.changeFunctions[f]();
					window.changeFunctions[f].apply(this,null);
				}
				catch (e) {
					if (window.console) {
						console.log("/js/ecology8/docs/docExt.js--->" + e);
					}
				}
			}
				//执行完毕清空方法
			window.changeFunctions.length = 0;
		}, 200);
	}
	//__browserNamespace__.hoverShowNameSpan(".e8_showNameClass");
}

//@deprecated
var e8autocomplete = function(_options){
	__browserNamespace__.e8autocomplete(_options);
}

//@deprecated
var e8formatInitData = function(_options){
	__browserNamespace__.e8formatInitData(_options);
}

//@deprecated
function setAutocompleteOff(obj){
	__browserNamespace__.setAutocompleteOff(obj);
}

//@deprecated
function setAutoCompleteOn(nameAndId,inputNameAndId,options){
	__browserNamespace__.setAutoCompleteOn(nameAndId,inputNameAndId,options);
}

jQuery(document).ready(function(){
	//__browserNamespace__.hoverShowNameSpan(".e8_showNameClass");
});


 window.stringify = function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = window.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

/**
 * 此为树形浏览框的链接打开方式，放在此js文件中作为公共函数
 */
function openByTreeField(paramStr){
	var arr = paramStr.split("_");
	var nodeid = "";
	var objid = "";
	if(arr.length==2){
		nodeid = arr[0];
		objid = arr[1];
		var url = "/formmode/search/CustomSearchOpenTree.jsp?pid="+nodeid+"_"+objid;
		window.open(url);
	}
}

String.prototype.getBytesLength = function() { 
	return this.replace(/[^\x00-\xff]/gi, "---").length; 
} 
/* =================================================
// jQuery Tabs Plugins 1.0
// author:chenyg@5173.com
// URL:http://stylechen.com/jquery-tabs.html
// 4th Dec 2010
// =================================================*/
var _searchBtnClick = false;
(function($){
	$.fn.extend({
		Tabs:function(_options){
			var __this = jQuery(this);
			if(!!_options && _options.method==="set"){
				if(!!__this.data("update_toptitle_num")){
					__this.data("update_toptitle_num")(_options);
				}else{
					window.setTimeout(function(){
						__this.Tabs(_options);
					},500);
				}
				
				return __this;
			}
			if(!!_options && _options.method=="setObjName"){
				if(!!__this.data("setObjName")){
					!!__this.data("setObjName")(_options);
				}else{
					window.setTimeout(function(){
						__this.Tabs(_options);
					},500);
				}
				return __this;
			}
			if(!!_options && _options.method==="e8_tree"){
				if(!!__this.data("update_e8_tree_text")){
					__this.data("update_e8_tree_text")(_options);
				}else{
					window.setTimeout(function(){
						__this.Tabs(_options);
					},500);
				}
				return __this;
			}
			if(!!_options && _options.method === "update"){
				if(!!__this.data("update_toptitle")){
					__this.data("update_toptitle")(this);
				}else{
					__this.data("iframeLoaded")(__this.data("currentIframe"),this);
				}
				return __this;
			}
			if(!!_options && _options.method==="getContentDocument"){
				return __this.data("_contentDocument");
			}
			if(!!_options && _options.method==="getContentWindow"){
				return __this.data("_contentWindow");
			}
			
			var options = $.extend({
				event : 'click',
				timeout : 0,
				auto : 0,
				callback : null,
				getLine:1,
				iframe:null,
				topTitle:"topTitle",
				needTopTitle:true,
				needLine:true,
				lineSep:"|",
				needChange: true,
				image:true,
				cache:false,
				needInitBoxHeight:true,
				needFix:false,
				staticOnLoad:false,
				staticHeight:false,
				height:800,
				container:".e8_box",
				tabMenuFixWidth:0,
				leftWidth:0,
				contentID:null,
				exceptHeight:false,
				tabMenuHeight:0,
				mouldID:"",
				navLogo:null,
				navLogoEvent:null,
				hideSelector:null,
				objName:"",
				containerHide:false,
				ifrmCallback:null,
				needNotCalHeight:false,
				notRefreshIfrm:false,
				noParentMenu:false,
				isworkflow:false
			}, _options);
			
			options.image = false;
			
			var rightBoxMap = {};
			var iframeMap = {};
			var currentIframe = null;
			var currentRightBox = null;
			var lastRightBox = null;
			var lastIframe = null;
			currentIframe = options.iframe;
			currentRightBox = options.iframe+"_box";
			ifrm = jQuery("#"+currentIframe).get(0);
			var _$contentWindow = null;
			__this.data("currentIframe",ifrm);
			var __container = jQuery(options.container);
			var _tab_box = __container.find("div.tab_box");
			var _e8_ultab = __container.find("div.e8_ultab");
			var _e8_rightBox = __container.find("div.e8_rightBox");
			var _tab_menu = __container.find("ul.tab_menu");
			var _objName = _e8_ultab.find("#objName");
			if(_objName.length>0){
				_objName.css("max-width",(jQuery(window).width()-65)+"px");
			}
			if(options.navLogo){
				__container.find("#e8_tablogo").css("background-image","none");
				var navLogo = options.navLogo;
				if(navLogo.indexOf("<img")==-1){
					navLogo = "<img style='vertical-align:middle;' width='43px' src='"+options.navLogo+"'></img>";
				}
				__container.find("#e8_tablogo").html(navLogo);
			}else if(options.mouldID){
				__container.find("#e8_tablogo").css("background-image","url(/js/tabs/images/nav/"+options.mouldID+")");
			}
			if(options.objName){
				__container.find("#objName").html(options.objName.replace(/&/g,"&amp;"));
			}
			if(jQuery("li.e8_tree").length==0){
				__container.find("#e8_tablogo").css("margin-left","6px");
			}
			if(options.iframe){
				__container.attr("_e8tabContainer",true);
			}
			_this = this;
			//cal tab_box height
			var mainIframe = jQuery("#mainFrame",parent.document);
			var dialogframe = jQuery("div[id^='_Container_']",top.document);
			
			var maxRightBoxWidthMap = {};
			var currentA = null;
			var maxRightBoxWidth = 0;
			
			var setIframeHeight = function(){
				var tabMenuHeight = jQuery("ul.tab_menu",parent.document).height();
				if(options.needNotCalHeight)return;
				var pageHeight = jQuery(window).height();
				if(pageHeight<=200){
					var flowsTable = jQuery(".flowsTable",parent.document);
					if(flowsTable.length>0){
						var cc = parseInt(flowsTable.attr("_cc"));
						if(flowsTable.attr("_initComplete")||cc>50){
							pageHeight = flowsTable.height();
						}else{
							cc++;
							flowsTable.attr("_cc",cc);
							setTimeout(function(){
								setIframeHeight();
							},50);
							return;
						}
					}else{
						pageHeight = jQuery(parent).height();
					}
				}
				if(!tabMenuHeight || options.exceptHeight)tabMenuHeight=0;
				if(parent==window){
					tabMenuHeight=0;
				}
				var siblings = jQuery("div"+options.container).siblings(":visible");
				var exceptHeight = 0;
				siblings.each(function(){
					var _this = jQuery(this);
					if(_this.css("position")=="absolute"||_this.css("position")=="relative"){
					}else{
						exceptHeight += _this.height();
						var paddingTop = _this.css("padding-top");
						var paddingBottom = _this.css("padding-bottom");
						try{
							exceptHeight += parseInt(paddingTop.replace(/px/g,""));
						}catch(e){}
						try{
							exceptHeight += parseInt(paddingBottom.replace(/px/g,""));
						}catch(e){}
					}
				});
				var zDialog_div_content = __container.closest("div.zDialog_div_content");
				if(!exceptHeight && zDialog_div_content.length>0){
					var zDialog_div_bottom = jQuery("div.zDialog_div_bottom");
					if(zDialog_div_bottom.length>0){
						exceptHeight += zDialog_div_bottom.height()+11;
					}
					zDialog_div_content.css("overflow","hidden");
				}
				//alert(pageHeight+"::"+exceptHeight);
				if(options.exceptHeight)exceptHeight = 0;
				__container.height(pageHeight-exceptHeight);
				if(_e8_ultab.length>0){
					_tab_box.height(__container.height()-_e8_ultab.height()-(!!options.contentID?jQuery(options.contentID).height():0));
				}else{
					_tab_box.height(__container.height()-_tab_menu.height()-(!!options.contentID?jQuery(options.contentID).height():0));
				}
				if(!!options.iframe){
					__container.find("iframe#"+options.iframe).height(_tab_box.height());
				}
			}
			
			var firstInit = false;
			__container.show().css("visibility","visible");
			if(options.tabMenuHeight){
				_tab_menu.height(options.tabMenuHeight);
				_e8_rightBox.height(options.tabMenuHeight);
				_tab_menu.find("li").height(options.tabMenuHeight).css("line-height",options.tabMenuHeight+"px");
				_e8_rightBox.css("line-height",options.tabMenuHeight+"px");
			}
			
			
			if(options.staticHeight){
				if(!!options.height && options.height.match(/\D/)){
					__container.css("height",options.height);
				}else{
					__container.height(options.height);
				}
				_tab_box.height(__container.height()-_tab_menu.height()-(!!options.contentID?jQuery(options.contentID).height():0));
			}else if(options.needInitBoxHeight){
				setIframeHeight();
				jQuery(window).resize(function(){
			    	if(options.containerHide){
						jQuery(options.hideSelector).show();
					}
			    	setIframeHeight();
			    	if(options.containerHide){
				    	jQuery(options.hideSelector).hide();
				    }
			    });
		    }
		    
		    var setShadowBorderPosition = function(){
		    	_e8_rightBox.find("span#advancedSearch").each(function(){
					var shadowDiv = jQuery("div.e8_shadowDiv");
					var _this = jQuery(this);
					if(shadowDiv.length==0){
						shadowDiv = jQuery("<div class='e8_shadowDiv'></div>");
						jQuery(document.body).append(shadowDiv);
					}
					var _top = 0;
					try{
						var navtab = _this.closest(".e8_ultab");
						_top = navtab.position().top+navtab.height();
					}catch(e){
						_top = _this.position().top+_this.height()-1;
					}
					
					var _width=_this.outerWidth()
					var _left = (_this.offset().left);
					shadowDiv.width(_width-1);
					shadowDiv.css("left",_left).css("top",_top);
				});
		    }
		    
		    var topTitleCount = 0;
		    
			var initTopTitle = function(ifrm,_this){
				jQuery("div.e8_shadowDiv").hide();
				var _contentWindow = window;
				var _document = document;
				if(!!ifrm){
					_contentWindow = ifrm.contentWindow;
					_$contentWindow = ifrm.contentWindow;
					_document = _contentWindow.document;
					if(!_contentWindow.__closeRightMenu__){
						if(!options.noParentMenu){
							jQuery(document).unbind("contextmenu").bind("contextmenu",function(e){
						   		try{
						   			if(_contentWindow.__closeRightMenu__)return;
						   			showIframeRightMenu(e);
						   		}catch(e){}
						   		return false;
						   	});
						   	jQuery(document).bind("click",function(e){
						   		try{
						   			_contentWindow.hideRightClickMenu(e);
						   		}catch(e){}
						   		//return false;
						   	});
						}
					}
				}
				if(options.needTopTitle){
					var __topTitle = jQuery(_document.getElementById(options.topTitle));
					var __searchInput = __topTitle.find("input[type='text']");
					if((__topTitle.length<=0 && topTitleCount<200) ||(!__topTitle.attr("_formatDone") && __searchInput.length>0)){
						setTimeout(function(){initTopTitle(ifrm,_this);},10);
						topTitleCount++;
						return;
					}
					if(__topTitle.attr("_hasLoaded")){return;}
					__topTitle.attr("_hasLoaded",true);
				}
				var _boxEmpty = false;
				var setRightBoxWidth = function(width){
					if(!jQuery.browser.msie){
						return width;
					}
					if(!!maxRightBoxWidthMap[currentA]){
						if(width>maxRightBoxWidthMap[currentA]){
							maxRightBoxWidthMap[currentA] = width;
						}
						maxRightBoxWidth = maxRightBoxWidthMap[currentA];
					}else{
						if(!maxRightBoxWidth || maxRightBoxWidth<width){
							maxRightBoxWidth = width;
						}
						maxRightBoxWidthMap[currentA] = maxRightBoxWidth;
					}
					return maxRightBoxWidth;
				}
				var getTopTitleWidth = function(){
					var width = 31;
					var children = _e8_rightBox.children("#"+currentRightBox+":first");
					if(children.css("display")=="none"||children.children().length==0){
						_boxEmpty = true;
						return 0;
					}else{
						children.children().each(function(index){
							var _this = jQuery(this);
							if(_this.is("input")){
								if(!!_this.attr("type")){
									width += _this.outerWidth();
									//console.log(index+"::"+jQuery(this).outerWidth());
								}
							}else{
								if(_this.attr("id")==="searchblockspan" && _this.outerWidth()>90){
									width += _this.outerWidth()>90?_this.outerWidth():99;
								}else if(_this.hasClass("advancedSearch")){
									width += _this.outerWidth()>45?_this.outerWidth():48;
								}else if(_this.hasClass("cornerMenu")){
									width += _this.outerWidth()>=40?_this.outerWidth():40;
								}else{
									width += _this.outerWidth();
								}
								if(jQuery.browser.msie){
									var paddingLeft = _this.css("padding-left");
									var paddingRight = _this.css("padding-right");
									if(!!paddingLeft){
										width += parseInt(paddingLeft.replace(/\D/g,""));
									}
									if(!!paddingRight){
										width += parseInt(paddingRight.replace(/\D/g,""));
									}
								}
								//console.log(index+"::"+jQuery(this).outerWidth());
							}
						});
					}
					if(options.isworkflow)return 99999;
					if(width==31)return 0;
					if(width>550)return 550;
					return width;
				}
				if(!!_searchBtnClick && !jQuery.browser.msie){
					var searchInputs=__this.find("div#rightBox").find(".searchInput");
					searchInputs.each(function(){
						jQuery(this).bind("keyup",function(){
							var _this = jQuery(this);
							jQuery("input[name='"+_this.attr("name")+"']",_document).val(_this.val());
							jQuery("input[name='"+_this.attr("name")+"']",_document).trigger("change");
						});
					});
					return;
				}
				//jQuery(_document).ready(function(){
					if(options.ifrmCallback){
						try{
							options.ifrmCallback(ifrm,_this);
						}catch(e){
							if(window.console)console.log(e+"---jquery.tabs.extend.js-->"+options.ifrmCallback);
						}
					}
					__container.find("div.e8_boxhead").css({
						"visibility":"visible"
					});
					_e8_rightBox.css("visibility","hidden");
					var outboxDiv = __container.find(".e8_outbox");
					if(outboxDiv.length==0){
						outboxDiv = jQuery("<div class='e8_outbox'></div>");
						_e8_rightBox.wrap(outboxDiv);
					}
						__container.show().css("visibility","visible");
						if(!options.needTopTitle){
							setShadowBorderPosition();
							init(_this,_contentWindow);
							return;
						}
						if(!!setRightBoxWidth(0)){
							_e8_rightBox.width(setRightBoxWidth(0));
						}
						var tt = jQuery("#"+options.topTitle,_document);
						var htmlx = tt.find("td.rightSearchSpan").html();
						if(!htmlx){
							htmlx = "";
						}
						htmlx = htmlx.replace(/&nbsp;/g,"");
						var outerHTML = "<div id='"+currentIframe+"_box' class='_box'>"+htmlx+"</div>";
						if(options.cache){
							rightBoxMap[currentA] = currentIframe+"_box";
							_e8_rightBox.append(jQuery(outerHTML));
							currentRightBox = currentIframe+"_box";
						}else{
							_e8_rightBox.html(outerHTML);
						}
						if(options.tabMenuHeight){
							_e8_rightBox.find("div._box").css("line-height",options.tabMenuHeight+"px").find("span.cornerMenu").height(options.tabMenuHeight);
						}
						window.setTimeout(function(){
							_e8_rightBox.find("input[type=button]").each(function(index,obj){
								var _this = jQuery(this);
								_this.css({
									"max-width":"100px",
									"overflow":"hidden",
									"text-overflow":"ellipsis",
									"white-space":"nowrap"
								});
								if(index==0){
									if(!_this.attr("_disabled")){
										_this.removeClass("e8_btn_top").addClass("e8_btn_top_first");
									}
								}
								_this.attr("title",_this.val());
								var _click = null;
								try{
									_click = this.getAttribute("onclick");
								}catch(e){
									try{ 
										_click = this.getAttributeNode("onclick").nodeValue;
									}catch(e){
										if(window.console)console.log(e);
										try{
											_click = this.getAttributeNode("onclick").value;
										}catch(e){
											if(window.console)console.log(e);
										}
									}
								}
								if(jQuery.browser.safari && _click!=null && _click.indexOf("function")!=-1){
									try{
										_click = _click.replace(/function\s*\(\)\s*\{/g,"");
									}catch(e){}
								}
								_this.removeAttr("onclick").bind("click",function(e){
									if(_click.toLowerCase().indexOf("javascript:")!=-1 && _click.indexOf("_contentWindow")==-1){
										_click = "javascript:_contentWindow."+_click.substring(_click.indexOf("javascript:")+11);
									}else if(_click.indexOf("_contentWindow")==-1){
										_click = "_contentWindow."+_click;
									}
									try{
										var as = jQuery("span#advancedSearch",_document);
										try{
											_contentWindow.advancedSearchClick(e,as,true);
										}catch(e){
											if(window.console)console.log("jquery.tabs.extends.js-->"+_click+"--->"+e);
										}
										eval(_click);
										
									}catch(e){
										if(window.console)console.log("jquery.tabs.extends.js-->"+_click+"--->"+e);
									}
								});
							});
							_e8_rightBox.find("span.cornerMenu").each(function(){
								var _this = jQuery(this);
								if(!_this.hasClass("middle")){
									_this.addClass("middle");
								}
								if(_this.attr("onclick")){
									var _click = this.getAttributeNode("onclick").nodeValue;
									_this.attr("onclick","").bind("click",function(e){
										if(_click.toLowerCase().indexOf("javascript:")!=-1 && _click.indexOf("_contentWindow")==-1){
											_click = "javascript:_contentWindow."+_click.substring(_click.indexOf("javascript:")+11);
										}else if(_click.indexOf("_contentWindow")==-1){
											_click = "_contentWindow."+_click;
										}
										try{
											var as = jQuery("span#advancedSearch",_document);
											_contentWindow.advancedSearchClick(e,as,true);
											eval(_click);
										}catch(e){
											if(window.console)console.log("jquery.tabs.extends.js-->"+_click+"--->"+e);
										}
									});
								}else{
									_this.unbind("click").bind("click",function(e){
										var e8_head = __container.find("div.e8_boxhead");
										if(e8_head.length==0){
											e8_head = __container.find("div#rightBox");
										}
										bindCornerMenuEvent(e8_head,_contentWindow,e);
										try{
											var as = jQuery("span#advancedSearch",_document);
											_contentWindow.advancedSearchClick(e,as,true);
											eval(_click);
										}catch(e){
											if(window.console)console.log("jquery.tabs.extends.js-->"+_click+"--->"+e);
										}
									});
								}
							});
							var initSearchInput = function(_this){
								var searchInputs=_e8_rightBox.find(".searchInput");
								searchInputs.each(function(idx,obj){
									var $this = jQuery(this);
									var searchFn = $this.attr("_searchFn");
									if(!searchFn){
										var _searchInput = jQuery("#"+options.topTitle,_document).find(".searchInput").eq(idx);
										searchFn = _searchInput.attr("_searchFn");
									}
									if(searchFn){
										var searchInput = $this.clone();
										var corner = _e8_rightBox.find("span#advancedSearch");
										if(corner.length<=0){
											corner = _e8_rightBox.find("span.cornerMenu:first");
										}
										corner.before(searchInput);
										var __this = this;
										$this.closest("span#searchblockspan").remove();
										$this.remove();
										searchInput.removeAttr("onchange");
										jQuery(searchInput).searchInput({searchFn:function(val){
												jQuery("input[name='"+jQuery(__this).attr("name")+"']",_document).val(val);
												jQuery("input[name='"+jQuery(__this).attr("name")+"']",_document).trigger("change");
												try{
													eval("_contentWindow."+searchFn+"('"+val+"')");
													var as = jQuery("span#advancedSearch",_document);
													_contentWindow.advancedSearchClick(null,as,true);
													_searchBtnClick = true;
												}catch(e){
													if(window.console)console.log(e+"-->jquery.tabs.extends.js-->"+"_contentWindow."+searchFn+"('"+val+"')");
												}
												if(!options.notRefreshIfrm)
													__tabNamespace__.getElement();
											}
										});
										if(!!_searchBtnClick){
											jQuery("span.searchImg img").mouseover();
										}
									}else{
										setTimeout(function(){
											initSearchInput(_this);
										},200);
									}
								});
							};
							
							initSearchInput(_this);
							
							//advancedSearch click
							_e8_rightBox.find("span#advancedSearch").each(function(){
								jQuery(this).unbind("click").bind("click",function(e){
									var as = jQuery("span#advancedSearch",_document);
									_contentWindow.advancedSearchClick(e,as);
									return false;
								});
								if(jQuery(this).attr("_defaultExpand")==="true"){
									jQuery(this).trigger("click");
								}
							});

							//init selectbox
							_e8_rightBox.find("select").each(function(){
								var $this = jQuery(this);
								//$this.selectbox("detach");
								if(!$this.attr("_realNotBeauty")){
									$this.removeAttr("notBeauty");
								}
								__jNiceNamespace__.beautySelect($this);
							});
							
							window.setTimeout(function(){
								var width = setRightBoxWidth(getTopTitleWidth());
								if(_boxEmpty){
									_boxEmpty = false;
									width = 10;
								}
								_e8_rightBox.width(width);
								if(!!options.tabMenuFixWidth){
									_tab_menu.width(options.tabMenuFixWidth-__container.find("div.e8_tablogo").width());
									__this.width(options.tabMenuFixWidth);
								}else{
									__this.children("ul.tab_menu").width(__container.width()-__container.find("div.e8_tablogo").width()-width-10);
								}
								//console.log("1---"+jQuery("ul.tab_menu").width());
								setShadowBorderPosition();
								init(_this,_contentWindow);
							},50);
						},100);
						
				//});
			}
			
			var insertLine = function(){
				var self = jQuery(options.container);
				var menu = self.find( 'ul.tab_menu' );
				var items = menu.find( "li[class!='magic-line'][class!='e8_expand'][class!='e8_tree']" );
				var e8_tree = menu.children("li.e8_tree");
				var _tab_logo = self.find("div.e8_tablogo");
				if(menu.children("li.e8_tree").length==0){
					items.eq(0).addClass("firstLi");
				}
				items.each(function(index){
					var $this = jQuery(this);
					if(index!=items.length-1){
				    	if($this.children("span.e8_rightBorder").length<=0 && options.needLine){
							$this.append("<span class='e8_rightBorder'>"+options.lineSep+"</span>");
						}else{
							$this.children("span.e8_rightBorder").show();
						}
					}
				});
				e8_tree.children("span.e8_rightBorder").hide();
				if(e8_tree.length>0){
					if(!!options.navLogoEvent){
						_tab_logo.css("cursor","pointer").unbind("click").bind("click",function(){
							options.navLogoEvent.call();
						});
					}else{
						var _title = "点击可收缩/展开左侧菜单";
						try{
							_title = SystemEnv.getHtmlNoteName(3655);
						}catch(e){}
						_tab_logo.attr("title",_title).css("cursor","pointer").unbind("click").bind("click",function(e){
							refreshTabNew();
							toggleleft();
							toggleleft(parent.parent.document);
							var e8_head = __container.find("div.e8_boxhead");
							if(e8_head.length==0){
								e8_head = _e8_rightBox;
							}
							bindCornerMenuEvent(e8_head,_$contentWindow,e,{position:true});
						});
					   var treeSwitch = jQuery("#e8TreeSwitch");
					   if(treeSwitch.length==0){
					   	 treeSwitch = jQuery("<div id=\"e8TreeSwitch\" class=\"e8_expandOrCollapseDiv e8_expandOrCollapseDiv_tree e8_expandOrCollapseDivCol\"></div>");
					   	 jQuery("body").append(treeSwitch);
					   	 treeSwitch.css({
					   	 	left:0,
					   	 	top:11
					   	 });
					   }
					   treeSwitch.unbind("click").bind("click",function(){
					   	 _tab_logo.trigger("click");
					   });
					}
				}else{
					if(!!options.navLogoEvent){
						_tab_logo.css("cursor","pointer").unbind("click").bind("click",function(){
							try{
								options.navLogoEvent();
							}catch(e){
								options.navLogoEvent.call();
							}
						});
					}
				}
		    }
			
			var insertImages = function(){
					var self = jQuery(options.container);
	            	var menu = self.find( 'ul.tab_menu' );
					var items = menu.find( "li[class!='magic-line'][class!='e8_expand'][class!='e8_tree']" );
					items.each(function(index){
						var _index = index%8;
						var $this = jQuery(this);
						$this.attr("imageIdx",_index+1);
						if(options.image){
							$this.css("background-image","url(/images/ecology8/top_icons/"+(_index+1)+"-1_wev8.png)");
							$this.css("background-position","0 50%");
							$this.css("background-repeat","no-repeat");
							if($this.parent("div.e8_content").length>0){
								$this.css("background-position","10px 50%");
							}
						}else{
							$this.css("padding-left","5px");
						}
					});
	            }
			
			var init = function(obj,_contentWindow){
				var self = $(obj),
					tabBox = self.find( 'div.tab_box' ).children( 'div' ),
					menu = self.find( 'ul.tab_menu' ),
					items = menu.find( "li[class!='magic-line'][class!='e8_expand']" ),
					timer,
					$magicLine;
				
				//获取dialog框，并且重新获取初始化的数据
				try{
					if(options.iframe){
						var dialog = parent.getDialog(window);
						if(dialog.checkDataChange){
							dialog.getPageData(dialog,"initData",0);
						}
					}
					
				}catch(e){}
				
				__container.find("div.e8_boxhead").css({
					"visibility":"visible"
				});
				
				var preDealLink = function(){
					items.each(function(index){
						var $this = jQuery(this);
						var _this = $this.children("a:first");
						var id = _this.attr("id");
						if(!id){
							_this.attr("id", "li_a_"+index);
						}
						if($this.hasClass("defaultTab")){
							_this.unbind("click").bind("click",function(e){
								var evt = e||window.event;
								event.stopPropagation();
        						event.preventDefault();
								return false;
							});
						}
						if($this.hasClass("e8_tree")){
							_this.removeAttr("onclick");
							_this.unbind("click").bind("click",function(e){
								refreshTabNew();
								toggleleft();
								toggleleft(parent.parent.document);
								var e8_head = __container.find("div.e8_boxhead");
								if(e8_head.length==0){
									e8_head = _e8_rightBox;
								}
								bindCornerMenuEvent(e8_head,_contentWindow,e,{position:true});
							});
						}else{
							_this.unbind("click.sys").bind("click.sys",function(){
								if(!options.notRefreshIfrm){
									__tabNamespace__.getElement();
								}
								currentA = jQuery(this).attr("id");
								maxRightBoxWidth = 0;
								if(!!options.cache){
									if(!!iframeMap[currentA]){
											lastRightBox = currentRightBox;
											lastIframe = currentIframe;
											currentRightBox = rightBoxMap[currentA];
											currentIframe = iframeMap[currentA];
											switchCache();
										return false;
									}else{
										lastRightBox = currentRightBox;
										lastIframe = currentIframe;
										currentIframe = currentA+"_iframe";
										var iframe = jQuery("<iframe src=\"\" id="+currentIframe+" name="+currentIframe+" class=\"flowFrame\" onload=\"update();\" frameborder=\"0\" height=\"100%\" width=\"100%;\"></iframe>");
										jQuery("div.tab_box div:first").append(iframe);
										jQuery(this).attr("target",currentIframe);
										jQuery("#"+lastRightBox).hide();
										jQuery("#"+lastIframe).hide();
										iframeMap[currentA] = currentIframe;
									}
								}
							});
						}
					});
					currentA = menu.children("li.current:first").children("a:first").attr("id");
					if(!!options.cache){
						rightBoxMap[currentA] = currentRightBox;
						iframeMap[currentA] = currentIframe;
					}
		    	}
		    	if(!__this.data("update_toptitle"))
					preDealLink();
				var tabHandle = function( elem ){
						elem = jQuery(elem).parent("li");
						if(elem.hasClass("e8_tree")||elem.hasClass("defaultTab")){
							return;
						}
						elem.siblings( 'li' )
							.removeClass( 'current' )
							.end()
							.addClass( 'current' );
							
						tabBox.siblings( 'div' )
							.addClass( 'hide' )
							.end()
							.eq( elem.index() )
							.removeClass( 'hide' );
						if(options.getLine){
							$magicLine = $(options.container).find(".magic-line");
							var current = $magicLine.siblings(".current") || $magicLine.parent(".current");		
							var _left = current.position().left;
							if($magicLine.css("background-repeat")=="repeat-x"){
		                	 	_left += 5;
		                	 }
							$magicLine
		                    .width(current.find("a").width())
		                    .css("left",_left)
		                    .data("origLeft", $magicLine.offset().left)
		                    .data("origWidth", $magicLine.width());
						}
					},
						
					delay = function( elem, time ){
						time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
					},
					
					start = function(){
						if( !options.auto ) return;
						timer = setInterval( autoRun, options.auto );
					},
					
					autoRun = function(){
						var current = menu.find( 'li.current' ),
							firstItem = items.eq(0),
							len = items.length,
							index = current.index() + 1,
							item = index === len ? firstItem : current.next( 'li' ),
							i = index === len ? 0 : index;
						current.removeClass( 'current' );
						item.addClass( 'current' );
						
						tabBox.siblings( 'div' )
							.addClass( 'hide' )
							.end()
							.eq(i)
							.removeClass( 'hide' );
					},
					
					update = function(){
						var outbox = jQuery(_this).find("div.e8_outbox");
						outbox.css("visibility","hidden");
						var _tab_logo = __container.find("div.e8_tablogo");
						if(!!options.tabMenuFixWidth){
							_tab_menu.width(options.tabMenuFixWidth-_tab_logo.width());
							__container.width(options.tabMenuFixWidth);
						}else{
							var containerWidth = __container.width();
							if(!options.iframe){
								containerWidth = containerWidth - 20;
							}
							if(containerWidth>jQuery(window).width())containerWidth = jQuery(window).width();
							_tab_menu.width(containerWidth-_e8_rightBox.eq(0).width()-_tab_logo.width()-10);
							if(!_e8_rightBox.html()){
								_tab_menu.css("width","100%");
							}
						}
						_tab_menu.find("li a").css("max-width",_tab_menu.width()-70);
						var insertItem = __container.find("li.e8_expand");
						var beforeItem = insertItem.prev("li");
						beforeItem.after(__container.find("div.e8_content").children("li"));
						_tab_menu.find("li").find(".e8_rightBorder").show();
						__container.find("div.e8_content").remove();
						insertItem.remove();
						format(menu,items);
						insertImages();
						try{
							var _top = _tab_menu.offset().top;
							if(_top<0)_top=0;
							outbox.css("top",_top);
						}catch(e){
							
						}
						outbox.css("visibility","visible");
					},
					
					updateAjax = function(obj){
						var ifrm = jQuery("#"+currentIframe).get(0);
						iframeLoaded(ifrm,obj);
					},
					
					updateNum = function(_options){
						for(var key in _options){
							if(key=="method")continue;
							var span = _tab_menu.find("li a span#"+key);
							span.html("("+_options[key]+")");
						}
						update();
					},

					update_e8_tree_text = function(_options){
							var lia = _tab_menu.find("li.e8_tree a");
							lia.html(options["text"]);
					},
					
					isMouseLeaveOrEnter = function(e, handler) {
					    if (e.type != 'mouseout' && e.type != 'mouseover') return false;
					    var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
					    while (reltg && reltg != handler)
					        reltg = reltg.parentNode;
					    return (reltg != handler);
					},
					
					resetShadowPosition = function(){
						var current = __container.find(".current");
		                $magicLine = __container.find(".magic-line");
		                var _left = 0;
		                var _top = 0;
		                if(current.length>0 && $magicLine.length>0){
		                	 _left = current.position().left;
		                	 if($magicLine.css("background-repeat")=="repeat-x"){
		                	 	_left += 5;
		                	 }
			                _top = current.position().top + current.height()-12;
			                if(jQuery.browser.msie && (jQuery.browser.version=="8.0"||jQuery.browser.version=="7.0")){
			                	_top += 1;
			                }
			                $magicLine
			                    .width(current.find("a").width())
			                    .css("left", _left)
			                    .css("top",_top)
			                    .data("origLeft", $magicLine.position().left)
			                    .data("origWidth", $magicLine.width());
		                }else{
		                	$magicLine.hide();
		                }
						setShadowBorderPosition();
					},
					
					
					format = function(menu,items){
						var idx = 0;
						var liWidth = 0;
						var first = false;
						var div = null;
						var insertItem = null;
						menu = self.find( 'ul.tab_menu' );
						items = menu.find( "li[class!='magic-line'][class!='e8_expand']" );
						items.each(function(index){
							var curItem = jQuery(this);
							for(var i=index+1;i<items.length;i++){
								var nextItem = items.eq(i);
								if(nextItem==null)break;
								if(parseInt(curItem.attr("idx"))>parseInt(nextItem.attr("idx"))){
									exchangePos(curItem,nextItem,true);
								}
							}
						});
						items = menu.find( "li[class!='magic-line'][class!='e8_expand'][class!='e8_tree']" );
						
						var needHide = false;
						var timeout = null;
						var maxWidth = 0;
						var menuWidth = menu.width();
						var _liWidth = parseInt(__container.data("_liWidth"));
						items.eq(items.length-1).children("span.e8_rightBorder").hide();
						if(_liWidth+25<=menuWidth)return;
						items.each(function(index){
							var $this = jQuery(this);
							if($this.children("span.e8_rightBorder").length<=0 && options.needLine){
								$this.append("<span class='e8_rightBorder'>"+options.lineSep+"</span>");
							}else{
								if(index!=items.length-1){
									$this.children("span.e8_rightBorder").show();
								}else{
									$this.children("span.e8_rightBorder").hide();
								}
							}
							jQuery("li.e8_tree").children("span.e8_rightBorder").hide();
							liWidth+=$this.outerWidth();
							if(liWidth+25>=menuWidth && !first){
								idx = index-1;
								first = true;
								if(idx<items.length-1){
									var startItem = items.eq(idx);
									startItem.children("span.e8_rightBorder").hide();
									var endItem = items.eq(items.length-1);
									insertItem = jQuery("<li class='e8_expand'></li>");
									startItem.after(insertItem);
									div = jQuery("<div class='e8_content hide'></div>");
									if(!maxWidth || maxWidth<$this.outerWidth()){
										maxWidth =$this.outerWidth();
									}
									div.append($this);
									$this.children("span.e8_rightBorder").hide();
									insertItem.bind("click",function(){
										if(timeout!=null)
											clearInterval(timeout);
										jQuery(div).toggle();
										if(jQuery(div).css("display")=="none"){
											jQuery(this).removeClass("e8_expand_selected");
											needHide = false;
										}else{
											jQuery(this).addClass("e8_expand_selected");
											needHide = true;
											div.css("left",jQuery("li.e8_expand").offset().left-div.width()+__container.find("li.e8_expand").outerWidth()-options.leftWidth-2);
											div.css("top",jQuery("li.e8_expand").offset().top+items.eq(0).height()+1);
										}
									}).bind("mouseout",function(){
										if(timeout!=null)
											clearInterval(timeout);
										if(needHide){
											timeout = window.setTimeout(function(){
												if(needHide){
													jQuery("div.e8_content").hide();
													jQuery("li.e8_expand").removeClass("e8_expand_selected");
												}
											},500);
										}
									});
									div.bind("mouseover",function(){
										needHide = false;
									}).bind("mouseout",function(e){
										if(isMouseLeaveOrEnter(e,this)){
											needHide = false;
											jQuery("div.e8_content").hide();
											jQuery("li.e8_expand").removeClass("e8_expand_selected");
										}
									});
								}		
							}else if(first){
								if(!maxWidth || maxWidth<$this.outerWidth()){
									maxWidth =$this.outerWidth();
								}
								div.append($this);
								$this.children("span.e8_rightBorder").hide();
							}
							if(index==items.length-1 && first){
								insertItem.after(div);
								div.css("left",__container.find("li.e8_expand").offset().left-div.width()+__container.find("li.e8_expand").outerWidth()-options.leftWidth-2);
								div.css("top",__container.find("li.e8_expand").offset().top+items.eq(0).height()+1);
								div.width(maxWidth+10);
								insertItem.prev("li").children("span.e8_rightBorder").hide();
								//if current li hide, then exchange it
								var currentItem = __container.find("div.e8_content li.current");
								if(currentItem.length>0){
									var lastViewItem = __container.find("li.e8_expand").prev("li");
									exchangePos(lastViewItem,currentItem);
								}
							}else if(index==items.length-1 && !first){
								$this.children("span.e8_rightBorder").hide();
								__container.find("li.e8_expand").hide();
							}
						});
						__container.data("_liWidth",liWidth);
						if(options.containerHide){
					    	jQuery(options.hideSelector).hide();
					    }
					    resetShadowPosition();
					},
				exchangePos = function(elem1, elem2,noClass) {
	                if(elem1.length === 0 && elem2.length === 0){
	                    return;
	                }
	                var next = elem2.next(),
	                    prev = elem2.prev();
	                elem1.before(elem2);
	                if(next.length === 0){
	                    prev.after(elem1);
	                }else{
	                    next.before(elem1);
	                }
	                if(!!noClass){
	                }else{
		                elem1.removeClass("current");
		                jQuery(this).css("background-position","0 50%");
		            }
	            };
				update();
				items.children("a").bind( options.event, function(){
					if(options.needChange)
						delay( jQuery(this), options.timeout );
					if( options.callback ){
						options.callback( self );
					}
				});
				
				items.bind("click",function(){
					var $this = jQuery(this);
					if($this.parent("div.e8_content").length>0){
						var lastViewItem = __container.find("li.e8_expand").prev("li");
						if(!!options.needChange){
							exchangePos(lastViewItem,$this);
						}
						jQuery("div.e8_content").hide();
						jQuery("li.e8_expand").removeClass("e8_expand_selected");
						delay( $this.children("a:first"), options.timeout );
					}
				});

				if(options.hideSelector){
					var _document = window.document;
					if(!!options.iframe){
						try{
							_document = jQuery("#"+options.iframe).get(0).contentWindow.document;
						}catch(e){
							if(window.console)console.log(e+"---jquery.tabs.extend.js-->init()");
						}
					}
					jQuery(options.hideSelector,_document).bind("mouseout",function(e){
						if(isMouseLeaveOrEnter(e,this)){
							jQuery(this).hide();
						}
					});
				}
				
				$(window).resize(function(){
					window.setTimeout(function(){
						update();
						resetShadowPosition();
					},100);
				});
				
				if( options.auto ){
					start();
					self.hover(function(){
						clearInterval( timer );
						timer = undefined;
					},function(){
						start();
					});
				}
				
				if(options.getLine){
				    var $el, leftPos, newWidth,topPos,
	                $mainNav = $(options.container).find(".tab_menu");
	                $magicLine = $(options.container).find(".magic-line");
	                if($magicLine.length<=0){
	                	$magicLine = jQuery("<li class='magic-line'></li>");
	                	$mainNav.append($magicLine);
	                }
	                var current = jQuery(options.container).find(".current");
	                $magicLine = jQuery(options.container).find(".magic-line");
	                var _left = 0;
	                var _top = 0;
	                if(current.length>0){
	                	 _left = current.position().left;
	                	 if($magicLine.css("background-repeat")=="repeat-x"){
	                	 	_left += 5;
	                	 }
		                _top = current.position().top + current.height()-12;
		                if(jQuery.browser.msie && (jQuery.browser.version=="8.0"||jQuery.browser.version=="7.0")){
		                	_top += 1;
		                }
		                $magicLine
		                    .width(current.find("a").width())
		                    .css("left", _left)
		                    .css("top",_top)
		                    .data("origLeft", $magicLine.position().left)
		                    .data("origWidth", $magicLine.width());
	                }else{
	                	$magicLine.hide();
	                }
	                    
	                _tab_menu.find("li").hover(function() {
	                	$el = jQuery(this);
	                    if($el.parent("div.e8_content").length>0){
	                    	$el.addClass("e8_li_hover");
	                    }else if($el.hasClass("e8_expand")||$el.hasClass("e8_tree")||$el.hasClass("defaultTab")){
	                    	
	                    }
	                }, function() {
	                	$el = jQuery(this);
	                     if($el.parent("div.e8_content").length>0){
	                    	$el.removeClass("e8_li_hover");
	                    }else if($el.hasClass("e8_expand")||$el.hasClass("e8_tree")||$el.hasClass("defaultTab")){
	                    	
	                    } 
	                });
				};
				jQuery(obj).data("update_toptitle",updateAjax);
				jQuery(obj).data("update_toptitle_num",updateNum);
				jQuery(obj).data("update_e8_tree_text",update_e8_tree_text);
				//var rightBox = jQuery(_this).find(".e8_rightBox");
				_e8_rightBox.css("position","absolute");
				_e8_rightBox.css("visibility","visible");
				if(jQuery.browser.msie){
					_e8_rightBox.find("span.searchImg").css("visibility","visible");
				}
				_tab_box.css("visibility","visible");
				e8_executed = false;
				return jQuery(obj);
			}
			
			var switchCache = function(){
				jQuery("#"+lastRightBox).hide();
				jQuery("#"+lastIframe).hide();
				jQuery("#"+currentRightBox).show();
				jQuery("#"+currentIframe).show();
			}
			
			var iframeLoaded = function(ifrm,_this){
				try{
					iframeMap[currentA] = currentIframe;
				    initTopTitle(ifrm,_this);
				    var $this = jQuery(_this);
				    if(!!ifrm){
						$this.data("_contentDocument",ifrm.contentWindow.document);
			    		$this.data("_contentWindow",ifrm.contentWindow);
			    	}
					_searchBtnClick = false;
				}catch(e){
					if(window.console)console.log(e);
				}
		    }
		    
		    var initE8BoxHeight = function(_this){
		    	window.setTimeout(function(){
		    		__container.show();
		    		__container.css("visibility","visible");
		    		if(!options.needNotCalHeight){
		    			if(_e8_ultab.length>0){
							__container.height(_e8_ultab.height()+2);
						}else{
							__container.height(_tab_menu.height()+2);
						}
					}
					
			    	if(options.needFix){
			    		if(jQuery.browser.msie && document.documentMode<8){
			    			__container.css("position","absolute");
				    		__container.css("top",0);
				    		__container.css("z-index","5");
			    			jQuery(window).scroll(function(){
					    		__container.css("top",jQuery(document).scrollTop());
					    	});
			    		}else{
				    		__container.css("position","fixed");
				    		__container.css("top",0);
				    		__container.css("z-index","5");
				    	}
				    }
				    init(_this);
			    },100);
		    }
		    
		    if(!options.staticOnLoad){
			    if(jQuery.browser.msie){
			    	if(!!ifrm){
					    if(!jQuery(this).data("update_toptitle")){
							var iframeHtml = jQuery("<div></div>").append(jQuery(ifrm).clone()).html();
							iframeHtml = iframeHtml.replace(/<IFRAME/gi, "<iframe onload=\"update();\" ");
							var targetIframe = jQuery(iframeHtml);
							jQuery(ifrm).after(targetIframe);
							jQuery(ifrm).remove();
							iframeLoaded(targetIframe[0], this);
						}
					}else{
						if(!options.needInitBoxHeight){
							initE8BoxHeight(_this);
						}else{
							iframeLoaded(ifrm,_this);
						}
						
					}			    
				}else{
					if(!!ifrm && ifrm.addEventListener){
						ifrm.addEventListener("load", function(){
							iframeLoaded(ifrm,_this);
						}, false);
					}else if(!!ifrm){
						ifrm.onload = function() {  
							iframeLoaded(ifrm,_this);
						}
					}else{
						if(!options.needInitBoxHeight){
							initE8BoxHeight(_this);
						}else{
							iframeLoaded(ifrm,_this);
						}
					}
				}
			}
			
			var setObjName = function(_options){
				var _document = options._document||document;
				if(_options.objName){
					if(_options.isHtml){
						jQuery(options.container,_document).find("#objName").html(_options.objName.replace(/&/g,"&amp;"));
					}else{
						jQuery(options.container,_document).find("#objName").text(_options.objName);
					}
				}
			}
			__this.data("setObjName",setObjName);
			__this.data("iframeLoaded",iframeLoaded);
			insertLine();
			insertImages();
			var _items = _tab_menu.find( "li[class!='magic-line'][class!='e8_expand'][class!='e8_tree']" );
			_items.each(function(index){
				jQuery(this).attr("idx",index);
			});
			if(!!options.iframe){
				_e8_rightBox.width(__this.width()-_tab_menu.width()-10);
			}
		}
	});
})(jQuery);

var __tabNamespace__ = (function(){
	var i=0;
	return (function(){
		return {
			getIframeDocument2:function(container){
				if(!container)container=".e8_box";
				return jQuery(container).Tabs({
					method:"getContentDocument"
				});
			},
			getIframeContentWindow:function(container){
				if(!container)container=".e8_box";
				return jQuery(container).Tabs({
					method:"getContentWindow"
				});
			},
			showIframeRightMenu:function(e,_contentWindow){
				if(!_contentWindow){
					_contentWindow = getIframeContentWindow();
				}
				var _contentDocument = _contentWindow.document;
				var rightMenu = jQuery("#rightMenu");
				_contentWindow.hideRightClickMenu(e);
				 //&& _contentWindow.__isReloadPage
				 //每次都重新加载
				if(rightMenu.length>0){
					rightMenu.remove();
					rightMenu = null;
				}
				if(!!_contentDocument){
					if(!rightMenu || rightMenu.length==0){
					rightMenu = jQuery("#rightMenu",_contentDocument);
					jQuery(document.body).append(rightMenu.clone());
					_contentWindow.writeIframe(e,document,_contentWindow);
					_contentWindow.__isReloadPage = false;
					_contentWindow.__isParentPage = true;
				}
					_contentWindow.showRightClickMenu(e);
				}else{
					setTimeout(function(){
						showIframeRightMenu(e);
					},500);
				}
			},
			update:function(container){
				try{
					var ifrm = document.getElementById("tabcontentframe");
					if(ifrm.src==window.location.href||ifrm.src==window.location.href+"#")return;
					
				}catch(e){}
				update3(container);
			},
			update2:function(container){
				update3(container);
			},
			update3:function(container){
				if(!container)container=".e8_box";
				if(!!jQuery(container).data("iframeLoaded")){
					window.setTimeout(function(){
						jQuery(container).Tabs({
							method:"update"
						});
					},50);
				}else{
					window.setTimeout(function(){
						update3(container);
					},10);
				}
			},
			scrollUp:function(container,direct,tabcontainer){
				if(!tabcontainer)tabcontainer=".e8_box";
				window.setTimeout(function(){
					if(direct==0){
						if(jQuery.browser.mozilla){
							jQuery("body").scrollTop(jQuery("#"+container).offset().top-jQuery(tabcontainer).height()-20)
						}else if(jQuery.browser.webkit){
							jQuery("body").scrollTop(jQuery("#"+container).offset().top-jQuery(tabcontainer).height()-10)
						}else{
							jQuery("body").scrollTop(jQuery("#"+container).offset().top-jQuery(tabcontainer).height())
						}
					}else{
						jQuery("body").scrollTop(jQuery("#"+container).offset().top+jQuery(tabcontainer).height())
					}
				},20);
			},
			getDom:function(selector,_document){
				if(!_document)_document = document;
				var dom = jQuery(selector,_document);
				if(dom.length>0){
					return dom;
				}else{
					window.setTimeout(function(){
						getDom(selector,_document);
					},100);
				}
			},
			initTreeOpenOrClose:function(_window){
				if(!_window)_window = window;
				var screenWidth = screen.width;
				var _initEnter = false;
				try{
					_initEnter = jQuery("#mainFrame",top.document).get(0).contentWindow._initEnter;
				}catch(e){
					_initEnter = top._initEnter;
				}
				var flowMenusTd = jQuery('.flowMenusTd',_window.parent.parent.document);
				if(!_initEnter){
					if(screenWidth>=1280){
						refreshTabNew(_window.parent.document,false,true);
					}else{
						refreshTabNew(_window.parent.document,true);
					}
				}else if(flowMenusTd.length>0 && flowMenusTd.css("display")!="none"){
					refreshTabNew(null,false,true);
				}else{
					refreshTabNew(null,null,null,true);
				}
			},
			refreshTabNew:function(_document,isClose,isOpen,changeIcon){
				if(!_document)_document = parent.document;
				var treeSwitch = jQuery("#e8TreeSwitch");
				var e8_loading = jQuery("#e8_loading",_document);
				var flowMenusTd = jQuery('.flowMenusTd',_document);
				if(jQuery('td#oTd1',_document).length>0 && flowMenusTd.length<=0)return;
				if(flowMenusTd.length>0 && flowMenusTd.css("display")!="none"){
					isClose = true;
				}
				if(window.e8ShowAllways){
					isOpen = true;
				}
				if(!changeIcon){
					if(isOpen){
						jQuery('.flowMenusTd',_document).show();
						jQuery('.leftTypeSearch',_document).show();
					}else{
						if(isClose){
							jQuery('.flowMenusTd',_document).hide();
							jQuery('.leftTypeSearch',_document).hide();
						}else{
							jQuery('.flowMenusTd',_document).toggle();
							jQuery('.leftTypeSearch',_document).toggle();
						}
					}
				}
				if(jQuery('.flowMenusTd',_document).css("display")!="none"){
					jQuery("li.e8_tree a").text("<<");
					treeSwitch.removeClass("e8_expandOrCollapseDivCol");
				}else{
					jQuery("li.e8_tree a").text(">>");
					treeSwitch.addClass("e8_expandOrCollapseDivCol");
					e8_loading.hide();
				}
				if(parent===parent.parent){
				}else{
					refreshTopTab(parent.parent.document,isClose,isOpen,changeIcon);
				}
			},
			refreshTopTab:function(_document,isClose,isOpen,changeIcon){
				if(!_document)_document = parent.parent.document;
				var e8_loading = jQuery("#e8_loading",_document);
				if(window.e8ShowAllways){
					isOpen = true;
				}
				if(!changeIcon){
					if(isOpen){
						jQuery('.flowMenusTd',_document).show();
						jQuery('.leftTypeSearch',_document).show();
					}else{
						if(!!isClose){
							jQuery('.flowMenusTd',_document).hide();
							jQuery('.leftTypeSearch',_document).hide();
						}else{
							jQuery('.flowMenusTd',_document).toggle();
							jQuery('.leftTypeSearch',_document).toggle();
						}
					}
				}
				if(jQuery('.flowMenusTd',_document).length>0){
					if(jQuery('.flowMenusTd',_document).css("display")!="none"){
						jQuery("li.e8_tree a").text("<<");		
					}else{
						jQuery("li.e8_tree a").text(">>");
						e8_loading.hide();
					}
				}
				if(!changeIcon){
					var flowMenusTd = jQuery('.flowMenusTd',_document);
					var expandOrCollapseDiv = jQuery("div.e8_expandOrCollapseDiv",_document);
					if(flowMenusTd.length==0){
						flowMenusTd = jQuery('.flowMenusTd',parent.document);
						expandOrCollapseDiv = jQuery("div.e8_expandOrCollapseDiv",parent.document);
						isClose = false;
					}
					if(flowMenusTd.css("display")=="none" || flowMenusTd.length==0){
						expandOrCollapseDiv.css({
							left:0
						});
					}else{
						expandOrCollapseDiv.css({
							left:flowMenusTd.position().left+flowMenusTd.width()-expandOrCollapseDiv.width()
						});
					}
					if(isClose){
						expandOrCollapseDiv.hide();
					}else{
						expandOrCollapseDiv.show();
					}
				}
			},
			initTreeOpenOrClose2:function(){
				var screenWidth = screen.width;
				var _initEnter = false;
				try{
					_initEnter = jQuery("#mainFrame",top.document).get(0).contentWindow._initEnter;
				}catch(e){
					_initEnter = top._initEnter;
				}
				if(!_initEnter){
					if(screenWidth>=1280){
						toggleleft(parent.document,false,true);
						toggleleft(parent.parent.document,false,true);
					}else{
						toggleleft(parent.document,true);
						toggleleft(parent.parent.document,true);
					}
				}else{
					toggleleft(parent.document,null,null,true);
					toggleleft(parent.parent.document,null,null,true);
				}
				try{
					jQuery("#mainFrame",top.document).get(0).contentWindow._initEnter = true;
				}catch(e){
					top._initEnter = true;
				}
			},
			toggleleft:function(_document,isClose,isOpen,changeIcon){
				if(!_document)_document = parent.document;
				var oTd1 = jQuery("#oTd1",_document);
				showLeftTypeSearch(oTd1,isClose,isOpen,changeIcon);
			},
			showLeftTypeSearch:function(oTd,isClose,isOpen,changeIcon){
				var ifrm = oTd.find("iframe");
				var treeSwitch = jQuery("#e8TreeSwitch");
				if(ifrm.length>0 && ifrm.get(0)){
					var cw = ifrm.get(0).contentWindow;
					if(cw && cw.document && jQuery('.flowMenusTd',cw.document).length>0){
						if(!changeIcon){
							if(isOpen){
								oTd.show();
							}else{
								if(isClose){
									jQuery('.flowMenusTd',cw.document).show();
									jQuery('.leftTypeSearch',cw.document).show();
									oTd.hide();
								}else{
									jQuery('.flowMenusTd',cw.document).show();
									jQuery('.leftTypeSearch',cw.document).show();
									if(oTd.css("display")=="none"){
										oTd.css("display","table-cell");
									}else{
										oTd.hide();
									}
								}
							}
						}
						if(oTd.length>0){
							if(oTd.css("display")=="none"){
								jQuery("li.e8_tree a").text(">>");	
								treeSwitch.addClass("e8_expandOrCollapseDivCol");
								var e8_loading = jQuery("#e8_loading",cw.document);
								e8_loading.hide();
							}else{
								jQuery("li.e8_tree a").text("<<");
								treeSwitch.removeClass("e8_expandOrCollapseDivCol");
							}
						}
						jQuery('.flowMenusTd',cw.document).show();
						jQuery('.leftTypeSearch',cw.document).show();
						try{
							cw.__xTreeNamespace__.prefectScrollBarForXtree();
						}catch(e){}	
						try{
							cw.__zTreeNamespace__.prefectScrollBarForZtree();
						}catch(e){}
					}else{
						setTimeout(function(){
							showLeftTypeSearch(oTd,isClose,isOpen)
						},200);
					}
				}	
			},
			disableTabBtn:function(container){
				if(!container)container = ".e8_box";
				jQuery(container).find("div#rightBox").find("input[type=button]").each(function(_idx,obj){
					jQuery(this).attr("disabled",true);
					if(jQuery(this).hasClass("e8_btn_top_first")){
						jQuery(this).removeClass("e8_btn_top_first").addClass("e8_btn_top_first_disabled");
					}
					if(jQuery(this).hasClass("e8_btn_top")){
						jQuery(this).removeClass("e8_btn_top").addClass("e8_btn_top_disabled");
					}
				});
			},
			enableTabBtn:function(container){
				if(!container)container = ".e8_box";
				jQuery(container).find("div#rightBox").find("input[type=button]").each(function(_idx,obj){
					var $this = jQuery(this);
					$this.removeAttr("disabled");
					if($this.hasClass("e8_btn_top_first_disabled")){
						$this.removeClass("e8_btn_top_first_disabled").addClass("e8_btn_top_first");
					}
					if($this.hasClass("e8_btn_top_disabled")){
						$this.removeClass("e8_btn_top_disabled").addClass("e8_btn_top");
					}
				});
			},
			setTabObjName:function(name,_window){
				if(!_window)_window = window;
				if(typeof name == "string"){
					_window.jQuery(".e8_box").Tabs({
						method:"setObjName",
						objName:name
					});
				}else{
					name.method = "setObjName";
					_window.jQuery(".e8_box").Tabs(name);
				}
			},
			rebindNavEvent:function(container,showTree,isBindNavEvent,navEventHandler,_options){
				var options = jQuery.extend({
					_window:window,
					hasLeftTree:true
				},_options);
				var _$contentWindow = options._window;
				var hasLeftTree = options.hasLeftTree;
				if(!container)container = ".e8_box";
				if(isBindNavEvent!=false)isBindNavEvent = true;
				var self = jQuery(container);
				if(isBindNavEvent){
					self.find("div.e8_tablogo").css("cursor","pointer").unbind("click").bind("click",function(e){
						if(hasLeftTree){
							refreshTabNew();
							toggleleft();
							if(parent === parent.parent ){
							}else{
								toggleleft(parent.parent.document);
							}
							var e8_head = jQuery(container).find("div.e8_boxhead");
							if(e8_head.length==0){
								e8_head = jQuery(container).find("div#rightBox");
							}
							bindCornerMenuEvent(e8_head,_$contentWindow,e,{position:true});
						}
						if(navEventHandler){
							navEventHandler();
						}
					});
				}
				if(hasLeftTree){
					var treeSwitch = jQuery("#e8TreeSwitch");
					if(treeSwitch.length==0){
					 treeSwitch = jQuery("<div id=\"e8TreeSwitch\" class=\"e8_expandOrCollapseDiv e8_expandOrCollapseDiv_tree e8_expandOrCollapseDivCol\"></div>");
					 jQuery("body").append(treeSwitch);
					 treeSwitch.css({
						left:0,
						top:11
					 });
				   }else{
						treeSwitch.show();
				   }
				   self.find("#e8_tablogo").css("margin-left","12px");
				}else{
					jQuery("#e8TreeSwitch").hide();
					self.find("#e8_tablogo").css("margin-left","6px");
				}
			   treeSwitch.unbind("click").bind("click",function(){
				 self.find("div.e8_tablogo").trigger("click");
			   });
				self.find("ul.tab_menu").show().css({
						"visibility":"visible"
					});
				if(showTree){
					self.find("div.e8_tablogo").click();
				}
			},
			showSecTabMenu:function(selector,iframe){
				if(!selector)return;
				var _document = document;
				try{
					if(!!iframe){
						_document = jQuery("#"+iframe).get(0).contentWindow.document;
					}
					jQuery(selector,_document).show();
					jQuery(selector,_document).css({
						"visibility":"visible",
						"-moz-opacity":"1",
						"-khtml-opacity":"1",
						"opacity":"1"
					});
				}catch(e){
				}
			},
			jumpToAnchor:function(anchor){
				try{
					jQuery(window).scrollTop(jQuery(anchor).offset().top-20);
				}catch(e){}
			},
			getElement:function(){
				try{
					var _document = document.getElementById("tabcontentframe").contentWindow.document;
					var topt = jQuery("span.cornerMenu",_document).get(0);
					if(i>350){
						topt = _document.getElementById("topTitle");
					}
					if(topt){
						if(jQuery(topt).attr("_hasLoaded")){
							window.setTimeout(function(){
								__tabNamespace__.getElement();
							},10);
						}else{
							update2();
							i=0;
						}
					}else{
						if(i<=400){
							i++;
							setTimeout(function(){__tabNamespace__.getElement();},10);
						}
					}
				}catch(e){
					if(i<=400){
						i++;
						setTimeout(function(){__tabNamespace__.getElement();},10);
					}
				}
			}
		}
	})();
})();

//@deprecated
function getIframeDocument2(container){
		return __tabNamespace__.getIframeDocument2(container);
}

//@deprecated
function getIframeContentWindow(container){
	return __tabNamespace__.getIframeContentWindow(container);
}

//@deprecated
function showIframeRightMenu(e,_contentWindow){
 		__tabNamespace__.showIframeRightMenu(e,_contentWindow);
 } 

//@deprecated
function update(container){
	__tabNamespace__.update(container);
}

//@deprecated
function update2(container){
	__tabNamespace__.update2(container);
}

//@deprecated
function update3(container){
	__tabNamespace__.update3(container);
}

//@deprecated
function scrollUp(container,direct,tabcontainer){
	__tabNamespace__.scrollUp(container,direct,tabcontainer);
}

//@deprecated
function getDom(selector,_document){
	__tabNamespace__.getDom(selector,_document);
}

jQuery(document).ready(function(){
	window.setTimeout(function(){
		if(!window.notExecute){
			try{
				__tabNamespace__.initTreeOpenOrClose();
			}catch(e){
			}
			try{
				__tabNamespace__.initTreeOpenOrClose2();
			}catch(e){}
		}else{
			top._initEnter = true;
		}
		top._initStatus = true;
	},100);
});

//@deprecated
function initTreeOpenOrClose(_window){
	__tabNamespace__.initTreeOpenOrClose(_window);
}

//@deprecated
function refreshTabNew(_document,isClose,isOpen,changeIcon){
	__tabNamespace__.refreshTabNew(_document,isClose,isOpen,changeIcon);
}

//@deprecated
function refreshTopTab(_document,isClose,isOpen,changeIcon){
	__tabNamespace__.refreshTopTab(_document,isClose,isOpen,changeIcon);
} 

//@deprecated
function initTreeOpenOrClose2(){
	__tabNamespace__.initTreeOpenOrClose2();
}

//@deprecated
function toggleleft(_document,isClose,isOpen,changeIcon){
	__tabNamespace__.toggleleft(_document,isClose,isOpen,changeIcon);
}

//@deprecated
function showLeftTypeSearch(oTd,isClose,isOpen,changeIcon){
	__tabNamespace__.showLeftTypeSearch(oTd,isClose,isOpen,changeIcon);
}

//@deprecated
function disableTabBtn(container){
	__tabNamespace__.disableTabBtn(container);
}

//@deprecated
function enableTabBtn(container){
	__tabNamespace__.enableTabBtn(container);
}

//@deprecated
function setTabObjName(name,_window){
	__tabNamespace__.setTabObjName(name,_window);
}

//@deprecated
function rebindNavEvent(container,showTree,isBindNavEvent,navEventHandler,_options){
	__tabNamespace__.rebindNavEvent(container,showTree,isBindNavEvent,navEventHandler,_options);
}

//@deprecated
function showSecTabMenu(selector,iframe){
	__tabNamespace__.showSecTabMenu(selector,iframe);
}

//@deprecated
function jumpToAnchor(anchor){
	__tabNamespace__.jumpToAnchor(anchor);
}
 	
 	__tabNamespace__.getElement();

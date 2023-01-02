/**
* Author bpf
*/
(function ($) {
	$.fn.searchInput = function (options) {
		var searchInput=$(this);
		searchInput.css("vertical-align","top");
		searchInput.addClass("searchInput");
		if(jQuery.browser.msie && searchInput.closest("span.leftSearchSpan").length==0){
			searchInput.wrap("<span id='searchblockspan'><span class='searchInputSpan' style='position:relative;top:12px;'></span></span>");
		}else{
			searchInput.wrap("<span id='searchblockspan'><span class='searchInputSpan' style='position:relative;'></span></span>");
		}
		var searchImg=$("<span class='middle searchImg'><img class='middle' style='vertical-align:top;margin-top:2px;' src='/images/ecology8/request/search-input_wev8.png'/></span>");
		if(options!=null){
			var searchFn=options.searchFn;
			if(searchFn!=null && searchFn!=undefined){
				searchInput.keyup(function(e){
					if(e.keyCode==13){
						searchFn(searchInput.val(),options.params);
					};
				});
				searchImg.click(function(){
					searchFn(searchInput.val(),options.params);
					return false;
				});
			}
		}
		searchInput.after(searchImg);
		if(searchImg.closest("span.leftSearchSpan").length>0){
			searchImg.css({
				"position":"absolute",
				"right":"0px"
			});
		}
		var key = 0;
		var _width = 0;
		searchInput.parent().hover(function(){
			_width = jQuery(this).width();
			searchInput.addClass("inputing");
			searchInput.focus();
			jQuery(this).addClass("searchImg_hover");
		},function(e){
				searchInput.removeClass("inputing");
				//searchInput.blur();
				jQuery(this).removeClass("searchImg_hover");
				var $this = this;
		});
		jQuery(document).bind("click",function(e){
			var event = e;
			var srcElement = null;
			if(window.event){
				event = window.event;
				srcElement = event.srcElement
			}else{
				srcElement = event.target;
			}
			if(jQuery(srcElement).closest("span.searchInputSpan").length==0){
				searchInput.removeClass("inputing");
				searchInput.blur();
				jQuery("span.searchInputSpan").removeClass("searchImg_hover");
			}
		});
	};
})(jQuery);


/**
	 *	wuiform.init针对本页的功能来说无任何作用，纯粹用于解决兼容init.jsp中的JS/css冲突的问题
	**/
/*wuiform.init = function () {
	wuiform.textarea();
	wuiform.wuiBrowser();
	wuiform.select();
};*/

window.advanceSlideUp = false;

var __topTitleNamespace__ = (function(){
	return (function(){
		return {
			advancedSearchClick:function(e,$this,closed){
				var advancedSearchBtn = jQuery($this);
				if(advancedSearchBtn.length==0)return;
				var parentBtn = jQuery("span#advancedSearch",parent.document);
				var advancedSearchDiv = jQuery("#advancedSearchOuterDiv");
				var shadowDiv = jQuery("div.e8_shadowDiv");
				if(shadowDiv.length==0){
					shadowDiv = jQuery("div.e8_shadowDiv",parent.document);
				}
				var btnTd = jQuery("#advancedSearchDiv table:first").find("td.btnTd");
				var shadowAdvanceDiv = jQuery("#shadowAdvancedSearchOuterDiv");
				if (advancedSearchBtn.nextAll("#advancedSearchOuterDiv").size() == 0) {
					advancedSearchDiv.css("left", 0);
					advancedSearchDiv.find("#cancel").click(function(){
						window.advanceSlideUp = true;
						parentBtn.children("span.e8_advanceSep").css("opacity","1")
							.css("filter","alpha(opacity = 1)").css("-moz-opacity","1");
						btnTd.parent().hide();
						shadowAdvanceDiv.hide();
						advancedSearchBtn.removeClass("click");
						parentBtn.removeClass("click").removeClass("clickie");
						parentBtn.parent().find("span.searchInputSpan").removeClass("searchInputSpan_click");
						advancedSearchDiv.slideUp("fast");
						jQuery("div#rightBox",parent.document).find("span#advancedSearch").removeClass("click");
						shadowDiv.hide();
					});
				}
				if (advancedSearchBtn.hasClass("click") || !!closed) {
					window.advanceSlideUp = true;
					if(!parentBtn.hasClass("btnHoverAdvance")){
						parentBtn.children("span.e8_advanceSep").css("opacity","1")
								.css("filter","alpha(opacity = 1)").css("-moz-opacity","1");
					}
					btnTd.parent().hide();
					shadowAdvanceDiv.hide();
					advancedSearchBtn.removeClass("click");
					parentBtn.parent().find("span.searchInputSpan").removeClass("searchInputSpan_click");
					parentBtn.removeClass("click").removeClass("clickie");
					advancedSearchDiv.slideUp("fast");
					shadowDiv.hide();
				} else {
					parentBtn.children("span.e8_advanceSep").css("opacity","0")
							.css("filter","alpha(opacity = 0)").css("-moz-opacity","0");
					btnTd.parent().hide();
					advancedSearchBtn.addClass("click");
					
					parentBtn.addClass("click");
					if(jQuery.browser.msie){
						parentBtn.addClass("clickie");
					}
					advancedSearchDiv.slideDown("fast",function(){
						btnTd.parent().css("top",advancedSearchDiv.height());
						btnTd.parent().show();
						var _position = btnTd.parent().css("position");
						try{
							var _top = btnTd.parent().offset().top+btnTd.parent().height()+7;
							if(_position=="relative"||_position=="static"){
								_top-=7;
							}
							shadowAdvanceDiv.css("top",_top);
						}catch(e){}
						var _height = jQuery(window).height()-advancedSearchDiv.height()-btnTd.parent().height()-7;
						if(_position=="relative"||_position=="static"){
							_height+=48;
						}
						shadowAdvanceDiv.height(_height);
						shadowAdvanceDiv.show();
						window.advanceSlideUp = false;
						try{
							advancedSearchDiv.perfectScrollbar("update");
						}catch(e){}
					});
					shadowDiv.show();
					parentBtn.parent().find("span.searchInputSpan").addClass("searchInputSpan_click");
					advancedSearchDiv.css("width", jQuery("#topTitle").parent().width());
					btnTd.css("width",jQuery("#topTitle").parent().width());
					btnTd.parent().css({
						position:"fixed",
						zIndex:99
					});
					//position:fixed;z-index:99;
					var maxHeight = jQuery("div.tab_box",parent.document).height()-50;
					advancedSearchDiv.css("max-height",maxHeight);
					layzyFunctionLoad();
					var evt = e||window.event;
					try{
						evt.stopPropagation();
						evt.preventDefault();
					}catch(e){
						window.event.cancelBubble = true;
						return false;
					}
				}
				jQuery("#advancedSearchDiv").resize(function(e){
					var evt = e||window.event;
					resizeAdvanceSearchDiv();
					try{
						evt.stopPropagation();
						evt.preventDefault();
					}catch(e){
						window.event.cancelBubble = true;
						return false;
					}
				});
				jQuery(document.body).resize(function(e){
					var evt = e||window.event;
					resizeAdvanceSearchDiv();
					try{
						evt.stopPropagation();
						evt.preventDefault();
					}catch(e){
						window.event.cancelBubble = true;
						return false;
					}
				});
				jQuery(window).scroll(function(e){
					var evt = e||window.event;
					resizeAdvanceSearchDiv();
					try{
						evt.stopPropagation();
						evt.preventDefault();
					}catch(e){
						window.event.cancelBubble = true;
						return false;
					}
				});
			},
			resizeAdvanceSearchDiv:function(){
				var advancedSearchDiv = jQuery("#advancedSearchOuterDiv");
				var shadowAdvanceDiv = jQuery("#shadowAdvancedSearchOuterDiv");
				shadowAdvanceDiv.hide();
				if(!window.advanceSlideUp && (!advancedSearchDiv.css("display") || advancedSearchDiv.css("display").toLowerCase()!="none")){
					jQuery("select").selectbox("close");
					var btnTd = jQuery("#advancedSearchDiv table:first").find("td.btnTd");
					advancedSearchDiv.css("width", jQuery("#topTitle").parent().width());
					btnTd.css("width",jQuery("#topTitle").parent().width());
					var maxHeight = jQuery("div.tab_box",parent.document).height()-50;
					advancedSearchDiv.css("max-height",maxHeight);
					btnTd.parent().css("top",advancedSearchDiv.height());
					btnTd.parent().show();
					var _position = btnTd.parent().css("position");
					try{
						var _top = btnTd.parent().offset().top+btnTd.parent().height()+7;
						if(_position=="relative"||_position=="static"){
							_top-=7;
						}
						shadowAdvanceDiv.css("top",_top);
					}catch(e){
						if(window.console)console.log("/js/ecology8/request/titleCommon.js---L109"+e);
					}
					var _height = jQuery(window).height()-advancedSearchDiv.height()-btnTd.parent().height()-7;
					if(_position=="relative"||_position=="static"){
						_height+=48;
					}
					shadowAdvanceDiv.height(_height);
					shadowAdvanceDiv.show();
					try{
						advancedSearchDiv.perfectScrollbar("update");
					}catch(e){}
				}
			},
			closeAdvancedSearch:function(_document){
				if(!_document)_document = document;
				if(jQuery("#advancedSearch",_document).hasClass("click")){
					var evt = e ? e:(window.event?window.event:null);
					var focused = evt.srcElement ? evt.srcElement : evt.target;
					if(jQuery(focused).hasClass("e8_delClass"))return false;
					if(jQuery(focused,_document).hasClass("advancedSearch")==false && (jQuery("#advancedSearchOuterDiv",_document).has(focused).length==0)){
						advancedSearchClick(e,jQuery("#advancedSearch"),true)
					}	
				}
			},
			bindCornerMenuEvent:function(topMenuTitle,_contentWindow,e,options){
				try{
					var _position = null;
					if(options){
						_position = options.position;
					}
					var evt = e || window.event;
					if(!!_contentWindow && !(_contentWindow==window)){
						var __contentWindow = _contentWindow; 
						if(_contentWindow.__isParentPage){
							__contentWindow = _contentWindow.parent;
						}
						var rightMenuIframe=__contentWindow.document.getElementById("rightMenuIframe");
						var rightMenu = jQuery(rightMenuIframe).parent().get(0);
						rightMenuIframe = rightMenuIframe.contentWindow.document;
						//_contentWindow.rightMenu.style.top=-3;
						//alert(jQuery(_contentWindow.document).scrollTop() );
						var rightMenuscrolltop = jQuery(__contentWindow.document).scrollTop();
						var exceptHeight = 3;
						if(_contentWindow.__isParentPage){
							exceptHeight = -60;
						}
						jQuery(rightMenu).css("top", rightMenuscrolltop - exceptHeight);
						var display = rightMenu.style.visibility;
						if(_position){
						}else if(display=="hidden"){
							rightMenu.style.visibility="visible";
							jQuery(rightMenu).show();	
						}else{
							rightMenu.style.visibility="hidden";
							jQuery(rightMenu).hide();
						}
						//_contentWindow.rightMenu.style.left=_contentWindow.document.body.clientWidth-jQuery("#menuTable",rightMenuIframe).width()-15;
						jQuery(rightMenu).css("left",_contentWindow.document.body.clientWidth-jQuery("#menuTable",rightMenuIframe).width()-10);
					}else{
						var rightMenuIframe=document.getElementById("rightMenuIframe");
						var rightMenu = jQuery(rightMenuIframe).parent().get(0);
						rightMenuIframe = rightMenuIframe.contentWindow.document;
						//rightMenu.style.top=topMenuTitle.height()-4;
						jQuery(rightMenu).css("top",topMenuTitle.height()-2);
						var display = document.getElementById("rightMenu").style.visibility;
						if(_position){
						}else if(display=="hidden"){
							rightMenu.style.visibility="visible";
							jQuery(rightMenu).show();
						}else{
							rightMenu.style.visibility="hidden";
							jQuery(rightMenu).hide;
						}
						//rightMenu.style.left=document.body.clientWidth-jQuery("#menuTable",rightMenuIframe).width()-15;
						jQuery(rightMenu).css("left",document.body.clientWidth-jQuery("#menuTable",rightMenuIframe).width()-10);
					}
					if(!!evt){
						try{
							evt.stopPropagation();
							evt.preventDefault();
						}catch(e){
							window.event.cancelBubble = true;
							return false;
						}
					}
				}catch(e){
					if(window.console)console.log(e,"/js/ecology8/request/hoverBtn.js#bindCornerMenuEvent");
				}
			},
			getoverflowTabElement:function(){
				var offsetLeft = 0;
				var overflowElements = [];
				jQuery("#tabblock #hoverBtnSpan").find("span").each(function(i){
					if (jQuery(this).offset().left > offsetLeft) {
						offsetLeft = jQuery(this).offset().left;
						
					} else {
						overflowElements.push(jQuery(this));
						offsetLeft = 10000;
					}
				});
				
				return overflowElements;
			},
			highLightSearch:function(key){
				var searchHtml="<label class='e8_querySelected'>"+key+"</label>";
				var container = "body";
				var params = window.params;
				if(params){
					container = params.container;
				}
				jQuery(container).each(function (){
					if(jQuery(this).children("input[type!=hidden],select,textarea").length>0){
						
					}else{
						var sText=jQuery(this).html();
						var lHtml = sText.match(/<label.*?e8_querySelected.*?>(.*?)<\/label>/g);
						if(lHtml){
							for(var i=0;i<lHtml.length;i++){
								var text = lHtml[i].replace(/<.*?\/?>/g,""); 
								sText = sText.replace(/<label.*?e8_querySelected.*?>(.*?)<\/label>/g,text); 
							}
						}
						if(!key){
							
						}else{
							var num = -1;
							var rStr = new RegExp(key, "g");
							var rHtml = new RegExp("\<.*?\>","ig"); 
							var aHtml = sText.match(rHtml); 
							var sText = sText.replace(rHtml, '{~}'); 
							var sText = sText.replace(rStr,searchHtml); 
							var sText = sText.replace(/{~}/g,function(){  
								num++;
								return aHtml[num];
							});
						}
						jQuery(this).html(sText);
					}
				});
				var top_min=-1;
				var top_real;
				var label;
				var label_Parent;
				jQuery(".e8_querySelected").each(function (){
					label=this;
					top_real=label.offsetTop;
					while(label.offsetParent!=null){
						label_Parent = label.offsetParent;
						top_real+=label_Parent.offsetTop ;
						label=label_Parent;
					}
				//	console.log("top_real:"+top_real);
					if(top_min==-1){
						top_min=top_real;
					}
					if(top_min>top_real){
						top_min=top_real;
					}
				})
			//	console.log("top_min:"+top_min);
				
				if(top_min!=-1){
					window.scrollTo(0,top_min);
				}
			}
		}
	})();
})();

//@deprecated
function advancedSearchClick(e,$this,closed){
	__topTitleNamespace__.advancedSearchClick(e,$this,closed);
}

//@deprecated
function resizeAdvanceSearchDiv(){
	__topTitleNamespace__.resizeAdvanceSearchDiv();
}

//@deprecated
function closeAdvancedSearch(e,$document){
	__topTitleNamespace__.closeAdvancedSearch(e,$document);
}

//@deprecated
function bindCornerMenuEvent(topMenuTitle,_contentWindow,e,options){
	__topTitleNamespace__.bindCornerMenuEvent(topMenuTitle,_contentWindow,e,options);
}

//@deprecated
function getoverflowTabElement() {
	return __topTitleNamespace__.getoverflowTabElement();
}

//@deprecated
function highLightSearch(key){
	__topTitleNamespace__.highLightSearch(key);
}


jQuery(function () {
	jQuery("#advancedSearch").click(function (e) {
		__topTitleNamespace__.advancedSearchClick(e,this);
	});
	jQuery(".btn,.e8_btn,.e8_btn_submit").bind("mouseenter", function () {
		jQuery(this).addClass("e8_submit_btnHover");
	}).bind("mouseleave", function () {
		jQuery(this).removeClass("e8_submit_btnHover");
	}).bind("mousedown", function () {
		jQuery(this).addClass("submit_e8_btn_mousedown");
	}).bind("mouseup", function () {
		jQuery(this).removeClass("submit_e8_btn_mousedown");
	});
	
	jQuery(".e8_btn_cancel").bind("mouseenter", function () {
		jQuery(this).addClass("e8_btn_cancel_btnHover");
	}).bind("mouseleave", function () {
		jQuery(this).removeClass("e8_btn_cancel_btnHover");
	}).bind("mousedown", function () {
		jQuery(this).addClass("cancel_e8_btn_mousedown");
	}).bind("mouseup", function () {
		jQuery(this).removeClass("cancel_e8_btn_mousedown");
	});
	
	jQuery(".e8_btn_top").bind("mouseenter", function () {
		jQuery(this).addClass("e8_top_btnHover");
	}).bind("mouseleave", function () {
		jQuery(this).removeClass("e8_top_btnHover");
	}).bind("mousedown", function () {
		jQuery(this).addClass("top_e8_btn_mousedown");
	}).bind("mouseup", function () {
		jQuery(this).removeClass("top_e8_btn_mousedown");
	});
	
	
	jQuery("#advancedSearch").bind("mouseenter", function () {
		if(!jQuery(this).hasClass("click")){
			jQuery(this).children("span.e8_advanceSep").css("opacity","0")
				.css("filter","alpha(opacity = 0)").css("-moz-opacity","0");
		}
		var sis = jQuery(this).parent().find("span.searchInputSpan");
		sis.addClass("e8_sisbordernone");
		jQuery(this).addClass("btnHoverAdvance");
	}).bind("mouseleave", function () {
		if(!jQuery(this).hasClass("click")){
			jQuery(this).children("span.e8_advanceSep").css("opacity","1")
				.css("filter","alpha(opacity = 1)").css("-moz-opacity","1");
		}
		var sis = jQuery(this).parent().find("span.searchInputSpan");
		sis.removeClass("e8_sisbordernone");
		jQuery(this).removeClass("btnHoverAdvance");
	});
	
	

	/*jQuery("body").click(function(e){
		if(jQuery.browser.msie){
		}else{
			__topTitleNamespace__.closeAdvancedSearch(e);
		}
	});*/
	
});




(function (jQuery) {
	jQuery.fn.hoverBtn = function (options) {
		jQuery(this).hide();
		jQuery(this).addClass("hoverBtnSpan");
		jQuery(this).find("span").hover(function(){
			if(jQuery(this).hasClass("selectedTitle")==false){
				jQuery(this).toggleClass("rightMenuHover");
			}
		},function(){
			if(jQuery(this).hasClass("selectedTitle")==false){
				jQuery(this).toggleClass("rightMenuHover");
			}
		}).each(function(i){
			jQuery(this).css({ 
				"background-image": "url(/images/ecology8/top_icons/"+((i+1)%8)+"-1_wev8.png)"
			});
		});
		jQuery(this).find("span").click(function(){
			jQuery(".selectedTitle").removeClass("selectedTitle");
			jQuery(".rightMenuHover").removeClass("rightMenuHover");
			jQuery(this).addClass("selectedTitle");
		});
	};
})(jQuery);




(function (jQuery) {
	jQuery.fn.topMenuTitle = function (options) {
		var topMenuTitle=jQuery(this);
		topMenuTitle.addClass("topMenuTitle");
		topMenuTitle.attr("cellpadding","0");
		topMenuTitle.attr("cellspacing","0");
		topMenuTitle.find("*").addClass("middle");
//		topMenuTitle.find("input[type='button']").addClass("e8_btn_top");
		
		//右上角菜单
//		topMenuTitle.find(".cornerMenu").attr("src","/images/requestImages/3_wev8.gif");
//		topMenuTitle.find(".cornerMenu").html("&nbsp;");
		topMenuTitle.find(".cornerMenu").click(function(e){
			bindCornerMenuEvent(topMenuTitle,null,e);
			return false;
		});
		var searchFn=null;
		if(options!=null){
			searchFn=options.searchFn;
		}
		if(!searchFn){
			searchFn = highLightSearch;
		}
		var searchInputs=topMenuTitle.find(".searchInput");
		searchInputs.each(function(){
			if(!!searchFn){
				try{
					if(jQuery.browser.msie){
						var name = searchFn.toString().match(/^function\s*([^\s(]+)/)[1];
						jQuery(this).attr("_searchFn",name);
					}else{
						jQuery(this).attr("_searchFn",searchFn.name);
					}
					window.params = options.params;
				}catch(e){}
			}
			var params = options?options.params:{};
			jQuery(this).searchInput({searchFn:searchFn,params:params});
		});
		
		window.onscroll=function(){
			//topMenuTitle.css("top",jQuery(document).scrollTop());
		}
		
		//advance search btn
		var advanceBtn = jQuery("span#advancedSearch");
		if(advanceBtn.length>0){
			var html = advanceBtn.html();
			var spanLeft = jQuery("<span id='leftadvancespan' class='e8_advanceSep' style='float:left;left:0'>|</span>");
			var spanright = jQuery("<span id='rightadvancespan' class='e8_advanceSep' style='float:right;right:0'>|</span>");
			var spanmiddle = jQuery("<span>"+html+"</span>");
			advanceBtn.html("");
			//advanceBtn.append(spanLeft).append(spanmiddle).append(spanright);
			advanceBtn.append(spanmiddle);
			if(advanceBtn.parent().find("span.searchInputSpan").length==0){
				advanceBtn.addClass("advancedSearch_new");
			}
		}
		
		//advance search div
		if(jQuery("tr.e8_advanceTR").length==0){
			var tr = jQuery("#advancedSearchDiv table:first").find("td.btnTd").closest("tr");
			var insertTr = jQuery("<tr class='e8_advanceTR'><td class='field' colspan=8>&nbsp;</td></tr>")
			//tr.before(insertTr);
		}
		var advancedSearchDiv = jQuery("#advancedSearchDiv");
		advancedSearchDiv.wrap("<div id=\"advancedSearchOuterDiv\"></div>");
		try{
			advancedSearchDiv.parent().perfectScrollbar();
		}catch(e){}
		advancedSearchDiv.show();
		
		var advancedOuterDiv = jQuery("#advancedSearchOuterDiv");
		var shadowAdvanceDiv = jQuery("<div id=\"shadowAdvancedSearchOuterDiv\"></div>")
		jQuery(document.body).append(shadowAdvanceDiv);
		if(jQuery("#isdialog").val()=="1"){
			topMenuTitle.show();
		}else{
			topMenuTitle.hide();
		}
		topMenuTitle.attr("_formatDone",true);
	};
})(jQuery);



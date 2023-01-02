
/**
	 *	wuiform.init针对本页的功能来说无任何作用，纯粹用于解决兼容init.jsp中的JS/css冲突的问题
	**/
/*wuiform.init = function () {
	wuiform.textarea();
	wuiform.wuiBrowser();
	wuiform.select();
};*/

window.advanceSlideUp = false;

function advancedSearchClick(e,$this,closed){
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
			parentBtn.removeClass("click");
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
		parentBtn.removeClass("click");
		advancedSearchDiv.slideUp("fast");
		shadowDiv.hide();
	} else {
		parentBtn.children("span.e8_advanceSep").css("opacity","0")
				.css("filter","alpha(opacity = 0)").css("-moz-opacity","0");
		btnTd.parent().hide();
		advancedSearchBtn.addClass("click");
		parentBtn.addClass("click");
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
}

function resizeAdvanceSearchDiv(){
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
}

function closeAdvancedSearch(e,$document){
		if(!$document)$document = document;
		if(jQuery("#advancedSearch",$document).hasClass("click")){
			var evt = e ? e:(window.event?window.event:null);
			var focused = evt.srcElement ? evt.srcElement : evt.target;
			if(jQuery(focused).hasClass("e8_delClass"))return false;
			if(jQuery(focused,$document).hasClass("advancedSearch")==false && (jQuery("#advancedSearchOuterDiv",$document).has(focused).length==0)){
				advancedSearchClick(e,jQuery("#advancedSearch"),true)
			}	
		}
	}


jQuery(function () {
	jQuery("#advancedSearch").click(function (e) {
		advancedSearchClick(e,this);
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
	
	

	//jQuery("body").click(function(e){
	//	if(jQuery.browser.msie){
	//	}else{
	//		closeAdvancedSearch(e);
	//	}
	//});
	
});


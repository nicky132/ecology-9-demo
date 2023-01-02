String.prototype._fnaReplaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

function setWfMainAndDetailFieldSpanValueForPc(valueForSpan, fieldId, isDtl, _idx){
	if(isDtl=="1"){
		jQuery("#field"+fieldId+"_"+_idx+"span").html(valueForSpan);
		return;
	}else{
		jQuery("#field"+fieldId+"span").html(valueForSpan);
		return;
	}
}

function setWfMainAndDetailFieldSpanValueForMobile(valueForSpan, fieldId, isDtl, _idx){
	if(isDtl=="1"){
		jQuery("#field"+fieldId+"_"+_idx+"_span").html(valueForSpan);
		jQuery("#field"+fieldId+"_"+_idx+"_span_d").html(valueForSpan);
		return;
	}else{
		jQuery("#field"+fieldId+"_span").html(valueForSpan);
		return;
	}
}

function setWfMainAndDetailFieldValueForPc(valueForField, fieldId, isDtl, _idx){
	if(isDtl=="1"){
		jQuery("#disfield"+fieldId+"_"+_idx).val(valueForField);
		jQuery("#field"+fieldId+"_"+_idx).val(valueForField);
		return;
	}else{
		jQuery("#disfield"+fieldId).val(valueForField);
		jQuery("#field"+fieldId).val(valueForField);
		return;
	}
}

function setWfMainAndDetailFieldValueForMobile(valueForField, fieldId, isDtl, _idx){
	if(isDtl=="1"){
		jQuery("#disfield"+fieldId+"_"+_idx).val(valueForField);
		jQuery("#field"+fieldId+"_"+_idx).val(valueForField);
		return;
	}else{
		jQuery("#disfield"+fieldId).val(valueForField);
		jQuery("#field"+fieldId).val(valueForField);
		return;
	}
}

function getWfMainAndDetailFieldValueForPc(fieldId, isDtl, _idx){
	if(isDtl=="1"){
		var _obj = jQuery("#disfield"+fieldId+"_"+_idx);
		if(_obj.length){
			return _obj.val();
		}else{
			_obj = jQuery("#field"+fieldId+"_"+_idx);
			if(_obj.length){
				return _obj.val();
			}
		}
	}else{
		var _obj = jQuery("#disfield"+fieldId);
		if(_obj.length){
			return _obj.val();
		}else{
			_obj = jQuery("#field"+fieldId);
			if(_obj.length){
				return _obj.val();
			}
		}
	}
	return null;
}

function getWfMainAndDetailFieldValueForMobile(fieldId, isDtl, _idx){
	if(isDtl=="1"){
		var _obj = jQuery("#disfield"+fieldId+"_"+_idx);
		if(_obj.length){
			return _obj.val();
		}else{
			_obj = jQuery("#field"+fieldId+"_"+_idx);
			if(_obj.length){
				return _obj.val();
			}
		}
	}else{
		var _obj = jQuery("#disfield"+fieldId);
		if(_obj.length){
			return _obj.val();
		}else{
			_obj = jQuery("#field"+fieldId);
			if(_obj.length){
				return _obj.val();
			}
		}
	}
	return null;
}

function getWfMainAndDetailFieldIsshowIdForMobile(fieldId, isDtl, _idx){
	if(isDtl=="1"){
		var _obj = jQuery("#"+fieldId+_idx);
		if(_obj.length){
			return _obj.val();
		}
	}else{
		
	}
	return "";
}

function getWfMainAndDetailFieldSpanObjectForMobile(fieldId, isDtl, _idx){
	if(isDtl=="1"){
		var _obj = jQuery("#disfield"+fieldId+"_"+_idx+"_span");
		if(_obj.length){
			return _obj;
		}else{
			_obj = jQuery("#field"+fieldId+"_"+_idx+"_span");
			if(_obj.length){
				return _obj;
			}
		}
	}else{
		var _obj = jQuery("#disfield"+fieldId+"_span");
		if(_obj.length){
			return _obj;
		}else{
			_obj = jQuery("#field"+fieldId+"_span");
			if(_obj.length){
				return _obj;
			}
		}
	}
	return null;
}

function getFnaSameValueCount(checkValArray, compareValue){
	var _count = 0;
	if(checkValArray){
		for(var i=0;i<checkValArray.length;i++){
			var _val = checkValArray[i];
			if(_val==compareValue){
				_count++;
			}
		}
	}
	return _count;
}

function getFnaOnlyNotEmptyValue(checkValArray){
	var _value = "";
	if(getFnaNotEmptyCount(checkValArray)==1){
		if(checkValArray){
			for(var i=0;i<checkValArray.length;i++){
				var _val = checkValArray[i];
				if(_val!=null&&_val!=""){
					_value = _val;
					break;
				}
			}
		}
	}
	return _value;
}

function getFnaNotEmptyCount(checkValArray){
	var _count = 0;
	if(checkValArray){
		for(var i=0;i<checkValArray.length;i++){
			var _val = checkValArray[i];
			if(_val!=null&&_val!=""){
				_count++;
			}
		}
	}
	return _count;
}

function doFnaEncryptRsa1(str, key1, key2, key3, publicKeyExponent, publicKeyModulus){
	var desStr = strEnc(str,key1,key2,key3);
	RSAUtils.setMaxDigits(200);
	var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
	return RSAUtils.encryptedString(key,desStr);
}
function _fnaOpenFullWindow(url){
	var redirectUrl = url ;
	var width = screen.availWidth-10 ;
	var height = screen.availHeight-50 ;
	var szFeatures = "top=0," ;
	szFeatures +="left=0," ;
	szFeatures +="width="+width+"," ;
	szFeatures +="height="+height+"," ;
	szFeatures +="directories=no," ;
	szFeatures +="status=yes,toolbar=no,location=no," ;
	szFeatures +="menubar=no," ;
	szFeatures +="scrollbars=yes," ;
	szFeatures +="resizable=yes" ;
	window.open(redirectUrl,"",szFeatures) ;
}
function setFieldValue4Mobile(fieldId, value, showVal, rowId, ifNeedHide){
	if(ifNeedHide == null){
		ifNeedHide = false;
	}
	var _isShowId = jQuery("#"+fieldId+rowId).val();
	jQuery("#"+_isShowId).html(showVal);
	jQuery("#field"+fieldId+"_"+rowId).attr("value",value);
	if(ifNeedHide){
		if(jQuery("#field"+fieldId+"_"+rowId+"_d").length){
			if(jQuery("#field"+fieldId+"_"+rowId+"_span_d").length){
				
			}else{
				jQuery("#field"+fieldId+"_"+rowId+"_d").parent().append("<span id='field"+fieldId+"_"+rowId+"_span_d' name='field"+fieldId+"_"+rowId+"_span_d'></span>");
			}
			jQuery("#field"+fieldId+"_"+rowId+"_span_d").html(showVal);
			jQuery("#field"+fieldId+"_"+rowId+"_d").hide();
		}
	}else{
		jQuery("#field"+fieldId+"_"+rowId+"_d").attr("value",value);
	}
	jQuery("#field"+fieldId+"_"+rowId+"_span").html(showVal);
}
function extGrid_onresize(_ext_grid, _ext_gen8){
	try{
		if(_ext_grid!=null && _ext_gen8!=null){
			_ext_grid.setWidth(0);
			_ext_grid.setWidth(_ext_gen8.getComputedWidth());
			_ext_grid.setHeight(0);
			_ext_grid.setHeight(_ext_gen8.getComputedHeight());
		}
	}catch(ex1){}
}

function setExtGridColumnWidth(grid, colIdx){
	try{
		var cm = grid.getColumnModel();
		if(cm!=null && cm.getColumnCount()>=(colIdx+1)){
			var _col_id = cm.getColumnId(colIdx);
			var _col_obj = cm.getColumnById(_col_id);
			var _col_obj_idx = cm.getIndexById(_col_id);
			cm.setColumnWidth(_col_obj_idx, _col_obj.width);
		}
	}catch(ex1){}
}

function changeDate(obj,id,val){
	if(val==null)val='6';
	if(obj.value==val){
		jQuery("#"+id).show();
	}else{
		jQuery("#"+id).hide();
		jQuery("#"+id).siblings("input[type='hidden']").val("");
		jQuery("#"+id).children("input[type='hidden']").val("");
		jQuery("#"+id).children("span").html("");
	}
}
function GetRandomNum(Min,Max){   
	var Range = Max - Min;
	var Rand = Math.random();
	return(Min + Math.round(Rand * Range));
}
var diag = null;
function closeDialog(){
	if(diag)diag.close();
}
function _fnaOpenDialog(_url, _title, _w, _h){
	diag = new window.top.Dialog();
	diag.currentWindow = window;
	diag.URL = _url;
	diag.Title = _title;
	diag.Width = _w;
	diag.Height = _h;
	
	diag.isIframe=false;
	
	diag.show();
}
//获取全屏遮罩对象
var docEle_FnaBudgetViewInner1 = function(){ 
    return top.document.getElementById(arguments[0]) || false; 
}
//打开全屏遮罩 
function openNewDiv_FnaBudgetViewInner1(customeLabel){ 
	try{
		if(customeLabel==null||customeLabel==""){
			customeLabel = "loading.......";
		}
	    closeNewDiv_FnaBudgetViewInner1();
	    //e8showAjaxTips("",false);
	    //e8showAjaxTips(customeLabel,true,"xTable_message");//
	    
	    //mask遮罩层 
	    var newMask = top.document.createElement("div"); 
	    var m = "mask_FnaBudgetViewInner1"; 
	    newMask.id = m; 
	    newMask.style.position = "absolute"; 
	    newMask.style.zIndex = "100001"; 
	    var _scrollWidth = Math.max(top.document.body.scrollWidth,top.document.documentElement.scrollWidth); 
	    var _scrollHeight = Math.max(top.document.body.scrollHeight,top.document.documentElement.scrollHeight); 
	    newMask.style.width = (_scrollWidth-20) + "px"; 
	    newMask.style.height = (_scrollHeight-20) + "px"; 
	    newMask.style.top = "0px"; 
	    newMask.style.left = "0px"; 
	    newMask.style.background = "#e8e8e8"; 
	    newMask.style.filter = "alpha(opacity=0)"; 
	    newMask.style.opacity = "0.00"; 
	    
	    top.document.body.appendChild(newMask); //476 hf238
	    
	    var _divHtmlStr = "";
	    if(true){
		    _divHtmlStr = "<div id='mask_FnaBudgetViewInner1_info' align='center' "+
			    " style='border:1px solid #e1e1e1;padding:9px!important;background:#FFF;" +
			    "position:fixed!important;position:absolute;z-index: 100003;" +
			    "margin-top:-60px!important;top:50%;top:450px;left:50%;margin-left:-145px!important;" +
			    "font-size:12px!important;" +
			    "'>"+
			    "<div id='mask_FnaBudgetViewInner1_infoDiv' style='font-size:12px!important;color: #ff0000!important;'></div>"+
			    "<img src='/images/ecology8/onload_wev8.gif'/ style='padding-left:5px!important;padding-right:10px!important;'>"+
			    customeLabel+
		    "<div>";
	    }else{
	    	_divHtmlStr = "<div id=\"mask_FnaBudgetViewInner1_info\" class=\"xTable_message\" "+
	    		" style=\"font-size:12px!important;left:50%!important;margin-left:-150px!important;top:50%!important;margin-top:-60px!important;"+
	    		"z-index:100003;position:fixed!important;position:absolute;"+
	    		"border:1px solid #e1e1e1;background:white;padding:9px!important;"+
	    		"background-image:url(/images/ecology8/onload_wev8.gif)!important;"+
	    		"background-position:15px 50%!important;"+
	    		"background-repeat:no-repeat!important;" +
	    		"padding-left:48px!important;" +
	    		"\">"+
			    "<div id='mask_FnaBudgetViewInner1_infoDiv' style=\"font-size:12px!important;\"></div>"+
	    		customeLabel+
	    		"</div>";
	    }

	    top.document.body.appendChild(jQuery(_divHtmlStr)[0]); 
	}catch(ex1){
		alert(ex1.message);
	}
} 
//关闭全屏遮罩
function closeNewDiv_FnaBudgetViewInner1(){
    var m = "mask_FnaBudgetViewInner1";
    var _mObj = docEle_FnaBudgetViewInner1(m);
    if (_mObj) {
    	top.document.body.removeChild(_mObj); 
    }
    m = "mask_FnaBudgetViewInner1_info";
    _mObj = docEle_FnaBudgetViewInner1(m);
    if (_mObj) {
    	top.document.body.removeChild(_mObj); 
    }
    //e8showAjaxTips("",false);
}

jQuery(document).ready(function () {
	try{jQuery("#topTitle").topMenuTitle({searchFn:onBtnSearchClick});}catch(ex1){}
	try{jQuery(".topMenuTitle td:eq(0)").html(jQuery("#tabDiv").html());}catch(ex1){}
	try{jQuery("#tabDiv").remove();}catch(ex1){}
});

function renderingTzCheckbox(_objJq){
	if(_objJq!=null){
		_objJq.tzCheckbox({"labels":['','']});
	}else{
		jQuery("input[type=checkbox]").each(function(){
			if(jQuery(this).attr("tzCheckbox")=="true"){
				jQuery(this).tzCheckbox({"labels":['','']});
			}
		});
	}
}

jQuery(".searchImg").bind("click",function(){
	try{onBtnSearchClick();}catch(ex1){}
});


function refreshTab(){
	jQuery('.flowMenusTd',parent.document).toggle();
	jQuery('.leftTypeSearch',parent.document).toggle();
} 

function URLencode(sStr) {
	return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
}

function null2String(s){
	if(!s){
		return "";
	}
	return s;
}

function showRightMenuIframe(){
	jQuery("#rightMenuIframe").show();
}

function hideRightMenuIframe(){
	jQuery("#rightMenuIframe").hide();
}

function fnaRound2(v,e){
	if(v==null||v==""||isNaN(v)){
		v = 0.00;
	}
	return fnaRound(v,e);
}

function fnaRound(v,e){
	var t=1; 
	for(;e>0;t*=10,e--); 
	for(;e<0;t/=10,e++); 
	return Math.round(v*t)/t; 
}

/**  
 * 格式化数字显示方式   
 * 用法  
 * formatNumber(12345.999,'#,##0.00');  
 * formatNumber(12345.999,'#,##0.##');
 * formatNumber(123,'000000');  
 * @param num  
 * @param pattern  
 */  
function formatNumber(num,pattern){   
  var strarr = num?num.toString().split('.'):['0'];   
  var fmtarr = pattern?pattern.split('.'):[''];   
  var retstr='';   
  
  // 整数部分   
  var str = strarr[0];   
  var fmt = fmtarr[0];   
  var i = str.length-1;     
  var comma = false;   
  for(var f=fmt.length-1;f>=0;f--){   
    switch(fmt.substr(f,1)){   
      case '#':   
        if(i>=0 ) retstr = str.substr(i--,1) + retstr;   
        break;   
      case '0':   
        if(i>=0) retstr = str.substr(i--,1) + retstr;   
        else retstr = '0' + retstr;   
        break;   
      case ',':   
        comma = true;   
        retstr=','+retstr;   
        break;   
    }   
  }   
  if(i>=0){   
    if(comma){   
      var l = str.length;   
      for(;i>=0;i--){   
        retstr = str.substr(i,1) + retstr;   
        if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;    
      }   
    }   
    else retstr = str.substr(0,i+1) + retstr;   
  }   
  
  retstr = retstr+'.';   
  // 处理小数部分   
  str=strarr.length>1?strarr[1]:'';   
  fmt=fmtarr.length>1?fmtarr[1]:'';   
  i=0;   
  for(var f=0;f<fmt.length;f++){   
    switch(fmt.substr(f,1)){   
      case '#':   
        if(i<str.length) retstr+=str.substr(i++,1);   
        break;   
      case '0':   
        if(i<str.length) retstr+= str.substr(i++,1);   
        else retstr+='0';   
        break;   
    }   
  }   
  return retstr.replace(/^,+/,'').replace(/\.$/,'');   
}

function uescape(url){
    return escape(url);
}

function onShowBrowser_FnaSubmitRequestJs(id,url,linkurl,type1,ismand) {
	var funFlag = "";
	var id1 = null;
	
    if (type1 == 9  && false) {
        if (wuiUtil.isNotNull(funFlag) && funFlag == 3) {
        	url = "/systeminfo/BrowserMain.jsp?url=/docs/docs/DocBrowser.jsp"
        } else {
	    	url = "/systeminfo/BrowserMain.jsp?url=/docs/docs/DocBrowserWord.jsp";
        }
	}

    spanname = "field" + id + "span";
    inputname = "field" + id;
	if (type1 == 2 || type1 == 19 ) {
		if (type1 == 2) {
			onWorkFlowShowDate(spanname,inputname,ismand);
		} else {
			onWorkFlowShowTime(spanname, inputname, ismand);
		}
	} else {
	    if (type1 != 162 && type1 != 171 && type1 != 152 && type1 != 142 && type1 != 135 && type1 != 17 && type1 != 18 && type1!=27 && type1!=37 && type1!=56 && type1!=57 && type1!=65 && type1!=165 && type1!=166 && type1!=167 && type1!=168 && type1!=4 && type1!=167 && type1!=164 && type1!=169 && type1!=170 && type1!=194) {
			id1 = window.showModalDialog(url, "", "dialogWidth=550px;dialogHeight=550px");
		} else {
	        if (type1 == 135) {
				tmpids = $GetEle("field"+id).value;
				id1 = window.showModalDialog(url + "?projectids=" + tmpids, "", "dialogWidth=550px;dialogHeight=550px");
	        } else if (type1 == 4 || type1 == 164 || type1 == 169 || type1 == 170 || type1 == 194) {
		        tmpids = $GetEle("field"+id).value;
				id1 = window.showModalDialog(url + "?selectedids=" + tmpids, "", "dialogWidth=550px;dialogHeight=550px");
	        } else if (type1 == 37) {
		        tmpids = $GetEle("field"+id).value;
				id1 = window.showModalDialog(url + "?documentids=" + tmpids, "", "dialogWidth=550px;dialogHeight=550px");
	        } else if (type1 == 142 ) {
		        tmpids = $GetEle("field"+id).value;
				id1 = window.showModalDialog(url + "?receiveUnitIds=" + tmpids, "", "dialogWidth=550px;dialogHeight=550px");
			} else if (type1 == 162 ) {
				tmpids = $GetEle("field"+id).value;

				if (wuiUtil.isNotNull(funFlag) && funFlag == 3) {
					url = url + "&beanids=" + tmpids;
					url = url.substring(0, url.indexOf("url=") + 4) + escape(url.substr(url.indexOf("url=") + 4));
					id1 = window.showModalDialog(url, "", "dialogWidth=550px;dialogHeight=550px");
				} else {
					url = url + "|" + id + "&beanids=" + tmpids;
					url = url.substring(0, url.indexOf("url=") + 4) + escape(url.substr(url.indexOf("url=") + 4));
					id1 = window.showModalDialog(url, window, "dialogWidth=550px;dialogHeight=550px");
				}
			} else if (type1 == 165 || type1 == 166 || type1 == 167 || type1 == 168 ) {
		        index = (id + "").indexOf("_");
		        if (index != -1) {
		        	tmpids=uescape("?isdetail=1&isbill=1&fieldid=" + id.substring(0, index) + "&resourceids=" + $GetEle("field"+id).value);
		        	id1 = window.showModalDialog(url + tmpids, "", "dialogWidth=550px;dialogHeight=550px");
		        } else {
		        	tmpids = uescape("?fieldid=" + id + "&isbill=1&resourceids=" + $GetEle("field" + id).value);
		        	id1 = window.showModalDialog(url + tmpids, "", "dialogWidth=550px;dialogHeight=550px");
		        }
			} else {
		        tmpids = $GetEle("field" + id).value;
				id1 = window.showModalDialog(url + "?resourceids=" + tmpids, "", "dialogWidth=550px;dialogHeight=550px");
			}
		}
		
	    if (id1 != undefined && id1 != null) {
			if (type1 == 171 || type1 == 152 || type1 == 142 || type1 == 135 || type1 == 17 || type1 == 18 || type1==27 || type1==37 || type1==56 || type1==57 || type1==65 || type1==166 || type1==168 || type1==170 || type1==194) {
				if (wuiUtil.getJsonValueByIndex(id1, 0) != "" && wuiUtil.getJsonValueByIndex(id1, 0) != "0" ) {
					var resourceids = wuiUtil.getJsonValueByIndex(id1, 0);
					var resourcename = wuiUtil.getJsonValueByIndex(id1, 1);
					var sHtml = ""

					resourceids = resourceids.substr(1);
					resourcename = resourcename.substr(1);

					$GetEle("field"+id).value= resourceids
					
					var tlinkurl = linkurl;
					var resourceIdArray = resourceids.split(",");
					var resourceNameArray = resourcename.split(",");
					for (var _i=0; _i<resourceIdArray.length; _i++) {
						var curid = resourceIdArray[_i];
						var curname = resourceNameArray[_i];

						if (tlinkurl == "/hrm/resource/HrmResource.jsp?id=") {
							sHtml += "<a href=javaScript:openhrm(" + curid + "); onclick='pointerXY(event);'>" + curname + "</a>&nbsp";
						} else {
							sHtml += "<a href=" + tlinkurl + curid + " target=_new>" + curname + "</a>&nbsp";
						}
					}
					
					$GetEle("field"+id+"span").innerHTML = sHtml;
					$GetEle("field"+id).value= resourceids;
				} else {
 					if (ismand == 0) {
 						$GetEle("field"+id+"span").innerHTML = "";
 					} else {
 						$GetEle("field"+id+"span").innerHTML = "<img src='/images/BacoError_wev8.gif' align=absmiddle>";
 					}
 					$GetEle("field"+id).value = "";
				}

			} else {
			   if (wuiUtil.getJsonValueByIndex(id1, 0) != "" && wuiUtil.getJsonValueByIndex(id1, 0) != "0" ) {
	               if (type1 == 162) {
				   		var ids = wuiUtil.getJsonValueByIndex(id1, 0);
						var names = wuiUtil.getJsonValueByIndex(id1, 1);
						var descs = wuiUtil.getJsonValueByIndex(id1, 2);
						sHtml = ""
						ids = ids.substr(1);
						$GetEle("field"+id).value= ids;
						
						names = names.substr(1);
						descs = descs.substr(1);
						var idArray = ids.split(",");
						var nameArray = names.split(",");
						var descArray = descs.split(",");
						for (var _i=0; _i<idArray.length; _i++) {
							var curid = idArray[_i];
							var curname = nameArray[_i];
							var curdesc = descArray[_i];
							sHtml += "<a title='" + curdesc + "' >" + curname + "</a>&nbsp";
						}
						
						$GetEle("field" + id + "span").innerHTML = sHtml;
						return;
	               }
				   if (type1 == 161) {
					   	var ids = wuiUtil.getJsonValueByIndex(id1, 0);
					   	var names = wuiUtil.getJsonValueByIndex(id1, 1);
						var descs = wuiUtil.getJsonValueByIndex(id1, 2);
						$GetEle("field"+id).value = ids;
						sHtml = "<a title='" + descs + "'>" + names + "</a>&nbsp";
						$GetEle("field" + id + "span").innerHTML = sHtml;
						return ;
				   }

				   if (type1 == 16) {
					   curid = wuiUtil.getJsonValueByIndex(id1, 0);
                   	   linkno = getWFLinknum("slink" + id + "_rq" + curid);
	                   if (linkno>0) {
	                       curid = curid + "&wflinkno=" + linkno;
	                   } else {
	                       linkurl = linkurl.substring(0, linkurl.indexOf("?") + 1) + "requestid=";
	                   }
	                   $GetEle("field"+id).value = wuiUtil.getJsonValueByIndex(id1, 0);
					   if (linkurl == "/hrm/resource/HrmResource.jsp?id=") {
						   $GetEle("field"+id+"span").innerHTML = "<a href=javaScript:openhrm(" + curid + "); onclick='pointerXY(e);'>" + wuiUtil.getJsonValueByIndex(id1, 1)+ "</a>&nbsp";
					   } else {
	                       $GetEle("field"+id+"span").innerHTML = "<a href=" + linkurl + curid + " target='_new'>" + wuiUtil.getJsonValueByIndex(id1, 1) + "</a>";
					   }
	                   return;
				   }
				   
	               if (type1 == 9 && false) {
		                tempid = wuiUtil.getJsonValueByIndex(id1, 0);
		                $GetEle("field" + id + "span").innerHTML = "<a href='#' onclick=\"createDoc(" + id + ", " + tempid + ", 1)\">" + wuiUtil.getJsonValueByIndex(id1, 1) + "</a><button type=\"button\" id=\"createdoc\" style=\"display:none\" class=\"AddDocFlow\" onclick=\"createDoc(" + id + ", " + tempid + ",1)\"></button>";
	               } else {
	            	    if (linkurl == "") {
				        	$GetEle("field" + id + "span").innerHTML = wuiUtil.getJsonValueByIndex(id1, 1);
				        } else {
							if (linkurl == "/hrm/resource/HrmResource.jsp?id=") {
								$GetEle("field"+id+"span").innerHTML = "<a href=javaScript:openhrm("+ wuiUtil.getJsonValueByIndex(id1, 0) + "); onclick='pointerXY(event);'>" + wuiUtil.getJsonValueByIndex(id1, 1) + "</a>&nbsp";
							} else {
								$GetEle("field"+id+"span").innerHTML = "<a href=" + linkurl + wuiUtil.getJsonValueByIndex(id1, 0) + " target='_new'>"+ wuiUtil.getJsonValueByIndex(id1, 1) + "</a>";
							}
				        }
	               }
	               $GetEle("field"+id).value = wuiUtil.getJsonValueByIndex(id1, 0);
	                if (type1 == 9 && false) {
	                	var evt = getEvent();
	               		var targetElement = evt.srcElement ? evt.srcElement : evt.target;
	               		jQuery(targetElement).next("span[id=CreateNewDoc]").html("");
	                }
			   } else {
					if (ismand == 0) {
						$GetEle("field"+id+"span").innerHTML = "";
					} else {
						$GetEle("field"+id+"span").innerHTML ="<img src='/images/BacoError_wev8.gif' align=absmiddle>"
					}
					$GetEle("field"+id).value="";
					if (type1 == 9 && false){
						var evt = getEvent();
	               		var targetElement = evt.srcElement ? evt.srcElement : evt.target;
	               		jQuery(targetElement).next("span[id=CreateNewDoc]").html("<button type=button id='createdoc' class=AddDocFlow onclick=createDoc(" + id + ",'','1') title='新建'>新建</button>");
					}
			   }
			}
		}
	}
}


var dbByteLength = 2;
/*
 * 限制输入时，只允许输入指定类型的数字，内含绑定传入控件的以下事件：onkeypress、onkeyup、onmouseout、onblur
 * */
function controlNumberCheck(obj, isDouble, pointLength, allowNegative, maxlength){
	Event.observe(obj.id, "keypress", function(){numberCheck(obj, isDouble, pointLength, allowNegative, maxlength)}, false);
	Event.observe(obj.id, "keyup", function(){numberCheck2(obj, isDouble, pointLength, allowNegative, maxlength)}, false);
	Event.observe(obj.id, "mouseout", function(){numberCheck2(obj, isDouble, pointLength, allowNegative, maxlength)}, false);
	Event.observe(obj.id, "blur", function(){numberCheck2(obj, isDouble, pointLength, allowNegative, maxlength)}, false);
}
function controlNumberCheck_jQuery(id, isDouble, pointLength, allowNegative, maxlength){
	$("#"+id).bind("keypress", function(){numberCheck(document.getElementById(id), isDouble, pointLength, allowNegative, maxlength)});
	$("#"+id).bind("keyup", function(){numberCheck2(document.getElementById(id), isDouble, pointLength, allowNegative, maxlength)});
	$("#"+id).bind("mouseout", function(){numberCheck2(document.getElementById(id), isDouble, pointLength, allowNegative, maxlength)});
	$("#"+id).bind("blur", function(){numberCheck2(document.getElementById(id), isDouble, pointLength, allowNegative, maxlength)});
}
/*限制输入时，只允许输入指定类型的数字
 * onkeypress*/
function numberCheck(obj, isDouble, pointLength, allowNegative, maxlength){
	var s=document.selection.createRange();
	s.setEndPoint("StartToStart",obj.createTextRange());
	var key = event.keyCode;
	if ((key < 48 || key > 57) && key != 45 && key != 46 && key != 8 && key != 46) {
		event.keyCode='';
		return false;
	}else{
		if(document.selection.createRange().text == obj.value){
			obj.value = '';
		}
		if(key == 45 && !allowNegative){
			event.keyCode='';
			return false;
		}
		var objs = obj.value.split('-');
		if(key == 45 && allowNegative && objs.length > 1){
			event.keyCode='';
			return false;
		}
		if(key == 45 && allowNegative && obj.value.length > 0 && s.text.length > 0){
			event.keyCode='';
			return false;
		}
		if(key == 46 && !isDouble){
			event.keyCode='';
			return false;
		}
		objs = obj.value.split('.');
		if(key == 46 && objs.length > 1){
			event.keyCode='';
			return false;
		}
		if(objs.length > 1 && objs[1].length == pointLength){
			if(obj.value.length-s.text.length <= pointLength){
				event.keyCode='';
				return false;
			}
		}
		var pcz = 0;
		if(objs[0].split('')[0] == '-'){
			pcz+=1;
		}
		if(key != 45 && key != 46 && objs.length > 1 && obj.value.length-s.text.length > pointLength && objs[0].length >= maxlength+pcz){
			event.keyCode='';
			return false;
		}
		if(key != 45 && key != 46 && objs.length == 1 && objs[0].length >= maxlength+pcz){
			event.keyCode='';
			return false;
		}
		return true;
	}
}
/*输入后，限制输入的值，只允许输入指定类型的数字
 * onkeyup&&onmouseout
 * onblur*/
function numberCheck2(obj, isDouble, pointLength, allowNegative, maxlength){
	if(obj.value != ''){
		if(!(allowNegative && obj.value == '-')){
			if (isNaN(obj.value)) {
				obj.value = '';
				return false;
			}
			if(!allowNegative && obj.value.substr(0, 1) == '-'){
				obj.value = '';
				return false;
			}
			var objs = obj.value.split('.');
			var pcz = 0;
			if(objs[0].split('')[0] == '-'){
				pcz+=1;
			}
			if(objs[0].length > maxlength+pcz){
				obj.value = '';
				return false;
			}
			if(isDouble && objs.length > 1 && objs[1].length > pointLength){
				obj.value = '';
				return false;
			}
			if(!isDouble && objs.length > 1){
				obj.value = '';
				return false;
			}
		}else{
			
		}
	}
}
/*如果对象的.value非数字则.value=空字符串;*/
function checkNum2(obj){
	if (isNaN(obj.value)) {
		obj.value = '';
	}
}
/*输入后，只允许保留定长的字符，双字节转换长度通过参数doubleByteLength控置
 * onkeyup&&onmouseout
 * onblur*/
function controlLengthCheck(obj, maxlength, doubleByteLength){
	Event.observe(obj.id, "keyup", function(){lengthCheck(obj, maxlength, doubleByteLength)}, false);
	Event.observe(obj.id, "mouseout", function(){lengthCheck(obj, maxlength, doubleByteLength)}, false);
	Event.observe(obj.id, "blur", function(){lengthCheck(obj, maxlength, doubleByteLength)}, false);
}
function controlLengthCheck_jQuery(id, maxlength, doubleByteLength){
	$("#"+id).bind("keyup", function(){lengthCheck(obj, maxlength, doubleByteLength)});
	$("#"+id).bind("mouseout", function(){lengthCheck(obj, maxlength, doubleByteLength)});
	$("#"+id).bind("blur", function(){lengthCheck(obj, maxlength, doubleByteLength)});
}
/*输入后，只允许保留定长的字符，双字节转换长度通过参数doubleByteLength控置
 * onkeyup&&onmouseout
 * onblur*/
function lengthCheck(obj, maxlength, doubleByteLength){
	if(doubleByteLength == null){
		doubleByteLength = dbByteLength;
	}
	var curlen = 0;
	for(i=0;i<obj.value.length;i++) {
		if(obj.value.charCodeAt(i)>256){
			curlen += doubleByteLength;
		}else{
			 curlen++;
		}
		if(curlen > maxlength){
			obj.value = obj.value.substr(0, i);
			break;
		}
	}
}
/*检查是否只包含charStrs中的字符*/
function checkAppointChar(obj,charStrs){
	var values = obj.value.split('');
	var charStrs = charStrs.split('');
	for(i=0;i<values.length;i++) {
		for(j=0;j<charStrs.length;j++) {
			if(values[i] == charStrs[j]){
				break;
			}
		}
		if(j == charStrs.length){
			return false;
		}
	}
	return true;
}
/*检查是否为Email Address*/
function chkEmail(emailStr) {
	return emailStr.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
}
/*检查是否为电话号码*/
function chkTel(telStr) {
//	return telStr.match(/^(\(\d{3}\)|\d{3}-)?\d{8}$/);
	var i, j, strTemp;
	strTemp = "0123456789-()# ";
	for (i = 0; i < telStr.length; i++) {
		j = strTemp.indexOf(telStr.charAt(i));
		if (j == -1) {
			return false;
		}
	}
	return true;
}
/* 获得Byte长度，双字节转换长度通过参数doubleByteLength控置 */
function getByteLength(obj, doubleByteLength){
	var curlen = 0;
	for(i=0;i<obj.value.length;i++) {
		if(obj.value.charCodeAt(i)>256){
			curlen += doubleByteLength;
		}else{
			curlen++;
		}
	}
	return curlen;
}
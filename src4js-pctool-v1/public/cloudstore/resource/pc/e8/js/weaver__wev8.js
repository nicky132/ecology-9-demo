
// 说明：给 Javascript 数组添加一个 indexOf 方法
[].indexOf || (Array.prototype.indexOf = function(v){
     for(var i = this.length; i-- && this[i] !== v;);
     return i;
     }); 
// 取消check框后面跟随的红色惊叹号
function checkboxCheck(elementname,spanid){
    try{
	    if(elementname.checked){
	        elementname.value="1";
	        spanid.innerHTML='';
	    }else{
	        elementname.value="";
	        var viewtype = jQuery("input[name='"+elementname.name+"']").attr("viewtype");
	        if(viewtype==1){
	            spanid.innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
	        }else{
	            spanid.innerHTML='';
	        }
	    }
    }catch(e){
    }
}
// 取消输入框后面跟随的红色惊叹号
function checkinpute8(obj,spanid){
    var tmpvalue = obj.value;
    //alert(tmpvalue)
    while(tmpvalue.indexOf(" ") >= 0){
        tmpvalue = tmpvalue.replace(" ", "");
    }
    if(tmpvalue != ""){
        while(tmpvalue.indexOf("\r\n") >= 0){
            tmpvalue = tmpvalue.replace("\r\n", "");
        }
        if(tmpvalue != ""){
            $(obj).siblings("#"+spanid).html("");
        }else{
            $(obj).siblings("#"+spanid).html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
        }
    }else{
        $(obj).siblings("#"+spanid).html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
    }
}
// 取消输入框后面跟随的红色惊叹号
function checkinput(elementname,spanid){
    var tmpvalue = $GetEle(elementname).value;
    // 处理$GetEle可能找不到对象时的情况，通过id查找对象
    if(tmpvalue==undefined)
        tmpvalue=document.getElementById(elementname).value;

    while(tmpvalue.indexOf(" ") >= 0){
        tmpvalue = tmpvalue.replace(" ", "");
    }
    if(tmpvalue != ""){
        while(tmpvalue.indexOf("\r\n") >= 0){
            tmpvalue = tmpvalue.replace("\r\n", "");
        }
        if(tmpvalue != ""){
            $GetEle(spanid).innerHTML = "";
        }else{
            $GetEle(spanid).innerHTML = "<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
            //$GetEle(elementname).value = "";
        }
    }else{
        $GetEle(spanid).innerHTML = "<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
        //$GetEle(elementname).value = "";
    }
}

//取消输入框后面跟随的红色惊叹号
function checkinput4order(elementname,spanid){
    checknumber(elementname);
    var tmpvalue = $GetEle(elementname).value;
    // 处理$GetEle可能找不到对象时的情况，通过id查找对象
    if(tmpvalue==undefined)
        tmpvalue=document.getElementById(elementname).value;
    
    while(tmpvalue.indexOf(" ") >= 0){
        tmpvalue = tmpvalue.replace(" ", "");
    }
    if(tmpvalue != ""){
        while(tmpvalue.indexOf("\r\n") >= 0){
            tmpvalue = tmpvalue.replace("\r\n", "");
        }
        if(tmpvalue != ""){
            $GetEle(spanid).innerHTML = "";
        }else{
            $GetEle(spanid).innerHTML = "<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
            //$GetEle(elementname).value = "";
        }
    }else{
        $GetEle(spanid).innerHTML = "<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
        //$GetEle(elementname).value = "";
    }
}

// 判断email格式是否正确
// modified by lupeng 2004.06.04.
function checkinput_email(elementname,spanid){
    emailStr = $GetEle(elementname).value;
    emailStr = emailStr.replace(" ","");
    if (emailStr == "" || !checkEmail(emailStr)) {
        $GetEle(spanid).innerHTML = "<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
        $GetEle(elementname).value = "";
    } else
        $GetEle(spanid).innerHTML = "";
}
// added by xwj 2004.06.04.
function checkinput_email_only(elementname,spanid,flag){
    if(flag){
      checkinput_email(elementname,spanid);
    }
    else{
     var emailStr = $GetEle(elementname).value;
     emailStr = emailStr.replace(" ","");
     if(!checkEmail(emailStr)){
        $GetEle(spanid).innerHTML = "";
        $GetEle(elementname).value = "";
     }
    }
}
function reshowCheckBox()
{
    jQuery("input[type=checkbox]").each(function(){
        if(jQuery(this).attr("tzCheckbox")=="true"){
            jQuery(this).tzCheckbox({labels:['','']});
        }
    });
}
/**
 * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com), Added by lupeng
 * 2004.06.04.
 */
function checkEmail(emailStr) { 
   if (emailStr.length == 0) {
       return true;
   }
   var emailPat=/^(.+)@(.+)$/;
   var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
   var validChars="\[^\\s" + specialChars + "\]";
   var quotedUser="(\"[^\"]*\")";
   var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
   var atom=validChars + '+';
   var word="(" + atom + "|" + quotedUser + ")";
   var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
   var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
   var matchArray=emailStr.match(emailPat);
   if (matchArray == null) {
       return false;
   }
   var user=matchArray[1];
   var domain=matchArray[2];
   if (user.match(userPat) == null) {
       return false;
   }
   var IPArray = domain.match(ipDomainPat);
   if (IPArray != null) {
       for (var i = 1; i <= 4; i++) {
          if (IPArray[i] > 255) {
             return false;
          }
       }
       return true;
   }
   var domainArray=domain.match(domainPat);
   if (domainArray == null) {
       return false;
   }
   var atomPat=new RegExp(atom,"g");
   var domArr=domain.match(atomPat);
   var len=domArr.length;
   if ((domArr[domArr.length-1].length < 0) ||
       (domArr[domArr.length-1].length > 50)) {
       return false;
   }
   if (len < 2) {
       return false;
   }
   return true;
}

// ------------- added by xwj for td3131 数字金额小写转大写 20051115-----------*/
function numberChangeToChinese(num) {
    //HTML模式下明细字段在加载页面时候会首先执行一次该方法，如果为null和空字符串则会显示成 零元整
    if(num === ""){
        return "";
    }
    
    var prefh="";
    if(!isNaN(num)){
        if(num<0){
            prefh="负";
            num=Math.abs(num);
        }
    }
    if (isNaN(num) || num > Math.pow(10, 12)) return "";
    var cn = "零壹贰叁肆伍陆柒捌玖";
    var unit = new Array("拾佰仟", "分角");
    var unit1= new Array("万亿万", "");
    var numArray = num.toString().split(".");
    var start = new Array(numArray[0].length-1, 2);

    function toChinese(num, index)
    {
    var num = num.replace(/\d/g, function ($1)
    {
    return cn.charAt($1)+unit[index].charAt(start--%4 ? start%4 : -1);
    });
    return num;
    }

    for (var i=0; i<numArray.length; i++)
    {
    var tmp = "";
    for (var j=0; j*4<numArray[i].length; j++)
    {
    var strIndex = numArray[i].length-(j+1)*4;
    var str = numArray[i].substring(strIndex, strIndex+4);
    var start = i ? 2 : str.length-1;
    var tmp1 = toChinese(str, i);
    tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "");
    // tmp1 = tmp1.replace(/^壹拾/, "拾")
    tmp = (tmp1+unit1[i].charAt(j-1)) + tmp;
    }
    numArray[i] = tmp ;
    }

    numArray[1] = numArray[1] ? numArray[1] : "";
    numArray[0] = numArray[0] ? numArray[0]+"圆" : numArray[0], numArray[1] = numArray[1].replace(/^零+/, "");
    numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1]+"整";
    var money =  numArray[0]+numArray[1];
    money = money.replace(/(亿万)+/g, "亿"); 
    if(money=="整"){
        money="零圆整";
    }else{
        money=prefh+money;
    }
    return money;
}
// ------------- added by xwj for td3131 数字金额大写转小写 20051115-----------*/
// 数字金额大写转小写
function chineseChangeToNumber(num) {
    var prefh="";
    if(num.length>0){
        if(num.indexOf("负")==0){
            prefh="-";
            num=num.substr(1);
        }
    }

    var numArray = new Array()
    var unit = "万亿万圆$";
    for (var i=0; i<unit.length; i++)
    {
    var re = eval("/"+ (numArray[i-1] ? unit.charAt(i-1) : "") +"(.*)"+unit.charAt(i)+"/");
    if (num.match(re))
    {
    // numArray[i] = num.match(re)[1].replace(/^拾/, "壹拾")
    numArray[i] = numArray[i].replace(/[零壹贰叁肆伍陆柒捌玖]/g, function ($1)
    {
    return "零壹贰叁肆伍陆柒捌玖".indexOf($1);
    });
    numArray[i] = numArray[i].replace(/[分角拾佰仟]/g, function ($1)
    {
    return "*"+Math.pow(10, "分角 拾佰仟 ".indexOf($1)-2)+"+";
    }).replace(/^\*|\+$/g, "").replace(/整/, "0");
    numArray[i] = "(" + numArray[i] + ")*"+Math.ceil(Math.pow(10, (2-i)*4));
    }
    else numArray[i] = 0;
    }
    return prefh+eval(numArray.join("+"));
}

function floatFormat(num)
{   if (num!=null)
{
    
    num  =  num+"";  
    ary = num.split(".");
    if(ary.length==1){
        if(num == "")
            num = "0";
        num = num + ".00";
    }else{
        if(ary[1].length<2)
            num = num + "0";
        else if(ary[1].length>2)
            num = ary[0] + "." + ary[1].substring(0,2);
    }
    } 
    return  num;  
}
// 数字千分位格式化2
function milfloatFormat(num) {       
    if (num!=null) {   
        num  =  num+"";  
        var  re=/(-?\d+)(\d{3})/  
        while(re.test(num)){  
            num=num.replace(re,"$1,$2")  
        }  
        return  num;  
    }
    else return "";
}

function checkinput1(elementname, spanid){
    var tmpvalue = elementname.value;

    while(tmpvalue.indexOf(" ") >= 0){
        tmpvalue = tmpvalue.replace(" ","");
    }
    while(tmpvalue.indexOf("\r\n") >= 0){
        tmpvalue = tmpvalue.replace("\r\n", "");
    }
    if(tmpvalue!=""){
        spanid.innerHTML='';
    }else{
        spanid.innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
        elementname.value = "";
    }
}
// 判断input框中是否输入的是数字,包括小数点
function ItemNum_KeyPress(elementname)
{
    var evt = getEvent();
    evt = jQuery.event.fix(evt);
    if(elementname==undefined){
        elementname = evt.target.name;
    }
    
    var keyCode = evt.which ? evt.which : evt.keyCode;
 // added by xwj for td1844 on 2005-05-12 避免多次输入小数点
 tmpvalue = $GetEle(elementname).value;
 var count = 0;
 var count2 = 0;
 var len = -1;
 if(elementname){
 len = tmpvalue.length;
 }
 for(i = 0; i < len; i++){
    if(tmpvalue.charAt(i) == "."){
    count++;     
    }
 }
 for(i = 0; i < len; i++){// 避免多次输入负号
    if(tmpvalue.charAt(i) == "-"){
    count2++;     
    }
 }
 
 //ypc 2012-09-05 修改
     if(!(((keyCode>=48) && (keyCode<=57)) || keyCode==46 || keyCode==45) || (keyCode==46 && count == 1) || (keyCode==45 && count2 == 1)){
         if (evt.keyCode) {
            evt.keyCode = 0;evt.returnValue=false;     
         } else {
            evt.which = 0;evt.preventDefault();
         }
     }
}

// 判断input框中是否输入的是正整数,不包括小数点
function ItemPlusCount_KeyPress()
{
    var evt = getEvent();
    var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!(((keyCode>=48) && (keyCode<=57))))
  {
     if (evt.keyCode) {
        evt.keyCode = 0;evt.returnValue=false;     
     } else {
        evt.which = 0;evt.preventDefault();
     }
     
     
     
  }
}

//金额千分位转换 2012-09-04 ypc 修改
//function clearNoNum(obj){
    //先把非数字的都替换掉，除了数字和.
    //obj.value = obj.value.replace(/[^\d.]/g,"");
    //必须保证第一个为数字而不是.
    //obj.value = obj.value.replace(/^\./g,"");
    //保证只有出现一个.而没有多个.
    //obj.value = obj.value.replace(/\.{2,}/g,".");
    //保证.只出现一次，而不能出现两次以上
    //obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
//}


// 判断input框中是否输入的是数字,不包括小数点
function ItemCount_KeyPress()
{
    var evt = getEvent();
    var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!(((keyCode>=48) && (keyCode<=57))|| keyCode==45))
  {
     if (evt.keyCode) {
        evt.keyCode = 0;evt.returnValue=false;     
     } else {
        evt.which = 0;evt.preventDefault();
     }
     
     
     
  }
}

// 判断input框中是否输入的是数字,包括"-"
function ItemPhone_KeyPress()
{
    var evt = getEvent();
    var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!(((keyCode>=48) && (keyCode<=57)) || keyCode==45))
  {
     
    if (evt.keyCode) {
        evt.keyCode = 0;evt.returnValue=false;     
     } else {
        evt.which = 0;evt.preventDefault();
     }
     
     
     
  }
}

// 判断input框中是否输入的是小数,包括小数点
/*
 * p（精度） 指定小数点左边和右边可以存储的十进制数字的最大个数。精度必须是从 1 到最大精度之间的值。最大精度为 38。
 * 
 * s（小数位数） 指定小数点右边可以存储的十进制数字的最大个数。小数位数必须是从 0 到 p 之间的值。默认小数位数是 0，因而 0 <= s <=
 * p。最大存储大小基于精度而变化。
 */
function ItemDecimal_KeyPress(elementname,p,s)
{   
    var evt = getEvent();
    var keyCode = evt.which ? evt.which : evt.keyCode;
    var tmpvalue = $GetEle(elementname).value;

    var dotCount = 0;
    var integerCount=0;
    var afterDotCount=0;
    var hasDot=false;

    var len = -1;
    if(elementname){
        len = tmpvalue.length;
    }
    for(i = 0; i < len; i++){
        if(tmpvalue.charAt(i)=="."){ 
            dotCount++;
            hasDot=true;
        }else{
            if(hasDot==false){
                integerCount++;
            }else{
                afterDotCount++;
            }
        }       
    }

    if(!(((keyCode>=48) && (keyCode<=57)) || keyCode==46 || keyCode==45) || (keyCode==46 && dotCount == 1)){  
        if (evt.keyCode) {
            evt.keyCode = 0;stopDefault(evt); //add by liaodong 2013-08-22//evt.returnValue=false;     
         }else{
            evt.which = 0;stopDefault(evt); //add by liaodong 2013-08-22//evt.preventDefault();
         }
    }
    
    if(integerCount>=p-s && hasDot==false && (keyCode>=48) && (keyCode<=57)){
        if (evt.keyCode) {
            evt.keyCode = 0;stopDefault(evt); //add by liaodong 2013-08-22//evt.returnValue=false;     
         } else {
            evt.which = 0;stopDefault(evt); //add by liaodong 2013-08-22//evt.preventDefault();
         }
         
         
         
    }
    if(afterDotCount>=s&&integerCount>=p-s){
         if (evt.keyCode) {
            evt.keyCode = 0;stopDefault(evt); //add by liaodong 2013-08-22//evt.returnValue=false;     
         } else {
            evt.which = 0;stopDefault(evt); //add by liaodong 2013-08-22//evt.preventDefault();
         }
    }
    /* 新增 */
    var rtnflg = false;
    
    var cursorPosition = getCursortPosition($G(elementname));
    
    var vidValue = $G(elementname).value;
    var dotIndex = vidValue.indexOf(".");
    if (hasDot) {
        if (cursorPosition <= dotIndex) {
            if (integerCount >= (p - s)) {
                rtnflg = true;
            }
        } else {
            if(afterDotCount >= s) {
                rtnflg = true;
            }
        }
    }
    if (rtnflg) {
        //var isie = (document.all) ? true : false;//ypc 2012-09-04  添加 //如果是IE浏览器就向下执行否则就不执行
        //if (evt.keyCode != undefined) { //ypc 2012-09-04 修改
        if (evt.keyCode != 0) { //ypc 2012-09-04 修改
        //if(isie){
            evt.keyCode = 0;
            stopDefault(evt); //add by liaodong 2013-08-22
            //evt.returnValue=false; 
        } else {
            evt.which = 0;
            stopDefault(evt); //add by liaodong 2013-08-22
            //evt.preventDefault();
        }
    }
}




/*
* author liaodong
* date  2013-08-22
* event.preventDefault()方法是用于取消事件的默认行为，但此方法并不被ie支持，
*在ie下需要用window.event.returnValue = false;
*/
function stopDefault(e) { 
    if (e && e.preventDefault){ 
          e.preventDefault();
    } else { 
         e.returnValue = false;
    } 
}





/**
 * 获取光标所在位置
 */
function getCursortPosition(inputElement) {
    var CaretPos = 0; 
    if (document.selection) {
        inputElement.focus();
        var Sel = document.selection.createRange();
        if(Sel.text.length < 1) {
            Sel.moveStart('character', -inputElement.value.length);
            CaretPos = Sel.text.length;
        }
    } else if (inputElement.selectionStart || inputElement.selectionStart == '0') { //ff
        CaretPos = inputElement.selectionStart;
    }
    return (CaretPos);
}


// 判断input框中是否输入的是数字,不包括小数点
function checkcount(objectname)
{
    valuechar = $GetEle(objectname).value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) {
        charnumber = parseInt(valuechar[i]);
        if( isNaN(charnumber) && (valuechar[i]!="-" || (valuechar[i]=="-" && i!=0))){
            isnumber = true ;
        }
        if (valuechar.length==1 && valuechar[i]=="-"){
            isnumber = true ;
        }
    }
    if(isnumber){
        $GetEle(objectname).value = "" ;
    }
}

//用于验证值的范围在最小值与最大值之间。否则清空值。
function checkItemScale(obj,msg, minValue,maxValue){
    var val = obj.value;
    if(val != ""){
        try{
            //调用parseInt转换类型必须指定第二个参数值，来设置保存数字的进制的值。否则有可能使用8进制 16进制来转换数据。
            val = parseInt(val, 10);
            if(val < minValue || val > maxValue){
                alert(msg);
                obj.value = "";
                return false;
            } else {
                return true;
            }
        }catch(e){
            obj.value = "";
            return false;
        }
    }
}

//检查浮点型数字的正确性。
function checkFloat(obj)
{
    var value = obj.value;
    if(value != ""){
        //var reg = /^-?\d+\.?\d+$/;
        var reg = /^(-?\d+)(\.\d+)?$/;
        if (!reg.test(value)){
            obj.value = "";
            // add by liaodong for qc75759 in 2013-10-24 start
        }else{
            try{
                var dlength = obj.getAttribute("datalength");
                if(dlength==null && obj.getAttribute("datavaluetype").toString()=="5"){
                    dlength = 2;
                }else if(dlength == null){
                    dlength = 4;
                }
                obj.value = addZero(value,dlength);
            }catch(e){}
         //end
        }
    }
}

// add by liaodong for qc75759 in 2013-10-24 start
function addZero(aNumber,precision){
    if(aNumber==null || aNumber.trim()=="" || isNaN(aNumber))return "";
    var valInt = (aNumber.toString().split(".")[1]+"").length;
    if(valInt != precision){
        var lengInt = precision-valInt;
        //判断添加小数位0的个数
        if(lengInt == 1){
            aNumber += "0";
        }else if(lengInt == 2){
            aNumber += "00";
        }else if(lengInt == 3){
            aNumber += "000";
        }else if(lengInt < 0){
            if(precision == 1){
                aNumber += ".0";
            }else if(precision == 2){
                aNumber += ".00";
            }else if(precision == 3){
                aNumber += ".000";
            }else if(precision == 4){
                aNumber += ".0000";
            }
            var ins = aNumber.toString().split(".");
            if(ins.length>2){
                aNumber = parseFloat(ins[0]+"."+ins[1]).toFixed(precision);
            }
        }       
    }
    return  aNumber;            
}

//验证整数的正确性
function checkcount1(obj)
{
    var value = obj.value;
    if(value != ""){
        var reg = /^-?\d+$/;
        if (!reg.test(value)){
            obj.value = "";
        }
    }
}

//验证整数的正确性
function checkcount2(obj)
{
    var value = obj.value;
    if(value != ""){
        var reg = /^-?\d+$/;
        if (!reg.test(value)){
            obj.value = "1";
        }
        if(parseInt(obj.value)<1){
            obj.value = "1";
        }
    }
}

// 判断input框中是否输入的是数字,包括小数点
function checknumber(objectname)
{
    /*
    valuechar = $GetEle(objectname).value.split("") ;
    isnumber = false ;
    var hasdian = false;
    for(i=0 ; i<valuechar.length ; i++) { 
        charnumber = parseInt(valuechar[i]) ; 
        if( isNaN(charnumber)&& valuechar[i]!="." && valuechar[i]!="-"){
            isnumber = true ;
        }
        if((valuechar[i]=="."&&i==0&&hasdian==false)||(valuechar[i]=="-"&&i>0)){
            isnumber = true ;
        }
        if(valuechar[i]=="."){
            hasdian = true;
        }
        if (valuechar.length==1 && valuechar[i]=="-"){
            isnumber = true ;
        }
    }
    if(isnumber){
        $GetEle(objectname).value = "" ;
    }
    */
    var objValue=$GetEle(objectname).value;
    if(objValue!=parseFloat(objValue))
        $GetEle(objectname).value = "" ;
}
function checknumber1(objectname)
{
    valuechar = objectname.value.split("") ;
    isnumber = false ;
    var hasdian = false;
    for(i=0 ; i<valuechar.length ; i++) {
        charnumber = parseInt(valuechar[i]) ; 
        if( isNaN(charnumber)&& valuechar[i]!="." && valuechar[i]!="-"){
            isnumber = true ;
        }
        if((valuechar[i]=="."&&i==0&&hasdian==false)||(valuechar[i]=="-"&&i>0)){
            isnumber = true ;
        }
        if(valuechar[i]=="."){
            hasdian = true;
        }
        if (valuechar.length==1 && valuechar[i]=="-"){
            isnumber = true ;
        }
    }
    if(isnumber){
        objectname.value = "" ;
    }
}
// 判断input框中是否输入的是正整数
function checkPlusnumber1(objectname)
{
    valuechar = objectname.value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)) isnumber = true ;}
    if(isnumber) objectname.value = "" ;
}

// 判断input框中是否输入的是数字,包括"-"
function checkphone(objectname)
{
    valuechar = $GetEle(objectname).value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!="-") isnumber = true ;}
    if(isnumber) $GetEle(objectname).value = "" ;
}
function checkphone1(objectname)
{
    valuechar = objectname.value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!="-") isnumber = true ;}
    if(isnumber) objectname.value = "" ;
}

function ItemTime_KeyPress()
{
    var evt = getEvent();
    var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!((keyCode>=48) && (keyCode<=58)))
  {
        if (evt.keyCode) {
            evt.keyCode = 0;
            evt.returnValue=false;     
         } else {
            evt.which = 0;
            evt.preventDefault();
         }
  }
}

function checktime(objectname)
{
    valuechar = $GetEle(objectname).value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!=":") isnumber = true ;}
    if(isnumber) $GetEle(objectname).value = "" ;
}

function checktime1(objectname)
{
    valuechar = objectname.value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!=":") isnumber = true ;}
    if(isnumber) objectname.value = "" ;
}


// 判断input框中是否输入的是英文字母和数字，并且以字母开头
function checkinput_char_num(objectname)
{
    valuechar = $GetEle(objectname).value.split("") ;
    if(valuechar.length==0){
        return ;
    }
    notcharnum = false ;
    notchar = false ;
    notnum = false ;
    for(i=0 ; i<valuechar.length ; i++) {
        notchar = false ;
        notnum = false ;
        charnumber = parseInt(valuechar[i]) ; if(isNaN(charnumber)) notnum = true ;
        // if(valuechar[i].toLowerCase()<'a' || valuechar[i].toLowerCase()>'z')
        // notchar = true ;
        if((valuechar[i].toLowerCase()<'a' || valuechar[i].toLowerCase()>'z')&&valuechar[i]!='_') notchar = true ;
        if(notnum && notchar) notcharnum = true ;
    }
    if(valuechar[0].toLowerCase()<'a' || valuechar[0].toLowerCase()>'z') notcharnum = true ;
    if(notcharnum) $GetEle(objectname).value = "" ;
}

// 检测input框中输入的小数中的整数部分是否超过限制的位数
function checkdecimal_length(elementname,maxlength)
{
    if(!isNaN(parseInt($GetEle(elementname).value)) && (maxlength > 0)){
        inputTemp = $GetEle(elementname).value ;
        if (inputTemp.indexOf(".") !=-1)
        {
            inputTemp = inputTemp.substring(0,inputTemp.indexOf("."));
        }
        if (inputTemp.length > maxlength)
        {
            alert($GetEle(elementname).value+"的整数部分超过"+maxlength+"位！");
            $GetEle(elementname).value = "" ;
        }
    }
}

// 截取字符串，添加省略号
// added by hubo, 2005/12/06
function ellipsis(str,lens){
    str = str.replace(/<.*?>/ig,"");
    str = str.replace(/<img.*/ig,"");
    var len = 0;
    var i;
    for(i=0;i<str.length;i++){
        len += str.charCodeAt(i)<127 ? 1 : 3;
        if(len>=lens) return str.substr(0,i+1)+"...";
    }
    return str;
}

// 去掉字符串头尾空格
// added by hubo, 2005/09/01
function trim(s){
    if(s==null){return s;}
    var i;
    var beginIndex = 0;
    var endIndex = s.length - 1;
    for(i=0;i<s.length;i++){
        if(s.charAt(i)==' ' || s.charAt(i)=='　'){
            beginIndex++;
        }else{
            break;
        }
    }
    for(i=s.length-1;i>=0;i--){
        if(s.charAt(i)==' ' || s.charAt(i)=='　'){
            endIndex--;
        }else{
            break;
        }
    }
    if(endIndex<beginIndex){return "";}
    return s.substring(beginIndex, endIndex + 1);
}

// *****************************************
// added by hubo, 2005/08/31
function doSwitch(objTbls){
    var evt = getEvent();
    var spanSwitch = evt.srcElement||evt.target;
    if (spanSwitch.nodeName=="IMG") spanSwitch = $(spanSwitch).parent()[0];
    var tblList = (objTbls).split(",");
    for(i=0;i<tblList.length;i++){
        if(document.getElementById(tblList[i])==null) continue;
        with(document.getElementById(tblList[i])){
            if(tBodies[0].style.display=="none"){
                $(tBodies[0]).show();
                spanSwitch.innerHTML = "<img src='/images/up_wev8.jpg' style='cursor:pointer'> ";
            }else{
                tBodies[0].style.display = "none";
                spanSwitch.innerHTML = "<img src='/images/down_wev8.jpg' style='cursor:pointer'>";
            }
        }
    }

}
// by ben 2005-12-26

function doSwitchx(obj){
    var evt = getEvent();
    var spanSwitch = evt.srcElement||evt.target;;
    if (spanSwitch.nodeName=="IMG") spanSwitch = spanSwitch.parentElement;
    
            if($GetEle(obj).style.display=="none"){
                $GetEle(obj).style.display = "";
                spanSwitch.innerHTML = "<img src='/images/up_wev8.jpg' style='cursor:hand'> ";
            }else{
                $GetEle(obj).style.display = "none";
                spanSwitch.innerHTML = "<img src='/images/down_wev8.jpg' style='cursor:hand'>";
            }
        }
    
function doSwitchx(obj,show,hidden){
    var evt = getEvent();
    var spanSwitch = evt.srcElement||evt.target;
    if (spanSwitch.tagName=="IMG") spanSwitch = spanSwitch.parentElement;
    
            if($GetEle(obj).style.display=="none"){
                $GetEle(obj).style.display = "";
                spanSwitch.innerHTML = "<img src='/images/up_wev8.jpg' style='cursor:hand' title='"+hidden+"'> ";
            }else{
                $GetEle(obj).style.display = "none";
                spanSwitch.innerHTML = "<img src='/images/down_wev8.jpg' style='cursor:hand' title='"+show+"' >";
            }
        }
function checkint(objectname)
{
    valuechar = $GetEle(objectname).value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)) isnumber = true ;}
    if(isnumber) $GetEle(objectname).value = "" ;
}   

function checkintc(objectname,temp)
{
    valuechar = $GetEle(objectname).value.split("") ;
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; 
    if( isNaN(charnumber)) isnumber = true ;}
    if(isnumber) $GetEle(objectname).value = "" ;
    else 
    {
    if (parseInt($GetEle(objectname).value)>parseInt(temp))
    $GetEle(objectname).value=parseInt(temp);
    }
}       
function change2input(a,b)
{

if (parseFloat(a)>parseFloat(b))
{
return true;
}
else
{
return false;
}
}
// by ben 2006-1-17
function openFullWindow(url){
  var redirectUrl = url ;
  var width = screen.width ;
  var height = screen.height ;
  if (height == 768 ) height -= 75 ;
  if (height == 600 ) height -= 60 ;
  var szFeatures = "top=0," ; 
  szFeatures +="left=0," ;
  szFeatures +="width="+width+"," ;
  szFeatures +="height="+height+"," ; 
  szFeatures +="directories=no," ;
  szFeatures +="status=yes," ;
  szFeatures +="menubar=no," ;
  if (height <= 600 ) szFeatures +="scrollbars=yes," ;
  else szFeatures +="scrollbars=yes," ;
  szFeatures +="resizable=yes" ; 
  window.open(redirectUrl,"new",szFeatures) ;
}

function openNewFullWindow(url){
  var redirectUrl = url ;
  var width = screen.width ;
  var height = screen.height ;
  if (height == 768 ) height -= 75 ;
  if (height == 600 ) height -= 60 ;
  var szFeatures = "top=0," ;
  szFeatures +="left=0," ;
  szFeatures +="width="+width+"," ;
  szFeatures +="height="+height+"," ;
  szFeatures +="directories=no," ;
  szFeatures +="status=yes," ;
  szFeatures +="menubar=no," ;
  if (height <= 600 ) szFeatures +="scrollbars=yes," ;
  else szFeatures +="scrollbars=yes," ;
  szFeatures +="resizable=yes" ;
  window.open(redirectUrl,"",szFeatures) ;
}
var flag = false;
//数据加载未完成的时候 置灰底部tab
function enablebottommenu(){
    try{
        //显示底部tab菜单
        if(window.ActiveXObject){
            for (b=0;b<parent.document.getElementById("requestTabButton").all.length;b++){
                if(parent.document.getElementById("requestTabButton").all.item(b).tagName == "LI"){
                    //alert("未完成="+b);
                    parent.document.getElementById("requestTabButton").all.item(b).disabled=true;
                    flag = true;
                }
            }
        }else{
            jQuery("#toolbarbottommenu", parent.document).show();
        }
    }catch(e){
        
    }
}

//数据加载完成的时候 显示底部tab
function displaybottommenu(){
    try{
        //显示底部tab菜单
        if(window.ActiveXObject){
            for (b=0;b<parent.document.getElementById("requestTabButton").all.length;b++){
                if(parent.document.getElementById("requestTabButton").all.item(b).tagName == "LI"){
                    //alert("完成="+b);
                    parent.document.getElementById("requestTabButton").all.item(b).disabled=false;
                }
            }
        }else{
            jQuery("#toolbarbottommenu", parent.document).hide();
        }
    }catch(e){
        
    }
}

function enablemenu()
{
    // for (a=0;a<window.frames["rightMenuIframe"].document.all.length;a++){
        // window.frames["rightMenuIframe"].document.all.item(a).disabled=true;
    // }
    window.frames["rightMenuIframe"].event.srcElement.disabled = true;

}
function enableAllmenu()
{
    parent.window.clickWorkflowTopBtn = true;
    var _document = document.getElementById("rightMenuIframe").contentWindow.document;
    var menuBtns = jQuery("#menuTable button", _document);
    // TD9015 点击任一按钮，把所有"BUTTON"给灰掉
    for (a=0;a<menuBtns.length;a++){
        jQuery(menuBtns[a]).attr("disabled", true);
    }
    // window.frames["rightMenuIframe"].event.srcElement.disabled = false;
    
    try{// ext菜单灰色
        parent.Ext.getCmp('tabPanelContent').getTopToolbar().disable();// 鼠标灰掉
    }catch(e){
    }
    try{
        // 头部菜单灰色
        if (window.ActiveXObject) {
            for (b=0;b<parent.document.getElementById("toolbarmenu").all.length;b++){
                if(parent.document.getElementById("toolbarmenu").all.item(b).tagName == "TABLE"){
                    parent.document.getElementById("toolbarmenu").all.item(b).disabled=true;
                }
            }
        } else {
            jQuery("#toolbarmenuCoverdiv", parent.document).show();
        }
        
    }
    catch(e)
    {
    }
    //只做一次置灰色操作
    if(flag==false){
        enablebottommenu();
    }
    
    try {
        var __topbtns = jQuery("#rightBox", parent.document).find("[type=button]");
        __topbtns.each(function () {
            jQuery(this).removeClass("middle");
            var __className = jQuery(this).attr("class");
            if (__className.indexOf("_disabled") == -1) {
                jQuery(this).addClass(__className + "_disabled");
                jQuery(this).removeClass(__className);
            }
        });
        __topbtns.attr("disabled", "disabled");
    } catch (e) {
    }
}
function displayAllmenu()
{
    parent.window.clickWorkflowTopBtn = false;
    var _document = document.getElementById("rightMenuIframe").contentWindow.document;
    var menuBtns = jQuery("#menuTable button", _document);
    // TD9015 点击任一按钮，把所有"BUTTON"给灰掉
    for (a=0;a<menuBtns.length;a++){
        jQuery(menuBtns[a]).attr("disabled", false);
    }
    try{// ext菜单弄白
        parent.Ext.getCmp('tabPanelContent').getTopToolbar().enable();// 释放鼠标
    }catch(e){
    }
    try{
        // 显示头部菜单
        if (window.ActiveXObject) {
            for (b=0;b<parent.document.getElementById("toolbarmenu").all.length;b++){
                if(parent.document.getElementById("toolbarmenu").all.item(b).tagName == "TABLE"){
                    parent.document.getElementById("toolbarmenu").all.item(b).disabled=false;
                }
            }
        } else {
            jQuery("#toolbarmenuCoverdiv", parent.document).hide();
        }
    }
    catch(e)
    {
    }
    //只做一次置会操作
    //if(flag==false){
        displaybottommenu();
    //}
    
    try {
        var __topbtns = jQuery("#rightBox", parent.document).find("[type=button]");
        __topbtns.each(function () {
            var __className = jQuery(this).attr("class");
            
            if (__className.indexOf("_disabled") != -1) {
                jQuery(this).addClass(__className.replace("_disabled", ""));
                jQuery(this).removeClass(__className);
                jQuery(this).removeClass("middle");
            }
        });
        __topbtns.removeAttr("disabled");
    } catch (e) {
    }
}

function enableAllmenuParent(){
    try{//ext菜单灰色
        Ext.getCmp('tabPanelContent').getTopToolbar().disable();//鼠标灰掉
    }catch(e){
    }
    try{
        //头部菜单灰色
        if (window.ActiveXObject) {
            for (b=0;b<document.getElementById("toolbarmenu").all.length;b++){
                if(document.getElementById("toolbarmenu").all.item(b).tagName == "TABLE"){
                    document.getElementById("toolbarmenu").all.item(b).disabled=true;
                }
            }
        } else {
            jQuery("#toolbarmenuCoverdiv", parent.document).show();
        }
    }catch(e){
    }
}
// *****************************************

function showMsgBox(o, msg, t, l){
    with(o){
        innerHTML = msg;
        style.display = "inline";
        style.position = "absolute"
        style.posTop = t||(document.body.offsetHeight/2+document.body.scrollTop-50);
        style.posLeft = l||(document.body.offsetWidth/2-50);
    }
}


/*
 * Function: 取字符串字节长度 Document by by 2007-3-9
 */
function realLength(str) {
    var j=0;
    for (var i=0;i<=str.length-1;i++) {
        j=j+1;
        if ((str.charCodeAt(i))>127) {
            j=j+2;
        }
    }
    return j;
}

// 中文作为3个字节处理
function realLengthOnly(str)
{
    var j=0;
    for (var i=0;i<=str.length-1;i++)
    {
        j=j+1;
        if ((str.charCodeAt(i))>127)
        {
            j=j+2;
        }
    }
    return j;
}

// 只检查长度
function checkLengthOnly(elementname,len,fieldname,msg,msg1,msg2)
{
    len = len*1;
    try{
        var str = UE.utils.isEmptyObject(elementname);
        if(len!=0 && realLengthOnly(str)>len){
            alert("【"+fieldname+"】"+msg1+len+","+"("+msg2+")\n\n【"+fieldname+"】"+msg+":"+realLengthOnly(str));
            return false;
        }
    }catch(e){
        var str = $GetEle(elementname).value;
        if(len!=0 && realLengthOnly(str)>len){
            alert("【"+fieldname+"】"+msg1+len+","+"("+msg2+")\n\n【"+fieldname+"】"+msg+":"+realLengthOnly(str));
            return false;
        }
    }
    return true;
}
function checkLength(elementname,len,fieldname,msg,msg1) {
    len = len*1;
    var str = $GetEle(elementname).value;
    // 处理$GetEle可能找不到对象时的情况，通过id查找对象
    if(str == undefined) {
        str = document.getElementById(elementname).value;
    }
    
    if(len!=0 && realLength(str) > len){
        alert(fieldname + msg + len + "," + "(" + msg1 + ")");
        while(true){
            str = str.substring(0, str.length - 1);
            if(realLength(str) <= len){
                $GetEle(elementname).value = str;
                return;
            }
        }
    }
}
function checkLengthAndCut(elementname,len,fieldname,msg,msg1)
{
    len = len*1;
    var str = $GetEle(elementname).value;
    // 处理$GetEle可能找不到对象时的情况，通过id查找对象
    if(str==undefined)
        str=document.getElementById(elementname).value;
    if(len!=0 && realLength(str)>len){
        alert(fieldname+msg+len+"("+msg1+")");
        while(true){
            str = str.substring(0,str.length-1);
            if(realLength(str)<=len){
                $GetEle(elementname).value = str;
                return false;
            }
        }
    }
    return true;
}
function checkLengthfortext(elementname,len,fieldname,msg,msg1)
{
    len = len*1;
    var str = $GetEle(elementname).value;
    if(len!=0 && realLengthOnly(str)>len){
        alert(fieldname+msg+len+","+"("+msg1+")");
        var str2="";
        var flag = true;
        while(true){
            while(flag){
                if(str.length > len){
                    str2 = str.substring(0,len);
                }else{
                    str2 = str.substring(0,str.length/2);
                }
                str2 = str.substring(0,str.length/2);
                if(realLengthOnly(str2)>len){
                    str=str2;
                }else{
                    flag=false;
                }
            }
            if(realLengthOnly(str)<=len){
                $GetEle(elementname).value = str;
                return;
            }
            str = str.substring(0,str.length-1);
        }
    }
/*
 * delete by cyril on 2008-08-12 cut error var str=$GetEle(elementname).value;
 * 
 * var j=parseInt(realLength(str)); var len1=parseInt(len);
 * 
 * if (len1!=0) { if (j>len1) { alert(fieldname+msg+len+","+"("+msg1+")"); if
 * (len1<2) { len1=2; }
 * $GetEle(elementname).value=str.substring(0,parseInt(len1/2 - 1)); } }
 */
}

function checkLength4Read(elementname,spanname,len,fieldname,msg,msg1){
    len = len*1;
    var str = $GetEle(elementname).value;
    if(len!=0 && realLengthOnly(str)>len){


        alert(fieldname+msg+len+","+"("+msg1+")");
        var str2="";
        var flag = true;
        while(true){
            while(flag){
                if(str.length > len){
                    str2 = str.substring(0,len);
                }else{
                    str2 = str.substring(0,str.length/2);
                }
                if(realLengthOnly(str2)>len){
                    str=str2;
                }else{
                    flag=false;
                }
            }
            if(realLengthOnly(str)<=len){
                $GetEle(elementname).value = str;
                $GetEle(spanname).innerHTML = str;
                return;
            }
            str = str.substring(0,str.length-1);
        }
    }

}

function checkLengthbrow(elementname,spanname,len,fieldname,msg,msg1,demand)
{
	var str=$GetEle(elementname).value;
	try{
	    if(demand==undefined){
	        demand = $GetEle(elementname).getAttribute("viewtype");
	    }
	}catch(e){
	    demand = 0;
	}
	var j=parseInt(realLength(str));
	var len1=parseInt(len);
	if (len1!=0)
	{
		if (j>len1)
		{
		    alert(fieldname+msg+len+","+"("+msg1+")");
		    if (len1<2)
		    {
		        len1=2;
		    }
		    $GetEle(elementname).value="";
		    
		    if (demand==1)
		    {
		        $GetEle(spanname).innerHTML="<img src=\"/images/BacoError_wev8.gif\" align=absmiddle>";
		    }
		    else
		    {
		        $GetEle(spanname).innerHTML="";
		    }
		
		    
		
		}
	}
}

function checkLength1(elementname,len,fieldname,langu)
{var msg;
 var msg1;
 if (langu==7)
 {

    msg="文本长度不能超过";
    msg1="1个中文字符等于3个长度";
 }
 else if (langu==9)
 {
    msg="文本長度不能超過"; 
    msg1="1個中文字符等於3個長度";    
 }
 else
 {
 msg="text length can not exceed";
 msg1="one chinese char equals three char";
 }
var str=elementname.value;

var j=parseInt(realLength(str));
var len1=parseInt(len);

if (len1!=0)
{
if (j>len1)
{
    alert(fieldname+msg+len+","+"("+msg1+")");
    if (len1<2)
    {
        len1=2;
    }
    elementname.value=str.substring(0,parseInt(len1/2 - 1));
}
}
}


/* 一个页面有多个名字相同的文本框时，检测它们输入的是否为数字，包括小数点 */
function check_number(objectname){
   for( var i=0;i<document.getElementsByName(objectname).length;i++){
     if(checkinputnumber(document.getElementsByName(objectname)[i].value)){
         document.getElementsByName(objectname)[i].value = "";
     } 
   }
}
function checkinputnumber(objectname){
    valuechar = objectname.split("");
    isnumber = false ;
    for(i=0 ; i<valuechar.length ; i++) { 
        charnumber = parseInt(valuechar[i]) ; 
        if( isNaN(charnumber)&& valuechar[i]!=".") 
        isnumber = true ;
    }
    return isnumber;
}
// 取消输入框后面跟随的红色惊叹号
function checkinput2(elementname,spanid,viewtype){
    if (wuiUtil.isNullOrEmpty(viewtype)) {
        viewtype = $G(elementname).getAttribute("viewtype");
    }
    if(viewtype==1){
        var tmpvalue = "";
        try{
            tmpvalue = $GetEle(elementname).value;
        }catch(e){
            tmpvalue = $GetEle(elementname).value;
        }
        while(tmpvalue.indexOf(" ") >= 0){
            tmpvalue = tmpvalue.replace(" ", "");
        }
        while(tmpvalue.indexOf("\r\n") >= 0){
            tmpvalue = tmpvalue.replace("\r\n", "");
        }
        if(tmpvalue!=""){
            $GetEle(spanid).innerHTML = "";
        }else{
            $GetEle(spanid).innerHTML = "<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
            $GetEle(elementname).value = "";
        }
    }else{
        $GetEle(spanid).innerHTML = "";
    }
}
function checkinput3(elementname,spanid,viewtype){
    try{
	    /*
	    //加了这段 流程明细金额转换必填有异常
        try{
            viewtype = $G(elementname).getAttribute("viewtype");
        }catch(e){
            viewtype = null ;
        }
        */
	    if (viewtype == undefined || viewtype == null) {
	        viewtype = elementname.getAttribute('viewtype');
	        if (viewtype == undefined || viewtype == null) {
	            try {
	                var callerStr = checkinput3.caller.toString();
	                var param = callerStr.substring(callerStr.indexOf("checkinput3("), callerStr.indexOf(".viewtype)")).split(",");
	                
	                var targetfield = jQuery.trim(param[param.length - 1]);
	                viewtype = $G(targetfield).getAttribute("viewtype");
	            } catch (e) {
	                viewtype = 0;
	            }
	        }
	    }

    if(viewtype==1){
        var tmpvalue = elementname.value;

        while(tmpvalue.indexOf(" ") >= 0){
            tmpvalue = tmpvalue.replace(" ", "");
        }
        while(tmpvalue.indexOf("\r\n") >= 0){
            tmpvalue = tmpvalue.replace("\r\n", "");
        }
        if(tmpvalue!=""){
             spanid.innerHTML='';
        }else{
            spanid.innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
            elementname.value = "";
        }
    }
    }catch(e){
        if(window.console) console.log("checkinput3 Error : "+e.message);
    }
}
function ajaxinit(){
    var ajax=false;
    try {
        ajax = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            ajax = false;
        }
    }
    if (!ajax && typeof XMLHttpRequest!='undefined') {
    ajax = new XMLHttpRequest();
    }
    return ajax;
}

function changeshowattr(fieldid,fieldvalue,rownum,workflowid,nodeid,triByLoad){
	if(typeof(triByLoad) == "undefined")
		triByLoad = true;
	var triFun = function(){
		changeshowattrAjax(fieldid,fieldvalue,rownum,workflowid,nodeid,triByLoad);
	}
	if(triByLoad)		//页面加载触发延时执行，同时兼容已有调用，未传参数triByLoad情况，默认原有逻辑，延时执行
		window.setTimeout(triFun, 1000)
	else				//下拉框变更触发，SelectElement.java中Html模式使用，不延时
		triFun();
}   

function changeshowattrAjax(fieldid,fieldvalue,rownum,workflowid,nodeid,triByLoad){
	if(typeof(triByLoad) == "undefined")
		triByLoad = true;
    len = document.forms[0].elements.length;
    var ajax=ajaxinit();
    ajax.open("POST", "/workflow/request/WorkflowChangeShowAttrAjax.jsp", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("workflowid="+workflowid+"&nodeid="+nodeid+"&fieldid="+fieldid+"&fieldvalue="+fieldvalue);
    // 获取执行状态
    ajax.onreadystatechange = function() {
        // 如果执行状态成功，那么就把返回信息写到指定的层里
        if (ajax.readyState == 4 && ajax.status == 200) {
            try{
            var returnvalues=ajax.responseText;
            if(returnvalues!=""){
                //if(window.console) { console.log("fieldid = "+fieldid+" fieldvalue="+fieldvalue+" returnvalues = "+returnvalues);}
                var tfieldid=fieldid.split("_");
                var isdetail=tfieldid[1];
                var fieldarray=returnvalues.split("&");
            
                for(n=0;n<fieldarray.length;n++){
                    var fieldattrs=fieldarray[n].split("$");
                    var fieldids=fieldattrs[0];
                    var fieldattr=fieldattrs[1];
                    var fieldidarray=fieldids.split(",");
                    //表单设计器模板主表支持联动隐藏功能（4隐藏内容、5隐藏行）
                    if(rownum<0 && jQuery("input#edesign_layout").length>0){
                    	if(!triByLoad)		//后台模板解析隐藏，页面加载不触发
                    		viewattrOperator.linkageControlHide(fieldids, fieldattr, false);
                    	if(fieldattr==4 || fieldattr==5)
                    		fieldattr = -1;
                    }
                    if(fieldattr==-1){ // 没有设置联动，恢复原值和恢复原显示属性
                        for(i=0;i<len;i++){
                            for(j=0;j<fieldidarray.length;j++){
                                var tfieldidarray=fieldidarray[j].split("_");
                                if (tfieldidarray[1]==isdetail){
                                    if(rownum>-1){  // 明细字段
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]+"_"+rownum&&$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum)){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum).value;
                                            if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                
                                                if(isedit==3){
                                           
                                                    document.forms[0].elements[i].setAttribute('viewtype','1');
                                                    if(document.forms[0].elements[i].value==""&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")<=0) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                    
                                                    try{
                                                        if(document.forms[0].elements[i].value==""&&$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")<=0){
                                                            $GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                            $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                        }
                                                    }catch(e){}
                                                    if(!!$GetEle('field'+tfieldidarray[0]+"_"+rownum+"spanimg")){
                                                        if(document.forms[0].elements[i].value==""){
                                                            $GetEle('field'+tfieldidarray[0]+"_"+rownum+"spanimg").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                            $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                        }
                                                    }
                                                    //多行文本带编辑器
                                                    try{
                                                        if(jQuery("#field"+'field'+tfieldidarray[0]+"_"+rownum).find("iframe").length > 0){
                                                              if(!!UE.getEditor('field'+tfieldidarray[0]+"_"+rownum)){
                                                                 var content = UE.getEditor('field'+tfieldidarray[0]+"_"+rownum).getContent();
                                                                 if(jQuery.trim(content)==""){
                                                                    $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                                 }
                                                              }
                                                        }
                                                    }catch(e){
                                                        //alert(e);
                                                    }
                                                    setFieldReadOnly(tfieldidarray[0]+"_"+rownum,false,fieldattr);
                                                    if(checkstr_.indexOf("field"+tfieldidarray[0]+"_"+rownum+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0]+"_"+rownum;
                                                }
                                                if(isedit==2){
                                                    
                                                    document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                    try{
                                                        if($GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                            $GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                        }
                                                    }catch(e){}
                                                    if(!!$GetEle('field'+tfieldidarray[0]+"_"+rownum+"spanimg")){
                                                        if(document.forms[0].elements[i].value==""){
                                                            $GetEle('field'+tfieldidarray[0]+"_"+rownum+"spanimg").innerHTML="";
                                                            $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                        }
                                                    }
                                                    
                                                    setFieldReadOnly(tfieldidarray[0]+"_"+rownum ,false,fieldattr);
                                                    $GetEle("needcheck").value=checkstr_.replace(new RegExp("field"+tfieldidarray[0]+"_"+rownum+",","g"),"");
                                                }
                                                
                                                
                                            }else{
                                                
                                                if($GetEle('field_'+tfieldidarray[0]+"_"+rownum+"span")){

                                                    if(document.getElementById("fsUploadProgress"+tfieldidarray[0]+"_"+rownum)){
                                                        clearSWFUploadRequired(tfieldidarray[0]+"_"+rownum);//add by td78113
                                                        jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_remind").attr("title","");
                                                    }
                                                    jQuery("#oldfieldview"+tfieldidarray[0]+"_"+rownum).attr("_readonly","1");
                                                    if(jQuery("#oldfieldview"+tfieldidarray[0]+"_"+rownum).length==0){
                                                        jQuery("input[name='oldfieldview"+tfieldidarray[0]+"_"+rownum+"']").attr("_readonly","1");
                                                        jQuery("input[name='oldfieldview"+tfieldidarray[0]+"_"+rownum+"']").attr("id","oldfieldview"+tfieldidarray[0]+"_"+rownum+"");
                                                    }
                                                    
                                                    //判断附件字段
                                                    /////////////////
                                                    if(isedit==3) {
                                                         if($GetEle('field_'+tfieldidarray[0]+"_"+rownum+"span")){
                                                             setFieldReadOnly(tfieldidarray[0]+"_"+rownum+"",false,fieldattr);
                                                             addSWFUploadRequired(tfieldidarray[0]+"_"+rownum);//add by td78113
                                                             jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_remind").attr("title",SystemEnv.getHtmlNoteName(4062));
                                                             
                                                             uploadAttachmentDisd(tfieldidarray[0]+"_"+rownum);
                                                             jQuery(".progressCancel1").attr("class","progressCancel");
                                                             jQuery('#field_'+tfieldidarray[0]+"_"+rownum+"span").css("display","inline-block");
                                                             if(isEmptyfsUpdaload(tfieldidarray[0]+"_"+rownum)){
                                                                 jQuery("#field_"+tfieldidarray[0]+"_"+rownum+"span").css("display","inline-block");
                                                                 $GetEle("field_"+tfieldidarray[0]+"_"+rownum+"span").innerHTML=SystemEnv.getHtmlNoteName(97);
                                                             }else{
                                                                 $GetEle("field_"+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                             }
                                                             
                                                             var checkstr_=$GetEle("needcheck").value+",";
                                                             if(checkstr_.indexOf("field"+tfieldidarray[0]+"_"+rownum+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0]+"_"+rownum;
                                                             //jQuery("#field"+tfieldidarray[0]+"_"+rownum).attr("viewtype","1");
                                                             document.getElementById("field"+tfieldidarray[0]+"_"+rownum).setAttribute('viewtype','1');
                                                         }
                                                     }
                                                    if(isedit==2) {
                                                        if($GetEle('field_'+tfieldidarray[0]+"_"+rownum+"span")){
                                                            setFieldReadOnly(tfieldidarray[0]+"_"+rownum+"",false,fieldattr);
                                                            jQuery("#field_"+tfieldidarray[0]+"_"+rownum+"span").css("display","none");
                                                            jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_remind").attr("title",SystemEnv.getHtmlNoteName(4062));
                                                            //jQuery("#field_"+tfieldidarray[0]+"span").innerHTML("");
                                                            if(document.getElementById("fsUploadProgress"+tfieldidarray[0]+"_"+rownum)){
                                                                clearSWFUploadRequired(tfieldidarray[0]+"_"+rownum);//add by td78113
                                                                uploadAttachmentDisd(tfieldidarray[0]+"_"+rownum);
                                                            }
                                                            try{
                                                                var checkstr__=$GetEle("needcheck").value+",";
                                                                document.all("needcheck").value=checkstr__.replace(new RegExp("field"+tfieldidarray[0]+"_"+rownum+",","g"),"");
                                                                //document.forms[0].elements[i].viewtype="0";
                                                                jQuery("#field"+tfieldidarray[0]+"_"+rownum).attr("viewtype","0");
                                                            }catch(e){
                                                            }
                                                        }
                                                    }
                                                    /////////////////
                                                    
                                                }
               
                                                if(document.all('field'+tfieldidarray[0]+"_"+rownum)!=null && document.all('field'+tfieldidarray[0]+"_"+rownum).type=="checkbox"){//check框
                                                    document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    if(isedit==3){
                                                        document.forms[0].elements[i].setAttribute('viewtype','1');
                                                    }
                                                    setFieldReadOnly(tfieldidarray[0]+"_"+rownum ,false,fieldattr);
                                                    document.all('field'+tfieldidarray[0]+"_"+rownum).onclick=null;
                                                }
                                            }
                                        }
                                    }else{     // 主字段
                              
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]&&$GetEle('oldfieldview'+tfieldidarray[0])){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]).value;
                                            if($GetEle('field'+tfieldidarray[0]+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if(document.getElementById("fsUploadProgress"+tfieldidarray[0])){
                                                    clearSWFUploadRequired(tfieldidarray[0]);//add by td78113
                                                    uploadAttachmentDisd(tfieldidarray[0]);
                                                }
                                                if(isedit==3) {
                                                    document.forms[0].elements[i].setAttribute('viewtype','1');
                                                    if(document.forms[0].elements[i].value=="") {
                                                        $GetEle('field'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                        if(jQuery("#field"+tfieldidarray[0]+"__").length>0){
                                                            $GetEle('field'+tfieldidarray[0]+"span").innerHTML = "";
                                                            $GetEle('field'+tfieldidarray[0]+"spanimg").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                        }
                                                        jQuery('#field_'+tfieldidarray[0]+"span").css("display","inline-block");
                                                    }
                                                    //判断附件字段
                                                    if(document.getElementById("fsUploadProgress"+tfieldidarray[0])){
                                                        addSWFUploadRequired(tfieldidarray[0]);//add by td78113
                                                        if(document.getElementById("fsUploadProgress"+tfieldidarray[0]).children.length>0){
                                                            if(isEmptyfsUpdaload(tfieldidarray[0]))
                                                                //document.all('field'+tfieldidarray[0]+"span").innerHTML="";
                                                                $GetEle("field_"+tfieldidarray[0]+"span").innerHTML="";
                                                        }
                                                        
                                                        uploadAttachmentDisd(tfieldidarray[0]);
                                                    }
                                                    
                                                    try{
                                                        if(document.forms[0].elements[i].value==""){
                                                            $GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                            $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
                                                            jQuery('#field_'+tfieldidarray[0]+"span").css("display","none");
                                                        }
                                                    }catch(e){}
                                                    //多行文本 带编辑器
                                                    if(jQuery("#field"+tfieldidarray[0]).find("iframe").length > 0){
                                                          if(!!UE.getEditor('field'+tfieldidarray[0])){
                                                             var content = UE.getEditor('field'+tfieldidarray[0]).getContent();
                                                             if(jQuery.trim(content)==""){
                                                                $GetEle('field'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                             }
                                                          }
                                                    }
                                                    setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                                    if(checkstr_.indexOf("field"+tfieldidarray[0]+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0];
                                                }
                                                if(isedit==2) {
                                                    document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    if($GetEle('field'+tfieldidarray[0]+"span") && $GetEle('field'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1) $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
                                                    if($GetEle('field'+tfieldidarray[0]+"spanimg") && $GetEle('field'+tfieldidarray[0]+"spanimg").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1) $GetEle('field'+tfieldidarray[0]+"spanimg").innerHTML="";
                                                    
                                                    try{
                                                        if($GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                            $GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="";
                                                        }
                                                        jQuery('#field_'+tfieldidarray[0]+"span").css("display","none");
                                                    }catch(e){}
                                                    if(jQuery("#field"+tfieldidarray[0]).find("iframe").length > 0){
                                                          if(!!UE.getEditor('field'+tfieldidarray[0])){
                                                             UE.getEditor('field'+tfieldidarray[0]).setEnabled();
                                                          }
                                                    }
                                                    
                                                    setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                                    $GetEle("needcheck").value=checkstr_.replace(new RegExp("field"+tfieldidarray[0]+",","g"),"");
                                                }
                                            }else if($GetEle('field_'+tfieldidarray[0]+"span")){//判断附件字段
                                                jQuery("#oldfieldview"+tfieldidarray[0]).attr("_readonly","1");
                                                if(jQuery("#oldfieldview"+tfieldidarray[0]).length==0){
                                                    jQuery("input[name='oldfieldview"+tfieldidarray[0]+"']").attr("_readonly","1");
                                                    jQuery("input[name='oldfieldview"+tfieldidarray[0]+"']").attr("id","oldfieldview"+tfieldidarray[0]+"");
                                                }
                                                /////////////////
                                                if(isedit==3) {
                                                     if($GetEle('field_'+tfieldidarray[0]+"span")){
                                                         setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                                         addSWFUploadRequired(tfieldidarray[0]);//add by td78113
                                                         jQuery(".progressCancel1").attr("class","progressCancel");
                                                         jQuery('#field_'+tfieldidarray[0]+"span").css("display","inline-block");
                                                         if(isEmptyfsUpdaload(tfieldidarray[0])){
                                                             jQuery("#field_"+tfieldidarray[0]+"span").css("display","inline-block");
                                                             $GetEle("field_"+tfieldidarray[0]+"span").innerHTML=SystemEnv.getHtmlNoteName(97);
                                                         }else{
                                                             $GetEle("field_"+tfieldidarray[0]+"span").innerHTML="";
                                                         }
                                                         var checkstr_=$GetEle("needcheck").value+",";
                                                         if(checkstr_.indexOf("field"+tfieldidarray[0]+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0];
                                                         //jQuery("#field"+tfieldidarray[0]).attr("viewtype","1");
                                                         document.getElementById("field"+tfieldidarray[0]).setAttribute('viewtype','1');
                                                         
                                                         uploadAttachmentDisd(tfieldidarray[0]);
                                                     }
                                                 }
                                                if(isedit==2) {
                                                    if($GetEle('field_'+tfieldidarray[0]+"span")){
                                                        setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                                        jQuery("#field_"+tfieldidarray[0]+"span").css("display","none");
                                                        //jQuery("#field_"+tfieldidarray[0]+"span").innerHTML("");
                                                        if(document.getElementById("fsUploadProgress"+tfieldidarray[0])){
                                                            clearSWFUploadRequired(tfieldidarray[0]);//add by td78113
                                                            
                                                            uploadAttachmentDisd(tfieldidarray[0]);
                                                        }
                                                        try{
                                                            var checkstr__=$GetEle("needcheck").value+",";
                                                            document.all("needcheck").value=checkstr__.replace(new RegExp("field"+tfieldidarray[0]+",","g"),"");
                                                            //document.forms[0].elements[i].viewtype="0";
                                                            jQuery("#field"+tfieldidarray[0]).attr("viewtype","0");
                                                        }catch(e){
                                                        }
                                                    }
                                                }
                                                /////////////////
                                            }else{
                                                if(document.all('field'+tfieldidarray[0])!=null && document.all('field'+tfieldidarray[0]).type=="checkbox"){//check框
                                                    document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    if(isedit==3){
                                                        document.forms[0].elements[i].setAttribute('viewtype','1');
                                                    }
                                                    setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                                    document.all('field'+tfieldidarray[0]).onclick=null;
                                                }
                                            }
                                            
                                        }
                                        if (jQuery("#outfield"+tfieldidarray[0]+"div").length > 0) {
                                             var _isMustInput = jQuery("#field"+tfieldidarray[0]).attr('_isMustInput');
                                             if (!!_isMustInput) {
                                                 jQuery("#field"+tfieldidarray[0]).attr('isMustInput', _isMustInput);
                                                 jQuery("#field"+tfieldidarray[0]).removeAttr('_isMustInput');
                                             } else {
                                                jQuery("#field"+tfieldidarray[0]).removeAttr('isMustInput');
                                             }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(fieldattr==1){// 为编辑，显示属性设为编辑
                        for(i=0;i<len;i++){
                            for(j=0;j<fieldidarray.length;j++){
                                var tfieldidarray=fieldidarray[j].split("_");
                                if (tfieldidarray[1]==isdetail){
                                    if(rownum>-1){  // 明细字段
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]+"_"+rownum&&$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum)){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum).value;
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                
                                                try{
                                                    if($GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                        $GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                    }
                                                }catch(e){}
                                                $GetEle("needcheck").value=checkstr_.replace(new RegExp("field"+tfieldidarray[0]+"_"+rownum+",","g"),"");
                                                document.forms[0].elements[i].setAttribute('viewtype','0');
                                                
                                            }else{
                                                if(document.all('field'+tfieldidarray[0]+"_"+rownum)!=null && document.all('field'+tfieldidarray[0]+"_"+rownum).type=="checkbox"){//check框
                                                    document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    //readyOnlyStyle(document.all('field'+tfieldidarray[0]+"_"+rownum),false);
                                                    document.all('field'+tfieldidarray[0]+"_"+rownum).onclick=null;
                                                }
                                            }
                                            setFieldReadOnly(tfieldidarray[0]+"_"+rownum,false,fieldattr);
                                            if($GetEle('field_'+tfieldidarray[0]+"_"+rownum+"span")){
                                                jQuery("#field_"+tfieldidarray[0]+"_"+rownum+"span").css("display","none");     
                                                jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_remind").attr("title",SystemEnv.getHtmlNoteName(4062));
                                                if(document.getElementById("fsUploadProgress"+tfieldidarray[0]+"_"+rownum)){
                                                    clearSWFUploadRequired(tfieldidarray[0]+"_"+rownum);//add by td78113
                                                    uploadAttachmentDisd(tfieldidarray[0]+"_"+rownum);
                                                }
                                                //将附件删除按钮显示
                                                jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_tab").find("div[id^='fieldCancleChange1']").each(function(){
                                                        jQuery(this).attr("id","fieldCancleChange");
                                                    });
                                                try{
                                                    var checkstr__=$GetEle("needcheck").value+",";
                                                    document.all("needcheck").value=checkstr__.replace(new RegExp("field"+tfieldidarray[0]+"_"+rownum+",","g"),"");
                                                    jQuery("#field"+tfieldidarray[0]+"_"+rownum).attr("viewtype","0");
                                                }catch(e){
                                                }
                                            }
                                        }
                                    }else{     // 主字段
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]&&$GetEle('oldfieldview'+tfieldidarray[0])){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]).value;
                                            if(isedit>1&&$GetEle('field_'+tfieldidarray[0]+"span")){
                                                jQuery('#field_'+tfieldidarray[0]+"span").css("display","none");
                                                //判断附件字段
                                                if(document.getElementById("fsUploadProgress"+tfieldidarray[0])){
                                                    clearSWFUploadRequired(tfieldidarray[0]);//add by td78113
                                                    
                                                    uploadAttachmentDisd(tfieldidarray[0]);
                                                }
                                            }
                                            if(isedit>1&&($GetEle('field'+tfieldidarray[0]+"span")||$GetEle('field'+tfieldidarray[0]+"spanimg"))){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                //判断附件字段
                                                if(document.getElementById("fsUploadProgress"+tfieldidarray[0])){
                                                    clearSWFUploadRequired(tfieldidarray[0]);//add by td78113
                                                    
                                                    uploadAttachmentDisd(tfieldidarray[0]);
                                                }
                                                if($GetEle('field'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1) $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
                                                if(!!$GetEle('field'+tfieldidarray[0]+"spanimg")){
                                                    if($GetEle('field'+tfieldidarray[0]+"spanimg").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1) $GetEle('field'+tfieldidarray[0]+"spanimg").innerHTML="";
                                                }
                                                try{
                                                    if($GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                        $GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="";
                                                    }
                                                }catch(e){}
                                                $GetEle("needcheck").value=checkstr_.replace(new RegExp("field"+tfieldidarray[0]+",","g"),"");
                                                document.forms[0].elements[i].setAttribute('viewtype','0');
                                            }else{
                                                if(document.all('field'+tfieldidarray[0])!=null && document.all('field'+tfieldidarray[0]).type=="checkbox"){//check框
                                                    document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    //readyOnlyStyle(document.all('field'+tfieldidarray[0]),false);
                                                    document.all('field'+tfieldidarray[0]).onclick=null;
                                                }
                                            }
                                            setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                            try{
                                                var checkstr__=$GetEle("needcheck").value+",";
                                                document.all("needcheck").value=checkstr__.replace(new RegExp("field"+tfieldidarray[0]+",","g"),"");
                                                //document.forms[0].elements[i].viewtype="0";
                                                //jQuery("#field"+tfieldidarray[0]).attr("viewtype","0");
												document.getElementById("field"+tfieldidarray[0]).setAttribute("viewtype","0");
                                                jQuery(".progressCancel1").attr("class","progressCancel");
                                            }catch(e){
                                            }
                                        }
                                         if (jQuery("#outfield"+tfieldidarray[0]+"div").length > 0) {
                                            var _isMustInput = jQuery("#field"+tfieldidarray[0]).attr('_isMustInput');
                                             if (!!_isMustInput) {
                                                 jQuery("#field"+tfieldidarray[0]).attr('isMustInput', _isMustInput);
                                                 jQuery("#field"+tfieldidarray[0]).removeAttr('_isMustInput');
                                             } else {
                                                jQuery("#field"+tfieldidarray[0]).removeAttr('isMustInput');
                                             }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(fieldattr==2){// 为必填，显示属性设为编辑
                        for(i=0;i<len;i++){
                            for(j=0;j<fieldidarray.length;j++){
                                var tfieldidarray=fieldidarray[j].split("_");
                                if (tfieldidarray[1]==isdetail){
                                    if(rownum>-1){  // 明细字段
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]+"_"+rownum&&$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum)){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum).value;
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                if(document.forms[0].elements[i].value==""&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")<=0) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                try{
                                                    if(document.forms[0].elements[i].value==""&&$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")<=0){
                                                        $GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                        $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                    }
                                                }catch(e){}
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if(checkstr_.indexOf("field"+tfieldidarray[0]+"_"+rownum+",")<0) {
                                                    $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0]+"_"+rownum;
                                                }
                                                document.forms[0].elements[i].setAttribute('viewtype','1');
                                            }else{
                                                if(document.all('field'+tfieldidarray[0]+"_"+rownum)!=null && document.all('field'+tfieldidarray[0]+"_"+rownum).type=="checkbox"){//check框
                                                    document.forms[0].elements[i].setAttribute('viewtype','1');
                                                    //readyOnlyStyle(document.all('field'+tfieldidarray[0]+"_"+rownum),false);
                                                    document.all('field'+tfieldidarray[0]+"_"+rownum).onclick=null;
                                                }
                                            }
                                            setFieldReadOnly(tfieldidarray[0]+"_"+rownum ,false,fieldattr);
                                            
                                            //判断附件字段
                                            if(document.getElementById("fsUploadProgress"+tfieldidarray[0]+"_"+rownum)){
                                                setFieldReadOnly(tfieldidarray[0]+"_"+rownum+"",false,fieldattr);
                                                addSWFUploadRequired(tfieldidarray[0]+"_"+rownum);//add by td78113
                                                //document.all('field'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                //alert("field_"+tfieldidarray[0]+"span");
                                                //jQuery(".progressCancel1").attr("class","progressCancel");
                                                //if(document.getElementById("fsUploadProgress"+tfieldidarray[0]).children.length>0){
                                                jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_remind").attr("title",SystemEnv.getHtmlNoteName(4062));
                                                if(isEmptyfsUpdaload(tfieldidarray[0]+"_"+rownum)){
                                                    //document.all('field'+tfieldidarray[0]+"span").innerHTML="";
                                                     var checkstr_=$GetEle("needcheck").value+",";
                                                     
                                                     jQuery("#field_"+tfieldidarray[0]+"_"+rownum+"span").css("display","inline-block");
                                                     $GetEle("field_"+tfieldidarray[0]+"_"+rownum+"span").innerHTML=SystemEnv.getHtmlNoteName(97);
                                                     if(checkstr_.indexOf("field"+tfieldidarray[0]+"_"+rownum+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0]+"_"+rownum;
                                                 }else{
                                                     $GetEle("field_"+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                 }
                                                 //将附件删除按钮显示
                                                 jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_tab").find("div[id^='fieldCancleChange1']").each(function(){
                                                        jQuery(this).attr("id","fieldCancleChange");
                                                    });
                                                 //jQuery("#field"+tfieldidarray[0]+"_"+rownum).attr("viewtype","1");
                                                 document.getElementById("field"+tfieldidarray[0]+"_"+rownum).setAttribute('viewtype','1');
                                                 
                                                 uploadAttachmentDisd(tfieldidarray[0]+"_"+rownum);
                                             }
                                        }
                                    }else{     // 主字段        
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]&&$GetEle('oldfieldview'+tfieldidarray[0])){
                                            //必填时 主表字段如果没有值则增加叹号标识
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]).value;
                                            
                                            if(isedit>1&&$GetEle('field_'+tfieldidarray[0]+"span")){
                                                jQuery('#field_'+tfieldidarray[0]+"span").css("display","inline-block");
                                            }
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"span")){
	                                            try{
	                                                if(!!$GetEle('field'+tfieldidarray[0]+"spanimg")&&$GetEle('field'+tfieldidarray[0]+"span").innerHTML==""){
	                                                    //alert(tfieldidarray[0]);
	                                                    $GetEle('field'+tfieldidarray[0]+"spanimg").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
	                                                    $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
	                                                }
	                                                
	                                                if(!!$GetEle('field_lable'+tfieldidarray[0]) && $GetEle('field_lable'+tfieldidarray[0]).value==""){
	                                                    $GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
	                                                    $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
	                                                }
	                                            }catch(e){
		                                            
	                                            }
                                                setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                                //提交校验必填
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                
                                                if(checkstr_.indexOf("field"+tfieldidarray[0]+",")<0){
                                                    $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0];
                                                }
                                                
                                            }
         
                                                try{
                                                    if($GetEle('field_lable'+tfieldidarray[0]+"span")){
                                                        if($GetEle('field_lable'+tfieldidarray[0]+"").value==''){
                                                            $GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                        }
                                                    }
                                                }catch(e){}
                                            //判断附件字段
                                            if(document.getElementById("fsUploadProgress"+tfieldidarray[0])){
                                                setFieldReadOnly(tfieldidarray[0]+"",false,fieldattr);
                                                addSWFUploadRequired(tfieldidarray[0]);//add by td78113
                                                //document.all('field'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
                                                //alert("field_"+tfieldidarray[0]+"span");
                                                jQuery(".progressCancel1").attr("class","progressCancel");
                                                //if(document.getElementById("fsUploadProgress"+tfieldidarray[0]).children.length>0){
                                                 if(isEmptyfsUpdaload(tfieldidarray[0])){
                                                    //document.all('field'+tfieldidarray[0]+"span").innerHTML="";
                                                     var checkstr_=$GetEle("needcheck").value+",";
                                                     $GetEle("field_"+tfieldidarray[0]+"span").innerHTML=SystemEnv.getHtmlNoteName(97);
                                                     if(checkstr_.indexOf("field"+tfieldidarray[0]+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0];
                                                 }else{
                                                     $GetEle("field_"+tfieldidarray[0]+"span").innerHTML="";
                                                 }
                                                 //alert(jQuery("#field"+tfieldidarray[0]).attr("viewtype"));
                                                 //jQuery("#field"+tfieldidarray[0]).attr("viewtype","1");
                                                 document.getElementById("field"+tfieldidarray[0]).setAttribute('viewtype','1');
                                                 //alert(jQuery("#field"+tfieldidarray[0]).attr("viewtype"));
                                                //}
                                                
                                                 uploadAttachmentDisd(tfieldidarray[0]);
                                             }
                                        }
                                         if (jQuery("#outfield"+tfieldidarray[0]+"div").length > 0) {
                                             var isMustInput = jQuery("#field"+tfieldidarray[0]).attr('isMustInput');
                                             if (!!isMustInput) {
                                                 jQuery("#field"+tfieldidarray[0]).attr('_isMustInput', isMustInput);
                                             }
                                             jQuery("#field"+tfieldidarray[0]).attr('isMustInput', 2);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(fieldattr==3){//为只读，显示属性设为编辑
                        for(i=0;i<len;i++){
                            for(j=0;j<fieldidarray.length;j++){
                                var tfieldidarray=fieldidarray[j].split("_");
                                if (tfieldidarray[1]==isdetail){
                                    if(rownum>-1){  //明细字段
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]+"_"+rownum&&$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum)){
                                            if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                    if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                        $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                    }
                                                }
                                                setFieldReadOnly(tfieldidarray[0]+"_"+rownum,true,fieldattr);
                                                try{
                                                    if($GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                        $GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                    }
                                                }catch(e){
                                                }
                                                $GetEle("needcheck").value = checkstr_.replace(new RegExp("field"+tfieldidarray[0]+"_"+rownum+",","g"),"");
                                                document.forms[0].elements[i].viewtype="0";
                                            }else{
                                                //check框
                                                if(document.all('field'+tfieldidarray[0]+"_"+rownum)!=null && document.all('field'+tfieldidarray[0]+"_"+rownum).type=="checkbox"){
                                                    //readyOnlyStyle(document.all('field'+tfieldidarray[0]+"_"+rownum),true);
                                                    var checked=document.all('field'+tfieldidarray[0]+"_"+rownum).checked;
                                                    document.forms[0].elements[i].viewtype="0";
                                                    document.all('field'+tfieldidarray[0]+"_"+rownum).onclick=function(){
                                                        this.checked=checked;
                                                    }
                                                }
                                            }
                                            
                                            //判断附件字段
                                            if($GetEle('field_'+tfieldidarray[0]+"_"+rownum+"span")){
                                                jQuery('#field_'+tfieldidarray[0]+"_"+rownum+"span").css("display","none");
                                                $GetEle("field_"+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_remind").attr("title","");
                                            }
                                            try{
                                                //if(jQuery("#field"+tfieldidarray[0]+"_tab").length>0){
                                                //  attachmentDisd(tfieldidarray[0],true);
                                                //}
                                                if(document.getElementById("fsUploadProgress"+tfieldidarray[0]+"_"+rownum)){
                                                    jQuery("#field"+tfieldidarray[0]+"_"+rownum).attr("viewtype","0");                      
                                                    //将附件删除按钮隐藏
                                                    jQuery("#field"+tfieldidarray[0]+"_"+rownum+"_tab").find("div[id^='fieldCancleChange']").each(function(){
                                                        jQuery(this).attr("id","fieldCancleChange1");
                                                    });
                                                    var req=$GetEle("oUpload_"+tfieldidarray[0]+"_"+rownum+"_linkrequired");
                                                    if(req)req.value="false";
                                                    attachmentDisd(tfieldidarray[0]+"_"+rownum,true);
                                                    jQuery('#field_'+tfieldidarray[0]+"_"+rownum+"span").css("display","none");
                                                    
                                                    jQuery("#oldfieldview"+tfieldidarray[0]+"_"+rownum).attr("_readonly","1");
                                                    if(jQuery("#oldfieldview"+tfieldidarray[0]+"_"+rownum).length==0){
                                                        jQuery("input[name='oldfieldview"+tfieldidarray[0]+"_"+rownum+"']").attr("_readonly","1");
                                                        jQuery("input[name='oldfieldview"+tfieldidarray[0]+"_"+rownum+"']").attr("id","oldfieldview"+tfieldidarray[0]+"_"+rownum+"");
                                                    }
                                                }
                                                
                                            }catch(e){
                                                //alert(e.message);
                                            }
                                            try{
                                                var checkstr_ = $GetEle("needcheck").value +",";    
                                                $GetEle("needcheck").value = checkstr_.replace(new RegExp("field"+tfieldidarray[0]+"_"+rownum+",","g"),"");
                                                //document.forms[0].elements[i].viewtype="0";

                                            }catch(e){
                                            }
                                        }
                                    }else{     //主字段
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]&&$GetEle('oldfieldview'+tfieldidarray[0])){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]).value;
                                            if(isedit>1&&$GetEle('field_'+tfieldidarray[0]+"span")){
                                                jQuery('#field_'+tfieldidarray[0]+"span").css("display","none");
                                            }
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"span")){
                                               //去除必填标识
                                                if(!!$GetEle('field'+tfieldidarray[0]+"spanimg")){
                                                     $GetEle('field'+tfieldidarray[0]+"spanimg").innerHTML="";
                                                }
                                   
                                                if(!!$GetEle('field'+tfieldidarray[0]+"span")){
                                                    if($GetEle('field'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                        $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
                                                    }
                                                }

                                                 try{
                                                    if($GetEle('field_lable'+tfieldidarray[0]+"span")){
                                                        if($GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError_wev8.gif")>-1){
                                                            $GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="";
                                                        }
                                                    }
                                                }catch(e){}
                                                
                                            }
                                            setFieldReadOnly(tfieldidarray[0],true,fieldattr);
                                            //判断附件字段
                                            try{
                                                //if(jQuery("#field"+tfieldidarray[0]+"_tab").length>0){
                                                //  attachmentDisd(tfieldidarray[0],true);
                                                //}
                                                if(document.getElementById("fsUploadProgress"+tfieldidarray[0])){
                                                    jQuery("#field"+tfieldidarray[0]).attr("viewtype","0");
                                                    jQuery(".progressCancel").attr("class","progressCancel1");
                                                    var req=$GetEle("oUpload_"+tfieldidarray[0]+"_linkrequired");
                                                    if(req)req.value="false";
                                                    attachmentDisd(tfieldidarray[0],true);
                                                    jQuery("#oldfieldview"+tfieldidarray[0]).attr("_readonly","1");
                                                    if(jQuery("#oldfieldview"+tfieldidarray[0]).length==0){
                                                        jQuery("input[name='oldfieldview"+tfieldidarray[0]+"']").attr("_readonly","1");
                                                        jQuery("input[name='oldfieldview"+tfieldidarray[0]+"']").attr("id","oldfieldview"+tfieldidarray[0]+"");
                                                    }
                                                }
                                            }catch(e){
                                                //alert(e.message);
                                            }

                                            try{
                                                var checkstr_ = $GetEle("needcheck").value +",";    
                                                $GetEle("needcheck").value = checkstr_.replace(new RegExp("field"+tfieldidarray[0]+",","g"),"");
                                                //document.forms[0].elements[i].viewtype="0";

                                            }catch(e){
                                            }
                                        }
                                        if (jQuery("#outfield"+tfieldidarray[0]+"div").length > 0) {
                                            var _isMustInput = jQuery("#field"+tfieldidarray[0]).attr('_isMustInput');
                                             if (!!_isMustInput) {
                                                 jQuery("#field"+tfieldidarray[0]).attr('isMustInput', _isMustInput);
                                                 jQuery("#field"+tfieldidarray[0]).removeAttr('_isMustInput');
                                             } else {
                                                jQuery("#field"+tfieldidarray[0]).removeAttr('isMustInput');
                                             }
                                        }
                                    } 
                                }
                            }
                        }
                    }
                }
            }
                // alert($GetEle("needcheck").value);
            }catch(e){}
        }
    }
}

function uploadAttachmentDisd(fieldid){
    var selectuploadmaxfieldid = jQuery("#uploadType").val(); //附件上传 是选择目录是，目录为空则将上传按钮disabled
    if(selectuploadmaxfieldid=="1"){
         var selectvalue = jQuery("#selectfieldvalue").val();
         if(selectvalue==""){
             attachmentDisd(fieldid,true);
             jQuery("#field"+fieldid+"_remind").attr("title","");
         }
    }
    jQuery("#oldfieldview"+fieldid).attr("_readonly","0");
    if(jQuery("#oldfieldview"+fieldid).length==0){
        jQuery("input[name='oldfieldview"+fieldid+"']").attr("_readonly","0");
        jQuery("input[name='oldfieldview"+fieldid+"']").attr("id","oldfieldview"+fieldid+"");
    }
}


//设置为只读
function setReadOnly(obj){
     if(obj.type == "select-one"){//下拉字段
        obj.onmouseover = function(){this.setCapture();};   
        obj.onmouseout = function(){this.releaseCapture();}; 
        jQuery(obj).bind("change",{index:obj.selectedIndex},selectOnly);
    }else if(obj.type == "hidden"){//金额转换
        var name=obj.name.replace("field","field_lable");
        if(obj['datatype']=='float' && document.all(name)!=null){
            document.all(name).disabled=true;
            document.all(name).title=getTitleTip();
        }
    }
    readyOnlyStyle(obj,true);
}

//浏览按钮选择设置只读
function setBrowserReadOnly(fieldid,flag){
    if(jQuery("#outfield"+fieldid+"div").next().find("button").length > 0){
         jQuery("#outfield"+fieldid+"div").next().find("button").attr("disabled","disabled");
         jQuery("#field"+fieldid+"browser").hide();
    }
    if(jQuery("#field"+filedid+"_browserbtn")){
        jQuery("#field"+filedid+"_browserbtn").hide();
    }
}

/**
*   2015-01-12 字段字段控制
*   fieldid : 字段ID
*   flag : 是否必填,true 必填，flase 恢复默认
*   fieldattr : 字段属性操作，3:必填/2:可编辑
*/
function setFieldReadOnly(fieldid,flag,fieldattr){
    if(flag){
        //设置为只读
        try{
            //选择框
            var obj = jQuery("#field"+fieldid+"");
            var objTagname = $GetEle("field"+fieldid+"").tagName ;
            //名称规则为 field"+fielid+"_readonlytext. 
            var tempid = "field"+fieldid+"_readonlytext";
            var prestr = "<span id='"+tempid+"' style='line-height:30px!important;'>" ;
            var endstr = "</span>";
            var afterstr = "";
            var iscreate = true ;
            try{
                jQuery("#"+tempid).remove();//移除显示的span
                if(jQuery("#"+tempid).length>0){
                    removeElement($GetEle(tempid));
                    iscreate = true ;
                }
            }catch(ex){
                if(window.console) console.log("removeElement flag="+flag+"  error : "+ex.message+" span length = "+jQuery("#"+tempid).length);
            }
            
            //下拉字段
            if(objTagname == "SELECT"){
                afterstr = obj.find("option:selected").text();
                if(iscreate){
                    obj.after(prestr+afterstr+endstr);
                }
                obj.hide();
            }else if(objTagname == 'TEXTAREA'){
                if(obj.length==0){
                     obj = jQuery("textarea[name='field"+fieldid+"']");
                }
                //编辑器的多行文档
                if(jQuery("#field"+fieldid).find("iframe").length > 0){
                      if(!!UE.getEditor('field'+fieldid)){
                         afterstr = UE.getEditor('field'+fieldid).getContent();
                         UE.getEditor('field'+fieldid).setHide();//隐藏编辑器框
                      }
                      if(iscreate){
                      obj.after(prestr+afterstr+endstr);
                      }
                      obj.hide();
                }else{
                    //不带编辑器的多行文本
                    afterstr = obj.val();
                    if(iscreate){
                        obj.after(prestr+afterstr+endstr);
                    }
                    obj.hide();
                    try{
                        var height = obj.css("height");
                    }catch(e){
                        
                    }
                }
            }else if(objTagname == 'DIV'){//UE编辑把field+fieldid占用了。 通过div在来判断
                    if(!!UE.getEditor('field'+fieldid)){
                        afterstr = UE.getEditor('field'+fieldid).getContent();
                        UE.getEditor('field'+fieldid).setHide();//隐藏编辑器框
                        if(iscreate){
                            obj.after(prestr+afterstr+endstr);
                        }
                        obj.hide();
                    }
                    
            }else if(objTagname == 'INPUT'){ //所有input属性的
                 if(obj.length==0){
                     obj = jQuery("input[name='field"+fieldid+"']");
                 }
                 if(obj.attr("type") == "text"){//文本类型
                    //表单设计器设置单元格格式
                    var obj_format = jQuery("input[name='field"+fieldid+"_format']");
                    if(obj_format.length > 0){
                        obj_format.hide();
                        afterstr = obj_format.val();
                    }else{
                        afterstr = obj.val();
                    }
                    if(iscreate){
                        obj.after(prestr+afterstr+endstr);
                    }
                    obj.hide();
                }else if(obj.attr("type") == 'checkbox'){//复选框
                    obj.attr("readOnly","true");
                }else if(obj.attr("type") == "hidden"){//假定为浏览按钮
                    if(jQuery("#field"+fieldid+"_tab").length>0){
                        //金额转换
                        var labelobj = jQuery("#field_lable"+fieldid);
                        afterstr = labelobj.val();
                        if(iscreate){
                        labelobj.after(prestr+afterstr+endstr);
                        }
                        labelobj.hide();
                        var chinglishobj = jQuery("input[name='field_chinglish"+fieldid+"']");
                        if(chinglishobj.length>0){//明细没有这行              
                            afterstr = chinglishobj.val();
                            chinglishobj.after("<span id='field"+fieldid+"_readonlytext_cn'>"+afterstr+"</span>");
                            //金额转换增加一个 _readonlytext_cn
                            chinglishobj.hide();
                        }
                    }else if(jQuery("#field"+fieldid+"_browserbtn").length>0){
                            //所有的浏览按钮
                            //文档、人力资源之类的浏览按钮
                            var divobj = jQuery("#field"+fieldid+"_browserbtn").parent().parent().parent().parent();
                            //if(divobj.css("display")!='none'){
                                //不知道为什么选择部门或者分部的时候重复多次调用这个方法，增加是否处理过的判断
                                //var divobj = jQuery("#field"+fieldid+"_browserbtn").parents(".e8_os");
                                afterstr = jQuery("#field"+fieldid+"span").html();//.filter( ".e8_delClass" );
                                if(iscreate){
                                    divobj.after(prestr+afterstr+endstr);
                                }
                                divobj.hide();                          
                            //}
                    }else if(jQuery("#field_lable"+fieldid).length>0&&jQuery("#field"+fieldid+"_tab").length==0){//明细金额转换
                        afterstr = jQuery("#field_lable"+fieldid).val();
                        if(iscreate){
                        jQuery("#field_lable"+fieldid).after(prestr+afterstr+endstr);
                        }
                        jQuery("#field_lable"+fieldid).hide();
                    }else{
                        //日期和时间按钮
                        if(obj.siblings(".calendar").length>0){
                            obj.siblings(".calendar").hide()
                        }
                        
                        if(obj.siblings(".Clock").length>0){
                            obj.siblings(".Clock").hide()
                        }
                        //明细的日期和时间
                        if(jQuery("#field"+fieldid+"browser").length>0){
                            jQuery("#field"+fieldid+"browser").hide();
                        }

                        if(jQuery("#field"+fieldid+"spanimg").length>0){
                            jQuery("#field"+fieldid+"spanimg").html("");
                        }
                        if(jQuery("#field_lable"+fieldid+"span").length>0){
                            jQuery("#field_lable"+fieldid+"span").html("");
                        }
                    }
                }
            }
            jQuery("#field"+fieldid+"").attr("viewtype","0");
        }catch(e){
            //if(window.console) console.log("显示属性联动设置异常（"+flag+"）："+e.message);
        }
    }else{
        //设置编辑或者必填
        try{
            //选择框
            var obj = jQuery("#field"+fieldid+"");
            var objTagname = $GetEle("field"+fieldid+"").tagName ;
            //名称规则为 field"+fielid+"_readonlytext. 
            var hideid = "field"+fieldid+"_readonlytext" ;
            var tempvalue = "";
            jQuery("#"+hideid).remove();//移除显示的span
            if(jQuery("#"+hideid).length>0){
                removeElement($GetEle(hideid));
            }
            //if(window.console) console.log("fieldid = "+fieldid+" objTagname="+objTagname+" type = "+obj.attr("type")+" fieldattr="+fieldattr);
            //下拉字段
            if(objTagname == "SELECT"){
                obj.show();
                tempvalue = obj.val();
            }else if(objTagname == 'TEXTAREA'){
                if(obj.length==0){
                     obj = jQuery("textarea[name='field"+fieldid+"']");
                }
                obj.show();
                tempvalue = jQuery("textarea[name='field"+fieldid+"']").val();
            }else if(objTagname == 'DIV'){//UE编辑把field+fieldid占用了。 通过div在来判断
                    try{
                    if(jQuery("textarea[name='field"+fieldid+"']")){
                        if(!!UE.getEditor('field'+fieldid)){
                            UE.getEditor('field'+fieldid).setShow();//显示编辑器框
                            jQuery("textarea[name='field"+fieldid+"']").val(UE.getEditor('field'+fieldid).getContent());
                            tempvalue = jQuery("textarea[name='field"+fieldid+"']").val();
                        }
                    }
                    obj.show();
                }catch(et){
                    if(window.console) console.log("et error :: "+et.message);
                }
            }else if(objTagname == 'INPUT'){ //所有input属性的
                if(obj.length==0){
                     obj = jQuery("input[name='field"+fieldid+"']");
                }
                 if(obj.attr("type") == "text"){//文本类型
                    if(jQuery("#field_lable"+fieldid).length>0){
                        jQuery("#field_lable"+fieldid).show();
                        tempvalue = jQuery("#field_lable"+fieldid).val();
                    }else{
                        //表单设计器设置单元格格式
                        var obj_format = jQuery("input[name='field"+fieldid+"_format']");
                        if(obj_format.length > 0){
                            obj_format.show();
                            obj.hide();
                        }else{
                            obj.show();
                        }
                        tempvalue = obj.val();
                    }
                }else if(obj.attr("type") == 'checkbox'){//复选框
                    obj.removeAttr("readOnly");
                    if(obj.attr("checked")||obj.attr("checked")=='true'){
                        tempvalue = "1";
                    }
                    if(fieldattr==2){
                        return ;
                    }
                }else if(obj.attr("type") == "hidden"){//假定为浏览按钮
                    if(jQuery("#field"+fieldid+"_tab").length>0){
                        //金额转换
                        var labelobj = jQuery("#field_lable"+fieldid);
                        labelobj.show();
                        var chinglishobj = jQuery("input[name='field_chinglish"+fieldid+"']");
                        if(chinglishobj.length>0){//明细没有这个
                            //金额转换增加一个 _readonlytext_cn  这里要清除
                            jQuery("#field"+fieldid+"_readonlytext_cn").remove();
                            chinglishobj.show();
                            tempvalue = labelobj.val();
                        }
                        
                    }else if(jQuery("#field"+fieldid+"_browserbtn").length>0){
                            //所有的浏览按钮
                            //文档、人力资源之类的浏览按钮
                            var divobj = jQuery("#field"+fieldid+"_browserbtn").parent().parent().parent().parent();
                            //if(divobj.css("display")=='none'){
                                //不知道为什么选择部门或者分部的时候重复多次调用这个方法，增加是否处理过的判断
                                //var divobj = jQuery("#field"+fieldid+"_browserbtn").parents(".e8_os");
                                divobj.show();   
                                tempvalue = obj.val();                       
                            //}
                    }else if(jQuery("#field_lable"+fieldid).length>0&&jQuery("#field"+fieldid+"_tab").length==0){//明细金额转换
                        jQuery("#field_lable"+fieldid).show();
                        tempvalue = jQuery("#field_lable"+fieldid).val();  
                        if(fieldattr==1){
                            jQuery("#field"+fieldid+"").attr("viewtype","0");
                            jQuery("#field_lable"+fieldid+"").attr("viewtype","0");
                        }
                    }else{
                        //日期和时间按钮
                        if(obj.siblings(".calendar").length>0){
                            obj.siblings(".calendar").show()
                        }
                        if(obj.siblings(".Clock").length>0){
                            obj.siblings(".Clock").show()
                        }
                        //明细的日期和时间
                        if(jQuery("#field"+fieldid+"browser").length>0){
                            jQuery("#field"+fieldid+"browser").show();
                        }
                        tempvalue = obj.val(); 
                    }
                }
            }
                
                if(jQuery("#field"+fieldid+"wrapspan").length>0){
                    var c = 0 ;
                    while(c < 10 ){
                        if(jQuery("#field"+fieldid+"spanimg").length==0){
                            sleep(200);
                            //if(window.console) console.log("field = "+fieldid+" 没检测到spanimg "+$GetEle("#field"+fieldid+"__")+"//"+$GetEle("#field"+fieldid+"_browserbtn"));
                            //if(window.console) console.log("field = "+fieldid+" 没检测到spanimg html = "+jQuery("#field"+fieldid+"wrapspan").html());
                        }else{
                            break ;
                        }
                        c++ ;
                    }
                }
                if(fieldattr==2){ //必填的时候增加必填标识
                    jQuery("#field"+fieldid+"").attr("viewtype","1");
                    jQuery("#field_lable"+fieldid+"").attr("viewtype","1");
                    jQuery("textarea[name='field"+fieldid+"']").attr("viewtype","1");
                    
                    if(tempvalue==''){
                        if(jQuery("#field"+fieldid+"__").length>0){
                            jQuery("#field"+fieldid+"spanimg").html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
                            jQuery("#field"+fieldid+"span").html("");
                        }else{
                            if(jQuery("#field_lable"+fieldid+"span").length>0){
                                jQuery("#field_lable"+fieldid+"span").html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
                                jQuery("#field"+fieldid+"spanimg").html("");
                            }else{
                                jQuery("#field"+fieldid+"span").html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
                                jQuery("#field"+fieldid+"spanimg").html("");
                            }
                        }
                    }
                }else if(fieldattr==1){
                    //处理感叹号
                    if(jQuery("#field"+fieldid+"spanimg").length>0){
                            jQuery("#field"+fieldid+"spanimg").html("");
                    }
                    if(jQuery("#field"+fieldid+"span").length>0&&jQuery("#field"+fieldid+"spanimg").length<1){
                        if(jQuery("#field"+fieldid+"span").html().indexOf("BacoError_wev8")!=-1){
                            jQuery("#field"+fieldid+"span").html("");
                        }
                    }
                    jQuery("#field"+fieldid+"").attr("viewtype","0");
                    jQuery("#field_lable"+fieldid+"").attr("viewtype","0");
                    if(window.console) console.log("fieldid = "+fieldid+" isedit="+jQuery("#field_lable"+fieldid+"").attr("viewtype"));
                }else if(fieldattr==-1){
                    //oldfieldview54702_0
                    var isedit = jQuery("input[name='oldfieldview"+fieldid+"']").val();
                    //if(window.console) console.log("fieldid = "+fieldid+" isedit="+isedit);
                    if(isedit>2){
	                    jQuery("#field"+fieldid+"").attr("viewtype","1");
	                    jQuery("#field_lable"+fieldid+"").attr("viewtype","1");
	                    jQuery("textarea[name='field"+fieldid+"']").attr("viewtype","1");
	                    if(tempvalue==''){
	                        if(jQuery("#field"+fieldid+"__").length>0){
	                            jQuery("#field"+fieldid+"spanimg").html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
	                            jQuery("#field"+fieldid+"span").html("");
	                        }else{
	                            if(jQuery("#field_lable"+fieldid+"span").length>0){
	                                jQuery("#field_lable"+fieldid+"span").html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
	                                jQuery("#field"+fieldid+"spanimg").html("");
	                            }else{
	                                jQuery("#field"+fieldid+"span").html("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>");
	                                jQuery("#field"+fieldid+"spanimg").html("");
	                            }
	                        }
	                    }
                    }else{
                        jQuery("#field"+fieldid+"").attr("viewtype","0");
                        jQuery("#field_lable"+fieldid+"").attr("viewtype","0");
                        jQuery("textarea[name='field"+fieldid+"']").attr("viewtype","0");
                        if(jQuery("#field"+fieldid+"span").html().indexOf("<IMG src='/images/BacoError_wev8.gif' align=absMiddle>")!=-1){
                            jQuery("#field"+fieldid+"span").html("");
                        }
                    }
                }
        }catch(e){
            //if(window.console) console.log("显示属性联动设置异常（"+flag+"）："+e.message);
        }
    }
}

function getcookie(name) {
var cookie_start = document.cookie.indexOf(name);
var cookie_end = document.cookie.indexOf(";", cookie_start);
return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}
function readyOnlyStyle(obj,flag){//复制元素将源对象置为不可编辑
    if(flag){
        if(obj.name){
            if(document.all(obj.name+"_clone")!=null){//删除复制的元素
                jQuery(document.all(obj.name+"_clone")).remove();
            }else{
                if(jQuery(document.all(obj.name)).is(":hidden")){
                    var AddDocFlow=jQuery(document.all(obj.name)).parent().find("button.AddDocFlow");
                    AddDocFlow.each(function(){
                        if(jQuery(this).attr("class")){
                            jQuery(this).attr("disabled","disabled");
                        }
                    });
                }
            }
            if(document.all(obj.name).type=='hidden')return ;
            var cloneele=_clone(obj,false);
            var cloneelenew=_clone(obj,true);
            cloneele.hide();
            cloneelenew.show();
            cloneelenew.attr("title",getTitleTip());
            cloneelenew.attr("disabled","disabled");
            cloneele.val(obj.value);
            cloneelenew.val(obj.value);
            jQuery(obj).after(cloneele);
            jQuery(obj).before(cloneelenew);
            jQuery(obj).remove();//删除原来的对象以便修改name属性
        }
    }else{
        if(obj.name){//删除复制的元素
            jQuery(obj).show();
            if(document.all(obj.name+"_clone")!=null){//删除复制的元素
                jQuery(document.all(obj.name+"_clone")).remove();
            }
            if(jQuery(document.all(obj.name)).is(":hidden")){
                var AddDocFlow=jQuery(document.all(obj.name)).parent().find("button.AddDocFlow");
                AddDocFlow.each(function(){
                    if(jQuery(this).attr("class")){
                        jQuery(this).removeAttr("disabled");
                    }
                });
            }
            jQuery(obj).attr("title","");
            jQuery(obj).removeAttr("disabled");
        }
    }
}
function getTitleTip(){
    var syslanguageid=languageid;
    if(!syslanguageid)syslanguageid=getcookie('languageidweaver');
    var title="不可编辑";
    switch(syslanguageid){
        case 8:
            title="Not editable";
        break;
        case 9:
            title="不可編輯";
        break;
    }
    return title;
}
function _clone(obj,flag){//克隆元素
    var htmls=""+obj.outerHTML;
    if(flag)htmls=htmls.replace(new RegExp(obj.name,'g'),obj.name+"_clone");
    return jQuery(htmls);
}
function selectOnly(e){//下拉框只读
    this.selectedIndex = e.data.index;
}
//设置为只读
function setCanEdit(obj){
    if(obj.type == "textarea"){//多行文本
        if(jQuery("#cke_contents_"+obj.name).attr("class")){//富文本编辑框
            var iframes=document.getElementById("cke_contents_"+obj.name).firstChild;
            iframes.contentWindow.document.body.contentEditable=true;
            iframes.contentWindow.document.body.title="";
            jQuery("#cke_top_"+obj.name).show();
        }
    }else if(obj.type == "select-one"){//下拉字段
        obj.onmouseover = null;
        obj.onmouseout = null;
        jQuery(obj).unbind("change",selectOnly);
    }else if(obj.type == "hidden"){//金额转换
        var name=obj.name.replace("field","field_lable");
        if(obj['datatype']=='float' && document.all(name)!=null){
            document.all(name).disabled=false;
            document.all(name).title="";
        }
    }
    readyOnlyStyle(obj,false);
}

//浏览按钮选择内容保存无法找到浏览按钮
function setBrowserOnly(filedid,flag){
    var browser=jQuery("input[name=field"+filedid+"]").attr("temptitle");
    if(document.all('field'+filedid+"browser")!=null){//添加只读浏览按钮刘样式
        jQuery("button#field"+filedid+"browser").show();
        if(flag)jQuery("button#field"+filedid+"browser").not("button.AddDocFlow").hide();
    }
    if(browser){
        jQuery("input[name=field"+filedid+"]").siblings("button.Browser").attr("disabled",flag);
        jQuery("input[name=field"+filedid+"]").siblings("button.Browser").show();
        if(flag)jQuery("input[name=field"+filedid+"]").siblings("button.Browser").not("button.AddDocFlow").hide();
    }
}
/**
*附件不可编辑
**/
function attachmentDisd(fieldid,flag){
    var tempUPload=eval("oUpload"+fieldid);//附件点击删除没有必填图标
    if(tempUPload){
        tempUPload.setButtonDisabled(flag);
        //jQuery("#btnCancel"+fieldid).find("img").show()
        //if(flag)jQuery("#btnCancel"+fieldid).find("img").hide();
        jQuery("span[name^='span"+fieldid+"']").siblings("a").show();
        jQuery("span[name^='span"+fieldid+"']").siblings("button").show();
        jQuery("div#fsUploadProgress"+fieldid).find("a.progressCancel").show();
        if(flag){
            jQuery("span[name^='span"+fieldid+"']").siblings("a").hide();
            jQuery("span[name^='span"+fieldid+"']").siblings("button").hide();
            jQuery("div#fsUploadProgress"+fieldid).find("a.progressCancel").hide();
        }
        if(typeof(setFieldElementDisd)=="function"){
            setFieldElementDisd(fieldid,flag);
        }
    }
}
/**
*附件上传属性联动判断附件是否清除
**/
function isEmptyfsUpdaload(fieldid){
    var result=true;
    try{
        jQuery(jQuery("#fsUploadProgress"+fieldid)).find("div.progressWrapper[id^=SWFUpload_]").each(function(){
            var error=jQuery(this).children("div.progressContainer").children("div.progressBarError");//点击删除按钮时会新增此元素
            var inProgress=jQuery(this).children("div.progressContainer").children("div.progressBarInProgress");//添加文件的时候会新增此元素
            /*if(!inProgress.attr("class") && error.attr("class")){
                result=false;
            }*/
            //alert(inProgress.attr("class"));
            if(inProgress.attr("class") == "progressBarInProgress"){
                result=false;
            }
            
        });
        jQuery("input[name^=field"+fieldid+"_del_]").each(function(i, e){
            var value = jQuery(e).val();
            if(value == 0){
                result=false;
            }
        });
        
        
        //if(jQuery("input:hidden[name^=field"+fieldid+"_id_]").length>0){
        //  result = true ;
        //}
    }catch(e){
    }
    return result;
}
function addSWFUploadRequired(fieldid){
    var tempouploadobj=eval("oUpload"+fieldid);//附件点击删除没有必填图标
    var req=$GetEle("oUpload_"+fieldid+"_linkrequired");
    if(tempouploadobj){//添加联动验证属性
        attachmentDisd(fieldid,false);
        if(!req){
            jQuery("<input id='oUpload_"+fieldid+"_linkrequired' value='true' type='hidden'>").appendTo("body");
        }else{
            req.value="true";
        }
    } 
}
function clearSWFUploadRequired(fieldid){
    var req=$GetEle("oUpload_"+fieldid+"_linkrequired");
    attachmentDisd(fieldid,false);
    if(req){
        req.value="false";
    }else{
        jQuery("<input id='oUpload_"+fieldid+"_linkrequired' value='false' type='hidden'>").appendTo("body");
    }
}


function displaySWFUploadError(fieldid){
    var fieldidnum=fieldid+"_idnum_1";
    var fieldidspan=fieldid+"span";
    var swfuploadid=fieldid.replace("field","");
    var linkrequired=$GetEle("oUpload_"+swfuploadid+"_linkrequired");
    $GetEle(fieldidspan).innerHTML="";
    var tempouploadobj=eval("oUpload"+swfuploadid);
    $GetEle(fieldidspan).innerHTML="";
    if($GetEle(fieldidnum).value=="0"){
        if(tempouploadobj.getStats().files_queued==0 && linkrequired && linkrequired.value=="true"){
            $GetEle(fieldidspan).innerHTML="<IMG src='/images/BacoError_wev8.gif' align=absMiddle>";
        }
    }
}

function  upWord()
{
if(top.document.body.style.zoom!=0) 
top.document.body.style.zoom*=1.1; 
else top.document.body.style.zoom=1.1;
}

function  lowWord()
{
if(top.document.body.style.zoom!=0) 
    top.document.body.style.zoom*=0.9; 
else top.document.body.style.zoom=0.9;
}

function changeToNormalFormat(inputfieldname){
    
    var elm = $GetEle(inputfieldname);
    var n = getLocation(elm);
    sourcevalue = $GetEle(inputfieldname).value;
    try{
        tovalue = sourcevalue.replace(/,/g,"");
         //add by liaodong for qc75759 in 2013-10-24 start
        var dlength =$GetEle(inputfieldname).getAttribute("datalength")
        if(0 < dlength && $GetEle(inputfieldname).getAttribute("datavaluetype") != "5"){
        
            tovalue = addZero(tovalue,dlength);
        }else if($GetEle(inputfieldname).getAttribute("datavaluetype") == "5"){
          
            tovalue = addZero(tovalue,dlength);
        }    
        //end
        $GetEle(inputfieldname).value = tovalue;
        setLocation(elm,n);
    }catch(e){

        if(window.console){ console.log("changeToNormalFormat error:: "+e.message);}
    }
}


function changeToThousands2(inputfieldname,qfws){
    sourcevalue = $GetEle(inputfieldname).value;
    var dlength =$GetEle(inputfieldname).getAttribute("datalength")
    if(0 < dlength && $GetEle(inputfieldname).getAttribute("datavaluetype") != "5"){
        sourcevalue = addZero(sourcevalue,dlength);
        tovalue = sourcevalue;
    }else if($GetEle(inputfieldname).getAttribute("datavaluetype") == "5"){
        sourcevalue = addZero(sourcevalue,qfws);
        sourcevalue=sourcevalue.replace(/\s+/g,""); 
        var  sourcevalue01=sourcevalue;
        if(sourcevalue01!=''){
     
          tovalue =commafy(sourcevalue01);
                   
        }else{
            tovalue = sourcevalue;
        }
    }else{
        tovalue = sourcevalue;
    }
    //end
    $GetEle(inputfieldname).value = tovalue;
}


/**  
 * 数字格式转换成千分位  
 * @param{Object}num  
 */  
function commafy(num) { 
 
    num = num + "";   
    num = num.replace(/[ ]/g, ""); //去除空格  
 
   if (num == "") {   
       return;   
    }   

 
    if (isNaN(num)){  
    return;   
   }   
 
   //2.针对是否有小数点，分情况处理   
   var index = num.indexOf(".");   
    if (index==-1) {//无小数点   
      var reg = /(-?\d+)(\d{3})/;   
       while (reg.test(num)) {   
        num = num.replace(reg, "$1,$2");   
        }   
    } else {   
        var intPart = num.substring(0, index);   
       var pointPart = num.substring(index + 1, num.length);   
       var reg = /(-?\d+)(\d{3})/;   
      while (reg.test(intPart)) {   
       intPart = intPart.replace(reg, "$1,$2");   
       }   
      num = intPart +"."+ pointPart;   
   }   

   
   return num;  
}



function changeToThousands(inputfieldname){
    sourcevalue = $GetEle(inputfieldname).value;
   //update by liaodong for qc75759 in 2013-10-24 start
      if(sourcevalue.indexOf(".")<0){
        re = /(\d{1,3})(?=(\d{3})+($))/g;
    }else{
        re = /(\d{1,3})(?=(\d{3})+(\.))/g;
    }
    var dlength =$GetEle(inputfieldname).getAttribute("datalength")
    if(0 < dlength && $GetEle(inputfieldname).getAttribute("datavaluetype") != "5"){
        sourcevalue = addZero(sourcevalue,dlength);
        tovalue = sourcevalue;
    }else if($GetEle(inputfieldname).getAttribute("datavaluetype") == "5"){
        sourcevalue = addZero(sourcevalue,dlength);
        if(sourcevalue.indexOf(".")<0)
            re = /(\d{1,3})(?=(\d{3})+($))/g;
        else
            re = /(\d{1,3})(?=(\d{3})+(\.))/g;
        tovalue = sourcevalue.replace(re,"$1,");
    }else{
        tovalue = sourcevalue;
    }
    //end
    $GetEle(inputfieldname).value = tovalue;
}



function getLocation(elm) {
    try{ 
    if(elm.createTextRange) { // IE              
        var range = document.selection.createRange();                
        range.setEndPoint('StartToStart', elm.createTextRange());                
        return range.text.length; 
    } else if(typeof elm.selectionStart == 'number') { // Firefox 
        return elm.selectionStart; 
    }
    }catch(e){
        if(window.console){ console.log("getLocation error:: "+e.message);}
    } 
} 
 
function setLocation(elm, n) { 
    if(n > elm.value.length) 
        n = elm.value.length; 
    if(elm.createTextRange) {   // IE 
        var textRange = elm.createTextRange(); 
        textRange.moveStart('character', n);             
        textRange.collapse();        
        textRange.select();      
    } else if(elm.setSelectionRange) { // Firefox 
        elm.setSelectionRange(n, n); 
        elm.focus(); 
    } 
} 

function getFckText(fckValue){
    var textValue = "";
    try{
        while(fckValue.indexOf("</p>") >= 0){
            fckValue = fckValue.replace("</p>", "_=+=_");
        }
        while(fckValue.indexOf("</P>") >= 0){
            fckValue = fckValue.replace("</P>", "_=+=_");
        }
        var div = document.createElement("div");
        div.innerHTML = fckValue;
        fckValue = div.innerText;

        while(fckValue.indexOf("_=+=_") >= 0){
            fckValue = fckValue.replace("_=+=_", "&dt;&at;");
        }
        textValue = fckValue;
    }catch(e){
    }
    return textValue;
}

// ***********************************************************************
// 函数名 ：checkMaxLength（TD9084）
// 机能概要 ：对指定字符串按字节长截取，超过时给出提示，超过部分去除
// 参数说明 ：obj 输入框对象
// 注意：对象的maxlength、alt须设定，alt为信息内容
// 返回值 ：
// ***********************************************************************
function checkMaxLength(obj){
    var tmpvalue = obj.value;
    var size = obj.maxLength;
    if(realLength(tmpvalue) > size){
        alert(obj.alt);
        while(true){
            tmpvalue = tmpvalue.substring(0,tmpvalue.length-1);
            if(realLength(tmpvalue)<=size){
                obj.value = tmpvalue;
                return;
            }
        }
    }
}
function doshowmrsndiv(fieldid){
    try{
        document.getElementById("mrsnspan"+fieldid).style.display = "";
        document.getElementById("mrsnaspan"+fieldid).style.display = "none";
    }catch(e){
        alert(e);
    }
}

function enablePhraseselect(){
    try{
        document.getElementById("phraseselect").disabled = true;
    }catch(e){}
}
function displayPhraseselect(){
    try{
        document.getElementById("phraseselect").disabled = false;
    }catch(e){}
}

function getEvent() {
    if (window.ActiveXObject) {
        return window.event;// 如果是ie
    }
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
                    || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}

/**
 * 根据标识（name或者id）获取元素，主要用于解决系统中很多元素没有id属性，
 * 却在js中使用document.getElementById(name)来获取元素的问题。
 * @param identity name或者id
 * @return 元素
 */
function $GetEle(identity, _document) {
    var rtnEle = null;
    if (_document == undefined || _document == null) _document = document;
    
    rtnEle = _document.getElementById(identity);
    if (rtnEle == undefined || rtnEle == null) {
        rtnEle = _document.getElementsByName(identity);
        if (rtnEle.length > 0) rtnEle = rtnEle[0];
        else rtnEle = null;
    }
    return rtnEle;
}
function autoFrameSize(down) { 
//--------------------------------------------------------------------------
// 如果使用此方法进行iFrame的高度、宽度同步，将会造成签字意见区域布局变形
// 如：iFrame内有元素定义宽度为1000px，通过此方法将iFrame的宽度同步至1000px
// 而显示区域只有600px，那么整个布局就乱了。
// 现去掉此方法，如果客户提出了此问题，则直接给客户单独修改
//--------------------------------------------------------------------------
/*
    var pTar = null; 
    if (document.getElementById){ 
        pTar = document.getElementById(down); 
    } else{ 
        eval('pTar = ' + down + ';'); 
    } 
    if (pTar && !window.opera){  
        if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){ 
            pTar.height = pTar.contentDocument.body.offsetHeight + 20; 
            pTar.width = pTar.contentDocument.body.scrollWidth + 20; 
        } else if (pTar.Document && pTar.Document.body.scrollHeight){ 
            pTar.height = pTar.Document.body.scrollHeight; 
            pTar.width = pTar.Document.body.scrollWidth; 
        } 
    } 
*/
    jQuery("iframe[name^=FCKsigniframe]").contents().find('div.small_pic a').each(function (i,e){
        var ahref = $(e).attr("pichref");
        var dive = $(e).parent().parent().find("#"+ahref);
        $(e).fancyZoom({scaleImg: true, closeOnClick: false ,iframenames: dive});
    });
}
/**
打印预览
**/
function printModePreview(loadprintmodeFrame,redirectUrl){
    window.open(redirectUrl);
}

function validateInputFields(elementnames){
    if(elementnames){
        try {
             var el= elementnames.split(",");
             for(var i=0;i<el.length;i++){
                    checkinput(el[i],el[i]+"_span");
             }
        } catch (e) {
            // handle errors here
        }
    }
}

function resetSearch(){
    $("form span[id^='con']").text('');
    $("form input[name='thisdate']").each(function(){
        changeCheckboxStatus(this,false);
    });
    $("form input[name='thisorg']").each(function(){
        changeCheckboxStatus(this,false);
    });
    $('form input[type=text]').val('');
    $('form textarea').val('');
    $("form td[class='field'] input[type=hidden][name^='con']").val("");
    //清除下拉框
    jQuery("#advancedSearchDiv td[class='field'] select[ishide!='1']").val("");
    jQuery("#advancedSearchDiv td[class='field'] a[class='sbSelector']").html("");
    //清除checkbox
    changeCheckboxStatus(jQuery("#advancedSearchDiv td[class='field'] input[type='checkbox'][name^='con']") ,false);
}


/**
* 创建iframe 指定iframe name
*/
function createIframe(iframename){
    var iframe;
    try {
      iframe = document.createElement("<iframe name='"+iframename+"'>");
    } catch (ex) {
      iframe = document.createElement('iframe');
    } 
    iframe.id = iframename;
    iframe.name = iframename ;
    iframe.width = 0;
    iframe.height = 0;
    iframe.marginHeight = 0;
    iframe.marginWidth = 0;
    iframe.src = '';
    document.body.appendChild(iframe);
}

/**
 * 阻止时间冒泡
 * @param e 事件event 
 * @param handler 
 * @return
 */
function isMouseLeaveOrEnter(e, handler) {
    if (e.type != 'mouseout' && e.type != 'mouseover') return false;
    var reltg = e.relatedTarget ? e.relatedTarget: e.type == 'mouseout' ? e.toElement: e.fromElement;
    while (reltg && reltg != handler) reltg = reltg.parentNode;
    return (reltg != handler);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

/**
 * 删除元素
 * @param _element
 */
function removeElement(_element){
    try{
        var _parentElement = _element.parentNode;
        if(_parentElement){
            _parentElement.removeChild(_element);
        }
    }catch(e){
        if(window.console) console.log("removeElement error::"+e.message);
    }
}
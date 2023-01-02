$.fn.croneditor = function(opts) {

  var el = this;
  
  // Write the HTML template to the document
  // 语言
  var lang = croneLang;
  // HTML Template for plugin
var tmpl = '<input type="text" id="CronExpr" style="width:400px!important;" readonly unselectable="on"  name="CronExpr" value="" onChange=checkinput("CronExpr","CronExprspan") size="50"/>&nbsp;&nbsp;&nbsp;<input type="button" value="'+lang.common.reset+'"  class="e8_btn_top" id="clear"/>\
<br/>\
<!-- TODO: add back next estimated time -->\
<!-- <span>Will run next at:<em><span class="next"></span></em></span> -->\
<!-- the cron editor will be here -->\
<div id="tabs" class="tabs">\
  <ul>\
    <li><a href="#tabs-second">' + lang.second.name + '</a></li>\
    <li><a href="#tabs-minute">' + lang.minute.name + '</a></li>\
    <li><a href="#tabs-hour">' + lang.hour.name + '</a></li>\
    <li><a href="#tabs-day">' + lang.dayMonth.name + '</a></li>\
    <li><a href="#tabs-month">' + lang.month.name + '</a></li>\
    <li><a href="#tabs-week">' + lang.dayWeek.name + '</a></li>\
  </ul>\
  <div id="tabs-second">\
    <div class="tabs" id="tabs-second-id" >\
      <ul>\
        <li id="button-second-every"><a href="#tabs-second-every">'+ lang.second.name +'</a></li>\
        <li id="button-second-n"><a href="#tabs-second-n">'+ lang.second.everyNSecond +'</a></li>\
      </ul>\
      <div id="tabs-second-every" class="preview">\
        <div>'+ lang.common.first +'0'+ lang.second.name +'</div>\
      </div>\
      <div id="tabs-second-n">\
        <div class="preview"> '+lang.common.per+' '+'1 '+lang.second.name+'</div>\
        <div class="slider"></div>\
      </div>\
    </div>\
  </div>\
  <div id="tabs-minute">\
    <div class="tabs"  id="tabs-minute-id">\
      <ul>\
        <li id="button-minute-every"><a href="#tabs-minute-every">'+ lang.minute.everyMinute +'</a></li>\
        <li id="button-minute-n"><a href="#tabs-minute-n">'+ lang.minute.everyNMinute +'</a></li>\
        <li id="button-minute-each"><a href="#tabs-minute-each">'+ lang.minute.eachMinute +'</a></li>\
      </ul>\
      <div id="tabs-minute-every" class="preview">\
        <div>*</div>\
        <div>'+ lang.minute.everyMinute +'</div>\
      </div>\
      <div id="tabs-minute-n">\
        <div class="preview"> '+lang.common.per+' '+'1'+' '+lang.minute.name+'</div>\
        <div class="slider"></div>\
      </div>\
      <div id="tabs-minute-each" class="preview">\
        <div class="tabs-minute-format"></div>\
      </div>\
    </div>\
  </div>\
  <div id="tabs-hour">\
    <div class="tabs"  id="tabs-hour-id">\
      <ul>\
        <li id="button-hour-every"><a href="#tabs-hour-every">'+ lang.hour.everyHour +'</a></li>\
        <li id="button-hour-n"><a href="#tabs-hour-n">'+ lang.hour.everyNHour +'</a></li>\
        <li id="button-hour-each"><a href="#tabs-hour-each">'+ lang.hour.eachHour +'</a></li>\
      </ul>\
      <div id="tabs-hour-every" class="preview">\
        <div>*</div>\
        <div>'+ lang.hour.everyHour +'</div>\
      </div>\
      <div id="tabs-hour-n">\
        <div class="preview">'+lang.common.per+' '+'1 '+lang.hour.name+'</div>\
        <div class="slider"></div>\
      </div>\
      <div id="tabs-hour-each" class="preview">\
        <div class="tabs-hour-format"></div>\
      </div>\
    </div>\
  </div>\
  <div id="tabs-day">\
    <div class="tabs"  id="tabs-day-id">\
      <ul>\
        <li id="button-day-every"><a href="#tabs-day-every">'+ lang.dayMonth.everyDay +'</a></li>\
        <li id="button-day-each"><a href="#tabs-day-each">'+ lang.dayMonth.eachDay +'</a></li>\
      </ul>\
      <div id="tabs-day-every" class="preview">\
        <div>*</div>\
        <div>'+lang.dayMonth.everyDay+'</div>\
      </div>\
      <div id="tabs-day-each" class="preview">\
        <div class="tabs-day-format"></div>\
      </div>\
    </div>\
  </div>\
  <div id="tabs-month">\
    <div class="tabs"  id="tabs-month-id">\
      <ul>\
        <li id="button-month-every"><a href="#tabs-month-every">'+ lang.month.everyMonth +'</a></li>\
        <li id="button-month-each"><a href="#tabs-month-each">'+ lang.month.eachMonth +'</a></li>\
      </ul>\
      <div id="tabs-month-every" class="preview">\
        <div>*</div>\
        <div>'+ lang.month.everyMonth +'</div>\
      </div>\
      <div id="tabs-month-each" class="preview">\
        <div class="tabs-month-format"></div>\
      </div>\
    </div>\
  </div>\
  <div id="tabs-week">\
    <div class="tabs"  id="tabs-week-id">\
      <ul>\
        <li id="button-week-every"><a href="#tabs-week-every">'+ lang.dayWeek.everyWeek +'</a></li>\
        <li id="button-week-each"><a href="#tabs-week-each">'+ lang.dayWeek.eachWeek +'</a></li>\
      </ul>\
      <div id="tabs-week-every" class="preview">\
        <div>*</div>\
        <div>'+ lang.dayWeek.everyWeek +'</div>\
      </div>\
      <div id="tabs-week-each">\
        <div class="tabs-week-format"></div>\
      </div>\
    </div>\
  </div>\
</div>';


  $(el).html(tmpl);

  var cronArr = ["0", "*", "*", "*", "*", "?"];
  if (typeof opts.value === "string" && opts.value!='') {
    cronArr = opts.value.split(' ');
  }

  var crontabs = $( ".tabs" ).tabs({
    activate: function( event, ui ) {
    	//console.log(ui);
    
      switch ($(ui.newPanel).attr('id')) {
        case 'tabs-day':
            //console.log("tabs-day");
            $('.tabs-day-format').html('');
           drawEachDays();
        break;
        case 'tabs-week':
        	//console.log("in week");
          	$('.tabs-week-format').html('');
             drawEachWeek();
        break;
      }
      
      switch ($(ui.newTab).attr('id')) {
        // Seconds
        case 'button-second-every':
          cronArr[0] = "0";
        break;
        case 'button-second-n':
        	if(cronArr[0].indexOf("/")==-1)
           		cronArr[0] = "0/1";
            sliderHourMinSecond(cronArr[0],'second');
        break;

        // Minutes
        case 'button-minute-every':
          cronArr[1] = "*";
        break;
        case 'button-minute-n':
        	if(cronArr[1].indexOf("/")==-1)
          		cronArr[1] = "0/1";
          	sliderHourMinSecond(cronArr[1],'minute');
        break;
        case 'button-minute-each':
           //cronArr[1] = "*";
          // TODO: toggle off selected minutes on load
          //$('.tabs-minute-format input[checked="checked"]').click()
          $('.tabs-minute-format').html('');
          drawEachMinutes();
        break;

        // Hours
        case 'button-hour-every':
           cronArr[2] = "*";
        break;
        case 'button-hour-n':
        	if(cronArr[2].indexOf("/")==-1)
          		cronArr[2] = "0/1";
          	sliderHourMinSecond(cronArr[2],'hour');
        break;
        case 'button-hour-each':
           //cronArr[2] = "*";
          $('.tabs-hour-format').html('');
          drawEachHours();
         break;

         // Days
         case 'button-day-every':
            cronArr[3] = "*";
            if(cronArr[5] != "?")
          		cronArr[5] = "?";
         break;
         case 'button-day-each':
         //console.log("123==="+cronArr); 
           // cronArr[3] = cronArr[3] != '*' ? cronArr[3] : '*';
           $('.tabs-day-format').html('');
           drawEachDays();
          break;

          // Months
          case 'button-month-every':
             cronArr[4] = "*";
          break;
          case 'button-month-each':
            // cronArr[4] = "*";
            $('.tabs-month-format').html('');
            drawEachMonths();
           break;

           // Weeks
           case 'button-week-every':
              cronArr[5] = "?";
          	  cronArr[3] = "*";
           break;
           case 'button-week-each':
             // cronArr[5] = "*";
             $('.tabs-week-format').html('');
             drawEachWeek();
            break;

      }

      drawCron();
    }
  });

  function drawCron () {

    var newCron = cronArr.join(' ');
    //if('* * * * * ?'!=newCron)
    $('#CronExpr').val(newCron);
    // TODO: add back next estimated cron time
    /*
    var last = new Date();
    $('.next').html('');
    var job = new cron.CronTime(newCron);
    var next = job._getNextDateFrom(new Date());
    $('.next').append('<span id="nextRun">' + dateformat(next, "ddd mmm dd yyyy HH:mm:ss") + '</span><br/>');
    */
    /*
    setInterval(function(){
      drawCron();
    }, 500);
    */
    /*
    $('#CronExpr').keyup(function(){
      cronArr = $('#CronExpr').val().split(' ');
      console.log('updated', cronArr)
    });
    */
    checkinput("CronExpr","CronExprspan");
  }

  $('#clear').click(function(){
    $('#CronExpr').val('0 * * * * ?');
    cronArr = ["0","*","*","*","*", "?"];
  	$('.tabs').tabs('option', 'active', 0);
  	checkinput("CronExpr","CronExprspan");
  });

  $( "#tabs-second .slider" ).slider({
    min: 1,
    max: 59,
    slide: function( event, ui ) {
      cronArr[0] = "0/" + ui.value;
      $('#tabs-second-n .preview').html(lang.common.per+' ' + ui.value + ' '+lang.second.name);
      drawCron();
    }
  });
  
 function sliderHourMinSecond(n,isHour) {
 			if(n){
         n = n.substr(2)
         if(''==n)
          n=1;
 				if("second" == isHour){ 				
					var t = (100/59*n) + "%"
		      cronArr[0] = "0/" + n;
		      $('#tabs-second-n .preview').html(lang.common.per+' ' + n + ' '+lang.second.name);
		      $("#tabs-second .slider span").css("left", t);
		   }
 				if("minute" == isHour){ 				
					var t = (100/59*n) + "%"
		      cronArr[1] = "0/" + n;
		      $('#tabs-minute-n .preview').html(lang.common.per+' ' + n + ' '+lang.minute.name);
		      $("#tabs-minute .slider span").css("left", t);
		   }
 				if("hour" == isHour){ 				
					var t = (100/23*n) + "%"
		      cronArr[2] = "0/" + n;
		      $('#tabs-hour-n .preview').html(lang.common.per+' ' + n + ' '+lang.hour.name);
		      $("#tabs-hour .slider span").css("left", t);
		   }
	    } 
	    drawCron();

}
  $( "#tabs-minute .slider" ).slider({
    min: 1,
    max: 59,
    slide: function( event, ui ) {
      cronArr[1] = "0/" + ui.value;
      $('#tabs-minute-n .preview').html(lang.common.per+' ' + ui.value + ' '+lang.minute.name);
      drawCron();
    }
  });

  $( "#tabs-hour .slider" ).slider({
    min: 1,
    max: 23,
    slide: function( event, ui ) {
      cronArr[2] = "0/" + ui.value;
      $('#tabs-hour-n .preview').html(lang.common.per+' ' + ui.value + ' '+lang.hour.name);
      drawCron();
    }
  });

  // TOOD: All draw* functions can be combined into a few smaller methods

  function drawEachMinutes () {
    var defaultMinutes = cronArr[1].split(",").map(function(o) {return Number(o)})
    // minutes
    for (var i = 0; i < 60; i++) {
      var padded = i;
      var checked = '';
      if(padded.toString().length === 1) {
        padded = "0" + padded;
      }
      if(defaultMinutes.indexOf(i) !== -1) checked = 'checked'
      $('.tabs-minute-format').append('<input type="checkbox" id="minute-check' + i + '" ' + checked + '><label for="minute-check' + i + '">' + padded + '</label>&nbsp;');
      if (i !== 0 && (i+1) % 10 === 0) {
        $('.tabs-minute-format').append('<br/>');
      }
    }
    //$('.tabs-minute-format input').button();
    //$('.tabs-minute-format').buttonset();

    $('.tabs-minute-format input[type="checkbox"]').click(function(){
      var newItem = $(this).attr('id').replace('minute-check', '');
      if(cronArr[1] === "*") {
        cronArr[1] = $(this).attr('id').replace('minute-check', '');
      } else {

        // if value already in list, toggle it off
        var list = cronArr[1].split(',');
        if (list.indexOf(newItem) !== -1) {
          list.splice(list.indexOf(newItem), 1);
          cronArr[1] = list.join(',');
        } else {
          // else toggle it on
          if(cronArr[1].indexOf("/")!=-1)
          	cronArr[1] = newItem;
          else
          	cronArr[1] = cronArr[1] + "," + newItem;
        }
        if(cronArr[1] === "") {
          cronArr[1] = "*";
        }
      }
      drawCron();
    });

  }
  

  function drawEachHours () {
    // hours
    var defaultHours = cronArr[2].split(",").map(function(o) {return Number(o)})
    for (var i = 0; i < 24; i++) {
      var padded = i;
      var checked = '';
      if(padded.toString().length === 1) {
        padded = "0" + padded;
      }
      if(defaultHours.indexOf(i) !== -1) checked = 'checked'
      $('.tabs-hour-format').append('<input type="checkbox" id="hour-check' + i + '" ' + checked + '><label for="hour-check' + i + '">' + padded + '</label>&nbsp;');
      if (i !== 0 && (i+1) % 12 === 0) {
        $('.tabs-hour-format').append('<br/>');
      }
    }

    //$('.tabs-hour-format input').button();
    //$('.tabs-hour-format').buttonset();


    $('.tabs-hour-format input[type="checkbox"]').click(function(){
      var newItem = $(this).attr('id').replace('hour-check', '');
      if(cronArr[2] === "*") {
        cronArr[2] = $(this).attr('id').replace('hour-check', '');
      } else {

        // if value already in list, toggle it off
        var list = cronArr[2].split(',');
        if (list.indexOf(newItem) !== -1) {
          list.splice(list.indexOf(newItem), 1);
          cronArr[2] = list.join(',');
        } else {
          // else toggle it on
          if(cronArr[2].indexOf("/")!=-1)
          	cronArr[2] = newItem;
          else
          	cronArr[2] = cronArr[2] + "," + newItem;
        }
        if(cronArr[2] === "") {
          cronArr[2] = "*";
        }
      }
      drawCron();
    });

  };

  function drawEachDays () {
    // days
    var defaultDays = cronArr[3].split(",").map(function(o) {return Number(o)})
    for (var i = 1; i < 32; i++) {
      var padded = i;
      var checked = '';
      if(padded.toString().length === 1) {
        padded = "0" + padded;
      }
      if(defaultDays.indexOf(i) !== -1) checked = 'checked'
      $('.tabs-day-format').append('<input type="checkbox" id="day-check' + i + '" ' + checked + '><label for="day-check' + i + '">' + padded + '</label>&nbsp;');
      if (i !== 0 && (i) % 7 === 0) {
        $('.tabs-day-format').append('<br/>');
      }
    }

    //$('.tabs-day-format input').button();
    //$('.tabs-day-format').buttonset();
	
    $('.tabs-day-format input[type="checkbox"]').click(function(){
    cronArr[5] = "?";
      var newItem = $(this).attr('id').replace('day-check', '');
      if(cronArr[3] === "*") {
        cronArr[3] = $(this).attr('id').replace('day-check', '');
      } else {

        // if value already in list, toggle it off
        var list = cronArr[3].split(',');
        if (list.indexOf(newItem) !== -1) {
          list.splice(list.indexOf(newItem), 1);
          cronArr[3] = list.join(',');
        } else {
          // else toggle it on
          if(cronArr[3] === "?")
          	cronArr[3] = newItem;	
          else
          	cronArr[3] = cronArr[3] + "," + newItem;
        }
        if(cronArr[3] === "") {
          cronArr[3] = "*";
        }

      }
      drawCron();
    });

  };


  function drawEachMonths () {
    // months
    var defaultMonths = cronArr[4].split(",").map(function(o) {return Number(o)})
    var months = [null, lang.common.month1, lang.common.month2, lang.common.month3, lang.common.month4, lang.common.month5, lang.common.month6, lang.common.month7, lang.common.month8, lang.common.month9, lang.common.month10, lang.common.month11, lang.common.month12];

    for (var i = 1; i < 13; i++) {
      var padded = i;
      var checked = '';
      if(padded.toString().length === 1) {
        //padded = "0" + padded;
      }
      if(defaultMonths.indexOf(i) !== -1) checked = 'checked'
      var brstr = '';
      if(i%3==0)
      	brstr='<br/>';
      $('.tabs-month-format').append('<input type="checkbox" id="month-check' + i + '" ' + checked + '><label for="month-check' + i + '">' + months[i] + '</label>&nbsp;&nbsp;'+brstr);
    }

    //$('.tabs-month-format input').button();
    //$('.tabs-month-format').buttonset();


    $('.tabs-month-format input[type="checkbox"]').click(function(){
      var newItem = $(this).attr('id').replace('month-check', '');
      if(cronArr[4] === "*") {
        cronArr[4] = $(this).attr('id').replace('month-check', '');
      } else {

        // if value already in list, toggle it off
        var list = cronArr[4].split(',');
        if (list.indexOf(newItem) !== -1) {
          list.splice(list.indexOf(newItem), 1);
          cronArr[4] = list.join(',');
        } else {
          // else toggle it on
          cronArr[4] = cronArr[4] + "," + newItem;
        }
        if(cronArr[4] === "") {
          cronArr[4] = "*";
        }

      }
      drawCron();
    });

  };

  function drawEachWeek () {
    // weeks
    var defaultWeeks = cronArr[5].split(",").map(function(o) {return Number(o)})
    var days = [lang.common.day0, lang.common.day1, lang.common.day2, lang.common.day3, lang.common.day4, lang.common.day5, lang.common.day6];
    for (var i = 0; i < 7; i++) {
      var padded = i;
      var checked = '';
      if(padded.toString().length === 1) {
        //padded = "0" + padded;
      }
      if(defaultWeeks.indexOf(i+1) !== -1) checked = 'checked'
      $('.tabs-week-format').append('<input type="checkbox" id="week-check' + (i+1) + '" ' + checked + '><label for="week-check' + (i+1) + '">' + days[i] + '</label>&nbsp;');
    }

    //$('.tabs-week-format input').button();
    //$('.tabs-week-format').buttonset();

    $('.tabs-week-format input[type="checkbox"]').click(function(){
    cronArr[3] = "?";
      var newItem = $(this).attr('id').replace('week-check', '');
      if(cronArr[5] === "?") {
        cronArr[5] = $(this).attr('id').replace('week-check', '');
      } else {

        // if value already in list, toggle it off
        var list = cronArr[5].split(',');
        if (list.indexOf(newItem) !== -1) {
          list.splice(list.indexOf(newItem), 1);
          cronArr[5] = list.join(',');
        } else {
          // else toggle it on
          if(cronArr[5] === "*")
          	cronArr[5] = newItem;
          else
          	cronArr[5] = cronArr[5] + "," + newItem;
        }
        if(cronArr[5] === "") {
          
          if(cronArr[3] === "?")
          	cronArr[3] = "*";	
          
          cronArr[5] = "?";
        }

      }
      drawCron();
    });

  };

  // TODO: Refactor these methods into smaller methods

  drawEachMinutes();
  drawEachHours();
  drawEachDays();
  drawEachMonths();
  drawCron();
  
    // default selected
	//tabs-second-id
	//tabs-minute-id
	//tabs-hour-id
	//tabs-day-id
	//tabs-month-id
	//tabs-week-id
	if(cronArr[0] == "*" || cronArr[0] == "0"){
		$('#tabs-second-id').tabs('option', 'active', 0);		
	}else{
		console.log(">>>cronArr[0]:"+cronArr[0]);
		sliderHourMinSecond(cronArr[0],'second');
		$('#tabs-second-id').tabs('option', 'active', 1);
	}
	if(cronArr[1] == "*"){
		$('#tabs-minute-id').tabs('option', 'active', 0);
	}else if(cronArr[1].indexOf("/")!=-1){
		sliderHourMinSecond(cronArr[1],'minute');
		$('#tabs-minute-id').tabs('option', 'active', 1);
	}else{
		$('#tabs-minute-id').tabs('option', 'active', 2);
	}
	if(cronArr[2] == "*"){
		$('#tabs-hour-id').tabs('option', 'active', 0);
	}else if(cronArr[2].indexOf("/")!=-1){
		sliderHourMinSecond(cronArr[2],'hour');
		$('#tabs-hour-id').tabs('option', 'active', 1);
	}else{
		$('#tabs-hour-id').tabs('option', 'active', 2);
	}
	
	if(cronArr[3] == "*" || cronArr[3] == "?"){
		$('#tabs-day-id').tabs('option', 'active', 0);		
	}else{
		$('#tabs-day-id').tabs('option', 'active', 1);
	}
	if(cronArr[4] == "*"){
		$('#tabs-month-id').tabs('option', 'active', 0);		
	}else{
		$('#tabs-month-id').tabs('option', 'active', 1);
	}
	if(cronArr[5] == "*" || cronArr[5] == "?"){
		$('#tabs-week-id').tabs('option', 'active', 0);		
	}else{
		$('#tabs-week-id').tabs('option', 'active', 1);
	}
  return this
};

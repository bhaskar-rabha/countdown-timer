var CallTimer = {
	DAY_IN_SECOND:86400,
	HOUR_IN_SECOND:3600,
	MINUTE_IN_SECOND:60,
	day_specifier:'%d',
	hour_specifier:'%h',
	minute_specifier:'%m',
	second_specifier:'%s',
	startTimestamp:'',
	localTimestamp:'',
	elem:new Array(),		
	elemdays:'',
	elemHours:'',
	elemMinutes:'',
	elemSeconds:'',		
	offset:'',
	className:'call-timer',
	container:'',
	init:function(config)
	{
		if(typeof config.day_specifier != 'undefined' )		this.day_specifier = config.day_specifier;
		if(typeof config.hour_specifier != 'undefined')		this.hour_specifier = config.hour_specifier;
		if(typeof config.minute_specifier != 'undefined')	this.elemMinutes = config.minute_specifier;
		if(typeof config.second_specifier != 'undefined')	this.elemSeconds = config.second_specifier;
		
		if(typeof config.days != 'undefined' )		this.elemDays = config.days;
		if(typeof config.hours != 'undefined')		this.elemHours = config.hours;
		if(typeof config.minutes != 'undefined')	this.elemMinutes = config.minutes;
		if(typeof config.seconds != 'undefined')	this.elemSeconds = config.seconds;		
		
		if(typeof config.days != 'undefined' )		this.elemDays = config.days;
		if(typeof config.hours != 'undefined')		this.elemHours = config.hours;
		if(typeof config.minutes != 'undefined')	this.elemMinutes = config.minutes;
		if(typeof config.seconds != 'undefined')	this.elemSeconds = config.seconds;	
		
		if(typeof config.offset != 'undefined') 	this.offset = config.offset;
		if(typeof config.className != 'undefined') 	this.className = config.className;
		if(typeof config.className != 'undefined') 	this.container = $('.'+config.className).html();
		var thisConfig = this;
		if(typeof config.expireddate != 'undefined') { this.expireddate = config.expireddate; } else{  console.log('expire date error'); return; }
		var arrClass = document.getElementsByClassName(this.className);
		
		for(var i=0; i< arrClass.length; i++)
		{
			this.elem.push({"obj":arrClass[i],"value":arrClass[i].innerHTML});
		}
		
		this.intervalCallTimer = setInterval(function(){thisConfig.calculate()},800);
	},
	calculate: function()
	{
		if(this.startTimestamp == '')
		{				
			var milliseconds = this.currentTimestamp();
			this.localTimestamp = milliseconds;		
			var dateParts = this.expireddate.split(' ');
			var timeParts = dateParts[1].split(':');
			dateParts = dateParts[0].split('-');
			
			var expireTimestamp = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1],timeParts[2]);	
			
			this.startTimestamp = Math.floor((expireTimestamp - this.localTimestamp)/1000);
			this.localTimestamp = Math.floor(this.localTimestamp/1000);
			this.showDateTime();
			
		}else
		{
			var diffTimestamp = 0;   	
			var milliseconds = this.currentTimestamp();
			diffTimestamp =  Math.floor(milliseconds/1000) - this.localTimestamp ;			
			this.localTimestamp = Math.floor(milliseconds/1000);
			this.startTimestamp = this.startTimestamp -  diffTimestamp;
			this.showDateTime();
		}
	
	},
	showDateTime: function()
	{
		var remainingTimeStamp = this.startTimestamp;
		var strFormatDay 		= (remainingTimeStamp > this.DAY_IN_SECOND) ? Math.floor(remainingTimeStamp/this.DAY_IN_SECOND):0; //Calculation of Days	
		
		remainingTimeStamp = remainingTimeStamp - (strFormatDay * this.DAY_IN_SECOND); // Remaining Hours in Timestamp(second)
		var strFormatHours 	= (remainingTimeStamp > this.HOUR_IN_SECOND) ? Math.floor(remainingTimeStamp/this.HOUR_IN_SECOND):0; // Calculation of Hours

		remainingTimeStamp = remainingTimeStamp - (strFormatHours * this.HOUR_IN_SECOND); //Remaining Minutes in Timestamp(second)	
		var strFormatMinutes 	= (remainingTimeStamp > this.MINUTE_IN_SECOND) ? Math.floor(remainingTimeStamp/this.MINUTE_IN_SECOND):0; //Calculation of Mintues

		remainingTimeStamp = remainingTimeStamp - (strFormatMinutes * this.MINUTE_IN_SECOND); //Remaining Timestamp
		var strFormatSeconds 	= (remainingTimeStamp > 0) ? remainingTimeStamp:0; //Remaining Timestamp is second				

		strFormatDay = (strFormatDay.toString().length > 1) ? strFormatDay: ('0'+ strFormatDay);
		strFormatHours = (strFormatHours.toString().length > 1) ? strFormatHours: ('0'+strFormatHours);
		strFormatMinutes = (strFormatMinutes.toString().length > 1) ? strFormatMinutes: ('0'+ strFormatMinutes);
		strFormatSeconds = (strFormatSeconds.toString().length > 1) ? strFormatSeconds: ('0'+ strFormatSeconds);
		
		var arrClass = document.getElementsByClassName(this.elemDays);
		var i = 0;
		for(i=0; i< arrClass.length; i++)
		{
			document.getElementsByClassName(this.elemDays)[i].innerHTML = strFormatDay;
		}
		arrClass = document.getElementsByClassName(this.elemHours);
		for(i=0; i< arrClass.length; i++)
		{
			document.getElementsByClassName(this.elemHours)[i].innerHTML = strFormatHours;
		}
		arrClass = document.getElementsByClassName(this.elemMinutes);
		for(i=0; i< arrClass.length; i++)
		{		
			document.getElementsByClassName(this.elemMinutes)[i].innerHTML = strFormatMinutes;
		}		
		arrClass = document.getElementsByClassName(this.elemSeconds);	
		for(i=0; i< arrClass.length; i++)
		{
			document.getElementsByClassName(this.elemSeconds)[i].innerHTML = strFormatSeconds;
		}
		
		for(i in this.elem )
		{			
			var val = this.elem[i].value.replace(this.day_specifier,strFormatDay);
			val = val.replace(this.hour_specifier,strFormatHours);
			val = val.replace(this.minute_specifier,strFormatMinutes);
			val = val.replace(this.second_specifier,strFormatSeconds);			
			this.elem[i].obj.innerHTML =val;		
		}
	},
	currentTimestamp: function() {
		// create Date object for current location
		var d = new Date();

		// convert to msec
		// add local time zone offset
		// get UTC time in msec
		var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

		// create new Date object for different city
		// using supplied offset
		//var nd = new Date(utc + (3600000*offset));

		// return time as a string
		return utc + (3600000*this.offset);
	}

}

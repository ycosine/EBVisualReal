define(['jsonUtil'], function(formatUtil) {
	var MCformater = {};
	var formatArgs = {
		moneyInterval:"0"
	}; 
	MCformater.data = {
		"0.38": 4.1,
		"23.5": 8.1,
	};

	
	MCformater.generateX = function() {
		
		return [
		        {
		            type : 'value',
		            scale:true,
		            axisLabel : {
		                formatter: '{value} 元'
		            }
		        }
		    ];

	};
	MCformater.generateS = function() {
		var result = [];
		var jsondata = this.data;
		var dataKeys = formatUtil.getJsonKey(this.data);
		var dataValues = formatUtil.getJsonValue(this.data,dataKeys);
		var resultdata = formatUtil.mergeArr(dataKeys,dataValues);
		var sobj = {};
		sobj.data = resultdata;
		sobj.name = "任务";
		sobj.type = "scatter";
		result.push(sobj);
		return result;
	};

	MCformater.generateL = function() {
		
		return ['任务'];

	};
	MCformater.createOption = function() {
		var option = {};
		option.xAxis = this.generateX();
		
		option.series = this.generateS();
		var lobj = {};
		lobj.data = this.generateL();
		option.legend = lobj;
		return option;
	};
	return MCformater;
});
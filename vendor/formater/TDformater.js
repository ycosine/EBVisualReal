define(['jsonUtil'], function(formatUtil) {
	var PTRformater = {};
	var formatArgs = {
		moneyInterval:"0"
	}; 
	PTRformater.data = {
			"实物任务": 632,
			"购物车任务": 91,
			"套餐任务": 19,
			"快递任务": 472,
			"单号任务": 56,
			"来路任务": 2207,
			"虚拟任务": 230
			};
	PTRformater.generateX = function() {
		var result = [];
		var _jsondata = this.data;

		result = formatUtil.getJsonKey(_jsondata);
		return result;
	};
	PTRformater.generateS = function() {
		var result = [];
		var _jsondata = this.data;
		var keylist = formatUtil.getJsonKey(_jsondata);
		var sobj = {};
		sobj.data = formatUtil.getJsonValue(_jsondata, keylist);
		sobj.name = "任务数量";
		sobj.type = "bar";
		sobj.symbol = "none";
		result.push(sobj);
		return result;
	};

	PTRformater.generateL = function() {
        return ['任务数量'];
	};
	PTRformater.createOption = function() {
		var option = {};
		option.xAxis = [];
		var xobj = {
			type: 'category'
		};
		xobj.data = this.generateX();
		option.xAxis.push(xobj);
		option.series = this.generateS();
		var lobj = {};
		lobj.data = this.generateL();
		option.legend = lobj;
		return option;
	};
	return PTRformater;
});
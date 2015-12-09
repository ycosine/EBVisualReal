define(['jsonUtil'], function(formatUtil) {
	var PTRformater = {};
	var formatArgs = {
		moneyInterval:"0"
	}; 
	PTRformater.data = {
			"实物用户": 632,
			"购物车用户": 91,
			"套餐用户": 19,
			"快递用户": 472,
			"单号用户": 56,
			"来路用户": 2207,
			"虚拟用户": 230
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
		sobj.name = "用户数量";
		sobj.type = "bar";
		result.push(sobj);
		return result;
	};

	PTRformater.generateL = function() {
        return ['用户数量'];
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
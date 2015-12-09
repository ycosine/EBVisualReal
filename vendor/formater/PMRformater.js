define(['jsonUtil'], function(formatUtil) {
	var MRformater = {};
	var formatArgs = {
		moneyInterval:"0"
	}; 
	MRformater.data = {
		"40.0": 224,
		"80.0": 95,
		"20.0": 194,
		"60.0": 209,
		"100.0": 179,
	};
	MRformater.priceWrapper = function(element) {
		var num = element - 0;
		var strbuffer = num - formatArgs.moneyInterval + '-' + num + "元";
		return strbuffer;
	};
	MRformater.priceSorter = function(a, b) {
		return a - b;
	};
	MRformater.generateX = function() {
		var result = [];
		var _jsondata = this.data;

		var list = formatUtil.getJsonKey(_jsondata);
		list = list.sort(this.priceSorter);
		//设置金额跨度
		if(list[1]){
			formatArgs.moneyInterval = list[1]-list[0];
		}
		result = list.map(this.priceWrapper);
		return result;
	};
	MRformater.generateS = function() {
		var result = [];
		var _jsondata = this.data;
		var keylist = formatUtil.getJsonKey(_jsondata);
			keylist = keylist.sort(this.priceSorter);
		var sobj = {};
		sobj.data = formatUtil.getJsonValue(_jsondata, keylist);
		sobj.name = "用户数量";
		sobj.type = "bar";
		result.push(sobj);
		return result;
	};

	MRformater.generateL = function() {
        return ['用户数量'];
	};
	MRformater.createOption = function() {
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
	return MRformater;
});
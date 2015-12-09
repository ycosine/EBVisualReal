define(['jsonUtil'], function(formatUtil) {
	var RAformater = {};
	RAformater.data = {
		"聊": 60756,
		"评": 153406,
		"审": 146073,
		"停": 169933,
		"手": 21787,
		"址": 33493
	};
	RAformater.generateS = function() {
		var result = [];
		var jsondata = this.data;
		var temp = [];
		for(var e in jsondata){
			temp.push(jsondata[e]); 
		}
		var datas = [];
		dobj = {};
		dobj.name = "任务特征";
		dobj.value = temp;
		datas.push(dobj);
		var sobj = {};
		sobj.type = 'radar';
		sobj.itemStyle = {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
        };
        sobj.data = datas;
		result.push(sobj);
		return result;
	};
	RAformater.generateP = function() {
		var jsondata = this.data;
		var keys = [];
		var values = [];
		for (var e in jsondata) {
			values.push(jsondata[e]);
		}
		values.sort(function(a, b) {
			return b - a;
		});
		console.log(values);
		var max = values[0];
		for (var e in jsondata) {
			keys.push(e);
		}
		var result = keys.map(function(text) {
			var obj = {};
			obj.text = text;
			obj.max = max;
			return obj;
		});
		return [{
			indicator: result
		}];
	};

	RAformater.generateL = function() {
		return {
			x: 'center',
			data: ['任务特征']
		};

	};
	RAformater.createOption = function() {
		var option = {};
		option.series = this.generateS();
		option.legend = this.generateL();
		option.polar = this.generateP();
		return option;
	};
	return RAformater;
});
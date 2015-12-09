define(['jsonUtil'], function(formatUtil) {
	var QRformater = {};
	QRformater.data = [{
		name: '预购',
		data: [30, 182, 434, 791, 390, 30, 10]
	}, {
		name: '低活跃用户',
		data: [1320, 1132, 601, 234, 120, 90, 20]
	}];


	QRformater.generateX = function() {
		var result = this.data;
		var data = [];
		result.map(function(element) {
			if(element.name=="攻击持续时间")
			data = element.data;
			return element;
		});
		var temp = [{
			type: 'category',
			show: false,
			boundaryGap: false,
			data: data

		}];
		return temp;

	};
	QRformater.generateS = function() {
		var result = this.data;
		result = result.map(function(element) {
			if(element.name=="任务密度"){
				element.zlevel = 99;
			}
			element.type = 'line';
			element.smooth = true;
			element.symbol = 'none';
			element.itemStyle = {
				normal: {
					areaStyle: {
						type: 'default'
					}
				}
			};
			return element;
		});
		return result;
	};

	QRformater.generateL = function() {
		var result = this.data;
		result = result.map(function(element) {
			return element.name;
		});
		return result;

	};
	QRformater.createOption = function() {
		var option = {};
		option.xAxis = this.generateX();
		option.series = this.generateS();
		var lobj = {};
		lobj.data = this.generateL();
		option.legend = lobj;
		return option;
	};
	return QRformater;
});
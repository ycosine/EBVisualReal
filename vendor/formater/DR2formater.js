define(['jsonUtil'], function(formatUtil) {
	var DRformater = {};
	var formatArgs = {
		moneyInterval: "0"
	};
	DRformater.data = {
		"2015-09-015#2015-09-22": {
			"100000.0": 150,
			"1000.0": 387,
			"200.0": 2327,
			"500.0": 1521,
			"100.0": 12790
		},
		"2015-09-22#2015-09-29": {
			"100000.0": 108,
			"1000.0": 342,
			"200.0": 1641,
			"500.0": 1068,
			"100.0": 9499
		},
		"2015-09-29#2015-10-06": {
			"100000.0": 62,
			"1000.0": 104,
			"200.0": 764,
			"500.0": 427,
			"100.0": 4189
		},
		"2015-10-06#2015-10-13": {
			"100000.0": 157,
			"1000.0": 292,
			"200.0": 2533,
			"500.0": 1455,
			"100.0": 12256
		},
		"2015-10-13#2015-10-20": {
			"100000.0": 199,
			"1000.0": 389,
			"200.0": 3001,
			"500.0": 1679,
			"100.0": 13151
		}
	};
	DRformater.priceWrapper = function(element) {
		var num = element - 0;
		var strbuffer = num - formatArgs.moneyInterval + '-' + num + "元";
		return strbuffer;
	};
	DRformater.priceSorter = function(a, b) {
		return a - b;
	};
	DRformater.dateWrapper = function(date) {
		var firstmonth = date.substring(5, 7);
		var firstday = date.substring(8, 10);
		var lastmonth = date.substring(16, 18);
		var lastday = date.substring(19, 21);
		return firstmonth + "-" + firstday  + "至" + lastmonth + "-" + lastday;
	};
	DRformater.dateSorter = function(a, b) {
		function getValue(date) {
			var year = date.substring(0, 4);
			var month = date.substring(5, 7);
			var day = date.substring(8, 10);
			return year * 1000 + month * 10 + day;
		}
		return getValue(a) - getValue(b);
	};
	DRformater.generateX = function() {
		return [{
			type: 'value',
			name: '%'
		}];
	};
	DRformater.generateY = function() {
		var result = [];

		var list = formatUtil.getJsonKey(this.data);
		list = list.sort(this.dateSorter);
		list = list.map(this.dateWrapper);
		var yobj = {};
		yobj.type = 'category',
			yobj.data = list,
			result.push(yobj);
		return result;

	};
	DRformater.generateS = function() {
		var result = [];

		var jsondata = this.data;
		var dateKeys = formatUtil.getJsonKey(this.data);
		dateKeys = dateKeys.sort(this.DRSorter);
		var priceKeys = ['100.0', '200.0', '500.0', '1000.0', '100000.0'];
		var names = ['0-100元', '100-200元', '200-500元', '500-1000元', '1000元以上'];
		var sums = dateKeys;
		sums = sums.map(function(element) {
			var dataobj = jsondata[element];
			var sum = 0;
			for (var key in dataobj) {
				sum = sum + dataobj[key];
			}
			return sum;
		});

		result = priceKeys.map(function(nameElement, nameIndex) {
			var priceValues = [];
			//保留小数点两位的函数
			function toDecimal(x) {
				var result = 100 * x + '';
				result = result.substring(0, 4);
				/*var temp = result - 0;
				if(temp<1){
					console.log(temp);
					result = '1';
				}*/
				return result;
			}
			dateKeys.map(function(dateElement, dateIndex) {
				//截断，求出百分比
				var sum = sums[dateIndex];
				var value = jsondata[dateElement][nameElement];
				var percent = toDecimal(value / sum) - 0;
				priceValues.push(percent);
			});
			return priceValues;
		});
		result = result.map(function(arrElement, index) {
			var sobj = {};
			sobj.name = names[index];
			sobj.type = 'bar';
			sobj.data = arrElement;
			sobj.stack = '总量';
			sobj.itemStyle = {
				normal: {
					label: {
						show: true,
						position: 'inside',
						formatter: '{c}%'
					}
				}
			};
			return sobj;
		});
		return result;
	};

	DRformater.generateL = function() {

		return ['0-100元', '100-200元', '200-500元', '500-1000元', '1000元以上'];

	};
	DRformater.createOption = function() {
		var option = {};
		option.xAxis = this.generateX();
		option.yAxis = this.generateY();
		option.series = this.generateS();
		var lobj = {};
		lobj.data = this.generateL();
		option.legend = lobj;
		return option;
	};
	return DRformater;
});
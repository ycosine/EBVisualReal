define(['jsonUtil'], function(formatUtil) {
	//样本假数据
	var TRformater = {};
	TRformater.data = {
		"2015-10-01#2015-10-08": {
			"单号任务": {
				"taskCount": 83,
				"userCount": 32
			},
			"套餐任务": {
				"taskCount": 33,
				"userCount": 17
			},
			"实物任务": {
				"taskCount": 1098,
				"userCount": 324
			},
			"快递任务": {
				"taskCount": 1231,
				"userCount": 290
			},
			"来路任务": {
				"taskCount": 6832,
				"userCount": 1303
			},
			"虚拟任务": {
				"taskCount": 972,
				"userCount": 111
			},
			"购物车任务": {
				"taskCount": 272,
				"userCount": 103
			}
		},
		"2015-10-08#2015-10-15": {
			"单号任务": {
				"taskCount": 194,
				"userCount": 44
			},
			"套餐任务": {
				"taskCount": 70,
				"userCount": 31
			},
			"实物任务": {
				"taskCount": 1816,
				"userCount": 480
			},
			"快递任务": {
				"taskCount": 1949,
				"userCount": 365
			},
			"来路任务": {
				"taskCount": 10637,
				"userCount": 1679
			},
			"虚拟任务": {
				"taskCount": 1692,
				"userCount": 151
			},
			"购物车任务": {
				"taskCount": 429,
				"userCount": 142
			}
		},
		"2015-10-15#2015-10-20": {
			"单号任务": {
				"taskCount": 108,
				"userCount": 34
			},
			"套餐任务": {
				"taskCount": 47,
				"userCount": 23
			},
			"实物任务": {
				"taskCount": 1361,
				"userCount": 401
			},
			"快递任务": {
				"taskCount": 1497,
				"userCount": 320
			},
			"来路任务": {
				"taskCount": 8295,
				"userCount": 1482
			},
			"虚拟任务": {
				"taskCount": 1317,
				"userCount": 146
			},
			"购物车任务": {
				"taskCount": 301,
				"userCount": 104
			}
		}
	};

	TRformater.test = function() {
		console.log("TRformater-loading success");
		formatUtil.test();
	};
	TRformater.dateWrapper = function(date) {
		var firstmonth = date.substring(5, 7);
		var firstday = date.substring(8, 10);
		var lastmonth = date.substring(15, 18);
		var lastday = date.substring(19, 21);
		return "任务数   "+firstmonth + "月" + firstday + "日" + "至" + lastmonth + "月" + lastday + "日"+"   用户数";
	};
	TRformater.dateSorter = function(a, b) {
		function getValue(date) {
			var year = date.substring(0, 4);
			var month = date.substring(5, 7);
			var day = date.substring(8, 10);
			return year * 1000 + month * 10 + day;
		}
		return getValue(a) - getValue(b);
	};
	TRformater.generateX = function() {
		var result = [];
		var list = formatUtil.getJsonKey(this.data);
		list = list.sort(this.dateSorter);
		result = list.map(this.dateWrapper);
		return result;
	};
	TRformater.generateS = function() {
		var result = [];
		var jsondata = this.data;
		var dateKeys = formatUtil.getJsonKey(this.data);
		dateKeys = dateKeys.sort(this.dateSorter);
		var lengends = formatUtil.getJsonKey(this.data[dateKeys[0]]);
		result = lengends.map(function(nameElement, nameIndex) {
			var priceValues = [];
			dateKeys.map(function(dateElement, dateIndex) {
				priceValues.push(jsondata[dateElement][nameElement]);
			});
			return priceValues;
		});
		var taskCount = result.map(function(arrElement, index) {
			var sobj = {};
			sobj.name = lengends[index];
			arrElement = arrElement.map(function(element) {
				return element.taskCount;
			});
			sobj.data = arrElement;
			sobj.stack = 'taskCount';
			sobj.type = 'bar';
			return sobj;
		});
		var userCount = result.map(function(arrElement, index) {
			var sobj = {};
			sobj.name = lengends[index];
			arrElement = arrElement.map(function(element) {
				return element.userCount;
			});
			sobj.data = arrElement;
			sobj.stack = 'userCount';
			sobj.type = 'bar';
			return sobj;
		});
		result = taskCount.concat(userCount);
		taskCount = userCount = null;
		return result;
	};

	TRformater.generateL = function() {
		var result = [];
		var keylist = formatUtil.getJsonKey(this.data);
		var example = this.data[keylist[0]];
		var examplekeys = formatUtil.getJsonKey(example);
		result = examplekeys;
		return result;

	};
	TRformater.createOption = function() {
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
	return TRformater;
});
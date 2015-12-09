define(['jsonUtil'], function(formatUtil) {
	//由于数据的特殊性，本过滤器中的生成方法都是写死的
	var TPformater = {};
	TPformater.data = {
		"2014-12-02": {
			"mobileCount": 0,
			"pcCount": 57748
		},
		"2015-01-01": {
			"mobileCount": 0,
			"pcCount": 47064
		},
		"2015-01-31": {
			"mobileCount": 0,
			"pcCount": 16871
		},
		"2015-03-02": {
			"mobileCount": 0,
			"pcCount": 17864
		},
		"2015-04-01": {
			"mobileCount": 0,
			"pcCount": 2910
		},
		"2015-05-01": {
			"mobileCount": 0,
			"pcCount": 2319
		},
		"2015-05-31": {
			"mobileCount": 3190,
			"pcCount": 10542
		},
		"2015-06-30": {
			"mobileCount": 5562,
			"pcCount": 27598
		},
		"2015-07-30": {
			"mobileCount": 4135,
			"pcCount": 16351
		},
		"2015-08-29": {
			"mobileCount": 3079,
			"pcCount": 17378
		},
		"2015-09-28": {
			"mobileCount": 5650,
			"pcCount": 18512
		},
		"2015-10-28": {
			"mobileCount": 1,
			"pcCount": 12
		}
	};

	TPformater.test = function() {
		console.log("TPformater-loading success");
		formatUtil.test();
	};
	TPformater.dateWrapper = function(date) {
		var firstmonth = date.substring(5, 7);
		var firstday = date.substring(8, 10);
		return firstmonth + "月" + firstday + "日"
	};
	TPformater.dateSorter = function(a, b) {
		function getValue(date) {
			var year = date.substring(0, 4);
			var month = date.substring(5, 7);
			var day = date.substring(8, 10);
			return year * 1000 + month * 10 + day;
		}
		return getValue(a) - getValue(b);
	};
	TPformater.generateRate = function(arr){
		function toDecimal(x) {
				var result = 100 * x + '';
				console.log(result);
				var potindex = result.indexOf(".");
				result = result.substring(0, potindex+2);
				return result;
			}
		//生成变化率
		var result = [];
		result = arr.map(function(element,index){
			if(index!==0){
				var frontElement = arr[index-1];
				if(frontElement===0||element===0){
					console.log('0');
					return 0;
				}
				var mm = element-frontElement;
				var temp = (mm/frontElement);
				
				return toDecimal(temp);
			}else{
				return element;
			}
			
		});
		result.shift();
		return result;
	};

	TPformater.generateX = function() {
		var result = [];
		var list = formatUtil.getJsonKey(this.data);
		list = list.sort(this.dateSorter);
		list = list.map(this.dateWrapper);
		list.shift();//去除第一个
		var xobj = {
			type: 'category',
			axisLine: {
				show: true,
				onZero: false
			}
		};
		
		xobj.data = list;
		result.push(xobj);
		return result;
	};
	TPformater.generateY = function() {
		return [
	        {
	            type : 'value',
	            name : '用户数',
	            max : '150000'
	        },
	        {
	            type : 'value',
	            name : '增长率',
	            axisLabel : {
	            	show:false
	            },
	            min:'-2500',
	            axisLine: {
					show: true
				}
	        }
    	];
	}
	TPformater.generateS = function() {
		var result = [];
		var jsondata = this.data;
		var dateKeys = formatUtil.getJsonKey(jsondata);
		dateKeys = dateKeys.sort(this.dateSorter);
		var lengends = formatUtil.getJsonKey(jsondata[dateKeys[0]]);
		result = lengends.map(function(nameElement, nameIndex) {
			var priceValues = [];
			dateKeys.map(function(dateElement, dateIndex) {
				priceValues.push(jsondata[dateElement][nameElement]);
			});
			return priceValues;
		});
		//对两个数组进行操作，生成变化率
		var mcRate = {};
		mcRate.name = 'mcRate';
		mcRate.data = this.generateRate(result[0]);
		mcRate.type = 'line';
		mcRate.yAxisIndex = 1;
		mcRate.itemStyle = {
				normal: {
					label: {
						show: true,
						position: 'top',
						formatter: '{c}%'
					}
				}
			};

		
		var pcRate = {};
		pcRate.name = 'pcRate';
		pcRate.data = this.generateRate(result[1]);
		pcRate.type = 'line';
		pcRate.yAxisIndex = 1;
		pcRate.itemStyle = {
				normal: {
					label: {
						show: true,
						position: 'top',
						formatter: '{c}%'
					}
				}
			};

		//删除原来数组的一个元素
		result[0].shift();
		result[1].shift();
		
		var mobileCount = {};
		mobileCount.name = 'mobileCount';
		mobileCount.data = result[0];
		mobileCount.type = 'bar';

		var pcCount = {};
		pcCount.name = 'pcCount';
		pcCount.data = result[1];
		pcCount.type = 'bar';

		result = [mobileCount, pcCount,mcRate,pcRate];
		return result;
	};
	TPformater.generateL = function() {
		return {
     	   data:['mobileCount','pcCount','mcRate','pcRate']
    	}
	};
	TPformater.createOption = function() {
		var option = {};
		option.xAxis = this.generateX();
		option.yAxis = this.generateY();
		option.series = this.generateS();	
		option.legend = this.generateL();
		return option;
	};
	return TPformater;
});
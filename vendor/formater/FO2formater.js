define(['jsonUtil'], function(formatUtil) {
	var FOformater = {};
	/*FOformater.data = [{
		"name": "聊",
		"data": {
			"手": 1,
		}
	}, {
		"name": "评",
		"data": {
			"址": 2
		}
	},
	{
		"name": "手",
		"data": {
			"评": 3,
		}
	}, 
	{
		"name": "址",
		"data": {
			"聊": 3
		}
	}];*/
	FOformater.data = [{
		"name": "进行评价",
		"data": {
			"停留": 127803,
			"淘金币": 929,
			"收藏": 89367,
			"底部截图": 103203,
			"聊": 56575,
			"收货": 262115,
			"货比": 67996,
			"实名": 135276,
			"手机": 16908,
			"审核": 57062
		}
	}, {
		"name": "收货",
		"data": {
			"停留": 256895,
			"淘金币": 1147,
			"收藏": 147961,
			"底部截图": 208837,
			"聊": 69738,
			"收货": 0,
			"货比": 134362,
			"实名": 211944,
			"手机": 23549,
			"审核": 35660
		}
	}, {
		"name": "手机",
		"data": {
			"停留": 14159,
			"淘金币": 279,
			"收藏": 9407,
			"底部截图": 9912,
			"聊": 19399,
			"货比": 6152,
			"实名": 9598,
			"审核": 9340
		}
	}, {
		"name": "审核",
		"data": {
			"停留": 13075,
			"淘金币": 149,
			"收藏": 8350,
			"底部截图": 2723,
			"聊": 41550,
			"实名": 26788,
		}
	}, {
		"name": "聊",
		"data": {
			"停留": 51905,
			"淘金币": 563,
			"收藏": 29234,
			"底部截图": 27450,
			"收货": 0,
			"货比": 19714,
			"实名": 44654,
		}
	}, {
		"name": "停留",
		"data": {
			"淘金币": 419,
			"收藏": 108633,
			"底部截图": 158893,
			"货比": 108972,
			"实名": 149999,
		}
	}, {
		"name": "实名",
		"data": {
			"淘金币": 803,
			"收藏": 98860,
			"底部截图": 132293,
			"货比": 89082,

		}
	}, {
		"name": "货比",
		"data": {
			"淘金币": 240,
			"收藏": 71088,
			"底部截图": 101986,
		}
	}, {
		"name": "收藏",
		"data": {
			"淘金币": 238,
			"底部截图": 101607,

		}
	}, {
		"name": "底部截图",
		"data": {
			"淘金币": 368,

		}
	}, {
		"name": "淘金币",
		"data": {
	
		}
	}];
	FOformater.generateS = function() {
		var result = [];
		var jsondata = this.data;
		var nodes = [];
		nodes = jsondata.map(function(element) {
			var nobj = {};
			nobj.name = element.name;
			nobj.category = 0;
			nobj.value = 200;
			return nobj;
		});
		var links = [];
		var linksarr = jsondata.map(function(element) {
			var result = [];
			var source = element.name;
			var data = element.data;
			//获得和source有关系的所有target keys
			var keys = formatUtil.getJsonKey(data);
			//筛选出来最大的两个?我感觉不应该限制在top2 而是定义一个比较合理的阈值
			keys = keys.filter(function(element){
  				return data[element] >= 140000;
			});
			result = keys.map(function(element) {
				var lobj = {};
				lobj.source = source;
				lobj.target = element;
				lobj.weight = data[element];
				return lobj;
			});
			return result;
		}); //出来的是一个二维数组，最后再把所有东西合并就可以了。
		linksarr.forEach(function(element) {
			links = links.concat(element);
		});
		var sobj = {
			type: 'force',
			name: "任务特征",
			ribbonType: false,
			categories: [{
				name: '任务特征'
			}],
			itemStyle: {
				normal: {
					label: {
						show: true,
						textStyle: {
							color: '#333'
						}
					},
					nodeStyle: {
						brushType: 'both',
						borderColor: 'rgba(255,215,0,0.4)',
						borderWidth: 1
					},
					linkStyle: {
						type: 'curve'
					}
				},
				emphasis: {
					label: {
						show: false
							// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
					},
					nodeStyle: {
						//r: 30
					},
					linkStyle: {}
				}
			},
			useWorker: false,
			minRadius: 15,
			maxRadius: 65,
			gravity: 1.1,
			scaling: 1.1,
			roam: 'move',
		};
		sobj.nodes = nodes;

		//console.log(nodes);
		//console.log(links);
		sobj.links = links;
		result.push(sobj);
		return result;
	};

	FOformater.generateL = function() {
		return {
			x: 'left',
			data: ['任务特征']
		};

	};
	FOformater.createOption = function() {
		var option = {};
		option.series = this.generateS();
		option.legend = this.generateL();
		return option;
	};
	return FOformater;
});
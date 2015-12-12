(function() {
	'use strict';
	angular
		.module('app.forms')
		.factory('ParserFactory', function() {
			var ParserFactory = (function() {
				var createdParsers = {};
				return {
					createParser: function(formName) {
						if (createdParsers[formName]) {
							return createParser[formName];
						} else {
							var parser = new BaseParser(formName);
							createdParsers[formName] = parser;
							return parser;
						}
					}
				};
			})();
			var BaseParser = function(formName) {
				var formaterClass = null;
				for (var fclass in extraLibrary) {
					if (formName === fclass) {
						formaterClass = fclass;
						break;
					}
				}
				//反射调用
				if (typeof extraLibrary[formaterClass] == "function") {
					extraLibrary[formaterClass].call(this);
				}
			};
			BaseParser.prototype = {
				constructor: BaseParser,
				data: 'prototype_data_default',
				createOption: function() {
					console.log("prototype_createOption");
				},
				getJsonValue: function getJsonValue(source, keys) {
					return keys.map(function(element) {
						return source[element];
					});
				},
				getJsonKey: function getJsonKey(source) {
					if (typeof source == 'object' && source !== null) {
						var result = [];
						for (var key in source) {
							if (source.hasOwnProperty(key)) {
								result.push(key);
							}
						}
					}
					return result;
				},
				/**
				 * 按照某种方式合并两个数组
				 * 方式 type:
				 * 	1.order 顺序合并 例如 arr1=[1,2,3,4] arr2=['a','b','c','d'],合并后是[[1,'a'],[2,'b'],[3,'c'],[4,'d']]
				 *  2.model 顺序合并成对象 ？问题，没有合适的对象模型参数
				 */
				mergeArr: function mergeArr(arr1, arr2) {
					var result = arr1.map(function(element, index) {
						var temp = [];
						temp.push(element);
						temp.push(arr2[index]);
						return temp;
					});
					return result;
				}
			};

			var extraLibrary = {
				'DRformater': function() {
					var flag = true;

				},
				'total_analyze_parser': function() {
					this.generateX = function() {
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
					this.generateS = function() {
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

					this.generateL = function() {
						var result = this.data;
						result = result.map(function(element) {
							return element.name;
						});
						return result;
				
					};
					this.setData = function(data){
						this.data = data;
					};
					this.createOption = function(data) {
						this.setData(data);
						var option = {};
						option.xAxis = this.generateX();
						option.series = this.generateS();
						var lobj = {};
						lobj.data = this.generateL();
						option.legend = lobj;
						return option;
					};

				},
				'total_show_parser': function() {

					this.createOption = function() {
						console.log("RA-createOption");

						var option = {
							title: {
								text: '某地区蒸发量和降水量',
								subtext: '纯属虚构'
							},
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: ['蒸发量', '降水量']
							},
							toolbox: {
								show: true,
								feature: {
									mark: {
										show: true
									},
									dataView: {
										show: true,
										readOnly: false
									},
									magicType: {
										show: true,
										type: ['line', 'bar']
									},
									restore: {
										show: true
									},
									saveAsImage: {
										show: true
									}
								}
							},
							calculable: true,
							xAxis: [{
								type: 'category',
								data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
							}],
							yAxis: [{
								type: 'value'
							}],
							series: [{
								name: '蒸发量',
								type: 'bar',
								data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
								markPoint: {
									data: [{
										type: 'max',
										name: '最大值'
									}, {
										type: 'min',
										name: '最小值'
									}]
								},
								markLine: {
									data: [{
										type: 'average',
										name: '平均值'
									}]
								}
							}, {
								name: '降水量',
								type: 'bar',
								data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								markPoint: {
									data: [{
										name: '年最高',
										value: 182.2,
										xAxis: 7,
										yAxis: 183,
										symbolSize: 18
									}, {
										name: '年最低',
										value: 2.3,
										xAxis: 11,
										yAxis: 3
									}]
								},
								markLine: {
									data: [{
										type: 'average',
										name: '平均值'
									}]
								}
							}]
						};
						return option;
					};
				}
			};



			return ParserFactory;
		});

})();
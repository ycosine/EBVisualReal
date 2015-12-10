(function() {
	'use strict';

	angular
		.module('app.forms')
		.factory('ParserFactory', function() {
			var ParserFactory = (function() {
				var createdParsers = {};
				return {
					createParser: function(formName, model) {
						if (createdParsers[formName]) {
							return createdCars[formName];
						} else {
							var parser = new BaseParser(formName, model);
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
				'TPformater': function() {

				},
				'RAformater': function() {
					this.data = {
						"聊": 60756,
						"评": 153406,
						"审": 146073,
						"停": 169933,
						"手": 21787,
						"址": 33493
					};
					this.generateS = function() {
						var result = [];
						var jsondata = this.data;
						var temp = [];
						for (var e in jsondata) {
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
					this.generateP = function() {
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
					this.generateL = function() {
						return {
							x: 'center',
							data: ['任务特征']
						};

					};
					this.createOption = function() {
						console.log("RA-createOption");
						var option = {};
						option.series = this.generateS();
						option.legend = this.generateL();
						option.polar = this.generateP();
						return option;
					};
				}
			};



			return ParserFactory;
		});

})();
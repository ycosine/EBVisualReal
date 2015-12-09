define(function(require) {
	/**
	 * 基本解析,从Json中按照keys的顺序
	 * 获取values
	 * 当然方法也封装的很简单
	 * @param {Object} source
	 * @param {Object} keys
	 */
	function getJsonValue(source, keys) {
			return keys.map(function(element) {
				return source[element];
			});
		}
		/**
		 * 从json对象中按for-in的顺序遍历，获得key数组
		 * @param {Object} source  json对象
		 */

	function getJsonKey(source) {
			if (typeof source == 'object' && source !== null) {
				var result = [];
				for (var key in source) {
					if (source.hasOwnProperty(key)) {
						result.push(key);
					}
				}
			}
			return result;
		}
		/**
		 * 按照某种方式合并两个数组
		 * 方式 type:
		 * 	1.order 顺序合并 例如 arr1=[1,2,3,4] arr2=['a','b','c','d'],合并后是[[1,'a'],[2,'b'],[3,'c'],[4,'d']]
		 *  2.model 顺序合并成对象 ？问题，没有合适的对象模型参数
		 */

	function mergeArr(arr1, arr2) {
		var result = arr1.map(function(element, index) {
			var temp = [];
			temp.push(element);
			temp.push(arr2[index]);
			return temp;
		});
		return result;
	}


	function test() {
		alert("jsonUtil_success_loading");
	}
	return {
		getJsonKey: getJsonKey,
		getJsonValue: getJsonValue,
		mergeArr:mergeArr,
		test: test
	};
});
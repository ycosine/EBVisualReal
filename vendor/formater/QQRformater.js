define(['jsonUtil'], function(formatUtil) {
	var QRformater = {};
	QRformater.data = [{
		name: '高活跃用户',
		data: [30, 182, 434, 791, 390, 30, 10]
	}, {
		name: '低活跃用户',
		data: [1320, 1132, 601, 234, 120, 90, 20]
	}];


	QRformater.generateX = function() {
		
		return [
        {
            type : 'value',
            scale:true
        }];

	};
	QRformater.generateS = function() {
		var result = this.data;
		result = result.map(function(element) {
			if(element.name=="高活跃用户"){
				element.data = element.data.map(function(e,i){
					var a = [];
					a.push(i+2000);
					a.push(e);
					return a ;
				});
			}else if(element.name=="低活跃用户"){
				element.data = element.data.map(function(e,i){
					var a = [];
					a.push(i);
					a.push(e);
					return a ;
				});
			}else if(element.name=="中活跃用户"){
				element.data = element.data.map(function(e,i){
					var a = [];
					a.push(i+1000);
					a.push(e);
					return a ;
				});
			}
			element.type = 'scatter';
			
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
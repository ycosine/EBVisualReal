
define(['jsonUtil'], function(formatUtil) {
	var FCformater = {};
	FCformater.data = [];
    
	FCformater.generateS = function() {
		var result = [];
		var jsondata = this.data;
		var temp = [];
		for(var e in jsondata){
			var obj = {};
			obj.name = e;
			obj.value = jsondata[e];
			temp.push(obj);
		}
		function createRandomItemStyle() {
		    return {
		        normal: {
		            color: 'rgb(' + [
		                Math.round(Math.random() * 160),
		                Math.round(Math.random() * 160),
		                Math.round(Math.random() * 160)
		            ].join(',') + ')'
		        }
		    };
		};


		var sobj = {};
			sobj.name = 'XX';
			sobj.type = 'wordCloud';
            sobj.size =  ['80%', '80%'];
            sobj.textRotation = [0, 45, 90, -45];
            sobj.textPadding= '40%';
            sobj.autoSize={
		            enable: true,
		            minSize: 14
		    };
			
			sobj.data = temp.map(function(element){
				 element.itemStyle = createRandomItemStyle();
				 return element;
			});
		result.push(sobj);
		return result;
	};
	

	FCformater.createOption = function() {
		var option = {};
		option.series = this.generateS();

		return option;
	};
	return FCformater;
});
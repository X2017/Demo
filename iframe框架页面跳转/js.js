function setValue(json) {
	var data=new Function("return"+json)();
	$.each($('#iframeSVG').contents().find('.info'),function(index,value){
		for(var i in data.data){
			if(i == $(value).attr('name')){
				if((data.data[i].load[$(value).attr('value')]) != undefined){
					if ($(value).attr('value') == 'curra') {
						$(value).html('Ua: '+data.data[i].load[$(value).attr('value')]);
					}else if($(value).attr('value') == 'currb'){
						$(value).html('Ub: '+data.data[i].load[$(value).attr('value')]);
					}else if($(value).attr('value') == 'currc'){
						$(value).html('Uc: '+data.data[i].load[$(value).attr('value')]);
					}else if($(value).attr('value') == 'volta'){
						$(value).html('Uc: '+data.data[i].load[$(value).attr('value')]);
					}else if($(value).attr('value') == 'voltb'){
						$(value).html('Uc: '+data.data[i].load[$(value).attr('value')]);
					}else if($(value).attr('value') == 'voltc'){
						$(value).html('Uc: '+data.data[i].load[$(value).attr('value')]);
					}
				}else {
					$(value).html(data.data[i][$(value).attr('value')]);
				}
			}
		}
	});
}
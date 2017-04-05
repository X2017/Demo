$(function () {
	time('time');
	$('svg').svgPanZoom({
		events: {
	        mouseWheel:true, // 使鼠标滚轮缩放事件
	        doubleClick:true, // 允许双击放大事件
	        drag:true, // SVG支持拖拽移动事件
	        dragCursor:"move" // 光标拖动时要使用SVG
	    },
	    animationTime:300, // 时间以毫秒为单位使用作为动画的默认。设置0到删除动画
	    zoomFactor:0.5, // 多少的放大或以长镜头
	    maxZoom:2, //最大放大,必须大于1
	});
});
function time(id){
	var t=new Date();
	var m=pushZero(t.getMonth()+1);
	var d=pushZero(t.getDate());
	var h=pushZero(t.getHours());
	var min=pushZero(t.getMinutes());
	var s=pushZero(t.getSeconds());
	var day=t.getDay();
	var dayArr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	function pushZero(num){
		if(num<10){
			return "0"+num;
		}else{
			return num;
		}
	}
	var timer=setTimeout(function () {
		time(id);
	},500);
	document.getElementById(id).innerHTML=(t.getFullYear()+"年"+m+"月"+d+"日"+" "+h+":"+min+":"+s+" "+dayArr[day]);
}
$(function () {
	// 导航
	$('.navMeun li').hover(function () {
		$(this).find('.drop').show();
	},function () {
		$(this).find('.drop').hide();
	});
	//返回顶部
	$(window).bind('scroll',function () {
		if (getScroll().top >= 500) {
			$('#top').show();
		}else {
			$('#top').hide();
		}
	});
	$('#copyright').html(2017);
});


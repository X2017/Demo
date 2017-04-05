$(function () {
	// 导航
	$('.navMeun li').hover(function () {
		$(this).find('.drop').show();
	},function () {
		$(this).find('.drop').hide();
	});
	//头部轮播
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100).css('zIndex','98');
	$('#banner ul li').eq(0).css('color', '#FFCD38');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));
	var bannerIndex = 1;
	var bannerType = 1;//1表示透明度，2表示上下滚动
	var bannerbottomTimer = setInterval(getBanner, 3000);
	$('#banner ul li').hover(function () {
		clearInterval(bannerbottomTimer);
		if ($(this).css('color') != 'rgb(255, 255,255)' || $(this).css('color') != 'white') {
			setBanner(this, bannerIndex == 0 ? $('#banner ul li').length() - 1 : bannerIndex - 1);
		}
	}, function () {
		bannerIndex = $(this).index() + 1;
		bannerbottomTimer = setInterval(getBanner, 3000);
	});
	$('#banner img').hover(function () {
		clearInterval(bannerbottomTimer);
	}, function () {
		bannerIndex = $(this).index() + 1;
		bannerbottomTimer = setInterval(getBanner, 3000);
	});
	function setBanner(obj, prev) {
		$('#banner ul li').css('color', 'white');
		$(obj).css('color', '#FFCD38');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		if (bannerType == 1) {
			$('#banner img').eq(prev).animate({
				attr : 'o',
				target : 0,
				t : 30,
				step : 10
			}).css('zIndex', 1);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('zIndex', 2);
		} else if (bannerType == 2) {
			$('#banner img').eq(prev).animate({
				attr : 'y',
				target : 150,
				t : 30,
				step : 10
			}).css('zIndex', 1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'y',
				target : 0,
				t : 30,
				step : 10
			}).css('top', '-150px').css('zIndex', 2).opacity(100);
		}
	}
	function getBanner() {
		if (bannerIndex >= $('#banner ul li').length()) bannerIndex = 0;
		setBanner($('#banner ul li').eq(bannerIndex).first(), bannerIndex == 0 ? $('#banner ul li').length() - 1 : bannerIndex - 1);
		bannerIndex++;
	}
	//底部左右轮播
	var proList = $().getId('proList'); // ul
	var imgAllLength = $('#proList img').length(); //所有图片
	var imgWidth = 242;//图片宽度
	// var imgAllWidth = - (imgAllLength * imgWidth); // -736 移动全部
	var imgAllWidth = -242; // 移动一个
	$('#prev').click(function () {
		var ulLeft = parseInt($('#proList').css('left'));
		if (ulLeft >= 0) {
			move(proList, 'left', -484);
		}
		else {
			move(proList, 'left', ulLeft - imgAllWidth);
		}
	});
	$('#next').click(function () {
		var ulLeft = parseInt($('#proList').css('left'));
		var count = Math.floor((imgAllLength * (imgWidth) + ulLeft) / imgWidth); //3
		if (count <= 1) {
			move(proList, 'left', 0);
		}else {
			move(proList, 'left', ulLeft + imgAllWidth);
		}
	});
	var bottomTimer=setInterval($().getId('next').onclick,3000);
	bottomStopTime($().getId('proList'));
	bottomStopTime($().getId('prev'));
	bottomStopTime($().getId('next'));
	function bottomStopTime(target) {
		$(target).hover(function () {
			clearInterval(bottomTimer);
		},function () {
			bottomTimer=setInterval($().getId('next').onclick,3000);
		});
	}
	//底部选项卡
	$('.newContent li').hover(function () {
		$('.newContent li').removeClass('newActive');
		$('#right div').hide();
		$(this).addClass('newActive');
		$('#right div').eq($(this).index()).show();
	},function () {
		//blur
	});
});
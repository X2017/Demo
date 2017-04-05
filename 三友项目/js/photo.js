$(function () {
	var photo_big = $('#photo_big');
	$('#photo li a img').click(function () {
		$('#imgMess').html($(this).prevs().text());
		photo_big.center(620, 511).show();
		$('#lock').lock();
		var temp_img = new Image();
		$(temp_img).bind('load', function () {
			$('#photo_big .big img').attr('src', temp_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
		});
		temp_img.src = $(this).attr('bigsrc');
		var children = this.parentNode.parentNode;
		prev_next_img(children);
	});
	$('#photo_big .close').click(function () {
		photo_big.hide();
		$('#lock').unlock();
		$('#photo_big .big img').attr('src', 'img/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	});
	//图片鼠标划过
	$('#photo_big .big .left').hover(function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});
	//图片鼠标划过
	$('#photo_big .big .right').hover(function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});
	//图片上一张 
	$('#photo_big .big .left').click(function () {
		$('#photo_big .big img').attr('src', 'img/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
		var current_img = new Image();
		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});
		current_img.src = $(this).attr('src');
		var children = $('#photo li a img').ge(prevIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
		$('#imgMess').html($('#photo a').eq($('#bigImg').attr('index')).text());
	});
	//图片下一张
	$('#photo_big .big .right').click(function () {
		$('#photo_big .big img').attr('src', 'img/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
		var current_img = new Image();
		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});
		current_img.src = $(this).attr('src');
		var children = $('#photo li a img').ge(nextIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
		$('#imgMess').html($('#photo a').eq($('#bigImg').attr('index')).text());
	});
	function prev_next_img(children) {
		var prev = prevIndex($(children).index(), children.parentNode);
		var next = nextIndex($(children).index(), children.parentNode);
		var prev_img = new Image();
		var next_img = new Image();
		prev_img.src = $('#photo li a img').eq(prev).attr('bigsrc');
		next_img.src = $('#photo li a img').eq(next).attr('bigsrc');
		$('#photo_big .big .left').attr('src', prev_img.src);
		$('#photo_big .big .right').attr('src', next_img.src);
		$('#photo_big .big img').attr('index', $(children).index());
		$('#photo_big .big .index').html(parseInt($(children).index()) + 1 + '/' + $('#photo li a img').length());
	}
});

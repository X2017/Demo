jQuery.noConflict();
var jq = jQuery;
$(function () {
	$('#photo img').click(function () {
		var str = ''+window.location;
		$('#lock').lock();
		$('#getVideo').center(640,480).show();
		$('#videoHead').html($(this).prevs().text());
		$('#webm').attr('src',$(this).attr('webm'));
		$('#flv').attr('src',$(this).attr('flv'));
		if (sys.msie || sys.ie){
			$('#player1').attr('src',$(this).attr('flv'));
		}
		jq('audio,video').mediaelementplayer({
			success: function(player, node) {
				jq('#' + node.id + '-mode').html('mode: ' + player.pluginType);
				 player.play();
                $('#getVideo .close').click(function () {
                	player.pause();
					$('#lock').unlock();
        			$('#getVideo').hide();
					window.location.reload();
                });
			}
		});
	});
});
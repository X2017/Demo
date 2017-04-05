$(function() {
	// 树列表
    $('#tree').tree({
        url: 'tree.json',
        animate: true,
        checkbox: true,
        cascadeCheck: false,
        onlyLeafCheck: true,
        lines: true,
        dnd: true,
        data: [{
            "text": "本地节点"
        }],
        onLoadSuccess: function(node) {
            setWestHeight();
            // 树节点提示框
       		$('.tree-node').mouseover(function () {
       			$('.tree-node').tooltip({
	            	content:$(this).text(),
	            	position:'right',
	            });
       			console.log($(this).text());
       		});
        }
    });
});
// layout调整布局
function setWestHeight() {
    var c = $('#layout');
    var p = c.layout('panel', 'west');
    var oldHeight = p.panel('panel').outerHeight();
    p.panel('resize', { height: 'auto' });
    var newHeight = p.panel('panel').outerHeight();
    c.layout('resize', {
        height: (c.height() + newHeight - oldHeight) + 100
    });
}
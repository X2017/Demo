$(function() {
    $('#box').treegrid({
        data: [{
            "aid": 1,
            "aname": "系统管理",
            "date": "2015-10-10",
            "children": [{
                "aid": 2,
                "aname": "主机信息",
                "date": "2015-10-10"
            }]
        }, {
            "aid": 3,
            "aname": "会员管理",
            "date": "2015-10-10",
            "children": [{
                "aid": 4,
                "aname": "认证审核",
                "date": "2015-10-10"
            }]
        }],
        width: 400,
        idField: 'aid',
        treeField: 'aname',
        columns: [
            [{
                field: 'aname',
                title: '菜单名称',
                width: 180,
            }, {
                field: 'date',
                title: '创建时间',
                width: 180,
            }, ]
        ]
    });
});
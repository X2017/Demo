window.onload = function() {
    var config = {
        id: "tg1",
        width: "100%",
        renderTo: "div1",
        headerAlign: "left",
        headerHeight: "30",
        dataAlign: "left",
        indentation: "20",
        folderOpenIcon: "images/folderOpen.png",
        folderCloseIcon: "images/folderClose.png",
        defaultLeafIcon: "images/defaultLeaf.gif",
        hoverRowBackground: "true",
        folderColumnIndex: "0",
        itemClick: "itemClickEvent",
        columns: [{
            headerText: "计量点名称",
            dataField: "mp_name",
            width: "100"
        }, {
            headerText: "计量点ID",
            dataField: "mp_id",
            headerAlign: "center",
            dataAlign: "center",
            width: "100"
        }, {
            headerText: "倍率",
            dataField: "ct_pt",
            headerAlign: "center",
            dataAlign: "center",
            width: "100"
        }, {
            headerText: "本期电量",
            dataField: "currentNum",
            headerAlign: "center",
            dataAlign: "center",
            width: "100"
        }, {
            headerText: "本期读数",
            dataField: "currentReadNum",
            headerAlign: "center",
            dataAlign: "center",
            width: "100"
        }, {
            headerText: "行码差数",
            dataField: "differNum",
            headerAlign: "center",
            dataAlign: "center",
            width: "100"
        }, {
            headerText: "损耗电量",
            dataField: "lossNum",
            headerAlign: "center",
            dataAlign: "center",
            width: "100"
        }, {
            headerText: "上期读数",
            dataField: "preReadNum",
            headerAlign: "center",
            dataAlign: "center",
            // handler: "customLook",
            width: "100"
        }],
        data: [{
                "ct_pt": 80,
                "currentNum": 0,
                "currentReadNum": 0,
                "differNum": 0,
                "lossNum": "0.0",
                "mp_id": 2016102801,
                "mp_name": "1#变压器低压进线",
                "preReadNum": 0
            },{
                "ct_pt": 30,
                "currentNum": 0,
                "currentReadNum": 0,
                "differNum": 0,
                "lossNum": "0.0",
                "mp_id": 110000001072,
                "mp_name": "#1电房电缆室，电话机房",
                "preReadNum": 0
            }, {
                "ct_pt": 30,
                "currentNum": 0,
                "currentReadNum": 0,
                "differNum": 0,
                "lossNum": "0.0",
                "mp_id": 110000001073,
                "mp_name": "路灯，直流屏，食堂ZDX",
                "preReadNum": 0
            }]
    };
    var treeGrid = new TreeGrid(config);
    treeGrid.show();
    $.each($('.image_hand'), function(i, item) {
        item.click();
    });
    $('#button').click(function() {
    	console.log(getTableData('tg1'));
    });
}
function getTableData(id) {
    var data = [];
    $.each($('#' + id + '').find('td'), function(index2, value2) {
        var key = value2.parentNode.rowIndex + "_" + value2.cellIndex + "_" + value2.rowSpan + "_" + value2.colSpan + "_0";
        var keyData = {};
        keyData['' + key + ''] = value2.innerText;
        data.push(keyData);
    });
    return data;
}
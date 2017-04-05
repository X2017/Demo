var X = XLSX;
// 配置读取Excel表的文件路径
var XW ={
    msg: 'xlsx',
    rABS: './xlsxworker2.js',
    norABS: './xlsxworker1.js',
    noxfer: './xlsxworker.js'
};
function getName(name){
	return document.getElementsByName(name);
}
// 是否支持 FileReader 对象, FileReader可以异步读取存储在用户计算机上的文件
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
if(!rABS){
    getName("userabs")[0].disabled = true;
    getName("userabs")[0].checked = false;
}
// 是否支持html5 Web Worker 多线程对象
var use_worker = typeof Worker !== 'undefined';
if(!use_worker){ //支持就不执行 不支持执行设为false
    getName("useworker")[0].disabled = true;  
    getName("useworker")[0].checked = false; 
}
// 是否数据转换
var transferable = use_worker;
if(!transferable){
    getName("xferable")[0].disabled = true;
    getName("xferable")[0].checked = false;
}
// base64标记
var wtf_mode = false;
// 选取数据 转换Unicode码 
function fixdata(data){
    var o = "",l = 0,w = 10240;
    for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}
function ab2str(data){
    var o = "",l = 0,w = 10240;
    for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
    return o;
}
// 把Array对象转换成无符号数组
function s2ab(s){
    var b = new ArrayBuffer(s.length * 2), //每个字符占用2个字节
        v = new Uint16Array(b);
    for(var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
    return [v, b];
}
//调用xlsxworkd读取
function xw_noxfer(data, cb){
    var worker = new Worker(XW.noxfer);
    worker.onmessage = function(e){
        switch(e.data.t){
            case 'ready':
                break;
            case 'e':
                console.error(e.data.d);
                break;
            case XW.msg:
                cb(JSON.parse(e.data.d));
                break;
        }
    };
    var arr = rABS ? data : btoa(fixdata(data));
    worker.postMessage({
        d: arr,
        b: rABS
    });
}
//调用xlsxworkd读取
function xw_xfer(data, cb){
    var worker = new Worker(rABS ? XW.rABS : XW.norABS);
    worker.onmessage = function(e){
        switch(e.data.t){
            case 'ready':
                break;
            case 'e':
                alert('读取Excel文件失败,请确保是Excel文件!'+'\n'+e.data.d);
                break;
            default:
                xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
                cb(JSON.parse(xx));//转成JSON
                break;
        }
    };
    if(rABS){
        var val = s2ab(data);
        worker.postMessage(val[1], [val[1]]);
    } else{
        worker.postMessage(data, [data]);
    }
}
// 格式转换
function xw(data, cb){
    transferable = getName("xferable")[0].checked;
    if(transferable){
    	xw_xfer(data, cb);
    } else{
    	xw_noxfer(data, cb);
    }
}
// 要转换成的文件格式
function get_radio_value(radioName){
    var radios = getName(radioName);
    for(var i = 0; i < radios.length; i++){
        if(radios[i].checked || radios.length === 1){
            return radios[i].value;
        }
    }
}
// 转成JSON
function to_json(workbook){
    var result ={};
    workbook.SheetNames.forEach(function(sheetName){
        var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result[sheetName] = roa;
        }
    });
    return result;
}
// 转成逗号隔开的文本
function to_csv(workbook){
    var result = [];
    workbook.SheetNames.forEach(function(sheetName){
        var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        if(csv.length > 0){
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(csv);
        }
    });
    return result.join("\n");
}
// 转成Excel公式表
function to_formulae(workbook){
    var result = [];
    workbook.SheetNames.forEach(function(sheetName){
        var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
        if(formulae.length > 0){
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(formulae.join("\n"));
        }
    });
    return result.join("\n");
}
// 拖拽上传
var drop = document.getElementById('drop');
// 读取拖拽上传的文件
function handleDrop(e){
    e.stopPropagation();
    e.preventDefault();
   rABS = getName("userabs")[0].checked;
    use_worker = getName("useworker")[0].checked;
    var files = e.dataTransfer.files;
    var f = files[0];{
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function(e){
            var data = e.target.result;
            if(use_worker){
                xw(data, process_wb);
            } else{
                var wb;
                if(rABS){
                    wb = X.read(data,{
                        type: 'binary'
                    });
                } else{
                    var arr = fixdata(data);
                    wb = X.read(btoa(arr),{
                        type: 'base64'
                    });
                }
                process_wb(wb);
            }
        };
        if(rABS){
        	reader.readAsBinaryString(f);
        }else{
        	reader.readAsArrayBuffer(f);
        }
    }
}
// 拖拽上传阻止默认事件
function handleDragover(e){
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}
// 拖拽上传的事件
if(drop.addEventListener){
    drop.addEventListener('dragenter', handleDragover, false);
    drop.addEventListener('dragover', handleDragover, false);
    drop.addEventListener('drop', handleDrop, false);
}
// 浏览上传
var xlf = document.getElementById('xlf');
var getData = document.getElementById('getData');
// 读取拖浏览上传的文件
function handleFile(e){
    rABS = getName("userabs")[0].checked;
    use_worker = getName("useworker")[0].checked;
    var files = e.target.files;
    var f = files[0];{
        var reader = new FileReader();//FileReader对象,web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容
        var name = f.name;
        reader.onload = function(e){
            if(typeof console !== 'undefined'){
            	console.log('成功读取Excel表数据');
            }
            var data = e.target.result;
            if(use_worker){
                xw(data, process_wb);
            } else{
                var wb;
                if(rABS){
                    wb = X.read(data,{
                        type: 'binary'
                    });
                } else{
                    var arr = fixdata(data);
                    wb = X.read(btoa(arr),{
                        type: 'base64'
                    });
                }
                process_wb(wb);
            }
        };
        if(rABS){
        	reader.readAsBinaryString(f);
        } else{
        	reader.readAsArrayBuffer(f);
        }
    }
}
// 浏览控件上传的事件 改变了文件就读取数据
if(xlf.addEventListener){
	xlf.addEventListener('change', handleFile, false);
}
 // 读取数据处理 生成表
function process_wb(wb){
    var output = "";
    switch(get_radio_value("format")){
        case "json":
            output = JSON.stringify(to_json(wb), 2, 2);
            break;
        case "form":
            output = to_formulae(wb);
            break;
        default:
            output = to_csv(wb);
    }
	//成功读取数据
	$(out).html('').append('<br/><strong>Excel表JSON数据:</strong><br/>'+output);
	$('#tableContent').html('');
	var value = $.parseJSON(output); //JSON数组对象
	var sheet = []; //每个表名 因为一个工作表里面还有表
	var head = []; //每个表的表头 根据这个表头访问每行的数据
	var count = 0; //和表数量次数一样 通过count记录和访问表名和添加tabel ID
	var tableData = []; //每张表的全部数据
    $('#tableContent').append('<table id='+count+' class="table" border="0" cellpadding="0" cellspacing="0"></table>'); //添加一个table
	for(var i in value){ //第一个循环
		sheet.push(i); //保存表名
        // for(var j =0; j<sheet.length;j++){ //循环表名数量 保存全部表头
		for(var j =0; j<1;j++){ //只读取Excel第一张表
    		head[j] = [];//一个数组代表一张表 保存每张表的第一行表头
    		for(var k in value[sheet[j]][0]){ //以每张表的第一行做为表头
    			if(j == j){
        			head[j].push(k); //保存表头
    			}
    		}
    	}
    	//$('#tableContent').append('<strong>'+sheet[count]+'</strong><table id='+count+' class="table" border="0" cellpadding="0" cellspacing="0"></table>'); //添加多个table
   		for(var j = 0; j < value[sheet[count]].length+1; j++){ //sheet保存的是表头名 通过表头名访问有多少值 加1表头占一行
   			$('#'+count).append('<tr></tr>');
   		}
   		tableData.push(value[sheet[count]]); //保存每张表的数据
    	count++;
	}
	for(var i = 0; i < head.length; i++){ 
		for(var j = 0; j < head[i].length; j++){
   			$($('#'+i).find('tr')[0]).append('<td>'+head[i][j]+'</td>'); // 添加表头
   		}
		for(var j = 0; j < value[sheet[i]].length; j++){ //每张表的行数
			for(var k = 0; k < head[i].length; k++){ //表头 每张表列数
   				$($('#'+i).find('tr')[j+1]).append('<td>'+tableData[i][j][head[i][k]]+'</td>'); // i表数量 j表行数 k表头表列数 添加td 第一行开始 
			}
		}
	}
    $('#update').show();
}
$('#update').click(function () {
    var data = [];
    var _this = this;
	/*上传多张表
    $.each($('.table'),function (index1,value1) {
        data[index1] = []; 
		$.each($(value1).find('td'),function (index2,value2) {
            var key = value2.parentNode.rowIndex+"_"+value2.cellIndex+"_"+value2.rowSpan+"_"+value2.colSpan+"_0";
            var keyData = {};
                keyData[''+key+''] = value2.innerText;
            data[index1].push(keyData);
        });
	});*/
     $.each($('#0').find('td'),function (index2,value2) { //只上传一张表
        var key = value2.parentNode.rowIndex+"_"+value2.cellIndex+"_"+value2.rowSpan+"_"+value2.colSpan+"_0";
        var keyData = {};
            keyData[''+key+''] = value2.innerText;
        data.push(keyData);
    });
   $.ajax({
        type:'post',
        url:'url',
        data:data,
        beforeSend:function (jqXHR,setting) {
            // _this.disabled = true;
        },
        success:function (data) {
           setTimeout(function () {
               // _this.disabled = false;
           },2000);
        },
        error:function(){
            alert('上传失败,找不到地址或网络错误,请重试!');
        }
    });
});
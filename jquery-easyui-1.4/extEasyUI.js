$.fn.panel.defaults.loadingMessage='加载中....';$.fn.datagrid.defaults.loadMsg='加载中....';$.fn.panel.defaults.onBeforeDestroy=function(){var frame=$('iframe',this);try{if(frame.length>0){for(var i=0;i<frame.length;i++){frame[i].src='';frame[i].contentWindow.document.write('');frame[i].contentWindow.close()}frame.remove();if(navigator.userAgent.indexOf("MSIE")>0){try{CollectGarbage()}catch(e){}}}}catch(e){}};var easyuiPanelOnMove=function(left,top){var l=left;var t=top;if(l<1){l=1}if(t<1){t=1}var width=parseInt($(this).parent().css('width'))+14;var height=parseInt($(this).parent().css('height'))+14;var right=l+width;var buttom=t+height;var browserWidth=$(window).width();var browserHeight=$(window).height();if(right>browserWidth){l=browserWidth-width}if(buttom>browserHeight){t=browserHeight-height}$(this).parent().css({left:l,top:t})};$.fn.dialog.defaults.onMove=easyuiPanelOnMove;$.fn.window.defaults.onMove=easyuiPanelOnMove;$.fn.panel.defaults.onMove=easyuiPanelOnMove;var easyuiErrorFunction=function(XMLHttpRequest){$.messager.progress('close')};$.fn.datagrid.defaults.onLoadError=easyuiErrorFunction;$.fn.treegrid.defaults.onLoadError=easyuiErrorFunction;$.fn.tree.defaults.onLoadError=easyuiErrorFunction;$.fn.combogrid.defaults.onLoadError=easyuiErrorFunction;$.fn.combobox.defaults.onLoadError=easyuiErrorFunction;$.fn.form.defaults.onLoadError=easyuiErrorFunction;var createGridHeaderContextMenu=function(e,field){e.preventDefault();var grid=$(this);var headerContextMenu=this.headerContextMenu;if(!headerContextMenu){var tmenu=$('<div style="width:100px;"></div>').appendTo('body');var fields=grid.datagrid('getColumnFields');for(var i=0;i<fields.length;i++){var fildOption=grid.datagrid('getColumnOption',fields[i]);if(!fildOption.hidden){$('<div iconCls="tick" field="'+fields[i]+'"/>').html(fildOption.title).appendTo(tmenu)}else{$('<div iconCls="bullet_blue" field="'+fields[i]+'"/>').html(fildOption.title).appendTo(tmenu)}}headerContextMenu=this.headerContextMenu=tmenu.menu({onClick:function(item){var field=$(item.target).attr('field');if(item.iconCls=='tick'){grid.datagrid('hideColumn',field);$(this).menu('setIcon',{target:item.target,iconCls:'bullet_blue'})}else{grid.datagrid('showColumn',field);$(this).menu('setIcon',{target:item.target,iconCls:'tick'})}}})}headerContextMenu.menu('show',{left:e.pageX,top:e.pageY})};$.fn.datagrid.defaults.onHeaderContextMenu=createGridHeaderContextMenu;$.fn.treegrid.defaults.onHeaderContextMenu=createGridHeaderContextMenu;var gridTooltipOptions={tooltip:function(jq,fields){return jq.each(function(){var panel=$(this).datagrid('getPanel');if(fields&&typeof fields=='object'&&fields.sort){$.each(fields,function(){var field=this;bindEvent($('.datagrid-body td[field='+field+'] .datagrid-cell',panel))})}else{bindEvent($(".datagrid-body .datagrid-cell",panel))}});function bindEvent(jqs){jqs.mouseover(function(){var content=$(this).text();if(content.replace(/(^\s*)|(\s*$)/g,'').length>5){$(this).tooltip({content:content,trackMouse:true,position:'bottom',onHide:function(){$(this).tooltip('destroy')},onUpdate:function(p){var tip=$(this).tooltip('tip');if(parseInt(tip.css('width'))>500){tip.css('width',500)}}}).tooltip('show')}})}}};$.extend($.fn.datagrid.methods,gridTooltipOptions);$.extend($.fn.treegrid.methods,gridTooltipOptions);$.extend($.fn.validatebox.defaults.rules,{eqPwd:{validator:function(value,param){return value==$(param[0]).val()},message:'密码不一致！'}});$.extend($.fn.tree.methods,{getCheckedExt:function(jq){var checked=$(jq).tree("getChecked");var checkbox2=$(jq).find("span.tree-checkbox2").parent();$.each(checkbox2,function(){var node=$.extend({},$.data(this,"tree-node"),{target:this});checked.push(node)});return checked},getSolidExt:function(jq){var checked=[];var checkbox2=$(jq).find("span.tree-checkbox2").parent();$.each(checkbox2,function(){var node=$.extend({},$.data(this,"tree-node"),{target:this});checked.push(node)});return checked}});$.fn.tree.defaults.loadFilter=function(data,parent){var opt=$(this).data().tree.options;var idFiled,textFiled,parentField;if(opt.parentField){idFiled=opt.idFiled||'id';textFiled=opt.textFiled||'text';parentField=opt.parentField;var i,l,treeData=[],tmpMap=[];for(i=0,l=data.length;i<l;i++){tmpMap[data[i][idFiled]]=data[i]}for(i=0,l=data.length;i<l;i++){if(tmpMap[data[i][parentField]]&&data[i][idFiled]!=data[i][parentField]){if(!tmpMap[data[i][parentField]]['children'])tmpMap[data[i][parentField]]['children']=[];data[i]['text']=data[i][textFiled];tmpMap[data[i][parentField]]['children'].push(data[i])}else{data[i]['text']=data[i][textFiled];treeData.push(data[i])}}return treeData}return data};$.fn.treegrid.defaults.loadFilter=function(data,parentId){var opt=$(this).data().treegrid.options;var idFiled,textFiled,parentField;if(opt.parentField){idFiled=opt.idFiled||'id';textFiled=opt.textFiled||'text';parentField=opt.parentField;var i,l,treeData=[],tmpMap=[];for(i=0,l=data.length;i<l;i++){tmpMap[data[i][idFiled]]=data[i]}for(i=0,l=data.length;i<l;i++){if(tmpMap[data[i][parentField]]&&data[i][idFiled]!=data[i][parentField]){if(!tmpMap[data[i][parentField]]['children'])tmpMap[data[i][parentField]]['children']=[];data[i]['text']=data[i][textFiled];tmpMap[data[i][parentField]]['children'].push(data[i])}else{data[i]['text']=data[i][textFiled];treeData.push(data[i])}}return treeData}return data};$.fn.combotree.defaults.loadFilter=$.fn.tree.defaults.loadFilter;$.modalDialog=function(options){if($.modalDialog.handler==undefined){var opts=$.extend({title:'',width:840,height:680,modal:true,onClose:function(){$.modalDialog.handler=undefined;$(this).dialog('destroy')},onOpen:function(){parent.$.messager.progress({title:'提示',text:'数据处理中，请稍后....'})}},options);opts.modal=true;return $.modalDialog.handler=$('<div/>').dialog(opts)}};$.extend($.fn.validatebox.defaults.rules,{minLength:{validator:function(value,param){return value.length>=param[0]},message:'最少输入 {0} 个字符。'},selectTreeRequired:{validator:function(value,param){return $(param[0]).siblings("span").find("input.textbox-value").val()!=''},message:'请选择'},selectRequired:{validator:function(value,param){return $(param[0]).find("option:contains('"+value+"')").val()!=''},message:'请选择'},length:{validator:function(value,param){var len=$.trim(value).length;return len>=param[0]&&len<=param[1]},message:"输入内容长度必须介于{0}和{1}之间."},phone:{validator:function(value){return/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}(13|15|18)\d{9}$)/.test(value)},message:'格式不正确,请使用下面格式:020-88888888'},mobile:{validator:function(value){return/^(13|15|18)\d{9}$/i.test(value)},message:'手机号码格式不正确'},idcard:{validator:function(value){return/^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value)},message:'身份证号码格式不正确'},intOrFloat:{validator:function(value){return/^\d+(\.\d+)?$/i.test(value)},message:'请输入数字，并确保格式正确'},currency:{validator:function(value){return/^\d+(\.\d+)?$/i.test(value)},message:'货币格式不正确'},currency_rule:{validator:function(value,param){value=value.replace(/,/g,"");return/^\d+(\.\d+)?$/i.test(value)},message:'货币格式不正确'},qq:{validator:function(value){return/^[1-9]\d{4,9}$/i.test(value)},message:'QQ号码格式不正确'},integer:{validator:function(value){return/^[+]?[1-9]+\d*$/i.test(value)},message:'请输入整数'},integer2:{validator:function(value){return/^[+]?\d+$/i.test(value)},message:'请输入整数'},chinese:{validator:function(value){return/^[\u0391-\uFFE5]+$/i.test(value)},message:'请输入中文'},english:{validator:function(value){return/^[A-Za-z]+$/i.test(value)},message:'请输入英文'},unnormal:{validator:function(value){return/.+/i.test(value)},message:'输入值不能为空和包含其他非法字符'},username:{validator:function(value){return/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value)},message:'用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'},faxno:{validator:function(value){return/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value)},message:'传真号码不正确'},zip:{validator:function(value){return/^[1-9]\d{5}$/i.test(value)},message:'邮政编码格式不正确'},ip:{validator:function(value){return/d+.d+.d+.d+/i.test(value)},message:'IP地址格式不正确'},name:{validator:function(value){return/^[\u0391-\uFFE5]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value)},message:'请输入姓名'},carNo:{validator:function(value){return/^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value)},message:'车牌号码无效（例：粤J12350）'},carenergin:{validator:function(value){return/^[a-zA-Z0-9]{16}$/.test(value)},message:'发动机型号无效(例：FG6H012345654584)'},email:{validator:function(value){return/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)},message:'请输入有效的电子邮件账号(例：abc@126.com)'},msn:{validator:function(value){return/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)},message:'请输入有效的msn账号(例：abc@hotnail(msn/live).com)'},password:{validator:function(value,param){var other=$(param[0]).val();return value==other},message:"两次密码不一致"},password_rule:{validator:function(value,param){return/^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,50}$/.test(value)},message:"密码不合法（至少6位，必须有字母和数字）"},password_length:{validator:function(value,param){var len=$.trim(value).length;return len>=param[0]&&len<=param[0]},message:"密码必须为{0}位数"},img_upload:{validator:function(value,param){var ext=value.substring(value.lastIndexOf(".")+1);return/(jpg|jpeg|gif|bmp|png)/i.test(ext)},message:"只允许上传jpg、gif、png、bmp格式的图片"},shortName:{validator:function(value){return/^[a-zA-Z]{1,10}[0-9]{0,10}/i.test(value);},message:'产品简称不合法'},passport:{validator:function(value){return/^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/.test(value)},message:'护照不合法'},range:{validator:function(value,param){if(!/^[+]?[1-9]+\d*$/i.test(value))return false;var intVal=parseInt(value);var minVal=parseInt(param[0]);var maxVal=parseInt(param[1]);return intVal>=minVal&&intVal<=maxVal},message:"只能输入 {0} 和 {1} 之间的整数"},negativeIntOrFloat:{validator:function(value){return/^(-)?\d+(\.\d+)?$/i.test(value)},message:'请输入数字，并确保格式正确'}});
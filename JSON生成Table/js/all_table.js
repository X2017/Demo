var obj={
    // html5 存储
    sava_data:function (name,value) {
        if (!!window.sessionStorage) {//html5 验证
            localStorage.setItem(name,value);
        }
    },
    // html5 读取
    get_data:function (name) {
        if (!!window.sessionStorage) {
            return localStorage.getItem((name));
        }
    },
    //修改之后的新方法 上传到后台返回下载Excel表格
    get_posi_value:function (tableId) {
        var data = [];//清空 避免数据叠加
        //标题
        $.each($('#'+tableId+'').find('th'),function(i,item){
            if($(item).css('display')!='none'){
                var key=item.parentNode.rowIndex+"_"+item.cellIndex+"_"+item.rowSpan+"_"+item.colSpan+"_1";
                var itemData={};
                itemData[''+key+'']=item.innerText;
                data.push(itemData);
            }
        });
        //内容
        $.each($('#'+tableId+'').find('td'),function(i,item){
            if($(item).css('display')!='none'){
                var key=item.parentNode.rowIndex+"_"+item.cellIndex+"_"+item.rowSpan+"_"+item.colSpan+"_0";
                var itemData={};
                if ($(item).find('input').length > 0) { //push input value
                    itemData[''+key+'']=$(item).find('input').val();
                }else {
                    itemData[''+key+'']=item.innerText;
                }
                data.push(itemData);
            }
        });
        localStorage.clear();
        return data;
    },
    //限制只能输入数字和小数点
    number_readonly:function () {
        $('#form input[type="text"]').on('keyup',function(){
            $(this).val($(this).val().replace(/[^0-9.]/g,''));
        }).on('paste',function () {
            var _this = this;
            setTimeout(function(){
                $(_this).val($(_this).val().replace(/[^0-9.]/g,''));
            },100);
        }).on('blur',function () {//焦点离开时保存数据
            $.each($('#form input[type="text"]'),function(i){
               if ($($('#form input[type="text"]')[i]).val() != '') {
                   obj.sava_data($($('#form input[type="text"]')[i]).attr('id'),$($('#form input[type="text"]')[i]).val());
               }
            });
        });
    },
    // 生成输入框和存储本地数据
    create_input:function () {
        $.each($('#form td'),function(i){// 生成输入框
            if($($('#form td')[i]).text() == ''){
                $($('#form td')[i]).append('<input type="text" id="" name="">');
            }
        });
        $.each($('#form input[type="text"]'),function(i){
            $($('#form input[type="text"]')[i]).attr({// 输入框添加id name
                id:'data_id'+(i),
                name:'data_name'+(i)
            });
            // 获取数据
            if ($($('#form input[type="text"]')[i]).attr('id') == 'data_id'+i) {
                $($('#form input[type="text"]')[i]).val(obj.get_data('data_id'+i));
            }
        });
    }
};
/**
 * Created by york on 17-5-16.
 */

"use strict";

//将form转为AJAX提交
function ajaxSubmit(frm, fn) {
    let dataPara = getFormJson(frm);
    $.ajax({
        url: frm.action,
        type: frm.method,
        dataType: "json",
        data: dataPara,
        success: function(data) {
                let result_data = document.getElementById('result');
                result_data.style.display="block";
                result_data.innerHTML='';
                let for_data = JSON.parse(JSON.stringify(data));
                let results = for_data.data;
                for (let index in results) {
                    let result = results[index];
                    let li=document.createElement('li');
                    li.innerHTML=result.result;
                    result_data.appendChild(li);
                }
            }
    });
}

//将form中的值转换为键值对。
function getFormJson(frm) {
    let o = {};
    let a = $(frm).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    return o;
}

$(document).ready(function(){
    $('#CheckForm').bind('submit', function(){
        ajaxSubmit(this, function(data){
            alert(data);
        });
        return false;
        timeout: 300000;
    });
});

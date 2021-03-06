 //我们希望的是对象形式
 function serializeToJson (from) {  //自己创建函数
    var result = {};
    var f = $(from).serializeArray();//当前表单的serializeArray();方法  以数组 返回输入内容  [{name:'email',value:'输入内容'}]
    f.forEach(function (item) {
        result[item.name] = item.value  ;   // 键值 放入对象
    });
    return result;
 }

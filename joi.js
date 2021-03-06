const Joi = require('joi');  //promise 对象
//验证规则
const schema = {  
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过')),    //Error是一个对象 传递自定义错误
    birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过'))
};
async function run () {
    try {
        await Joi.validate({username:'ab', birth: 1900}, schema);  //  validate 验证
    }catch (ex) {      //try catch  传递错误
        console.log(ex.message); // message 简化错误信息
        return;   //阻止下行
    }
    console.log('验证通过')
}
run();

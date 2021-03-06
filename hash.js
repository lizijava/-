const bcrypt = require('bcrypt');    //希哈加密
 async function run () {      
    const salt = await bcrypt.genSalt(10);  // 随机生成字符串 默认为10(复杂程度)  返回的是一个promise对象所以可以用await
    const result = await bcrypt.hash('1234455', salt);   //加密
    console.log(salt);
    console.log(result);

}
run();

// 写文件:
var fs = require('fs')

// 第一个参数: 文件路径
// 第二个参数: 文件内容
// 第三个参数: 回调函数
//      接收error 参数:
        // 文件写入成功: error 是 null 
        // 文件写入失败: error 是 错误对象

fs.writeFile('./data/write>.txt', '我又写完了', function(error) {
    if(error) {
        console.log('文件写入失败: ', error)
    } else {
        console.log('文件写入成功');
        
    }
})

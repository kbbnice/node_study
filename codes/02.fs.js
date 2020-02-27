var fs = require('fs')

fs.readFile('../data/hello.txt', function(error, data) {
    if(error) {
        console.log('读取文件失败')
    } else {
        console.log(data.toString())
    }
})


/**
 * 1. 使用require 加载 fs 模块 (file-system)
 * 2. 读取文件
 *      参数一: 要读取的文件路径
 *      参数二: 回调函数
 *              接收两个参数
 *              error:
 *              data:
 * (如果读取成功: error 就是 null ,data 就是数据)
 * (如果读取失败: error 就是 错误对象 ,data undefined)
 * 
 *      文件中储存的其实都是二进制数据; 0 1 
 *      这里看到的是被转换为16进制的二进制数据
 * 
 *       转换成我们认识的字符串的方法: toString 方法
 * 
 */


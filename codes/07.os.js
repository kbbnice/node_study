var os = require('os')

// 获取cpu 信息
console.log(os.cpus())

// 获取内存
console.log(os.totalmem()); // 单位 bite (字节)

// 操作系统: 
console.log(os.type());

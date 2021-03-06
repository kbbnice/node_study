var b = require('./b')
console.log(b.info.name)
// 每个模块都提供了一个对象 exports, 默认是一个空对象
// 需要被访问的成员挂载到该对象上.

/**
 * 所有联网的程序都需要进行网络通信
 * 计算机中只有一个物理网卡
 * 而且同一个局域网中, 网卡的地址必须是唯一的.
 * 网卡是通过唯一的ip进行定位的
 * 
 * ip 地址用来定位计算机 
 * 端口号用来定位具体的程序
 * 
 *  端口号一般在 0 - 65536 之间
 *  一般不占用 常用的 端口号
 */
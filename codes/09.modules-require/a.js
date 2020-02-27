console.log('a.start')
require('./b')  // 可省略后缀名
// require('./b.js')
console.log('a.end')

// node 中 没有 全局作用域, 只有 模块作用域
// 外部访问不到内部 (即 a.js 访问不到 b.js)
// 内部访问不到外部:(即 b.js 访问不到 a.js)

// 相对路径中的 ./ 不能省略, 否则 会被解析成 核心模块
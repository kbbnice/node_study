// 用来获取操作路径的
var path = require('path')

// basename: 返回path 的最后一部分, 第二个参数 是 可选的 文件扩展名

// 如果 path 不是字符串或者给定了 ext 且不是字符串，则抛出 TypeError。
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
// console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.vue')); // 这行奥错

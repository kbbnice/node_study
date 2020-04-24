var http = require('http')

var server = http.createServer()

server.on('request', function (req, res) {

    // 跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天

    // 解决乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8') 

    res.end('我是猪')
})

server.listen(8011, function () {
    console.log('服务器创建成功')
})

// 1. 结合 fs 和 http 发送文件中的数据
// 2. Content-Type
//      不同的资源对应不同的Content-Type

var http = require('http')
var fs = require('fs')

var server = http.createServer()
var resString = ''
var image = ''

function getData(url) {
  // 获取文件内容:
  fs.readFile(url, function(error, data) {
    if (error) {
      console.log('读取文件失败', error)
    } else {
      // console.log(data.toString())
      resString = data.toString()
    }
  })
}

// 获取图片
fs.readFile('./view/images/logo.png', function(error, data) {
  if (error) {
    console.log('读取文件失败', error)
  } else {
    console.log('image', data)
    image = data
  }
})

server.on('request', function(req, res) {
    // url 叫做统一资源定位
  var url = req.url
  if (url === '/') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('首页')
  } else if (url === '/login') {
    res.end('login')
  } else if (url === '/html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(
      '<我是一个网页上的p标签<a href="#">而我是一个汉字编码正常的连接</a>'
    )

    // 读取文件内容展示:
  } else if (url === '/test.html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    getData('./view/test.html')
    res.end(resString)
  } else if (url === '/image') {

    // 图片不需要 charset 设置编码, 因为charset 为了 字符串 而生, 图片有特殊的编码格式
    res.setHeader('Content-Type', 'image/jpeg;')

    res.end(image)
  } else {
    res.end('404 not found')
  }
})

server.listen(3000, function() {
  console.log('服务器启动成功')
})

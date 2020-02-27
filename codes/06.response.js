var http = require('http')

var server = http.createServer()

server.on('request', function(req, res) {
  // 在服务端发送的数据默认是 utf-8 格式
  // 解决中文乱码: -> 设置头部\
  //   res.writeHeader(200, { 'Content-Type': 'text/html; charset: utf-8' })
  // 浏览器在不知道服务器相应内容的编码情况下, 会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是gbk

  // res.write('<head><meta charset="utf-8"/></head>')

  var url = req.url
  console.log('收到请求了' + url)
  console.log('当前远程请求远程地址' + req.socket.remoteAddress)
  console.log('当前远程请求端口号' + req.socket.remotePort)
  if (url === '/') {
    // 设置返回的数据格式:
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')

    res.end('根目录')
  } else if (url === '/login') {
    // resTxt = [
    //   '登录',
    //   '哈哈报错了吧',
    //   '除了字符串和二进制数据, 其他都要用 JSON.strigify()处理'
    // ]
    res.end('login')
  } else if (url === '/array') {
    res.end(
      JSON.stringify([
        {
          name: 'apple',
          number: 111
        }
      ])
    )
  } else if (url === '/html') {

    // 如果不设置返回数据类型, 则会将标签解析成 html , 展示的内容是 : p 标签内容
    // 如果需要展示的是 非html 的 包含标签字符在内的字符串, 则需要设置文本内容
    // 如果需要解析带中文的标签, 则要设置另一种 html 格式的 Content-Type: text/html
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')   // 纯文本
    res.setHeader('Content-Type', 'text/html; charset=utf-8')   // html 文本 同时解决中文乱码和标签变成字符串的问题
    // 
    res.end('<p> 这是 p 标签内容 <a href="">链接</a></p>')
  } else {
    res.end('emm~ 404 not found')
  }

  // res.write(resTxt.toString())
  //   res.end()
  // res.end(JSON.stringify(JSON.stringify(resTxt)))
})

server.listen(8011, function() {
  console.log('服务器创建成功')
})

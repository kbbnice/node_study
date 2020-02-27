var http = require('http')

/**
 * 可以搭建 web 服务器
 */
console.log(http)

var server = http.createServer()

// 3. 创建服务:
/**
 * request 请求事件处理函数, 需要接受两个参数:
 *  参数一: request: 请求对象 (可获取客户端的请求信息)
 *  参数二: response: 响应对象  (可以给客户端发送响应消息)
 */

server.on('request', function(req, res) {
  console.log('收到客户端请求了' + req.url)

  // 可以使用 res.write 来给客户端发送响应数据,
  //   write 可以使用多次, 但是最后一定要使用 end 来结束响应, 否则客户端会一直等待
  res.write(req.url)
  res.write(req.url)
  res.write(req.url)
  res.end()

})

// 4. 绑定端口号, 启动服务器

server.listen(3000, function() {
  console.log('服务器启动成功')
})

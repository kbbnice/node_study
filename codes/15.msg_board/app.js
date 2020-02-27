var http = require('http')
var fs = require('fs')
var url = require('url')
var fun = require('../fun.js')
var template = require('art-template/lib/template-web.js')

// 先写死 评论数据:
var comments = [
  {
    name: 'Marry',
    message: '天气不错',
    dateTime: '2019.1.14'
  },
  {
    name: 'Jane',
    message: '天气不错嗯',
    dateTime: '2019.1.14'
  },
  {
    name: 'Tony',
    message: '天气真的不错',
    dateTime: '2019.1.14'
  },
  {
    name: 'Kelly',
    message: '天气还是那么不错',
    dateTime: '2019.1.14'
  }
]
// 为了目录清晰, 所有html 放到 views中

/**
 * 浏览器 收到 html 响应内容之后 , 就要开始从上到下依次解析
 * link
 * script
 * img
 * iframe
 * video
 * audio
 * 等具有 src 或者 href(link) 属性标签的时候, 浏览器会主动对这些静态资源发起请求.
 *
 * 为了方便统一处理静态资源, 所以我们约定把静态资源存放在public  静态资源里
 */

// 对于表单提交的请求路径, 其中有用户动态填写的内容,
// 所以不可能判断完整url ,
// 因此只要找到 url 中的 请求接口部分就行, 参数部分抛弃

// url 模块的parse方法可以解析 url 地址的所有部分分开成 对象 的键值对.
// url.parse(地址, true/false)  设置 true 则会将参数变成一个 {参数名: 参数} 格式的键值对对象

http
  .createServer(function(req, res) {
    // var pathname = req.url

    // 用 url 模块 处理 url :
    var parseObj = url.parse(req.url, true)
    var pathname = parseObj.pathname

    // 服务端这时候把数据存好了, 接下来就是让用户重新请求首页(/)

    // 如何 通过服务端让客户端重新定向
    /**
     * 1. 状态码设置为 302 临时重定向 (res.statusCode = 302)
     * 2. 在响应头中通过 Location 告诉客户端往哪儿重定向 (res.setHeader('Location,'/')
     *
     *
     * // 如果 客户端发现收到服务器的响应状态码是302, 就会自动去响应头中查找Location
     * // 客户端就能自动跳转了
     */

    if (pathname === '/') {
      fs.readFile('./views/index.html', function(error, data) {
        if (error) {
          res.end('404 not found')
        } else {
          //   res.end(data)
          // 模板引擎处理:
          var htmlStr = template.render(data.toString(), {
            comments: comments
          })
          res.end(htmlStr)
        }
      })
    } else {
      // 如果url 是以 /public/开头的, 则默认它要请求的文件
      /**
       * 这时候, html 里的路径不要写相对路径 
       * 因为这个时候所有的资源都是通过 pathname 标识 来获取的
       * 服务器开放了/public/ 目录
       * 因此 这里的请求路径写成/public/xxx
       * 斜杠 / 在这里就是url 根路径的意思, 浏览器在真正发请求的时候, 会把http://ip:3000拼接上
       * 
0       * 把 pathname 假象成文件地址就行了
       */
      if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function(error, data) {
          if (error) {
            show404(res)
          } else {
            res.end(data.toString())
          }
        })

        // 评论
      } else if (pathname === '/pinglun') {
        // res.setHeader('Content-Type', 'text/html; charset=utf-8')
        // res.end(JSON.stringify(parseObj.query))
        // 处理参数;
        var comment = parseObj.query
        // comment.dateTime = new Date('yyyy-mm-dd')
        comment.dateTime = fun.getDate('.')
        // comments.push(comment)
        comments.unshift(comment)
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()

        // 表单提交
      } else if (pathname === '/post') {
        fs.readFile('./views/saveMsg.html', function(error, data) {
          if (error) {
            res.end('404 not found')
          } else {
            res.end(data)
          }
        })
      } else {
        // 其他都处理成 404 页面
        show404(res)
      }
    }
  })
  .listen(3000, function() {
    console.log('serve is running...')
  })

// 404
function show404(res) {
  fs.readFile('./views/404.html', function(error, data) {
    if (error) {
      return console.log('404 not found.')
    }
    res.end(data)
  })
}

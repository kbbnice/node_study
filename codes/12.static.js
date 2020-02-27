var http = require('http')
var fs = require('fs')
var fun = require('./fun')
var ip = '192.168.17.35'
var port = 3000
var urlData = 'http://' + ip + ':' + port

var server = http.createServer()

server.on('request', function(req, res) {
  for (var i = 0; i < req.rawHeaders.length; i++) {
    // 可以获取到当前浏览器地址的链接:
    if (req.rawHeaders[i].indexOf('Referer') !== -1) {
      // urlData = req.rawHeaders[i + 1]
      console.log('urlData1', urlData)
    }
  }
  var url = req.url
  // var wwwDir = 'D:/myfiles/soft/phpstudy_pro/WWW'
  // var wwwDir = 'D:/myfiles/project/personalPro/node/www'
  // var wwwDir = 'D:/myfiles/project/personalPro'
  var wwwDir = 'D:'
  var filePath = wwwDir + '/index.html'

  // if (url !== '/') {
  filePath = wwwDir + url
  // }
  // 所有的文件请求也是一次请求! 因此要对这个文件请求做判断:
  if (req.url.indexOf('template') !== -1) {
    filePath = '.' + req.url
  }
  //   res.end(url)
  if (filePath.indexOf('.') == -1) {
    fs.readdir(filePath, function(error, files) {
      if (error) {
        return res.end('dir not exist')
      }
      // 如果是目录就读取目录页面

      fs.readFile('./template.html', function(error, data) {
        if (error) {
          res.end('无法访问文件夹')
        } else {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          // 方法一: 模板字符串处理:
          data = data.toString()
          var content = ''
          files.forEach(item => {
            // 判断是否为文件夹, 设置图标:
            if (item.indexOf('.') !== -1) {
              imgSrc = urlData + '/template/file.png'
            } else {
              imgSrc =urlData +  '/template/dir.png'
            }
            content += `
            <tr>
              <td class="icon">
              <img src="${imgSrc}" alt=""/>
              </td>
              <td class="name">
                <a href="${urlData + req.url  + (req.url.indexOf('/') == req.url.length - 1 ? '' : '/') + item}">${item}</a>
              </td>
              <td class="time">2019.10.11</td>
            </tr>
            `
          })
          console.log(urlData)
          console.log(req.url.indexOf('/') == req.url.length - 1)

          data = data.replace('^__^', content)
          // res.end(data.replace('$__$', content))
          res.end(data)
        }
      })
    })
  } else {
    // apache 服务器
    fs.readFile(filePath, function(error, data) {
      if (error) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('404 not found! ')
        return // 用return 代替 else
      }
      if (filePath.indexOf('.txt') !== -1) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(data.toString())
      } else if (filePath.indexOf('.html') !== -1) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data.toString())
      } else if (fun.isImages(filePath)) {
        res.setHeader('Content-Type', 'image/' + filePath.split('.')[1])
        res.end(data)
      } else if(filePath.indexOf('.js') !== -1) {
        res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        res.end(data.toString())
      } else if(filePath.indexOf('.css') !== -1) {
        res.setHeader('Content-Type', 'text/css; charset=UTF-8')
        res.end(data)
      } else {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(data.toString())
      }
    })
  }
})

server.listen(port, function() {
  console.log('服务器启动成功!')
})

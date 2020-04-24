/**
 * 使用 art-template 模板引擎
 */

var fs = require('fs')
var http = require('http')

// 引入模板引擎:
var template = require('art-template')

var server = http.createServer()

server.on('request', function(req, res) {
  var staticDir = '../codes'
  var wwwDir = '../www'
  var filePath = wwwDir + '/index.html'
  var url = req.url
  var reqHost = req.headers.host
  var reqPath = reqHost + url
  var lastPath = reqHost

  // 判断是否根目录, 如果是, 展示index.html
  if (url !== '/') {
    // 读取文件夹内容, 如果存在 index.html
    filePath = wwwDir + url
  }

  // 如果是静态网页文件, 则访问 static (用来展示网站默认内容用)
  if (filePath.indexOf('/static/') !== -1) {
    filePath = staticDir + url
  }

  // 如果路径中 不存在符号: "." , 则为文件夹而非文件:
  if (filePath.indexOf('.') == -1) {
    fs.readdir(filePath, function(error, files) {
      if (error) {
        // 如果没找到文件夹:
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('嗷呜, 文件找不到了')
      } else {
        // 如果读取正确, 则返回文件夹列表:
        // files 是一个数组, 列出了该文件夹下所有文件: (会包含隐藏文件!)

        // 模板引擎渲染
        fs.readFile('./art-template.html', function(error, data) {
          if (error) {
            return console.log('读取文件失败')
          }

          // 上一级目录:
          // 处理请求尾部带 /, 清除它:
          var reqPathArr = reqPath.split('/')
          if(reqPathArr[reqPathArr.length-1] == '') {
            reqPath = reqPath.slice(0, -1)
          } 
          
          var rmItem ='/' + reqPath.split('/')[reqPath.split('/').length - 1]
          // preLastPath = lastPath.replace(rmItem, '')  
          // if(preLastPath !== reqHost) {
          //   lastPath = preLastPath
          // } 
          lastPath = reqPath.replace(rmItem, '')
            
          var result = template.render(data.toString(), {
            // 给 title 用来展示当前访问的路径: 
            url: url,

            // 文件名数组: 
            files: files,

            // 请求地址 给 a 标签用: 
            reqPath: reqPath,

            // 上级地址:
            lastPath: lastPath
          })
          res.end(result)
        })
      }

      // 输出:
    })

    // 如果是文件, 则读取文件处理:
  } else {
    fs.readFile(filePath, function(error, data) {
      if (error) {
        console.log(error)
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('404 唔 ~ 我找不到了')
      } else {
        // res.setHeader('Content-Type', 'text/html; charset=utf-8')
        
        res.end(data.toString())
      }
    })
  }

  // res.end(filePath)

  // 读取文件内容: 如果存在则 展示文件, 如果不存在则展示对应文件夹列表
})

server.listen(3000, function() {
  console.log('服务器启动成功...')
})

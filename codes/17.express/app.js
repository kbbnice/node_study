// 读取html文件
var express = require('express')

// 解析 post 参数
var bodyParser = require('body-parser');
var app = express()


// 写文件:
var fs = require('fs')



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
// 解决跨域问题
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
    next();
});


// app.use((express.static('../../www/')))


app.post('/', function (req, res) {
    // console.log(req.body)
    res.header('Content-Type', 'application/json; charset=utf-8')
    var resData = ''
    fs.readFile('e:/test.html', function (error, data) {
        if (error) {
            console.log('读取文件失败')
        } else {
            resData = data.toString()
            console.log(resData)
            res.send({
                data: resData
            })
            // console.log(data.toString())
            
        }
    })

   



})

app.listen(9999, function () {
    console.log('express app is running...')
})
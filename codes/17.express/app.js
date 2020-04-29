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

// 如果添加一个就给一个数组添加数据存起来， 下次直接给该数组添加数据并以对应的字符串作文件名：
// 当访问文件时， 根据索引表找到对应名字的tml文件，就不需要路径的html后缀了


app.get('/writeData', function (req, res) {
    console.log()
    var data = req.body.data || ''
    if (data !== '') {
        fs.writeFile('e:/test.txt', data, function (error) {
            if (error) {
                res.send('保存失败', error)
            } else {
                console.log('文件写入成功');
                res.send('保存成功！')
            }
        })
    } else {
        res.send('data 为必填项')
    }

})

app.post('/', function (req, res) {
    // console.log(req.body)
    res.header('Content-Type', 'application/json; charset=utf-8')
    var resData = ''
    fs.readFile('e:/test.html', function (error, data) {
        if (error) {
            console.log('读取文件失败')
        } else {
            resData = data.toString()
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
var express = require('express')

var app = express()

// 解决跨域问题
app.all('*', function (req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
    next();
});


app.use((express.static('../../www/')))

app.get('/', function (req, res) {
    res.send('hello')
})

app.listen(9999, function () {
    console.log('express app is running...')
})
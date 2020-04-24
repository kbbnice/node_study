var mysql = require('mysql')

var con = mysql.createConnection({
    host: '49.232.130.71',
    user: 'root',
    password: 'Ke199388!',
    database: 'test'
})

con.connect();

var searchStr = 'SELECT title FROM test';

var insertStr = 'INSERT INTO test (title) VALUES ( "我是猪" )';

con.query(insertStr, function (error, results, fields) {
    if (error) throw error;
    console.log(results)
})

con.query(searchStr, function (error, results, fields) {
    if (error) throw error;
    console.log(results)
});
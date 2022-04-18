const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database-1.ckcs1mwh1a6l.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'password',
    database: 'my_db_test'
});

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    connection.query('CREATE DATABASE IF NOT EXISTS main;');
    connection.query('USE main;');
    connection.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    })
    connection.query('CREATE TABLE IF NOT EXISTS books(title varchar(30));', function(error, result, fields) {
        console.log(result);
    })
    var sql = "INSERT INTO books (title) VALUES ('Enders game')"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('One record inserted.')
    })
    console.log('Connected to MySQL server.')
})


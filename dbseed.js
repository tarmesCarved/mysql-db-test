const mysql = require('mysql');
const express = require('express');
const app = express();

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
    console.log('Connected to MySQL server.')
})

app.post('/users', (req, res) => {
    if (req.query.username && req.query.email && req.query.age) {
        console.log('Request received');
        connection.connect(function(err) {
            connection.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
                if (fields) console.log(fields)
            })
        })
    } else {
        console.log('Missing a parameter!')
    }
}) 

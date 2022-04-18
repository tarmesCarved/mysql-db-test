const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello world, from express!")
})

// app.post('/users', (req, res) => {
//     if (req.query.username && req.query.email && req.query.age) {
//         console.log('Request received');
//         connection.connect(function(err) {
//             connection.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
//                 if (err) res.send(err);
//                 if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
//                 if (fields) console.log(fields)
//             })
//         })
//     } else {
//         console.log('Missing a parameter!')
//     }
// }) 

app.post('/book', (req, res) => {
    const book = req.body;
    console.log(book);
    books.push(book);

    res.send("Book has been added to the database!")
})

app.get('/books', (req, res) => {
    res.json(books)
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
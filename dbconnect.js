const mysql = require('mysql2');

var itworked = true;

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'organiser'
});

// Connect to the database
connection.connect(err => {
    itworked = err == true;

    if (err) throw err;
    console.log('Connected to organiser database.');
});

connection['itworked'] = itworked;

module.exports = connection;

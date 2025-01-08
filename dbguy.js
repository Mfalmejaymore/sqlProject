// dbconnect.js
const mysql = require('mysql2/promise'); // Use promise-based MySQL2

// Create a connection pool
const thesql = mysql.createPool({
    host: 'localhost',     // Replace with your database host
    user: 'root',     // Replace with your database user
    password: '', // Replace with your database password
    database: 'organiser', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

module.exports = thesql;
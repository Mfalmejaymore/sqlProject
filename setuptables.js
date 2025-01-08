let syssetup = {};

syssetup['trysetup'] = () => {
    const conn = require('./dbconnect');
    const hasher = require('./mekhash');

    if(conn.itworked){
        // Create Patients table
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                datecreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        conn.query(createUsersTable, (err, results) => {
            if (err) throw err;
            console.log('Users table setup successful');
        });

        // Create projects table
        const createprojectsTable = `
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userid INT,
                projectname text,
                projectdesc text,
                projectdata text,
                projectstatus text DEFAULT "private",
                dateupdated TIMESTAMP,
                datecreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        conn.query(createprojectsTable, (err, results) => {
            if (err) throw err;
            console.log('projects table created.');
        });

        // Add default users
        let pw = hasher.customhash('123');
        const checkAdminQuery = "SELECT * FROM users WHERE username = 'admin'";
        const addAdminQuery = `INSERT INTO users (username, password_hash) VALUES ('admin', '${pw}')`;

        conn.query(checkAdminQuery, (err, results) => {
            if (err) throw err;

            // If no records found with username 'admin', insert a new admin record
            if (results.length == 0) {
                conn.query(addAdminQuery, (err, results) => {
                    if (err) throw err;
                    console.log('Default admin record added.');
                });
            } else {
                console.log('Admin record already exists. starting app');
            }
        });
    } else {
        console.log('something is wrong')
    }
}

module.exports = syssetup;
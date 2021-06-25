const mysql = require('mysql')
const configData = require('./configData')
// Create a connection to the database
const connection = mysql.createConnection({
    host: configData.HOST,
    user: configData.USER,
    password: configData.PASSWORD,
    database: configData.DB,
})

// open the MySQL connection
connection.connect((error) => {
    if (error) throw error
    // eslint-disable-next-line
    console.log('Successfully connected to the database.')
})

connection.query(
    `CREATE TABLE IF NOT EXISTS teachers (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    subject varchar(255) NOT NULL
  )`
)

connection.query(
    `
    CREATE TABLE IF NOT EXISTS schedule (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    startTime varchar(255) NOT NULL,
    endTime varchar(255) NOT NULL,
    date varchar(255) NOT NULL,
    teacherId int NOT NULL,
    teacherName varchar(255) NOT NULL
)`
)

module.exports = connection

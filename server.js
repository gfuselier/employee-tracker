const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost', //127.0.0.1
      user: 'root',
      password: 'roundTwo',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

  db.query('SELECT * FROM departments', function (err, results) {
    if(err) {
        console.log(err)
      } console.table(results);
  });

  //prompt first, then have query inside. will be wet at first, don't worry
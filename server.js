const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost', //127.0.0.1
      user: 'root',
      password: 'roundTwo',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

const questions = [
    {type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Quit']
    }
]

  //prompt first, then have query inside. will be wet at first, don't worry
  inquirer.prompt(questions)
    .then((data) => {
        console.log(data);
        if(data.action === 'View All Departments') {
            db.query('SELECT * FROM departments', function (err, results) {
                if(err) {
                    console.log(err)
                  } console.table(results);
              });
        }
    })



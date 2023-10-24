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
    .then((answers) => {
        // console.log(answers);
        if(answers.action === 'View All Departments') {
            db.query('SELECT * FROM departments', (err, results) => {
                if(err) {
                  console.log(err)
                } console.table(results);
            });
        }
        if(answers.action === 'View All Roles') {
            db.query('SELECT roles.id, title, name AS department, salary FROM roles JOIN departments ON roles.department_id = departments.id', (err, results) => {
                if(err) {
                  console.log(err)
                } console.table(results);
            });
        }
        if(answers.action === 'View All Employees') {
            db.query('SELECT employees.id, first_name, last_name, title, name AS department, salary, manager_id FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', (err, results) => {
                if(err) {
                  console.log(err)
                } console.table(results);
            });
        }
        if(answers.action === 'Add a Department') {
            inquirer.prompt([
                {type: 'input',
                name: 'addDepartment',
                message: 'What is the name of the department?'
            }])
            .then((ans) => {
                console.log(ans)
                db.query('INSERT INTO departments(name) VALUES (?)', ans.addDepartment, (err, results) => {
                    if(err) {
                      console.log(err)
                    } console.log(`Added ${ans.addDepartment} to the database`)
                });
                
            })
        }
    })


// promptAction =()=> {
//     return inquirer.prompt(questions)
//     .then((answers) => {
//         if (answers.action === "Quit") {
//         return;
//         } else {
//         return promptAction();
//         }
//     })
// };
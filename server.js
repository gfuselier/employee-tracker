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

// function askQuestions() {
//     return inquirer.prompt(questions)
// }
inquirer.prompt(questions)
    .then((answers) => {
        // console.log(answers);
        if(answers.action === 'View All Departments') {
            db.query('SELECT * FROM departments', (err, results) => {
                if(err) {
                  console.log(err)
                } console.table(results);
                askQuestions(); //doesn't go through any of the ifs now
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
        if(answers.action === 'Add a Role') {
            db.query('SELECT * FROM departments', function (err, results) {
                    const depList = results.map((department) => ({
                      name: department.name,
                      value: department.id
                    }))
                    inquirer.prompt([
                        {type: 'input',
                        name: 'addRole',
                        message: 'What is the name of the role?'
                        }, 
                        {type: 'input',
                        name: 'salary',
                        message: 'What is the salary for the role?'
                        }, 
                        {type: 'list',
                        message: 'What is the department for the role',
                        name: 'department',
                        choices: depList
                        }
                    ])
                    .then((ans) => {
                        console.log(ans)
                        const {addRole, salary, department} = ans
                        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [addRole, salary, department], (err, results) => {
                            if(err) {
                              console.log(err)
                            } console.log(`Added ${addRole} to the database`)
                        });
                        
                    })
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

//can make a query and then inquire.promt inside, then .then another query

// Query database
// db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
//     const temp = results.map((student) => ({
//       name: `${student.first_name} ${student.last_name}`,
//       value: `${student.id}`
//     }))
//     inquirer
//       .prompt([{
//         type: 'list',
//         message: 'Which is student do you wish to select?',
//         name: 'student',
//         choices: temp
//       }, ])
//       .then((response) => console.log(response)
  
//       );
  
//   });
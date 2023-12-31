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
//     inquirer.prompt(questions)
//     .then((answers) => {
//         if (answers.action === "Quit") {
//         return;}
//          else {
//         askQuestions();
//         // return answers;
//         }
//     })
// }

inquirer.prompt(questions)
    .then((answers) => {
        if(answers.action === 'View All Departments') {
            db.query('SELECT * FROM departments', (err, results) => {
                if(err) {
                  console.log(err)
                } console.table(results);
                // askQuestions();
            });
        }
        if(answers.action === 'View All Roles') {
            db.query('SELECT roles.id, title, name AS department, salary FROM roles JOIN departments ON roles.department_id = departments.id', (err, results) => {
                if(err) {
                  console.log(err)
                } console.table(results);
                // askQuestions();
            });
        }
        if(answers.action === 'View All Employees') {
            db.query('SELECT employees.id, first_name, last_name, title, name AS department, salary, manager_id FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', 
            (err, results) => {
                if(err) {
                  console.log(err)
                } console.table(results);
                // askQuestions();
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
                    // askQuestions();
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
                            // askQuestions();
                        });
                        
                    })
             })
        }
        if(answers.action === 'Add an Employee') {
            db.query('SELECT id, title FROM roles', function (err, results) {
                    const roleList = results.map((role) => ({
                      name: role.title,
                      value: role.id
                    }))
                    inquirer.prompt([
                        {type: 'input',
                        name: 'firstName',
                        message: `What is the employee's first name?`
                        }, 
                        {type: 'input',
                        name: 'lastName',
                        message: `What is the employee's last name?`
                        }, 
                        {type: 'list',
                        message: `What is the employee's role`,
                        name: 'role',
                        choices: roleList
                        },
                        {type: 'list',
                        message: `Who is the employee's manager?`,
                        name: 'manager',
                        choices: managerList
                        }
                    ])
                    .then((ans) => {
                        console.log(ans)
                        const {firstName, lastName, role, manager} = ans
                        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, role, manager], (err, results) => {
                            if(err) {
                              console.log(err)
                            } console.log(`Added ${firstName} ${lastName} to the database`)
                            // askQuestions();
                        });
                        
                    })
             })
        }
        if(answers.action === 'Update Employee Role') {
            db.query('SELECT * FROM employees', function (err, results) {
                    const empList = results.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: `${employee.id}`
                    }))
                    inquirer.prompt([
                        {type: 'list',
                        message: `Which employee's role would you like to update?`,
                        name: 'employee',
                        choices: empList
                        },
                        {type: 'list',
                        message: `Which role do you want to assign the selected employee?`,
                        name: 'role',
                        choices: roleList
                        }
                    ])
                    .then((ans) => {
                        console.log(ans)
                        const {employee, role} = ans
                        db.query('UPDATE employees SET role_id = "?" WHERE id = ?;', [role, employee], (err, results) => {
                            if(err) {
                              console.log(err)
                            } console.log(`Updated employee's role`)
                            // askQuestions();
                        });
                        
                    })
             })
        }
        if(answers.action === 'Quit') {
            return;}
    })

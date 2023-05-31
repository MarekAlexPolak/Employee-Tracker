
const inquirer = require("inquirer"); 
const express = require('express');
const mysql = require('mysql2');

express().use(express.urlencoded({ extended: false }));
express().use(express.json());

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "SqitiB3d1beepP0p$221",
    database: "employee_db",
  })

express().use(express.urlencoded({ extended: false }));
express().use(express.json());

let viewEmployee = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) return err;
    console.log(results);
    init();
  });
};

let addEmployee = () => {

  db.query("SELECT * FROM role", (err, data) => {
    if (err)  return err;
    let x = []
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      x[i] = (data[i].title);
    }
    inquirer.prompt([
      {
        type: "input",
        name: "firstname",
        message: "please enter first name:",
      },
      {
        type: "input",
        name: "lastname",
        message: "please enter last name:",
      },
      {
        type: "list",
        name: "role",
        message: "please enter a role:",
        choices: x 
    
        },
      {
        type: "input",
        name: "managerName",
        message: "please type corresponding manager ID.",
      },
    ])
      .then((answers) => {
        const {
          firstname,
          lastname,
          role,
          managerName,
        } = answers;

        let empID = answers.length;

        let newRole;

        for (var i = 0; i < data.length; i++) {
          if (data[i].title === role) {
            newRole = data[i].RoleID;
          }
        }

        db.query(
          `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${empID},${firstname}, ${lastname}, ${newRole}, ${managerName})`)
        init();
    
          
      
      });
  });
};


let updateEmployee = () => {
  db.query("SELECT * FROM employee, role", (err, data) => {
    if (err) return err;
    let nameOp = [];
    for (let i = 0; i < data.length; i++) {
      nameOp[i] = (data[i].first_name);
    }
    console.log(data);
    let roleOp = []
    for (let i = 0; i < data.length; i++) {
      roleOp[i] = (data[i].title);
    }

    inquirer.prompt([
        {
          type: "list",
          name: "employeeName",
          message: "please select employee to update:",
          choices: nameOp
        
        },
        {
          type: "list",
          name: "employeeRole",
          message: "please select a new employee role:",
          choices: roleOp
        },
      ])
      .then((answers) => {
        const { employeeName, employeeRole } = answers;

        const employee = data.find(
          (employee) => employee.FirstName === employeeName
        );

        const role = data.find((role) => role.title === employeeRole);

        if (!employee || !role) {
          console.log("Invalid selection. Please try again.");
          init();
          return;
        }

        db.query(
          "UPDATE employee SET RoleID = ? WHERE EmployeeID = ?",
          [role.RoleID, employee.EmployeeID],
          (err, results) => {
            if (err) return err;
            console.log(results);
            init();
          }
        );
      });
  });
};

let viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) return err;
    console.log(results);
    init();
  });
};

let addRole = () => {

  db.query("SELECT * FROM department", (err, departments) => {
    if (err) return err;
    let depOp = [];
    
    for (let i = 0; i < departments.length; i++){
      depOp[i] = departments[i].name;
    }
    console.log (depOp);
    inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "please enter a new role name:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "please enter a role salary:",
      },
      {
        type: "list",
        name: "departmentName",
        message:
          "please select a department from this list of existing departments.",
        choices: depOp
      }
    ])
    .then((data) => {
        db.query(`INSERT INTO role (RoleName, RoleSalary, DepartmentID) VALUES ('${data.roleName}, ${data.roleSalary}, ${parseInt(data.departmentName)})`, (err, result) => {
            if (err) return err;
            console.log(result);
            init();
          });
          init();
      });
  });
};

let viewDep = () => {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) return err;
    console.log(results);
    init();
  });
};

let addDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "please enter a new department name: ",
      }
    ])
    .then((data) => {
      db.query(`INSERT INTO department (DepartmentName) VALUES (${data.departmentName})`,(err, results) => {
          if(err) return err;
          console.log(results);
          init();
        }
      );
    });
};


function init () {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      choices: [
        "view all employees",
        "view all departments",
        "view all roles",
        "add a department",
        "add an employee",
        "add a role",
        "update an employee role"
      ]
    }])
    .then((data) => {
    switch (data.action) {
        case "view all employees":
            viewEmployee();
            break;
        case "view all roles":
            viewRoles();
            break;
        case "view all departments":
            viewDep();
            break;
        case "add an employee":
            addEmployee();
            break;
        case "add a role":
            addRole();
            break;
        case "add a department":
            addDep();
            break;
        case "update an employee role":
            updateEmployee();
            break;
    }
  });
};


init();










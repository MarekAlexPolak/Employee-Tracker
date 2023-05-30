const inquirer = require('inquirer');
const db = require('./database');


const {
  addEmployee,
  removeEmployee,
  updateEmployeeManager,
  updateEmployeeRole,
  displayAllEmployees,
  displayAllEmployeesByDepartment,
  displayAllEmployeesByManager
} = require('');


const {
  addDepartment,
  removeDepartment,
  displayAllDepartments
} = require('');


const { 
    addRole, 
    removeRole, 
    displayAllRoles 
} = require('');

const {
  displayTotalBudget,
  displayTotalDepartmentBudget
} = require('');

async function init() {
    app(); 
}

async function app() {
    //might change this depending on time
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an option?',
      choices: [
        'View All Employees',
        'View All Employees by Department',
        'View All Employees by Manager',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Remove Employee',
        'Update Employee Manager',
        'Update Employee Role',
        'Add Department',
        'Remove Department',
        'Add Role',
        'Remove Role',
        'View Total Budget',
        'View Total Department Budget',
        'Exit'
      ]
    }
  ]);

  switch (answer.action) { 
    case 'View All Employees':
      await displayAllEmployees();
      app();
      break;
    case 'View All Employees by Department':
      await displayAllEmployeesByDepartment();
      app();
      break;
    case 'View All Employees By Manager':
      await displayAllEmployeesByManager();
      app(); 
      break;
    case 'View All Roles':
      await displayAllRoles();
      app();
      break;
    case 'View All Departments': 
      await displayAllDepartments();
      app();
      break;
    case 'Add Employee': 
      await addEmployee();
      app();
      break;
    case 'Remove Employee':
      await removeEmployee();
      app();
      break;
    case 'Update Employee Manager':
      await updateEmployeeManager();
      app();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      app();
      break;
    case 'Update Employee Department':
      await updateEmployeeDepartment();
      app();
      break;
    case 'Add Department':
      await addDepartment();
      app();
      break;
    case 'Remove Department':
      await removeDepartment();
      app();
      break;
    case 'Add Role':
      await addRole();
      app();
      break;
    case 'Remove Role':
      await removeRole();
      app();
      break;
    case 'View Total Budget':
      await displayTotalBudget();
      app();
      break;
    case 'View Total Department Budget':
      await displayTotalDepartmentBudget();
      app();
      break;
    case 'Exit':
      console.log('application stopped');
      db.exitApp();
    default:
      break;
  }
}

init();
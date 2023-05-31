DROP DATABASE IF EXISTS employee_dbz;
CREATE DATABASE employee_dbz;

USE employee_db;

CREATE TABLE department (
    DepartmentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DepartmentName VARCHAR(30)
);

CREATE TABLE role (
    RoleID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(30),
    Salary DECIMAL,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES department(DepartmentID)
);

CREATE TABLE employee (
    EmployeeID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    RoleID INT,
    ManagerID INT,
    FOREIGN KEY(RoleID) REFERENCES role(RoleID)
);
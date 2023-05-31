INSERT INTO department (DepartmentName) VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Engineering'),
    ('Operations');

-- role table seed data
INSERT INTO role (RoleName, RoleSalary, DepartmentID) VALUES
    ('HR Manager', 5000.00, 1),
    ('Recruiter', 3000.00, 1),
    ('Marketing Manager', 6000.00, 2),
    ('Marketing Coordinator', 3500.00, 2),
    ('Operations Engineer', 5500.00, 3),
    ('Accountant', 4000.00, 3),
    ('Quality Assurance', 5500.00, 4),
    ('Work Therapist', 3500.00, 4);

-- employee table seed data
INSERT INTO employee (FirstName, LastName, RoleID, ManagerID) VALUES
    ('Marek', 'Polak', 1, NULL),
    ('Fran', 'Liv', 2, 1),
    ('Jordan', 'Pettyjogn', 3, 1),
    ('Emily', 'Marin', 4, 3),
    ('Ceddy', 'Sob', 5, NULL),
    ('Fabio', 'eggsima', 6, 5),
    ('Robert', 'hutch', 7, 5);
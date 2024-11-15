\c employee_db;

INSERT INTO department (name) VALUES
    ('Manufacturing'),
    ('Logistics'),
    ('Maintenance');

INSERT INTO role (title, salary, department_id) VALUES
    ('Welder', 48000, 1),
    ('Forklift Operator', 38000, 2),
    ('Electrician', 52000, 3),
    ('Assembly Line Worker', 42000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Zelda', 'Carver', 1, NULL),
    ('Arlo', 'Holloway', 2, NULL),
    ('Mira', 'Peterson', 3, NULL),
    ('Beatrix', 'Fisher', 4, NULL),
    ('Royce', 'Madden', 4, 1); -- managed by Zelda
USE employees_db;
INSERT INTO department (id, name)
VALUES (1, "Javascript"),
	(2, "TypeScript"),
	(3, "Ruby"),
	(4, "HR");
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Javascript Developer", 12345, 1),
	(2, "TypeScript Developer", 23456, 2),
	(3, "Ruby Developer", 34567, 3),
	(4, "HR Manager", 45678, 4);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, NULL),
	(2, "Jane", "Doe", 2, 1),
	(3, "John", "Smith", 3, 1),
	(4, "Jane", "Smith", 4, 1);
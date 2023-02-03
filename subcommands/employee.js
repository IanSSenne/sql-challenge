const getConnection = require("../util/getConnection");

async function showEmployees() {
	const connection = await getConnection();
	const [rows] = await connection.execute(
		`SELECT A.id,A.first_name,A.last_name,R.title AS role, CONCAT(E.last_name," ",E.first_name) AS manager
		FROM employee A
		JOIN role R ON A.role_id = R.id
		LEFT JOIN employee E ON A.manager_id = E.id`
	);

	console.table(rows);
}

async function addEmployee() {
	const connection = await getConnection();
	const inquirer = (await import("inquirer")).default;
	const [roles] = await connection.execute("SELECT * FROM role");
	let [employees] = await connection.execute(
		'SELECT id,CONCAT(first_name," ",last_name) as name FROM employee'
	);
	console.log(employees);
	const roleByName = {};
	const roleNames = [];
	const employeeByName = {};
	const employeeNames = [];

	roles.forEach((role) => {
		roleByName[role.title] = role.id;
		roleNames.push(role.title);
	});

	employees.forEach((employee) => {
		employeeByName[employee.name] = employee.id;
		employeeNames.push(employee.name);
	});

	const { first_name, last_name, role, manager } = await inquirer.prompt([
		{
			type: "input",
			name: "first_name",
			message: "What is the first name of the employee?",
		},
		{
			type: "input",
			name: "last_name",
			message: "What is the last name of the employee?",
		},
		{
			type: "list",
			name: "role",
			message: "What is the role of the employee?",
			choices: roleNames,
		},
		{
			type: "list",
			name: "manager",
			message: "Who is the manager of the employee?",
			choices: [...employeeNames, "No Manager"],
		},
	]);

	const roleId = roleByName[role];
	const managerId = employeeByName[manager] || null;

	const [{ insertId }, err] = await connection.execute(
		"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
		[first_name, last_name, roleId, managerId]
	);
	if (err) throw err;
	console.table({
		id: insertId,
		first_name: first_name,
		last_name: last_name,
		role: role,
		manager: manager,
	});
}
module.exports = [showEmployees, addEmployee];

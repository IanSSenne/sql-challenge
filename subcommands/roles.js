const getConnection = require("../util/getConnection");

async function showRoles() {
	const connection = await getConnection();
	const [rows] = await connection.execute(
		"SELECT role.id,title,salary,department.name AS department_name FROM role JOIN department ON role.department_id = department.id"
	);

	console.table(rows);
}

async function addRole() {
	const connection = await getConnection();
	const inquirer = (await import("inquirer")).default;
	const [departments] = await connection.execute("SELECT * FROM department");
	const departmentByName = {};
	const departmentNames = [];
	departments.forEach((department) => {
		departmentByName[department.name] = department.id;
		departmentNames.push(department.name);
	});
	console.log(departments);
	const { title, salary, department } = await inquirer.prompt([
		{
			type: "input",
			name: "title",
			message: "What is the title of the role?",
		},
		{
			type: "input",
			name: "salary",
			message: "What is the salary of the role?",
		},
		{
			type: "list",
			name: "department",
			message: "What department does the role belong to?",
			choices: departmentNames,
		},
	]);
	const departmentId = departmentByName[department];
	const [{ insertId }, err] = await connection.execute(
		"INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
		[title, salary, departmentId]
	);
	if (err) throw err;
	console.table({
		id: insertId,
		title: title,
		salary: salary,
		department: department,
	});
}
module.exports = [showRoles, addRole];

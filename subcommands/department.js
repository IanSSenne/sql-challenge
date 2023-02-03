const getConnection = require("../util/getConnection");

async function showDepartments() {
	const connection = await getConnection();
	const [rows] = await connection.execute("SELECT * FROM department");

	console.table(rows);
}

async function addDepartment() {
	const connection = await getConnection();
	const inquirer = (await import("inquirer")).default;
	const { name } = await inquirer.prompt({
		type: "input",
		name: "name",
		message: "What is the name of the department?",
	});
	const [{ insertId }, err] = await connection.execute(
		"INSERT INTO department (name) VALUES (?)",
		[name]
	);
	if (err) throw err;

	console.table([{ id: insertId, name: name }]);
}
module.exports = [showDepartments, addDepartment];

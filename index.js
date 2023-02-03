require("dotenv").config();
require("console.table");
const handlers = [
	require("./subcommands/department"),
	require("./subcommands/roles"),
	require("./subcommands/employee"),
];

async function dispatchCommand(targetId, commandType) {
	const handler = handlers[targetId];
	const command = handler[commandType];
	if (!command) throw new Error("Invalid command type");
	await command();
}

async function main() {
	const inquirer = (await import("inquirer")).default;

	const options = [
		"View all departments.",
		"Add a department.",
		"View all roles.",
		"Add a role.",
		"View all employees.",
		"Add an employee.",
		"exit the application.",
	];

	while (true) {
		const { action } = await inquirer.prompt({
			type: "list",
			name: "action",
			message: "What would you like to do?",
			choices: options,
		});

		const optIndex = options.indexOf(action);
		if (optIndex === 6) {
			console.log("Goodbye!");
			process.exit();
		}

		const isAdd = optIndex & 1;
		const targetType = optIndex >> 1;

		await dispatchCommand(targetType, isAdd);
		await inquirer.prompt({
			type: "confirm",
			message: "Press enter to continue",
			name: "continue",
		});
	}
}

main();

const mysql2 = require("mysql2/promise");
const connection = mysql2.createConnection({
	database: process.env.SQL_DB,
	user: process.env.SQL_USER,
	password: process.env.SQL_PSWD,
});
module.exports = function getConnection() {
	return connection;
};

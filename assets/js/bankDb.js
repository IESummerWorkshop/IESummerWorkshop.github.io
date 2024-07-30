'use strict';
/** This file contins the 'backend' logic of the demo.
 */

let db = "";

const initDb = new Promise((resolve, reject) => {
    const setup = (sqlite) =>{
        // const oo = sqlite.oo1;
		// const db = new oo.DB('local', 'c', 'kvvfs');
		db = new sqlite.oo1.JsStorageDb('local');
        try{
			if(sessionExists() == false){
				db.clearStorage();

				// Create user table and entries
				db.exec("CREATE TABLE IF NOT EXISTS users(username,password,money)");
				db.exec("INSERT INTO users VALUES('alice','password',1000)");
				db.exec("INSERT INTO users VALUES('bob','password',1000)");
				db.exec("INSERT INTO users VALUES('attacker','p@ssw0rd',0)");
	
				// Create session table and entries
				//TODO: Foreign key
				db.exec("CREATE TABLE IF NOT EXISTS session(username,sessionId)");
				db.exec("INSERT INTO session VALUES('alice','')");
				db.exec("INSERT INTO session VALUES('bob','')");
				db.exec("INSERT INTO session VALUES('attacker','')");
			}
			resolve("Successful");
 
        }catch(e){
            // console.error(e);
			reject(e);
        }
    }
    self.sqlite3InitModule({}).then(setup);
});

function loginDb(username, password) {
	let rows = [];
	db.exec({
		sql: "SELECT * FROM users WHERE username=(?) AND password=(?)",
		bind: [username, password],
		rowMode: 'object',
		resultRows: rows
	});
	return rows[0];
}

function getAllFromTable(table) {
	const query = "SELECT * FROM " + table + ";";
	let rows = [];
	db.exec({
		sql: query,
		rowMode: 'object',
		resultRows: rows
	});
	return rows;

}

function updateDB(table, username, field, value){
	db.transaction((d) => {
		const query = "Update " + table + " SET " +field+ "= (?) WHERE username = (?)";
		let rows = [];
		d.exec({
			sql: query,
			bind: [value, username],
			rowMode: 'object',
			resultRows: rows
		});
	})

	let row = []
	db.exec({
		sql: "SELECT * from session",
		rowMode: 'object',
		resultRows: row
	})
}

function getUserbySession(sessionId){
	let rows = [];
	db.exec({
		sql: "SELECT username FROM session WHERE sessionId = (?)",
		bind: [sessionId],
		rowMode: 'object',
		resultRows: rows
	});
	return rows[0].username;
}

function transactionUpdate(from, to, amount){
	// Check if "from" has enough money
	let rows1 = [];
	db.exec({
		sql: "SELECT money FROM users WHERE username = (?)",
		bind: [from],
		rowMode: 'object',
		resultRows: rows1
	});
	if (amount <= 0){
		throw("Money cannot be negative value");
	}
	else if (rows1[0].money < amount){
		throw("Insufficient balance");
	}
	else{
		// Deduct money from "from"
		let rows2 = [];
		db.exec({
			sql: "Update users SET money = money-(?)  WHERE username = (?)",
			bind: [amount, from],
			rowMode: 'object',
			resultRows: rows2
		});

		// Adding money from "to"
		let rows3 = [];
		db.exec({
			sql: "Update users SET money = money+(?) WHERE username = (?)",
			bind:[amount, to],
			rowMode: 'object',
			resultRows: rows3
		});
	}
	
}
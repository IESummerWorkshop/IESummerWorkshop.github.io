'use strict';
/** This file contins the 'backend' logic of the demo.
 */

let db = "";

const initDb = new Promise((resolve, reject) => {
    const setup = (sqlite) =>{
		db = new sqlite.oo1.JsStorageDb('local');
        try{
				db.clearStorage();

				db.exec("CREATE TABLE IF NOT EXISTS product(product,price,quantity)");
				db.exec("INSERT INTO product VALUES('Apple',5,1000)");
				db.exec("INSERT INTO product VALUES('Orange',4,1000)");
				db.exec("INSERT INTO product VALUES('Banana',10,3)");
                resolve("Successful");
	
        }catch(e){
            // console.error(e);
			reject(e);
        }
    }
    self.sqlite3InitModule({}).then(setup);
});

window.onload = () => {
	// Initialize the database
	updateConstructForm();
	initDb.then((value) => {
		console.log("DB init successful");
		updateDatabaseTable(getAllFromTable('product'));	
		// updateConstructForm();
	})
	.catch((err) => {
		console.error(err);
	});
}

function updateDatabaseTable(record) {
    const table = document.getElementById("productDb");
	table.innerHTML= '<tbody id="userDb"></tbody>'
	for (let item of record){
		const row = document.createElement("tr");
        const productCell = document.createElement("td");
        const priceCell = document.createElement("td");
        const quantityCell = document.createElement("td");

        productCell.innerHTML = item.product;
        priceCell.innerHTML = item.price;
        quantityCell.innerHTML = item.quantity;

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        table.appendChild(row);
	}
}

function executeQuery() {
	let query = document.querySelector("#query").value;
	let output = document.querySelector("#output");
	output.innerHTML = ""
	try{
		let result = execute(query);
		if(result.length == 0)	{
			output.innerHTML = JSON.stringify(result);
		}
		else {
			for (let item of result){
				output.innerHTML += JSON.stringify(item);
			}
		}
		updateDatabaseTable(getAllFromTable('product'));
	}
	catch(err){
		output.innerHTML = err;
	}

}

function newField(name, type, attribute=[["type", type], ["class", "form-control"], ["id", name]]){
	let parent = document.createElement("div");

	let label = document.createElement("label");
	label.setAttribute("class", "fw-bold");
	label.innerHTML = name;

	let content = document.createElement("input");
	for(let item of attribute){
		content.setAttribute(item[0], item[1]);
	}

	parent.append(label, content);

	return parent;
}

function updateConstructForm(){
	let operation = document.querySelector("#operation").value;
	let constructBtn = document.querySelector("#constructBtn");
	let operationField = document.querySelector("#operationField");
	let operationCardBody = document.querySelector("#operationCardBody");
	operationCardBody.innerHTML = "";
	switch (operation){
		case "Create":
			operationCardBody.appendChild(operationField);
			operationCardBody.appendChild(newField("product", "text"));
			operationCardBody.appendChild(newField("price", "text"));
			operationCardBody.appendChild(newField("quantity", "text"));
			operationCardBody.appendChild(constructBtn);
			break;
		case "Read":
			operationCardBody.appendChild(operationField);
			operationCardBody.appendChild(newField("product", "text"));
			operationCardBody.appendChild(constructBtn);
			break;
		case "Update":
			operationCardBody.appendChild(operationField);
			operationCardBody.appendChild(newField("product", "text"));
			operationCardBody.appendChild(newField("price", "text"));
			operationCardBody.appendChild(constructBtn);
			break;
		case "Delete":
			operationCardBody.appendChild(operationField);
			operationCardBody.appendChild(newField("product", "text"));
			operationCardBody.appendChild(constructBtn);
			break;
	}
}

function construct(){
	let queryField = document.querySelector("#query");
	let operation = document.querySelector("#operation").value;
	switch (operation){
		case "Create":
			queryField.value = "INSERT INTO product VALUES('" + document.querySelector("#product").value + "'," + document.querySelector("#price").value + "," + document.querySelector("#quantity").value + ")";
			break;
		case "Read":
			queryField.value = "SELECT * FROM product WHERE product = '" + document.querySelector("#product").value + "'";
			break;
		case "Update":
			queryField.value = "UPDATE product SET price = " + document.querySelector("#price").value + " WHERE product = '" + document.querySelector("#product").value + "'";
			break;
		case "Delete":
			queryField.value = "DELETE FROM product WHERE product = '" + document.querySelector("#product").value + "'";
			break;
	}

}

///////////////////////////////////////////////////////////// SQL query
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

function execute(query){
    let rows = [];
	db.exec({
		sql: query,
		rowMode: 'object',
		resultRows: rows
	});
	return rows;
}
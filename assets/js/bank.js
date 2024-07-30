/* Contrller */
function updateUserDatabaseTable(record) {
    const table = document.getElementById("userDb");
	table.innerHTML= '<tbody id="userDb"></tbody>'
	for (item of record){
		const row = document.createElement("tr");
        const userCell = document.createElement("td");
        const passCell = document.createElement("td");
        const moneyCell = document.createElement("td");

        userCell.innerHTML = item.username;
        passCell.innerHTML = item.password;
        moneyCell.innerHTML = item.money;

        row.appendChild(userCell);
        row.appendChild(passCell);
        row.appendChild(moneyCell);
        table.appendChild(row);
	}
}

function updateSessionDatabaseTable(record) {
    const table = document.getElementById("sessionDb");
	table.innerHTML= '<tbody id="sessionDb"></tbody>'
	for (item of record){
		const row = document.createElement("tr");
        const userCell = document.createElement("td");
        const idCell = document.createElement("td");

        userCell.innerHTML = item.username;
        idCell.innerHTML = item.sessionId;

        row.appendChild(userCell);
        row.appendChild(idCell);
        table.appendChild(row);
	}
}

function updateTransactionOption(current){
	let options = document.querySelector("#to");
	let result = getAllFromTable('users');
	for (item of result){
		if (item.username === current) continue;
		else{
			let newOption = new Option(item.username, item.username);
			options.add(newOption);
		}
	}
}

function login(){
	if (sessionExists() === false){
		const username = document.querySelector('#username').value;
		const password = document.querySelector('#password').value;
		result = loginDb(username, password);
		if (result === undefined) {
			alert("Incorrect username / password");
		}
		else if (username === "attacker"){
			window.location.href = "/evil1.html"
		}
		else{
			let sessionId = newSession(username);
			document.querySelector("#displayUserName").innerHTML = "Hi " + getUserbySession(sessionId);

			let transaction = document.querySelector('#transaction');
			transaction.setAttribute("style", "display: block");
			updateSessionDatabaseTable(getAllFromTable('session'));
			updateTransactionOption(username);
		}
	}
	else alert("User already logged in");
}

function resetSession(){
	var allCookies = document.cookie.split(';'); 
     
	// The "expire" attribute of every cookie is  
	// Set to "Thu, 01 Jan 1970 00:00:00 GMT" 
	for (var i = 0; i < allCookies.length; i++) 
		document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString(); 

	location.reload()
}

function updateDbDisplay(){
	updateUserDatabaseTable(getAllFromTable('users'));
	updateSessionDatabaseTable(getAllFromTable('session'));
}

window.onload = () => {

	// Initialize the database
	initDb.then((value) => {
		console.log("DB init successful");
		updateUserDatabaseTable(getAllFromTable('users'));
		updateSessionDatabaseTable(getAllFromTable('session'));

		if(sessionExists()){
			let username = getUserbySession(getSesionCookie())
			document.querySelector("#displayUserName").innerHTML = "Hi " + username;
			updateTransactionOption(username);
			transaction.setAttribute("style", "display: block");
		}
		else {
			transaction.setAttribute("style", "display: none");
		}		
	})
	.catch((err) => {
		console.error(err);
	});
}

/* Model */

// Check if a session cookie exists
function sessionExists(){
	let sessionId = getSesionCookie();
	return (sessionId !== undefined);
}

function getSesionCookie() {
    var dc = document.cookie;
	return(dc.split("=")[1]);
} 

// Create a new session for user
function newSession(username){
	// cookie expires in 15 mins
	const d = new Date();
	d.setTime(d.getTime() + (900000));
	let expires = "expires="+ d.toUTCString();

	// setup sessionID by base64Encode(username:password), temporary
	let sessionId = makeid(20);

	document.cookie = "session" + "=" + sessionId + ";" + expires + ";path=/";
	updateDB("session", username, "sessionId", sessionId);

	return sessionId;
}

// Generate ID of random string
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
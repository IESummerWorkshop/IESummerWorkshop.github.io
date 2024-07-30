'use strict';
/** This file contins the 'backend' logic of the demo.
 */

let database = [];


(function(){
    const out = document.querySelector('#output');
    const setup = (sqlite) =>{
        const oo = sqlite.oo1;
        const db = new oo.DB(":memory:",'ct');
        try{
            db.exec("CREATE TABLE IF NOT EXISTS users(username,password)");
            // insert some entries
            db.exec("INSERT INTO users VALUES('admin','nBErYZj%WqSyqUU*')");
            db.exec("INSERT INTO users VALUES('user','tY(XLijbAbn(mOUU')");
            db.exec("INSERT INTO users VALUES('guest','t33olrQfuFnV#rgl')");
            db.exec("INSERT INTO users VALUES('test','cp@yT2@!wslW70iv')");
            db.exec("INSERT INTO users VALUES('test2','hcAtYaz*B4jenx)e')");
            database = db.exec({
                sql: "SELECT * FROM users",
                rowMode: 'object',
            })
            //Create table 
            databaseTable()
        }catch(e){
            console.log(e);
        }
        document.querySelector('#login').addEventListener('click',function(){
            try{
                const username = document.querySelector('#username').value;
                const password = document.querySelector('#password').value;
                const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "';";
                let rows = [];
                db.exec({
                    sql: query,
                    rowMode: 'object',
                    resultRows: rows
                });
                if(rows.length > 0){
                    out.className = "d-inline-block alert alert-success d-flex align-items-center";
                    out.innerHTML = "Login successful! You passed the demo.";
                }else{
                    out.className = "d-inline-block alert alert-danger d-flex align-items-center";
                    out.innerHTML = "Login failed! Try again.";
                }
            }catch(e){
                out.innerHTML = e;
            }
        });
    }
    self.sqlite3InitModule({}).then(setup);

})();

(function(){
    const updatecode = (_) =>{
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "';";
        const code_block = document.querySelector('#sql-code');
        code_block.innerHTML = query;
        hljs.highlightElement(code_block);
    };
    document.querySelector('#username').addEventListener('input',updatecode);
    document.querySelector('#password').addEventListener('input',updatecode);
    updatecode();
})();

function databaseTable() {
    const table = document.getElementById("tbody");
    database.forEach((database) => {
        const row = document.createElement("tr");
        const userCell = document.createElement("td");
        const passCell = document.createElement("td");

        userCell.innerHTML = database.username;
        passCell.innerHTML = database.password;

        row.appendChild(userCell);
        row.appendChild(passCell);
        table.appendChild(row);
      });
}
'use strict';
/** This file contins the 'backend' logic of the demo.
 */

let database = [];
let db = "";


const initDb = new Promise((resolve, reject) => {
    const setup = (sqlite) =>{
		db = new sqlite.oo1.JsStorageDb('local');
        try{
            db.clearStorage();
            db.exec("CREATE TABLE IF NOT EXISTS products(name,category,description,released)");
            // insert some entries
            db.exec("INSERT INTO products VALUES('Banana','fruits','Ba-ba-ba-ba-ba-nana', 1)");
            db.exec("INSERT INTO products VALUES('Apple','fruits','An apple a day, the doctors away', 1)");
            db.exec("INSERT INTO products VALUES('T-shirt','fabrics','中大小畫家頹T', 1)");
            db.exec("INSERT INTO products VALUES('Dress','fabrics','Blue&Black or White&Gold?', 1)");
            db.exec("INSERT INTO products VALUES('flag','fabrics','RXZB2SXGOU', 0)");
            db.exec("INSERT INTO products VALUES('Coffee','drinks','The battery of an engineer', 1)");
            db.exec("INSERT INTO products VALUES('Milktea','drinks','Happy water', 1)");
			resolve("Successful");
        }catch(e){
			reject(e);
        }
    }
    self.sqlite3InitModule({}).then(setup);
});


function displayProducts() {
    let params = new URLSearchParams(document.location.search);
    var category = params.get("category") == null ? "fruits" : params.get("category");
    
    let productDisplay = document.querySelector('#productDisplay');
    productDisplay.innerHTML = "";
    try{
        let item = getProductFromDb(category);
        console.log(item)
        for (let i = 0; i < item.length; i++) {
            productDisplay.appendChild(newCard(item[i].name, item[i].description));
        }
    }
    catch(err){
        let errorDiv = document.createElement('div');
        errorDiv.className = 'text-center';
        errorDiv.innerHTML = err;
        productDisplay.appendChild(errorDiv);
    }
}

function newCard(product, description){
    /* Create the pop up modal when clicking on the card */
   
    let modalName = product + 'Modal';

    let modal = document.createElement('div');
    modal.className = 'modal fade modal-lg';
    modal.id = modalName;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modulesModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    let modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';
    modal.append(modalDialog);

    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalDialog.append(modalContent);

    let modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalContent.append(modalHeader);

    let modalTitle = document.createElement('h1');
    modalTitle.className = 'modal-title fs-5';
    modalTitle.innerText = product;
    modalHeader.append(modalTitle);

    let modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerText = description;
    modalContent.append(modalBody); 


    /* Create the card for display*/
    let card = document.createElement('div');
    card.className = 'card shadow rounded mx-3 text-center pt-3';
    card.setAttribute('style', 'width: 15rem;');
    card.setAttribute('data-bs-toggle', 'modal');
    card.setAttribute('data-bs-target', '#' + modalName);

    let img = document.createElement('img');
    img.className = 'card-img-top';
    img.setAttribute('width', '190.4px');
    img.setAttribute('height', '190.4x');
    img.src = '/assets/img/' + product + '.jpg';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = product;
    

    cardBody.append(title);
    card.append(img);
    card.append(cardBody);

    let sectionCard = document.getElementById('productDisplay');
    sectionCard.append(card);
    let appendModal = document.getElementById('modal');
    appendModal.append(modal);

    // newCard.addEventListener('click', () => {
    //     var myModal = new bootstrap.Modal(document.getElementById("#AppleModal"));
    //     myModal.show();
    // })
    return card;
}

window.onload = () => {
	// Initialize the database
	initDb.then((value) => {
		console.log("DB init successful");
        displayProducts();
	})
	.catch((err) => {
		console.error(err);
	});
}


/* DB function */
function getProductFromDb(category){
    let rows = [];
    database = db.exec({
        sql: "SELECT * FROM products where category = '" + category + "'" + "AND released = 1",
        rowMode: 'object',
		resultRows: rows
    })
    return rows;
}


/********************************* Controller function *********************************/
// Create input / readOnly field on the screen
function newField(id, displayOnly=false, value=null, inputMax=1, length=22){
    let PTInputArea = document.createElement("div");
    PTInputArea.className = "container";
    let PTInput = document.createElement("div");
    PTInput.className = "inputs";
    PTInput.setAttribute("id", id);

    for(let i = 0; i < length; i++){
        let char = document.createElement("input");
        char.className = "input"
        char.setAttribute("type", "text");
        char.setAttribute("id", id+"-"+String(i));
        char.setAttribute("maxLength", String(inputMax));
        char.disabled = displayOnly;

        if (value != null){
            
            if (inputMax == 2) fill = value.split(" ")[i];
            else fill = value.split("")[i];
            if (fill === undefined) {
                char.setAttribute("value", "");
            }
            else{
                char.setAttribute("value", fill);
                char.disabled = true;
                if (fill === " "){
                    char.classList.add('space');
                }
            }
        }
        PTInput.appendChild(char);
    }
    PTInputArea.appendChild(PTInput);
    return PTInputArea;
}

// Craete event handler for each input field
function inputHandler(element){
    element.addEventListener("input", (e) => {
        const target = e.target;
        const val = target.value;
        if (val != "") {
            updateValue(element, target.id, val);
            const next = target.nextElementSibling;
            if (next) {
                next.focus();
            }
        }
    })

    // Create basic key function for moving around
    element.addEventListener("keydown",  (e) => {
        const target = e.target;
        const key = e.key.toLowerCase();
        

        if (key == "backspace" || key == "delete") {
            e.preventDefault();
            removeValue(target.id);
            const prev = target.previousElementSibling;   
            if (prev) {
                prev.focus();
            }
            return;
        }
        if (key == "arrowleft") {
            e.preventDefault();
            const prev = target.previousElementSibling;
            if (prev) {
                prev.selectionStart = prev.value.length;
                prev.selectionEnd = prev.value.length;
                prev.focus();
            }
            return;
        }
        if (key == "arrowright") {
            const next = target.nextElementSibling;
            if (next) {
                next.focus();
                next.setSelectionRange(next.value.length, next.value.length);
            }
        }
        if(key == "arrowdown"){
            const curr = target.id;
            let PT = curr.split("-")[0].slice(-1);
            let pos = curr.split("-")[1];
            let next = document.querySelector("#PT"+(String(Number(PT)+1))+"-"+pos);
            if (next){
                next.focus();
            }
        }
        if(key == "arrowup"){
            const curr = target.id;
            let PT = curr.split("-")[0].slice(-1);
            let pos = curr.split("-")[1];
            let next = document.querySelector("#PT"+(String(Number(PT)-1))+"-"+pos);
            if (next){
                next.focus();
            }
        }
    });
}

// Update value from the input field
function updateValue(element, pos, changedVal=""){
    let changedStr = element.id.slice(-1);
    let changedPos = pos.split('-')[1];

    result = calculate(changedStr-1, changedVal, changedPos);
    for (let i = 0; i < 3; i++){
        let currPT = document.querySelector("#PT"+String(i+1)).getElementsByClassName("input");  
        currPT[Number(changedPos)].value = result[i];
        if (changedStr-1 != i){
            currPT[Number(changedPos)].classList.add("generateText");
            currPT[Number(changedPos)].classList.remove("guess");
        }
        else {
            currPT[Number(changedPos)].classList.add("guess");
            currPT[Number(changedPos)].classList.remove("generateText");
        }
        if (result[i] === " "){
            currPT[Number(changedPos)].classList.add('space');
        }
        
    }
    
    let key = document.querySelector("#secretkey").children[changedPos];
    key.value = result[3]
}

// Remove value from the input field
function removeValue(pos){
    let changedPos = pos.split('-')[1];
    for (let i = 0; i < 3; i++){
        let currPT = document.querySelector("#PT"+String(i+1)).getElementsByClassName("input");
        currPT[Number(changedPos)].value = "";
        currPT[Number(changedPos)].classList.remove('space');  
        currPT[Number(changedPos)].classList.add('empty');    
    }
    let key = document.querySelector("#secretkey").children[Number(changedPos)];
    key.value = "";
}

// Decreypt the Ciphertext with possible key
function decryptWithPossibleKey(){
    let key = document.querySelector("#key").getElementsByClassName("input");
    let possibleKey = [];
    let completed = true;
    for (let i = 0; i < key.length; i++){
        if (key[i].value == ""){
            key[i].classList.remove("empty");
            key[i].classList.add("unfilled");
            completed = false;
        }
        else {
            possibleKey.push(key[i].value);
            key[i].classList.remove("unfilled");
            key[i].classList.add("empty");
        }
    }
    if (completed){
        let result = []
        for (let i = 0; i < possibleKey.length; i++){
            let tempKey = parseInt(possibleKey[i], 16);
            let tempCT = parseInt(finalCT.split(" ")[i], 16);
            result.push(tempKey ^ tempCT);
        }
    
        let finalResult = ASCIIToTextConvert(result);
        let pt = document.querySelector("#Plaintext");
        pt.innerHTML = "Plaintext: " + finalResult;
    }
    else{
        alert("Please complete the key before proceeding");
    }
}

// Initlizize when the page is loaded
window.onload = () => {
    // Create input field for PT input
    initialize();
    for (let i = 0; i < 3; i++){
        let currentField = document.getElementById("T"+String(i+1));

        let CT = currentField.querySelector("#CT"+String(i+1));
        let PT = currentField.querySelector("#PT"+String(i+1));
        
        CT.innerHTML += newField(id="CT"+String(i+1), displayOnly=true, value=CTValue[i], inputMax=2).innerHTML;
        PT.innerHTML += newField(id="PT"+String(i+1), displayOnly=false, value=PTValue[i], inputMax=1).innerHTML;
        inputHandler(CT.querySelector(".inputs"));
        inputHandler(PT.querySelector(".inputs"));
    }
    
    // Create key field
    let key = CompleteKey.split(" ").slice(0, 4).join(" ");
    document.querySelector("#key").innerHTML += newField(id="secretkey", displayOnly=true, value=key, inputMax=2).innerHTML;
}


/********************************* model function *********************************/
//TODO: Generate the CT/PT/key value and hide the value with encryption
var CTValue = [];
var PTValue = [];
var CompletePT = [];

var CompleteKey = "";
var finalCT = "";
var finalPT = "Congrat it is correct!";

const PT = ['Y3J5cHRvZ3JhcGh5IGlzIHVzZWZ1bA==', 'd29ycnkgbGVzcyBzbWlsZSBtb3JlIA==', 'YSBwaWcgaXMgYSBmYXJtIGFuaW1hbA==', 'd2lzZG9tIGJyaW5ncyBjbGFyaXR5IA==', 'Y3VyaW9zaXR5IGZ1ZWxzIGdyb3d0aA==', 'ZXhwbG9yaW5nIG5ldyBob3Jpem9ucw==', 'c2Vla2luZyBpbm5lciBiYWxhbmNlIA==', 'bWFrZSB0aW1lIGZvciB5b3Vyc2VsZg==', 'ZW5qb3kgdGhlIHNpbXBsZSBqb3lzIA==', 'cmFpbiBtYWtlcyBwbGFudHMgZ3Jvdw==', 'Ym9va3MgYXJlIGdvb2QgZnJpZW5kcw==', 'bXVzaWMgc29vdGhlcyB0aGUgc291bA==', 'dHJ1dGggaXMgYSBiaXR0ZXIgcGlsbA==', 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IA==']

// calculate the updated value for other PT and key
// return [PT1, PT2, PT3, key]
function calculate(changedStr, changedVal, changedPos){

    corrCT = CTValue[changedStr].split(" ")[changedPos];

    // convert corr to hex representation
    corrCT = parseInt(corrCT, 16);
    changedValEncode = changedVal.charCodeAt(0);
    let key = corrCT ^ changedValEncode

    let result = []

    for (let i = 0; i < 3; i++){
        if(changedStr == i) {
            result.push(changedVal);
        }
        else{
            CTTemp = parseInt(CTValue[i].split(" ")[changedPos], 16);
            result.push(hex_to_ascii(CTTemp ^ key)); 
        }
    }
    result.push(key.toString(16).padStart(2, '0'));
    return result;
}

// Convert hex (in string format e.g. FF) to ASCII character
function hex_to_ascii(str1)
 {
	let hex = str1.toString();
    str = String.fromCharCode(hex);
	return str;
}

// Convert ASCII code to the corresponding character
function ASCIIToTextConvert (asciiArray) {
    return String.fromCharCode(...asciiArray);
}

//Generate random byte of a sepcific length
function randomByte(len) {
    const arr = new Uint8Array(len);
    window.crypto.getRandomValues(arr);
    return arr;
}

// Generate random key
function generateRandomKey(){
    const byteArray = randomByte(21);
    const hexArray = Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0'));
    const CompleteKey = hexArray.join(" ");
    
    return CompleteKey;
}

// ASCI charcter XOR with the key
function XORPTWithKey(val){
    CT = []
    for (let i = 0; i < 22; i++){
        let tempPT = val[i].charCodeAt();
        let tempKey = parseInt(CompleteKey.split(" ")[i], 16);
        let result = (tempPT ^ tempKey).toString(16);
        CT.push(result.toString(16).padStart(2, '0'));
    }
    return(CT.join(" "));
}

// Initilize the page with PT, CT and key
function initialize(){
    // Generate 3 random PT from the pre-defined list
    let random = [];
    for (let i = 0; i < 3; i++){
        let repeated = true;
        let value = "";
        do{
            let value = Math.floor(Math.random() * PT.length);
            if (!random.includes(value)) {
                repeated = false;
                random.push(value);
            }
        } while (repeated === true);
        CompletePT.push(atob(PT[random[i]]));
    }
    
    // Generate random key
    CompleteKey = generateRandomKey();

    for (item of CompletePT){
        PTValue.push(item.slice(0, 4));
        CTValue.push(XORPTWithKey(item));
    }

    // Calculate the CT for final plaintext
    finalCT = XORPTWithKey(finalPT)
    let ct = document.querySelector("#Cipher");
    ct.innerHTML += newField("cipherex-result", true, finalCT, 2, 22).innerHTML
}
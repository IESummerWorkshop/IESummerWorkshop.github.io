const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const letters_value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

let shift_cipher = document.getElementById("monoalphabetic-cipher");
for(let i = 0; i < 26; i++){
    let td = document.createElement("td");
    td.innerHTML = letters[i];
    td.setAttribute("id", letters[i]);
    shift_cipher.appendChild(td);
}

const fadeIn = [
    { opacity: "0" },
    { opacity: "1" },
  ];
  
  const Timing = {
    duration: 1500,
    iterations: 1,
  };
    function newKey() {
    let tr = document.getElementById('monoalphabetic-cipher');
    tr.animate(fadeIn, Timing);
    
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let currentIndex = alphabet.length;
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [alphabet[currentIndex], alphabet[randomIndex]] = [alphabet[randomIndex], alphabet[currentIndex]];
    }
    for (let i = 0; i < 26; i++){
        let td = document.getElementById(String.fromCharCode(65+i));
        td.innerHTML = alphabet[i];
    }

}

//For ciphertext substitution
function substitution(){  
    const chars = {
      'A': '',
      'B': '',
      'C': '',
      'D': '',
      'E': '',
      'F': '',
      'G': '',
      'H': '',
      'I': '',
      'J': '',
      'K': '',
      'L': '',
      'M': '',
      'N': '',
      'O': '',
      'P': '',
      'Q': '',
      'R': '',
      'S': '',
      'T': '',
      'U': '',
      'V': '',
      'W': '',
      'X': '',
      'Y': '',
      'Z': ''
    };
    //Get substitution letters input value
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let values = letters.map(letter => document.getElementById(letter).innerHTML);
    
    //Map the value to the specific letter
    for (let i = 0; i < letters.length; i++) {
      if(values[i] === ""){
        chars[letters[i]] = letters[i]
      } else {
        chars[letters[i]] = values[i];
        chars[letters[i]] = chars[letters[i]];
      }
    }
  
    //Substitution
    let ciphertext = document.getElementById("plaintext").value.toUpperCase();
    ciphertext = ciphertext.replace(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g, m => chars[m]);
  
    // CodeProject
    document.getElementById("ciphertext").innerHTML = ciphertext;
  }
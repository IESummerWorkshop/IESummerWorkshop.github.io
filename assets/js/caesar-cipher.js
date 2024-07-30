const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const letters_value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

let shift_cipher = document.getElementById("shift-cipher");
for(let i = 0; i < 26; i++){
    let td = document.createElement("td");
    td.innerHTML = letters[i];
    td.setAttribute("id", letters[i]);
    shift_cipher.appendChild(td);

    // let option = document.createElement("option");
    // option.value = letters_value[i];
    // option.text = letters_value[i];
    // document.getElementById("select").appendChild(option);
}

const fadeIn = [
    { opacity: "0" },
    { opacity: "1" },
  ];
  
  const Timing = {
    duration: 1500,
    iterations: 1,
  };
    function update() {
    let tr = document.getElementById('shift-cipher');
    tr.animate(fadeIn, Timing);
    let shift = document.getElementById("u1").value;
    shift = Number(shift);
    for(let i = 0; i < 26; i++){
        let td = document.getElementById(letters[i]);
        if(shift < 0){
            shift = -shift;
        }
        td.innerHTML = letters[(i + shift) % 26];
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
let a = document.getElementById("plaintext-hex");
let b = document.getElementById("IV");
let c = document.getElementById("xor-value");
let d = document.getElementById("ciphertext-value");

let a2 = document.getElementById("plaintext-hex-2");
let c2 = document.getElementById("xor-value-2");
let d2 = document.getElementById("ciphertext-value-2");
let line;

let decodeInner = `
<div class="col-5">
  <div class="d-flex">
    <div class="text-center">        
      <div class="d-flex flex-column" style="margin-left: 35px;">
        <div>Ciphertext
          <div id="ciphertext-value"></div>
        </div> 

        <i class="bi bi-arrow-down display-6"></i>
        
        <div class="d-flex flex-row justify-content-center column-gap-2" style="margin-right: 80px;">
          <div class="align-self-center">Key</div>
          <i class="bi bi-arrow-right display-6"></i>
          <div class="card text-center">
            <div class="card-body">
              AES
            </div>
          </div>
          <!-- <svg style="position: absolute; bottom: 300px; left: 740px" class="overflow-visible"><g><g><path d="M 9 304 L 64 304 L 64 9 L 346.13 9" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 352.88 9 L 343.88 13.5 L 346.13 9 L 343.88 4.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/></g></g></svg> -->
        </div>

        <i class="bi bi-arrow-down display-6"></i>

        <div>
          <div id="xor-value"></div>
        </div>

        <i class="bi bi-arrow-down display-6"></i>

        <div class="d-flex flex-row justify-content-center column-gap-2" style="margin-left: -480px;">
          <div style="position: relative; bottom: 15px;">
            <div>Initialization Vector (IV)</div>
            <div id="IV"></div>
          </div>
          <i class="bi bi-arrow-right display-6"></i>
          <div class="display-6" style="position: relative; bottom: 4px;">⊕</div>
        </div>
        
        <i class="bi bi-arrow-down display-6"></i>
      </div>

      <div class="mb-3">Plaintext
        <div id="plaintext-hex"></div>
      </div>
            
    </div>
  </div>
</div>

<div class="col-5" style="padding-left: 80px;">
  <div class="d-flex">
    <div class="text-center">        
      <div class="d-flex flex-column">

        <div>Ciphertext
          <div id="ciphertext-value-2"></div>
        </div>
       
        <i class="bi bi-arrow-down display-6"></i>

        <div class="d-flex flex-row justify-content-center column-gap-2" style="margin-right: 80px;">
          <div class="align-self-center">Key</div>
          <i class="bi bi-arrow-right display-6"></i>
          <div class="card text-center">
            <div class="card-body">
              AES
            </div>
          </div>
        </div>

        <i class="bi bi-arrow-down display-6"></i>
        
        <div>
          <div id="xor-value-2"></div>
        </div>

        <i class="bi bi-arrow-down display-6"></i>

        <div class="d-flex flex-row justify-content-center column-gap-2"> 
          <div class="display-6" style="position: relative; bottom: 4px;" id="c-xor-p">⊕</div>
        </div>
        
        <i class="bi bi-arrow-down display-6"></i>
      </div>

      <div class="mb-3">Plaintext
        <div id="plaintext-hex-2"></div>
      </div>


    </div>
  </div>
</div>
</div>
`

let encodeInner = ` <div class="col-5">
<div class="d-flex">
  <div class="text-center">        
    <div class="d-flex flex-column" style="margin-left: 35px;">
      <div>Plaintext
        <div id="plaintext-hex"></div>
      </div>

      <i class="bi bi-arrow-down display-6"></i>
      
      <div class="d-flex flex-row justify-content-center column-gap-2" style="margin-left: -480px;">
        <div style="position: relative; bottom: 15px;">
          <div>Initialization Vector (IV)</div>
          <div id="IV"></div>
        </div>
        <i class="bi bi-arrow-right display-6"></i>
        <div class="display-6" style="position: relative; bottom: 4px;">⊕</div>
      </div>
      
      <i class="bi bi-arrow-down display-6"></i>

      <div>
        <div id="xor-value"></div>
      </div>

      <i class="bi bi-arrow-down display-6"></i>

      <div class="d-flex flex-row justify-content-center column-gap-2" style="margin-right: 80px;">
        <div class="align-self-center">Key</div>
        <i class="bi bi-arrow-right display-6"></i>
        <div class="card text-center">
          <div class="card-body">
            AES
          </div>
        </div>
        <!-- <svg style="position: absolute; bottom: 300px; left: 740px" class="overflow-visible"><g><g><path d="M 9 304 L 64 304 L 64 9 L 346.13 9" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 352.88 9 L 343.88 13.5 L 346.13 9 L 343.88 4.5 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/></g></g></svg> -->
      </div>
      <i class="bi bi-arrow-down display-6"></i>
    </div>

    <div class="mb-3">Ciphertext
        <div id="ciphertext-value"></div>
    </div> 
  </div>
</div>
</div>

<div class="col-5" style="padding-left: 80px;">
<div class="d-flex">
  <div class="text-center">        
    <div class="d-flex flex-column">

      <div>Plaintext
        <div id="plaintext-hex-2"></div>
      </div>

      <i class="bi bi-arrow-down display-6"></i>
      
      <div class="d-flex flex-row justify-content-center column-gap-2"> 
        <div class="display-6" style="position: relative; bottom: 4px;" id="c-xor-p">⊕</div>
      </div>
      
      <i class="bi bi-arrow-down display-6"></i>

      <div>
        <div id="xor-value-2"></div>
      </div>

      <i class="bi bi-arrow-down display-6"></i>

      <div class="d-flex flex-row justify-content-center column-gap-2" style="margin-right: 80px;">
        <div class="align-self-center">Key</div>
        <i class="bi bi-arrow-right display-6"></i>
        <div class="card text-center">
          <div class="card-body">
            AES
          </div>
        </div>
      </div>

      <i class="bi bi-arrow-down display-6"></i>
    </div>

    <div class="mb-3">Ciphertext
        <div id="ciphertext-value-2"></div>
    </div>

  </div>
</div>
</div>`;


function toggleView(mode){
  let encodeView = document.getElementById("cbc-encode");
  let decodeView = document.getElementById("cbc-decode");

  if(mode === "encode") {
    encodeView.innerHTML = encodeInner;
    decodeView.innerHTML = "";
    a = document.getElementById("plaintext-hex");
    b = document.getElementById("IV");
    c = document.getElementById("xor-value");
    d = document.getElementById("ciphertext-value");

    a2 = document.getElementById("plaintext-hex-2");
    c2 = document.getElementById("xor-value-2");
    d2 = document.getElementById("ciphertext-value-2");
    initInput();
    initLeaderline()
  } 
  if(mode === "decode") {
    encodeView.innerHTML = "";
    decodeView.innerHTML = decodeInner;
    a = document.getElementById("plaintext-hex");
    b = document.getElementById("IV");
    c = document.getElementById("xor-value");
    d = document.getElementById("ciphertext-value");

    a2 = document.getElementById("plaintext-hex-2");
    c2 = document.getElementById("xor-value-2");
    d2 = document.getElementById("ciphertext-value-2");
    initInput();
    initLeaderline()
  }
}

window.onload = () => {
  let start = document.getElementById("ciphertext-value");
  let end = document.getElementById("c-xor-p");
  line = new LeaderLine(start, end, 
  {
    path: "grid", 
    endSocket:"left", 
    startSocketGravity: [180, -172],
    endSocketGravity: [-250, -172],
    size: 3,
    color: 'black'
  });
};

function initLeaderline(){
  line.remove()
  let start = document.getElementById("ciphertext-value");
  let end = document.getElementById("c-xor-p");
  line = new LeaderLine(start, end, 
  {
    path: "grid", 
    endSocket:"left", 
    startSocketGravity: [180, -172],
    endSocketGravity: [-250, -172],
    size: 3,
    color: 'black'
  });
}

function emptyInput(x){
  for(let i = 0; i < 16; i++){
    let input = document.createElement("input");
    input.className = "text-center"
    input.setAttribute("maxlength", "2");
    input.setAttribute("disabled" ,"");
    input.setAttribute("size", "1");
    input.classList.add("fw-bold");
    x.appendChild(input);
  }
}

function initInput(){
  emptyInput(a);
  emptyInput(b);
  emptyInput(c);
  emptyInput(d);

  emptyInput(a2);
  emptyInput(c2);
  emptyInput(d2);
}

(() => {
    /*
    Store the calculated ciphertext and IV here, so we can decrypt the message later.
    */
    let ciphertext;
    let plaintext_hex = [];
    let iv;

    initInput()

    function padding(input){
      let block_size = 16;
      let pad = block_size - input.length % block_size;
      pad = pad.toString(16).padStart(2, "0");
      console.log("padding: " + pad); 
      return pad;
    }

    function u8arraytohex(data){
        let hex = Array.from(data).map((x) => x.toString(16).padStart(2, "0")).join("");
        return Array.from(data).map((x) => x.toString(16).padStart(2, "0")).join("");
    }

    function splithex(hex){
        let result = hex.match(/.{1,2}/g) || [];
        return result;
    }

    function xor_hex_arr(h1, h2){
      let xor_arr = [];
      let xor_output = document.getElementById("xor-value");
      xor_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        xor_arr[i] = (parseInt(h1[i], 16) ^ parseInt(h2[i], 16)).toString(16);
        if(xor_arr[i].length < 2){
          xor_arr[i] = xor_arr[i].padStart(2, '0')
        }
        let input = document.createElement("input");
        input.value = xor_arr[i];
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        input.classList.add("fade-in-plaintext");
        xor_output.appendChild(input);
      }
    }

    function xor_hex_arr_2(h1, h2){
      let xor_arr = [];
      let xor_output = document.getElementById("xor-value-2");
      xor_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        xor_arr[i] = (parseInt(h1[i], 16) ^ parseInt(h2[i], 16)).toString(16);
        if(xor_arr[i].length < 2){
          xor_arr[i] = xor_arr[i].padStart(2, '0')
        }
        let input = document.createElement("input");
        input.value = xor_arr[i];
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        input.classList.add("fade-in-plaintext");
        xor_output.appendChild(input);
      }
    }

    /*
    Fetch the contents of the "message" textbox, and encode it
    in a form we can use for the encrypt operation.
    */
    function getMessageEncoding() {
      const messageBox = document.getElementById("aes-cbc-message");
      let message = messageBox.value;
      let enc = new TextEncoder();
      let encoded_message = enc.encode(message);
      let hex_str = u8arraytohex(encoded_message);
      let hex_arr = splithex(hex_str);

      let iv_str = u8arraytohex(iv);
      let iv_arr = splithex(iv_str);

      let p = padding(hex_arr);

      let plaintext_output = document.getElementById("plaintext-hex");
      //plaintext_output.innerHTML = u8arraytohex(enc.encode(message));
      plaintext_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        let input = document.createElement("input");
        input.value = hex_arr[i];
        if(i >= hex_arr.length){
            hex_arr[i] = p;
            input.value = p;
        }
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        plaintext_output.appendChild(input);
      }
      if(hex_arr.length > 16){
        let plaintext_output_2 = document.getElementById("plaintext-hex-2");
        plaintext_hex = [];
        plaintext_output_2.innerHTML = "";
        for(let i = 16; i < 32; i++){
          let input = document.createElement("input");
          input.value = hex_arr[i];
          if(i >= hex_arr.length){
              hex_arr[i] = p;
              input.value = p;
          }
          plaintext_hex.push(hex_arr[i]);
          console.log("p2:"+plaintext_hex)
          input.className = "text-center"
          input.setAttribute("maxlength", "2");
          input.setAttribute("disabled" ,"");
          input.setAttribute("size", "1");
          input.classList.add("fw-bold");
          plaintext_output_2.appendChild(input);
        }
      } else {
        a2.innerHTML = "";
        emptyInput(a2);    
      }
      xor_hex_arr(hex_arr, iv_arr);
      console.log("Plaintext Hex: " + hex_str);
      return encoded_message;
    }
    
    /*
    Get the encoded message, encrypt it and display a representation
    of the ciphertext in the "Ciphertext" element.
    */
    async function encryptMessage(key) {
      // The iv must never be reused with a given key.
      iv = window.crypto.getRandomValues(new Uint8Array(16));
      let encoded = getMessageEncoding();
      ciphertext = await window.crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv
        },
        key,
        encoded
      );
      //const ciphertextValue = document.getElementById("ciphertext-value");
      let cipher;
      if(ciphertext.byteLength > 16){
        cipher = new Uint8Array(ciphertext, 0, 32);
      } else {
        cipher = new Uint8Array(ciphertext, 0, 16);
      }
      
      let hex_str = u8arraytohex(cipher);
      console.log(cipher)
      console.log(new TextDecoder().decode(cipher));
      let hex_arr = splithex(hex_str);

      let iv_str = u8arraytohex(iv);
      let iv_arr = splithex(iv_str);

      let IV_output = document.getElementById("IV");
      IV_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        let input = document.createElement("input");
        input.value = iv_arr[i];
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        input.classList.add("fade-in");
        IV_output.appendChild(input);
      }

      let ciphertext_output = document.getElementById("ciphertext-value");
      ciphertext_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        let input = document.createElement("input");
        input.value = hex_arr[i];
        if(i >= hex_arr.length){
            input.value = '09';
        }
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        ciphertext_output.appendChild(input);
      }
      console.log("cipher: " + hex_str)
      if(ciphertext.byteLength > 16){
        xor_hex_arr_2(plaintext_hex, hex_arr);

        let ciphertext_output = document.getElementById("ciphertext-value-2");
        ciphertext_output.innerHTML = "";
        for(let i = 16; i < 32; i++){
          let input = document.createElement("input");
          input.value = hex_arr[i];
          if(i >= hex_arr.length){
              input.value = '09';
          }
          input.className = "text-center"
          input.setAttribute("maxlength", "2");
          input.setAttribute("disabled" ,"");
          input.setAttribute("size", "1");
          input.classList.add("fw-bold");
          ciphertext_output.appendChild(input);
        }
      } else {
        c2.innerHTML = "";
        d2.innerHTML = "";
        emptyInput(c2);
        emptyInput(d2);
      }

      
    }
  
    /*
    Fetch the ciphertext and decrypt it.
    Write the decrypted message into the "Decrypted" box.
    */
    async function decryptMessage(key) {
      let decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv
        },
        key,
        ciphertext
      );
  
      let dec = new TextDecoder();
      const decryptedValue = document.getElementById("decrypted-value");
      decryptedValue.value = dec.decode(decrypted);
      console.log(decrypted)
    }
  
    async function exportCryptoKey(key) {
        const exported = await window.crypto.subtle.exportKey(
          "raw",
          key
        );
        let key_output = document.getElementById("exported-key");
        let k = new Uint8Array(exported);
        let hex_str = u8arraytohex(k);
        let hex_arr = splithex(hex_str);
        console.log("key:"+hex_str)

        key_output.innerHTML = "";
        for(let i = 0; i < 16; i++){
          let input = document.createElement("input");
          input.value = hex_arr[i];
          if(i >= hex_arr.length){
              input.value = '09';
          }
          input.className = "text-center"
          input.setAttribute("maxlength", "2");
          input.setAttribute("disabled" ,"");
          input.setAttribute("size", "1");
          //input.className = "p-1 border border-1 border-black fw-bold";
          key_output.appendChild(input);
        }
    }

    /*
    Generate an encryption key, then set up event listeners
    on the "Encrypt" and "Decrypt" buttons.
    */
    window.crypto.subtle.generateKey(
      {
          name: "AES-CBC",
          length: 128
      },
      true,
      ["encrypt", "decrypt"]
    ).then((key) => {
      const encryptButton = document.getElementById("encrypt-button");
      encryptButton.addEventListener("click", () => {
        encryptMessage(key);
        exportCryptoKey(key)
        console.log(key);
        console.log("iv" +  u8arraytohex(iv));
      });
  
      const decryptButton = document.getElementById("decrypt-button");
      decryptButton.addEventListener("click", () => {
        decryptMessage(key);
      });

      /*const exportButton = document.getElementById("export-key-button");
      exportButton.addEventListener("click", () => {
        exportCryptoKey(key);
      });
      */
    });

  })();
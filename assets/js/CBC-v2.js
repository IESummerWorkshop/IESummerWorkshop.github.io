
(() => {
    /*
    Store the calculated ciphertext and IV here, so we can decrypt the message later.
    */
    let ciphertext;
    let iv;
    
    let a = document.getElementById("plaintext-hex");
    let b = document.getElementById("IV");
    let c = document.getElementById("xor-value");
    let d = document.getElementById("ciphertext-value");

    let a2 = document.getElementById("plaintext-hex-2");
    let c2 = document.getElementById("xor-value-2");
    let d2 = document.getElementById("ciphertext-value-2");

    function emptyInput(x){
        let input = document.createElement("input");
        input.className = "text-center"
        input.setAttribute("maxlength", "42");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "42");
        input.classList.add("fw-bold");
        x.appendChild(input);
    }
    emptyInput(a);
    emptyInput(b);
    emptyInput(c);
    emptyInput(d);

    emptyInput(a2);
    emptyInput(c2);
    emptyInput(d2);

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
      }
      let input = document.createElement("input");
      input.value = xor_arr.toString().replace(/,/g, " ");
      input.className = "text-center"
      input.setAttribute("maxlength", "42");
      input.setAttribute("disabled" ,"");
      input.setAttribute("size", "42");
      input.classList.add("fw-bold");
      input.classList.add("fade-in-plaintext");
      xor_output.appendChild(input);
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
      plaintext_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        if(i >= hex_arr.length){
            hex_arr[i] = p;
        }
      }
      let input = document.createElement("input");
      input.value = hex_arr.toString().replace(/,/g, " ");
      input.className = "text-center"
      input.setAttribute("maxlength", "42");
      input.setAttribute("disabled" ,"");
      input.setAttribute("size", "42");
      input.classList.add("fw-bold");
      plaintext_output.appendChild(input);

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
      let cipher = new Uint8Array(ciphertext, 0, 16);
      
      let hex_str = u8arraytohex(cipher);
      console.log(cipher)
      console.log(new TextDecoder().decode(cipher));
      let hex_arr = splithex(hex_str);

      let iv_str = u8arraytohex(iv);
      let iv_arr = splithex(iv_str);

      let IV_output = document.getElementById("IV");
      IV_output.innerHTML = "";

      let input = document.createElement("input");
      input.value = iv_arr.toString().replace(/,/g, " ");
      input.className = "text-center"
      input.setAttribute("maxlength", "42");
      input.setAttribute("disabled" ,"");
      input.setAttribute("size", "42");
      input.classList.add("fw-bold");
      input.classList.add("fade-in");
      IV_output.appendChild(input);

      let ciphertext_output = document.getElementById("ciphertext-value");
      ciphertext_output.innerHTML = "";
        let input1 = document.createElement("input");
        input1.value = hex_arr.toString().replace(/,/g, " ");
        input1.className = "text-center"
        input1.setAttribute("maxlength", "42");
        input1.setAttribute("disabled" ,"");
        input1.setAttribute("size", "42");
        input1.classList.add("fw-bold");
        ciphertext_output.appendChild(input1);
      console.log("cipher: " + hex_str)
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
        console.log(hex_str)

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
        console.log(key);
        console.log("iv" +  u8arraytohex(iv));
      });
  
      const decryptButton = document.getElementById("decrypt-button");
      decryptButton.addEventListener("click", () => {
        decryptMessage(key);
      });

      const exportButton = document.getElementById("export-key-button");
      exportButton.addEventListener("click", () => {
        exportCryptoKey(key);
      });

    });
  
  })();
    let ciphertext = window.crypto.getRandomValues(new Uint8Array(16));
    let iv = window.crypto.getRandomValues(new Uint8Array(16));
    let decrypted_arr = [];
    let padding_valid_text = document.getElementById("padding-check");

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    document.getElementById("xor-value-blur").onclick = function(){
      document.getElementById("xor-value-blur").classList.toggle("bg-dark-subtle");
    }

    document.getElementById("plaintext-blur").onclick = function(){
      document.getElementById("plaintext-blur").classList.toggle("bg-dark-subtle");
    }

  /*
  //Initialize for empty input blocks
    let a = document.getElementById("plaintext-hex");
    let b = document.getElementById("IV");
    let c = document.getElementById("xor-value");
    let d = document.getElementById("ciphertext-value");

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
  */

    plaintext_generate();
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
      for(let i = 0; i < 16; i++){
        xor_arr[i] = (parseInt(h1[i], 16) ^ parseInt(h2[i], 16)).toString(16);
        if(xor_arr[i].length < 2){
          xor_arr[i] = xor_arr[i].padStart(2, '0')
        }
      }
      return xor_arr;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let iv_input = document.querySelectorAll("#IV >  input");
    let plaintext_input = document.querySelectorAll("#plaintext-hex >  input");
    let decrypted_value_input = document.querySelectorAll("#xor-value >  input");
    function update_plaintext(i){
       // let iv_hex = read_input(iv_input);
        //console.log(iv_hex);
        //iv_hex = splithex(iv_hex);
        let regexp = /[0-9a-f]{2}/g;
        if (regexp.test(iv_input[i].value)) {
            console.log(iv_input[i].value);
            let x = (parseInt(iv_input[i].value, 16) ^ parseInt(decrypted_arr[i], 16)).toString(16);
            if(x.length < 2){
              x = x.padStart(2, '0')
            }
            console.log(x);
            plaintext_input[i].value = x;
            check();
        }
    }

    //Padding Validation
    let padding_check = []
    for (let i = 0; i < 16; i++) {
      padding_check[i] = (i+1).toString(16).padStart(2, '0');
    }
    console.log("padding check: " + padding_check)
    check()
    function check() {
      let count = 0;
      let pad_check = 0;
      if(padding_check.includes(plaintext_input[15].value)){
        pad_check = padding_check.indexOf(plaintext_input[15].value);
        for(let i = 0; i < (pad_check+1); i++){
          if(plaintext_input[15-i].value === padding_check[pad_check]){
            count++;
          }
        }
        if(count === (pad_check + 1)){
            //console.log("valid");
            padding_valid_text.innerHTML = "Valid Padding";
            padding_valid_text.classList.remove('text-danger');
            padding_valid_text.classList.add('text-success');
            return true;
        } else {
          //console.log("invalid");
          padding_valid_text.innerHTML = "Invalid Padding";
          padding_valid_text.classList.remove('text-success');
          padding_valid_text.classList.add('text-danger');
          return false;
        }
      } else {
        //console.log("invalid");
        padding_valid_text.innerHTML = "Invalid Padding";
        padding_valid_text.classList.remove('text-success');
        padding_valid_text.classList.add('text-danger');
        return false;
      }
    }

    function plaintext_generate() {
      let plaintext_rand = window.crypto.getRandomValues(new Uint8Array(getRandomInt(9, 14)));
      let plaintext_hex_str = u8arraytohex(plaintext_rand)
      let plaintext_hex_arr = splithex(plaintext_hex_str);

      let iv_str = u8arraytohex(iv);
      let iv_arr = splithex(iv_str);

      let hex_str = u8arraytohex(ciphertext);
      let hex_arr = splithex(hex_str);

      let p = padding(plaintext_hex_arr);

      //Initialize plaintext
      let plaintext_output = document.getElementById("plaintext-hex");
      plaintext_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        let input = document.createElement("input");
        input.value = plaintext_hex_arr[i];
        if(i >= plaintext_hex_arr.length){
            plaintext_hex_arr[i] = p;
            input.value = p;
        }
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        plaintext_output.appendChild(input);
      }

      //Initialize decrypted cipher text
      decrypted_arr = xor_hex_arr(plaintext_hex_arr, iv_arr);
      let xor_output = document.getElementById("xor-value");
      xor_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        let input = document.createElement("input");
        input.value = decrypted_arr[i];
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        input.classList.add("fade-in-plaintext");
        xor_output.appendChild(input);
      }

      //Initialize IV
      let IV_output = document.getElementById("IV");
      IV_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        let input = document.createElement("input");
        input.value = iv_arr[i];
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        //input.setAttribute("disabled" ,"");
        input.setAttribute("oninput" , `update_plaintext(${i})`);
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        input.classList.add("fade-in");
        IV_output.appendChild(input);
      }

      //Initialize cipher text
      let ciphertext_output = document.getElementById("ciphertext-value");
      ciphertext_output.innerHTML = "";
      for(let i = 0; i < 16; i++){
        let input = document.createElement("input");
        input.value = hex_arr[i];
        input.className = "text-center"
        input.setAttribute("maxlength", "2");
        input.setAttribute("disabled" ,"");
        input.setAttribute("size", "1");
        input.classList.add("fw-bold");
        ciphertext_output.appendChild(input);
      }
      console.log("Plaintext Hex: " + hex_arr);
    }

    /* 
    //Brute force to get the decrypted cipher text
    let brute_force = [];
    function bruteforce_step(){
      for(let i = 0; i < 16; i++){
          for(let j = 0; j < 255; j++){     
              let sub = j.toString(16).padStart(2, "0");
              iv_input[15-i].value = sub;   
              update_plaintext(15-i);
              if(plaintext_input[15-i].value === padding_check[i]){
                changeBefore(15-i, padding_check[i]);
                brute_force[i] = (parseInt(iv_input[15-i].value, 16) ^ parseInt(plaintext_input[15-i].value, 16)).toString(16).padStart(2,"0");
                break;
              }
          }  
      }
      console.log("Brute force:" + brute_force.reverse());
    }

    function changeBefore(x, pad){
      for(let i = 1; i < Number("0x"+pad); i++){
        plaintext_input[x+i].value = (parseInt(brute_force[Number("0x"+pad)], 16) ^ parseInt(pad, 16)).toString(16).padStart(2, "0");
        iv_input[x+Number("0x"+pad)-i].value = (parseInt(brute_force[i-1], 16) ^ parseInt(pad, 16)).toString(16).padStart(2, "0");
      }
    }
    */

    function changeBefore(pad){
      for(let i = 1; i < pad; i++){
        plaintext_input[16-i].value = pad.toString(16).padStart(2, "0");
        iv_input[16-i].value = (parseInt(decrypted_value_input[16-i].value, 16) ^ pad).toString(16).padStart(2, "0");
      }
    }

    //This display the step for each padding from 01 to 10 without all steps.
    //j starts from 0; padding_selected stars from 1;
    const all_step_button = document.getElementById("all-step");
    function autoStep_v3(j, padding_selected){
      all_step_button.disabled = true;
      single_step_button.disabled = true;
      if(j < 16){
        step_v3(j, padding_selected);
        changeBefore(j, padding_selected)
      } else {
        changeBefore(j, padding_selected)
        all_step_button.disabled = false;
        single_step_button.disabled = false;
        return;
      }
    }

    function step_v3(j, padding_selected){
      let i = 0;
      let step = setInterval(() => {
        let sub = i.toString(16).padStart(2, "0");
        iv_input[15-j].value = sub;
        update_plaintext(15-j);        
        if (plaintext_input[15-j].value === padding_check[padding_selected-1]) {
          clearInterval(step);
          j = j + 1;
          padding_selected = padding_selected + 1;
          autoStep_v3(j, padding_selected);
        }
        i++;
      }, 10);
    }

    //This display the step for each padding from 01 to 10 with all steps.
    //autoStep works with step_by_step_v2 and step_v2
    //x starts from 1
    function autoStep(x){
      if(x <= 16){
        step_by_step_v2(0, x);
      } else {
        return;
      }
    }

    function step_by_step_v2(j, padding_selected){
      if(j <= padding_selected-1){
        step_v2(j, padding_selected);
      } else {
        padding_selected = padding_selected+1;
        autoStep(padding_selected);
      }
    }

    function step_v2(j, padding_selected){
      let i = 0;
      let step = setInterval(() => {
        let sub = i.toString(16).padStart(2, "0");
        iv_input[15-j].value = sub;
        update_plaintext(15-j);        
        if (plaintext_input[15-j].value === padding_check[padding_selected-1]) {
          clearInterval(step);
          j = j + 1;
          step_by_step_v2(j, padding_selected);
        }
        i++;
      }, 10);
    }

    //j starts with 0
    //Show how padding oracle works with selected padding target
    const single_step_button = document.getElementById("single-step");
    function step_by_step(j){
      let padding_selected = document.getElementById("select-padding").value;
      all_step_button.disabled = true;
      single_step_button.disabled = true;
      if(j <= padding_selected-1){
        step(j, padding_selected);
      } else {
        all_step_button.disabled = false;
        single_step_button.disabled = false;
        return;
      }
    }

    function step(j, padding_selected){
      let i = 0;
      let step = setInterval(() => {
        let sub = i.toString(16).padStart(2, "0");
        iv_input[15-j].value = sub;
        update_plaintext(15-j);        
        if (plaintext_input[15-j].value === padding_check[padding_selected-1]) {
          clearInterval(step);
          j = j + 1;
          step_by_step(j);
        }
        i++;
      }, 10);
    }

    //For dynamic display of the button
    function step_mode(){
      if(document.getElementById("step-mode").checked ){
          document.getElementById("step-mode-checked").classList.remove("d-none");
          document.getElementById("step-mode-checked").className = "d-block";

          document.getElementById("all-step-mode").classList.remove("d-block");
          document.getElementById("all-step-mode").className = "d-none";
      }
      if(!document.getElementById("step-mode").checked ){
          document.getElementById("step-mode-checked").classList.remove("d-block");
          document.getElementById("step-mode-checked").className = "d-none";

          document.getElementById("all-step-mode").classList.remove("d-none");
          document.getElementById("all-step-mode").className = "d-block";
      }
    }
    
    


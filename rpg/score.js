const signUpUrl = "https://script.google.com/macros/s/AKfycbwJuRDNBwsjcZRXzUu1tDRlE5c8YksDybsCQ8XJUukMyQyTfsVi2TAwAYw4p39Pr2sAbQ/exec";
const updateQuestionUrl = "https://script.google.com/macros/s/AKfycbxknAniEzNM8s7goWYALZ2Bkz9HQnsZioegHd6EaBu1qKFN_5igmGC7LhpxkRNugnQe/exec";
const retrieveKeyUrl = "https://script.google.com/macros/s/AKfycbxSpk5gu95zjfMC8POUjtDflOSQ4jwoR-U7UKuk_j5JPSiZD_Fr_PTMiQSkXGWpT0bb7g/exec";
function addUserRecord(email, name) {
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // // myHeaders.append("Access-Control-Allow-Origin", "https://script.google.com")

    // let init = [email, name];
    // init = init.concat(new Array(noOfQuestion).fill(false));

    // const raw = JSON.stringify({
    //     "values": [
    //         init
    //     ]
    // });

    // const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow",
    //     mode: "no-cors"
    // };

    // fetch(signUpUrl, requestOptions)
    //     .then((response) => console.log(response))
    //     .then((result) => {
    //         console.log(result);
    //         return;
    //     })
    //     .catch((error) => console.error(error));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
    "values": [
        [
        email,
        name
        ]
    ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        mode: "no-cors"
    };

    fetch(signUpUrl, requestOptions)
        .then((response) => response.text())
        .then((result) => {return result})
        .catch((error) => console.error(error));
}

function updateQuestionStatus(email, questionNo, answer){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "values": [
        [
          email,
          questionNo,
          answer
        ]
      ]
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      mode: "no-cors"
    };
    
    fetch("https://script.google.com/macros/s/AKfycbxknAniEzNM8s7goWYALZ2Bkz9HQnsZioegHd6EaBu1qKFN_5igmGC7LhpxkRNugnQe/exec", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}
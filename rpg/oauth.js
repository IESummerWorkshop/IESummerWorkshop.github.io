/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
let accessToken = "";

// TODO: create random states
const state = "pass-through"
function oauthSignUp() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '659573878697-obrunqprrhi3nj22as3sq49g1j8o4d8o.apps.googleusercontent.com',
                //   'redirect_uri': 'http://127.0.0.1:8082/rpg/page.html',
                'redirect_uri': 'http://127.0.0.1:8082/oauth.html',
                  'response_type': 'token',
                  'scope': 'email profile',
                  'include_granted_scopes': 'true',
                  'state': state
				};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

function setup(){
	try{
		const url = window.location.href;
		const params = url.split("#").pop().split('&');

		const returnState = params[0].split('=').pop();
		const accessToken = params[1].split('=').pop();
		
		if(returnState != state){
			console.log(state, return_state)
			throw "invalid state";
		}
		else if(accessToken == null){
			throw "Not signed up";
		}
		else{
			let urlParam = new URLSearchParams({
				alt: "json"
			})
			let userinfoEndpoint = "https://www.googleapis.com/auth/userinfo.profile?"+urlParam.toString();
			const response = fetch(userinfoEndpoint, {
				method: "GET",
				mode: 'no-cors'
			})
			.then((response) => {
				console.log(response)
				console.log(accessToken);
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}
	catch(err){
		if (err.message == "Cannot read properties of undefined (reading 'split')"){
			console.log("Not signed up by Google");
		}
	}
}


//Dialog Polyfill
dialogPolyfill.registerDialog(document.getElementById("sign-status-modal"));
//End

//Sign In Function
const signin=()=>{
    const usernameValue = document.getElementById('username').value;
    const passwordValue = document.getElementById('password').value;
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", usernameValue);
    urlencoded.append("password", passwordValue);
    callFetch("signin",urlencoded);
}

//Sign Up Function
const signup=()=>{
  const usernameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  const signButton = document.getElementById("sign-button");
  const confirmPasswordValue = document.getElementById('confirmpassword').value;
  
  if(passwordValue === confirmPasswordValue && usernameValue && usernameValue.trim() !== "" )
  {
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username.value);
    urlencoded.append("password", password.value);
    callFetch("signup",urlencoded);
  }
  else
  {
    disableButton(signButton);
    const errorMsg = passwordValue !== confirmPasswordValue ? "Passwords don't match": "Username is invalid";
    showError(errorMsg,"error-wrapper","error-text");
  }
}

///Function call on Username input tag focusout
const usernameOnFocusout = ()=>{ 
  const usernameValue = document.getElementById('username').value;
  const signButton = document.getElementById("sign-button");
  if(usernameValue && usernameValue.trim() !== "")
    hideError("error-wrapper");
  else
  {
    disableButton(signButton);
    showError("Username is invalid","error-wrapper","error-text");
  }
}

//Function call on Password input tag focusout
const passwordOnFocusout = (process)=>{ 
  const passwordValue = document.getElementById('password').value;
  const signButton = document.getElementById("sign-button");
  if(passwordValue.length >= 4)
  {
    hideError("error-wrapper");
    if(process === "signin")
      enableButton(signButton);
  }
  else
  {
    disableButton(signButton);
    showError("Password has to be more than 3 characters","error-wrapper","error-text");
  }
}

//Function call on Confirm Password input tag focusout
const confirmPasswordOnFocusout = ()=>{
  const password = document.getElementById('password');
  const signButton = document.getElementById("sign-button");
  const confirmPassword = document.getElementById('confirmpassword');
  if(password.value === confirmPassword.value)
    enableButton(signButton);
  else
  {
    disableButton(signButton);
    showError("Passwords do not match","error-wrapper","error-text");
  }
}

//Function to enable CTA button
const enableButton = (DOMelement)=>{
  DOMelement.disabled = false;
  DOMelement.classList.remove("cursor-not-allowed");
  DOMelement.classList.add("cursor-pointer");
  DOMelement.classList.remove("opacity-50");
  DOMelement.classList.add("opacity-100");
}

//Function to disable CTA button
const disableButton = (DOMelement)=>{
  DOMelement.disabled = true;
  DOMelement.classList.add("cursor-not-allowed");
  DOMelement.classList.remove("cursor-pointer");
  DOMelement.classList.add("opacity-50");
  DOMelement.classList.remove("opacity-100");
}

//Function to show error
const showError = (errorText,wrapperID,textID)=>{
  const wrapperElement = document.getElementById(wrapperID);
  const textElement = document.getElementById(textID);
  wrapperElement.classList.remove("hidden");
  textElement.innerHTML = errorText;
}

//Function to hide error
const hideError = (wrapperID)=>{
  const wrapperElement = document.getElementById(wrapperID);
  wrapperElement.classList.add("hidden");
}

//Fetch helper function 
const callFetch=(process,urlencoded)=>{

  document.getElementById("sign-status-modal").showModal();
  postData("https://sidie.herokuapp.com/"+process,urlencoded)
    .then(data=>{
      console.log(data);
      if(data.token)
      {
        document.getElementById("loading-icon").classList.add("p-2","rounded-full","border-2","border-green-500");
        document.getElementById("loading-icon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48bb78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        document.getElementById("loading-text").innerHTML = `Successfully signed in!`;
        document.cookie = "token="+data.token;
        setTimeout(()=>{
          window.location = '../home.html';
        },2000);
        
      }
      else if(data.error === "Authentication Error")
      {
        document.getElementById("loading-icon").classList.add("p-2","rounded-full","border-2","border-red-500");
        document.getElementById("loading-icon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
        document.getElementById("loading-text").innerHTML = `Issue with the details please try again!`;
        setTimeout(()=>{
          document.getElementById("signup-status-modal").showModal();
        },2000);
        showError("Incorrect Username / Password","error-wrapper","error-text");
      }
      else if(data.status === 409 || data.status === 500)
      {
        document.getElementById("loading-icon").classList.add("p-2","rounded-full","border-2","border-red-500");
        document.getElementById("loading-icon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
        document.getElementById("loading-text").innerHTML = `Issue with the details please try again!`;
        setTimeout(()=>{
          document.getElementById("signup-status-modal").showModal();
        },2000);
        showError("Username already exists","error-wrapper","error-text");
      }
      else if(data.status === 201)
      {
        document.getElementById("loading-icon").classList.add("p-2","rounded-full","border-2","border-green-500");
        document.getElementById("loading-icon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48bb78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        document.getElementById("loading-text").innerHTML = `Successfully created your account!`;
        setTimeout(()=>{
          window.location = '../signin.html';
        },3500);
        
      }
    })
    .catch(err=>{
      console.log(err);
    });
}

//Async Post Fetch call
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: data 
  });
  return response.json(); 
}
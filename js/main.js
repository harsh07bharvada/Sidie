
//Sign In Function
const signin=()=>{
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username.value);
    urlencoded.append("password", password.value);
    callFetch("signin",urlencoded);
}

//Sign Up Function
const signup=()=>{
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmpassword');
  const usernameValue = username.value;
  if(password.value === confirmPassword.value && usernameValue && usernameValue.trim() !== "" )
  {
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username.value);
    urlencoded.append("password", password.value);
    callFetch("signup",urlencoded);
  }
  else
  {
    const errorMsg = password.value !== confirmPassword.value ? "Passwords don't match": "Username is invalid";
   
    document.getElementById("sign-button").disabled = true;
    document.getElementById("sign-button").classList.add("cursor-not-allowed");
    document.getElementById("sign-button").classList.remove("cursor-pointer");
    document.getElementById("sign-button").classList.add("opacity-50");
    document.getElementById("sign-button").classList.remove("opacity-100");
    showError(errorMsg,"error-wrapper","error-text");
  }
}

//Username focusout
const usernameOnFocusout = ()=>{ 
  const usernameValue = document.getElementById('username').value;
  
  if(usernameValue && usernameValue.trim() !== "")
  {
    hideError("error-wrapper");
  }
  else
  {
    document.getElementById("sign-button").disabled = true;
    document.getElementById("sign-button").classList.add("cursor-not-allowed");
    document.getElementById("sign-button").classList.remove("cursor-pointer");
    document.getElementById("sign-button").classList.add("opacity-50");
    document.getElementById("sign-button").classList.remove("opacity-100");
    showError("Username is invalid","error-wrapper","error-text");
  }
}

//Password focusout
const passwordOnFocusout = (process)=>{ 
  const passwordValue = document.getElementById('password').value;
  
  if(passwordValue.length >= 4)
  {
    hideError("error-wrapper");
    if(process === "signin")
    {
      document.getElementById("sign-button").disabled = false;
      document.getElementById("sign-button").classList.remove("cursor-not-allowed");
      document.getElementById("sign-button").classList.add("cursor-pointer");
      document.getElementById("sign-button").classList.remove("opacity-50");
      document.getElementById("sign-button").classList.add("opacity-100");
    }
  }
  else
  {
    document.getElementById("sign-button").disabled = true;
    document.getElementById("sign-button").classList.add("cursor-not-allowed");
    document.getElementById("sign-button").classList.remove("cursor-pointer");
    document.getElementById("sign-button").classList.add("opacity-50");
    document.getElementById("sign-button").classList.remove("opacity-100");
    showError("Password has to be more than 3 characters","error-wrapper","error-text");
  }
}

const confirmPasswordOnFocusout = ()=>{
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmpassword');
  if(password.value === confirmPassword.value)
  {
    document.getElementById("sign-button").disabled = false;
    document.getElementById("sign-button").classList.remove("cursor-not-allowed");
    document.getElementById("sign-button").classList.add("cursor-pointer");
    document.getElementById("sign-button").classList.remove("opacity-50");
    document.getElementById("sign-button").classList.add("opacity-100");
  }
  else
  {
    document.getElementById("sign-button").disabled = true;
    document.getElementById("sign-button").classList.add("cursor-not-allowed");
    document.getElementById("sign-button").classList.remove("cursor-pointer");
    document.getElementById("sign-button").classList.add("opacity-50");
    document.getElementById("sign-button").classList.remove("opacity-100");
    showError("Passwords do not match","error-wrapper","error-text");
  }
}

const showError = (errorText,wrapperID,textID)=>{
  const wrapperElement = document.getElementById(wrapperID);
  const textElement = document.getElementById(textID);
  wrapperElement.classList.remove("hidden");
  textElement.innerHTML = errorText;
}

const hideError = (wrapperID)=>{
  const wrapperElement = document.getElementById(wrapperID);
  wrapperElement.classList.add("hidden");
  
}

//Fetch helper function 
const callFetch=(process,urlencoded)=>{

  postData("https://sidie.herokuapp.com/"+process,urlencoded)
    .then(data=>{
      console.log(data);
      if(data.token)
      {
        document.cookie = "token="+data.token;
        window.location = '../home.html';
      }
      else if(data.error === "Authentication Error")
      {
        showError("Incorrect Username / Password","error-wrapper","error-text");
      }
      else if(data.status === 409 || data.status === 500)
      {
        showError("Username already exists","error-wrapper","error-text");
      }
      else if(data.status === 201)
      {
        window.location = '../signin.html';
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
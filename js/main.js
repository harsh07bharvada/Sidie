
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
  if(password.value === confirmPassword.value)
  {
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username.value);
    urlencoded.append("password", password.value);
    callFetch("signup",urlencoded);
  }
  else
  {
    showError();
  }
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
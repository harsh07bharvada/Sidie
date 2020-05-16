const signin=()=>{
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", "sunny");
    urlencoded.append("password", "pass");

    postData("https://sidie.herokuapp.com/signin",urlencoded)
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
const signup=()=>{
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  const options = {
      method: "POST",
      body: formData,
    };

  fetch("https://sidie.herokuapp.com/signup", options)
    .then((res) => res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
}



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
const signin=()=>{
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);
    postData('https://sidie.herokuapp.com/signin', formData)
    .then(data => {
        console.log(data); 
        
    })
    .catch(err=>{
        console.log(err);
    });
}

async function postData(url = '', data = {}) {
    
    const response = await fetch(url, {
      method: 'POST', 
      body: data
    });
    return response.json(); 
}
const signin=()=>{
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let formData = new FormData();
    formData.append("username", username.value);
    formData.append("password", password.value);
    const options = {
        method: "POST",
        body: formData,
      };

    fetch("https://sidie.herokuapp.com/signin", options)
      .then((res) => res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err));
}


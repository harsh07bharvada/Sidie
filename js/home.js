window.onload = loadingData();


const loadingData = ()=>{

    const result = getData('https://sidie.herokuapp.com/getProjects');
    console.log(`Result : ${result}`);

}

const signout = ()=>{

    const result = getData('https://sidie.herokuapp.com/signout');
    console.log(`Result : ${result}`);
    window.location = '/'
    
}

async function getData(url = '') {
    
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer'
    });
    return response.json(); 
}
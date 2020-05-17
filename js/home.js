window.onload = (event) => {
  console.log('page is fully loaded');
  loadingData();
};
dialogPolyfill.registerDialog(document.getElementById("createModal"));
dialogPolyfill.registerDialog(document.getElementById("editModal"));


const loadingData = ()=>{

    getData('https://sidie.herokuapp.com/getProjects')
    .then(data=>{
      if(data.status == 401)
      {
        window.location = '/';
      }
      else
      {
        console.log(data);
        populatePage(data);
      }
    });
    

}
const populatePage = (data)=>{
  let i = 0;
  const {username,result} = data;
  const usernameField = document.getElementById('username');
  let mainSection = document.getElementById('cardSection');
  usernameField.innerHTML = username;
  result.forEach(project => {
    addCard(project);
    
  });
}

const signout = ()=>{

    const result = getData('https://sidie.herokuapp.com/signout');
    console.log(`Result : ${result}`);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = '/'
    
}

async function getData(url = '') {
    
    const response = await fetch(url, {
      method: 'GET', 
      mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Authorization':"Bearer "+document.cookie.split("=")[1]
      }
    });
    return response.json(); 
}


const addCard = ({_id,name,description,status,link})=>{

    let statusStr = status;
    let mainSection = document.getElementById('cardSection');
    statusStr = status == "inprogress" ? "In Progress" : "Completed";
  
    let htmlToBeAdded = `<!-- Card -->
    <div class="flex w-full md:w-1/3  h-auto p-3">
      <div class="flex flex-col bg-white w-full  h-auto rounded-lg justify-around items-center p-5 md:p-8">
        <!-- Project Name -->
        <div class="flex  w-full h-auto  md:py-5 rounded-md justify-center items-center">
          <span id="${_id}-name" class="text-gray-900 font-bold text-sm md:text-2xl "> ${name} </span>
        </div>

        <!-- Project Info Status & Link -->
        <div class="flex flex-col bg-card-info w-full h-auto rounded-lg p-8 justify-center items-center">
            <div id="${_id}-description" class="flex w-full h-12 text-card-info text-center text-xs md:text-base font-semibold justify-center items-center">${description}</div>
        
            <div class="flex w-full h-auto justify-between items-center">
                <div id="${_id}-link" class=" flex w-8/12 md:w-9/12 h-12 mt-8 bg-link-box text-center text-xs md:text-base rounded-md justify-center items-center">
                  ${link}
                </div>

                <div class=" flex w-3/12 md:w-2/12 h-12 mt-8 bg-link-box text-center rounded-md justify-center items-center">
                  <svg class="cursor-pointer" onclick="window.open('${link}')" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </div>
            </div>

            <div id="${_id}-status" class=" flex status-${status} w-full h-12 mt-4 bg-link-box text-center rounded-md justify-center items-center">
              ${statusStr}
            </div>
        </div>

        <div class="flex w-full h-auto mt-4 justify-between items-center">

            <div onclick="editClicked(this.id)" id="${_id}-edit"  class="flex w-5/12 h-12 edit-button rounded-md justify-center items-center cursor-pointer">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7791f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                <span class="text-xl font-semibold px-2">Edit</span>
            </div>

            <div id="${_id}-delete" class="flex w-5/12 h-12 delete-button rounded-md justify-center items-center cursor-pointer">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                <span class="text-xl font-semibold px-2">Delete</span>
            </div>

        </div>
      </div>
    </div>`;
    mainSection.insertAdjacentHTML('beforeend',htmlToBeAdded);

}



const editClicked = (id) => {

  const _id = id.split("-")[0];
  const name = document.getElementById(_id+"-name");
  const description = document.getElementById(_id+"-description");
  const link = document.getElementById(_id+"-link");
  const status = document.getElementById(_id+"-status");
  const trimmedStatus = status.innerHTML.toLowerCase().replace(" ","").trim();
  
  document.getElementById("edit-modal-name").value = name.innerHTML;
  document.getElementById("edit-modal-description").value = description.innerHTML;
  document.getElementById("edit-modal-link").value = link.innerHTML;
  document.getElementById("edit-modal-status").value = trimmedStatus;
  document.getElementsByClassName("update-button")[0].id = _id+"-update-button"; 

  document.getElementById("editModal").showModal();

}

const updateProject = ()=>{
  const elementID = document.getElementsByClassName("update-button")[0].id;
  const _id = elementID.split("-")[0];

  let urlencoded = new URLSearchParams();
  urlencoded.append("_id", _id);
  urlencoded.append("name", document.getElementById("edit-modal-name").value);
  urlencoded.append("description", document.getElementById("edit-modal-description").value);
  urlencoded.append("link", document.getElementById("edit-modal-link").value);
  urlencoded.append("status", document.getElementById("edit-modal-status").value);

  putData("https://sidie.herokuapp.com/project",urlencoded)
    .then(data=>{
      console.log(data);
    })
    .catch(err=>{
      console.log(err);
    });

    document.getElementById('cardSection').innerHTML = "";
    loadingData();
    document.getElementById('editModal').close();
  
}

const createProject = ()=>{
  

  let urlencoded = new URLSearchParams();
  urlencoded.append("name", document.getElementById("create-modal-name").value);
  urlencoded.append("description", document.getElementById("create-modal-description").value);
  urlencoded.append("link", document.getElementById("create-modal-link").value);
  urlencoded.append("status", document.getElementById("create-modal-status").value);

  createPostData("https://sidie.herokuapp.com/project",urlencoded)
    .then(data=>{
      console.log(data);
    })
    .catch(err=>{
      console.log(err);
    });

    document.getElementById('cardSection').innerHTML = "";
    loadingData();
    document.getElementById('createModal').close();
  
}

async function putData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors', 
    cache: 'no-cache', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':"Bearer "+document.cookie.split("=")[1]
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: data 
  });
  return response.json(); 
}

async function createPostData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':"Bearer "+document.cookie.split("=")[1]
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: data 
  });
  return response.json(); 
}
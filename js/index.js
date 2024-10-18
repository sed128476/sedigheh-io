// footer  variable first
const today  = new Date();
const date1 = today.getFullYear();
const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);
const copyright = document.createElement('div')
copyright.innerHTML = `<strong>Sedigheh  &#169 ${date1}</strong>` 
footer.appendChild(copyright);
// footer  end

// project section repository
const username = "sed128476";
const apiurl = `https://api.github.com/users/${username}/repos`;
const projectSection = document.getElementById('Projects');
let   projectList    = document.createElement('ul');
projectList.className = 'ulproject';
// project end



// message section && checkbox
const checkBox = document.querySelector('#hide input');
const ul2 = document.querySelector('#messages')
const resultSubmit =document.querySelector('#message-form');
let messageSection = document.getElementById('list-message');
let messageList = messageSection.querySelector('ul');
messageSection.hidden =true;



// project function
 fetch(apiurl)
 .then(response => {
   if (!response.ok) {
     throw new Error('Request failed');
   }
   return response.text(); // Parse the response as JSON
 })
 .then(data => {
            const repositories = JSON.parse(data);  // Do something with the data
            projectSection.appendChild(projectList);
            for (let repository  of repositories){
                  let project = document.createElement('li');
                  let content2 = `<span class="ad"><a href="${repository.html_url}">${repository.name}</a></span> <span class="ur">Created:</span>${repository.created_at}`;
                  project.innerHTML = content2;
                  projectList.innerHTML += `<h3>${repository.name}</h3>`;
                  projectList.appendChild(project);
    
          }
    })
 .catch(error => {
   console.error('An error occurred:', error);
 });

 
// message submit function
document.querySelector('#message-form').addEventListener('submit' ,
   (event) => {
          event.preventDefault();
          const  li = document.createElement('li');
          li.className = "li-list";
          let name = event.target.usersName.value;
          let email = event.target.usersEmail.value;
          let message = event.target.usersMessage.value;
          let objuser = { usersName: name, usersEmail: email, usersMessage: message};
          let content2 = `<span class="edit">Edit</span> <span class="delete">Remove</span>
                          <span class="Email">${email}</span><span class="exp-m"> <a href="mailto:${email}">
                            ${name}  </a>wrote: ${message}</span> `;
          li.innerHTML = content2;
          ul2.appendChild(li);
          storeToLocalStorage(objuser);
          resultSubmit.reset();
          messageSection.hidden = false;          
        
   });

// message list button edit
ul2.addEventListener('click', function(e){
  if(e.target.className === 'edit'){
      let email      = e.target.parentElement.children[2].textContent
      let str        = e.target.parentElement.children[3].textContent;
      let splitIndex = str.indexOf("wrote:");
      let name       = str.slice(0, splitIndex).trim();
      let message    = str.slice(splitIndex + "wrote:".length).trim();
      document.getElementById('usersName').value    = name;
      document.getElementById('usersEmail').value   = email;
      document.getElementById('usersMessage').value = message;
      // Remove the item from site
      e.target.parentElement.remove();
      // Remove the item from local storage
      console.log(e.target.parentElement.children[3].textContent);
      console.log("ul:" , e.target.parentElement);
      removeFromLocalStorage(e.target.parentElement.children[3].textContent);
  }
});   

// message list button Remove
ul2.addEventListener('click', function(e){
  if(e.target.className === 'delete'){
     // Remove the item from messga list
      e.target.parentElement.remove();
      // Remove the item from local storage
      removeFromLocalStorage(e.target.parentElement.children[3].textContent);
  }
});


//checkbox function
checkBox.addEventListener('change', function(e){
  if(checkBox.checked === true){
      ul2.style.display = 'none';
  } else {
      ul2.style.display = 'block';
  }
});


// update page any time the page load
document.addEventListener('DOMContentLoaded', function(e){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
          ul2.innerHTML =  "";
          tasks = JSON.parse(localStorage.getItem('tasks'));
          console.log("tasks:" , tasks, "length:" , tasks.length);
          
        }
        
        for(let i=0; i<tasks.length; i++ ){
          console.log("item:" , tasks[i]);
          const  li = document.createElement('li');
                 li.className = "li-list";
          let content2 = `<span class="edit">Edit</span> <span class="delete">Remove</span>
                          <span class="Email">${tasks[i].usersEmail}</span>
                          <span class="exp-m"> <a href="mailto:${tasks[i].usersEmail} ">  ${tasks[i].usersName}  </a> wrote: ${tasks[i].usersMessage}</span> `;
          li.innerHTML = content2;
          ul2.appendChild(li);   
          }

  })


    
// save local storage
function storeToLocalStorage(task){
  console.log("task:" , task);
  let tasks = new Array();
  if(localStorage.getItem('tasks') === null){
     // tasks = [];
     console.log("localStorage  is empty" );
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      localStorage.clear();
      console.log("localtasksElse:", tasks );

    
  }
  console.log("localtasks befor:", tasks.length , "localtask:", task);

  tasks.push(task);
  console.log("localtasks:", tasks.length , "localtaskAfterIf:", tasks);
  

  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log(JSON.parse(localStorage.getItem('tasks')));
  //localStorage.setItem('tasks', tasks);

}

// Remove from local storeage
function removeFromLocalStorage(task){
  let tasks;
  console.log("task:" ,task);
  let str = task;
  let splitIndex = str.indexOf("wrote:");
  let name       = str.slice(0, splitIndex).trim();
  let message    = str.slice(splitIndex + "wrote:".length).trim();

  console.log("Part 1:", name); // Output: "salzar"
  console.log("Part 2:", message); // Output: ": i am ready"
  if(localStorage.getItem('tasks') === null){
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  for(let i=0; i<tasks.length; i++){
      if(tasks[i].usersName === name && tasks[i].usersMessage === message){
          tasks.splice(i, 1);
      }
  }

  if(tasks.length === 0){
      localStorage.clear();
  } else {
      localStorage.clear();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log(JSON.parse(localStorage.getItem('tasks')));
  }
}
 
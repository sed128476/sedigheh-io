/*create fetch  */
const username = "sed128476";
const apiurl = `https://api.github.com/users/${username}/repos`;
const projectSection = document.getElementById('Projects');
let   projectList    = document.createElement('ul');
      projectList.className = 'project';
const today  = new Date();
const date1 = today.getFullYear();
const footer = document.createElement('footer');
const body = document.querySelector('body');
console.log(footer);
body.appendChild(footer);
const copyright = document.createElement('div')
copyright.innerHTML = `<strong>Sedigheh  &#169 ${date1} &#169</strong>` 
footer.appendChild(copyright);
const spanDelete = `<span class="delete">Remove</span>`;
const spanEdit = `<span class="edit">Edit</span>`;



const inputTextusername = document.querySelector('#userName');
const inputTextuseremail = document.querySelector('#userEmail');
const inputTextusermassage = document.querySelector('#usersMessage');
const  li = document.createElement('li');
li.className = "li-list";
const spanName = document.createElement('span');
spanName.className = 'name';
console.log(inputTextuseremail);
const checkBox = document.querySelector('#hide input');
const ul2 = document.querySelector('#messages')
console.log(ul2);

 const resultSubmit =document.querySelector('#message-form');
 console.log(resultSubmit);

 let messageSection = document.getElementById('list-message');
 let messageList = messageSection.querySelector('ul');
 messageSection.hidden =true;



console.log(apiurl);
 fetch(apiurl)
 .then(response => {
   if (!response.ok) {
     throw new Error('Request failed');
   }
   return response.text(); // Parse the response as JSON
 })
 .then(data => {
    const repositories = JSON.parse(data);  // Do something with the data
    console.log(repositories);
    projectSection.appendChild(projectList);
    const i = 0;
    for(let repository of repositories){

          console.log(repository);
          let project = document.createElement('li');
          project.innerText = (repository.name);
          projectList.appendChild(project);
    
  }
 })
 .catch(error => {
   console.error('An error occurred:', error);
 });

 



 document.querySelector('#message-form').addEventListener('submit' ,
   (event) => {
          event.preventDefault();
          let name = event.target.usersName.value;
          let email = event.target.usersEmail.value;
          let message = event.target.usersMessage.value;
          let objuser = { usersName: name, usersEmail: email, usersMessage: message};
          console.log(objuser);
          const content1 = ` <a href="mailto:${email} ">  ${name}  </a> wrote: ${message}  `;
          spanName.textContent = content1;
          console.log(spanName);
          li.appendChild(spanName);
          li.innerHTML += spanDelete;
          ul2.appendChild(li);
          console.log(ul2);
          storeToLocalStorage(objuser)        
          resultSubmit.reset();
          messageSection.hidden = false;
        
});

ul2.addEventListener('click', function(e){
  if(e.target.className === 'delete'){
      e.target.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.children[0].textContent);
  }
});

checkBox.addEventListener('change', function(e){
  if(checkBox.checked === true){
      ul2.style.display = 'none';
  } else {
      ul2.style.display = 'block';
  }
});


document.addEventListener('DOMContentLoaded', function(e){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
          tasks = localStorage.getItem('tasks');
          
        }
        
        for(let item of tasks){
            const content1 = ` <a href="mailto:${item.email} ">  ${item.name}  </a>wrote: ${item.message}  `;
            spanName.textContent = content1;
            li.appendChild(spanName);
            li.innerHTML += spanDelete;
            ul2.appendChild(li);
        
          }
  })


    

function storeToLocalStorage(task){
  console.log(task);
  let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks = [];
  } else {
      tasks = localStorage.getItem('tasks');
    
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks = [];
  } else {
      tasks = localStorage.getItem('tasks');
  }

  for(let i=0; i<tasks.length; i++){
      if(tasks[i] === task){
          tasks.splice(i, 1);
      }
  }

  if(tasks.length === 0){
      localStorage.clear();
  } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}


//All Variable
//Get Todo Input 
let todoInput = document.querySelector('.todo-input');
//Get todo button
let todoButton =  document.querySelector('.todo-button');
//Get todo list
let todoList = document.querySelector(".todo-list");

//Get filter
let filterOption = document.querySelector(".filter-todo");

//Get search 
let searchOption = document.querySelector(".search");

//get all item 
let allItems = document.querySelectorAll(".todo-item");


//Event Listener
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteItem);
todoList.addEventListener("click",completeItem);
filterOption.addEventListener("click",filterOptionItem);
searchOption.addEventListener("keyup",searchOptionItem)
document.addEventListener('DOMContentLoaded',getTodos);


//Functions 
function addTodo(event){
    event.preventDefault();
    if(todoInput.value === ''){
        showErrorMessage("Please Enter valid Value");
    }else{

//create todo Div
let todoDiv = document.createElement("div");
//Add class in todo Div
todoDiv.classList.add('todo');

//Create li 
const li = document.createElement('li');
//Add Class in li
li.className = 'todo-item';

//Add append text in li
li.innerText = todoInput.value;
//Li append in todoDiv
todoDiv.appendChild(li);
//Save LocalStorage
saveLocalStorage(todoInput.value);
todoInput.value = '';

//Delete button 
const deleteButton = createCustomElement('button','delete-btn','<i class="fas fa-trash"></i>')
//append delete button in todoDiv
todoDiv.appendChild(deleteButton);

//Create Complete button
const completeButton =  createCustomElement('button','complete-btn','<i class="fas fa-check"></i>');
//append complete button in todoDiv
todoDiv.appendChild(completeButton);

//append todo div in todolist
todoList.appendChild(todoDiv);

    }
    
    
}


//Create custom button
function createCustomElement(elementName,elementClass,elementIcon){

    //Create Complete button
    const elementButton = document.createElement(elementName);
    //add class 
    elementButton.className = elementClass;
    //Append icon in complete button
    elementButton.innerHTML = elementIcon;
    return elementButton;
}

//Delete function
function deleteItem(event){
    const item = event.target;
    if(item.classList[0] === 'delete-btn'){
       const todo =  item.parentElement;
       todo.classList.add("fall");

       //Remove todos from localStorage
       removeTodos(todo);
       todo.addEventListener("transitionend",function(){
        todo.remove();
       })
      
    }
}

//completed function
function completeItem(event){
    const item = event.target;
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

//Filter option Item
function filterOptionItem(event){
   const todolist =  todoList.children;
   const todoListItems = Array.from(todolist)
   todoListItems.forEach(function(todo){
   
    switch(event.target.value){
        case "all":
            todo.style.display="flex";
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
    }
   })
    const value = event.target.value;
   
}

//Search item
function searchOptionItem(e){
    const text = e.target.value.toLowerCase();
    allItems.forEach(function(task){
       const item =  task.firstChild.textContent;
       if(item.toLowerCase().indexOf(text) != -1){
        task.parentElement.style.display = "flex";
        console.log(task);
       }else{
        task.parentElement.style.display = "none";
       }
    })
}

//Save localStorage
function saveLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
    console.log(todo);
}
//Get todos from LocalStorage
function getTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //create todo Div
let todoDiv = document.createElement("div");
//Add class in todo Div
todoDiv.classList.add('todo');

//Create li 
const li = document.createElement('li');
//Add Class in li
li.className = 'todo-item';

//Add append text in li
li.innerText = todo;
//Li append in todoDiv
todoDiv.appendChild(li);
//Save LocalStorage
todoInput.value = '';

//Delete button 
const deleteButton = createCustomElement('button','delete-btn','<i class="fas fa-trash"></i>')
//append delete button in todoDiv
todoDiv.appendChild(deleteButton);

//Create Complete button
const completeButton =  createCustomElement('button','complete-btn','<i class="fas fa-check"></i>');
//append complete button in todoDiv
todoDiv.appendChild(completeButton);

//append todo div in todolist
todoList.appendChild(todoDiv);

    });
}

//Revmove todos 
function removeTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex),1);
        localStorage.setItem("todos",JSON.stringify(todos));
        console.log(todoIndex);
}


//show Error Message
function showErrorMessage(error){

    //create div
    const errorDiv = document.createElement("div");

    //Add class in error div
    errorDiv.className="danger-alrt";

    //Get Elements
    const mainContainer = document.querySelector(".main-container");
    const todoContainer = document.querySelector(".todo-container");

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error  div in main container
    mainContainer.insertBefore(errorDiv,todoContainer);

    //Clear TExt 

    setTimeout(clearErrorText, 3000);

}
function clearErrorText(){
    document.querySelector('.danger-alrt').remove();
}



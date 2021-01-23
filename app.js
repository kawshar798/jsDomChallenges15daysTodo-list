
//All Variable
//Get Todo Input 
let todoInput = document.querySelector('.todo-input');
//Get todo button
let todoButton =  document.querySelector('.todo-button');
//Get todo list
let todoList = document.querySelector(".todo-list");

//Get filter
let filterOption = document.querySelector(".filter-todo");


//Event Listener
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteItem);
todoList.addEventListener("click",completeItem);
filterOption.addEventListener("click",filterOptionItem)



//Functions 
function addTodo(event){
    event.preventDefault();
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
    todoInput.value = '';

    //Li append in todoDiv
    todoDiv.appendChild(li);

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
    console.log(todoDiv);

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

//search Item
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



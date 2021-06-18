// SELECTORS

const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");



// EVENT LISTENERS

// listening to the input button 

toDoButton.addEventListener("click", addToDo);

// listening to a click anywhere on the todo item

toDoList.addEventListener("click", checkDelete);

// listening for DOM Content loading 

document.addEventListener("DOMContentLoaded", () => {
    getToDos();
    getCompletedToDos();
});




// FUNCTIONS 

// TO DO CREATION ON INPUT CLICK

function addToDo(event) {
    // prevent button from submitting form
    
    event.preventDefault();

    if (toDoInput.value === "") {

        alert("Need reminding to do nothing?....")
        return;
    }

    // create todo div

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    // create li

const newToDo = document.createElement("li");
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add("todo-item");

    // append todo li to todo div

    toDoDiv.appendChild(newToDo);

    // save todo into local storage (see below function for details)
    saveLocalTodos(toDoInput.value);
    //  create check mark btn

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");

    // append complete btn to todo div

    toDoDiv.appendChild(completedBtn);

    // create trash btn

        const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashBtn.classList.add("trash-btn");

    // append trash btn to todo div

    toDoDiv.appendChild(trashBtn);

    // append div (with elements inside) to the dom

    toDoList.appendChild(toDoDiv);

    // clear todo input value ready for the next to do 

    toDoInput.value = "";


}

// Save initial todo to local storage

function saveLocalTodos(todo) {
    // check, hey do i already hav todos in the storage?

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
        // if no todos in local storage create an emopty array
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        // if there are todos in local storage, retrieve the stringified array and parse it back into an array 
    }

    todos.push(todo);
    // then push the current todo onto this array whether its empty or populated
    localStorage.setItem("todos", JSON.stringify(todos));
    // stringify the updated todos array and send it back to local storage
}


// CHECK OR DELETE FUNCTION ON event listener that is on the TODO DIV 

function checkDelete(event) {

    // grabbing whats being clicked
    const item = event.target;

    // checking if the classlist = trash-btn if it does we know its the trash button

    if (item.classList[0] === 'trash-btn') {


        const todo = item.parentElement;
        todo.classList.add("fall");
        removeTodoFromLocalStorage(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
        
        // animating the todo div to fall
        // removing the todo from local storage

    };

    if (item.classList[0] === 'complete-btn') {

        const todo = item.parentElement;
        // toggling completed grey out class
        todo.classList.toggle("completed"); 
        // moving todo from uncomplete to complete in local storage (or moving back depending on state)
        toDoCompleteStorage(todo);


    }

}

// Local storage functionality

// Check button storage functionality

// retrieve incomplete to do from local storage and send it to complete local storage, or vice versa

function toDoCompleteStorage(todo) {


    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
        // if no todos in local storage create an emopty array
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        // if there are todos in local storage, retrieve the stringified array and parse it back into an array 
    }

    let completeTodos;
    if (localStorage.getItem("completeTodos") === null) {
        completeTodos = [];
        // if no todos in local storage create an emopty array
    }
    else {
        completeTodos = JSON.parse(localStorage.getItem("completeTodos"));
        // if there are todos in local storage, retrieve the stringified array and parse it back into an array 
    }
    
    const toDoIndex = (todo.children[0].innerText);
    

// if the divs class list has completed as the second class, remove todo from incomplete todo in local storage to completedtodo in local storage
    switch (todo.classList[1]) {
        case "completed":

            todos.splice(todos.indexOf(toDoIndex), 1);
            localStorage.setItem("todos", JSON.stringify(todos));

            completeTodos.push(toDoIndex);
            localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
            break;
        
        // if the divs classlist doesn't have completed as the second class and returns undefined then pull the todo back from completedtodo in local storage and put it back in incomplete todo
        case undefined:
            completeTodos.splice(completeTodos.indexOf(toDoIndex), 1);
            todos.push(toDoIndex);
            localStorage.setItem("completeTodos", JSON.stringify(completeTodos));

            
            localStorage.setItem("todos", JSON.stringify(todos));
            break;
    }

}

// DOMContent Loaded Functionality

// RETRIEVING local storage incomplete todos and populating the UI with them

function getToDos() {
     
    // RETRIEVING TODOS

    // check, hey do i already hav todos in the storage?

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
        // if no todos in local storage create an emopty array
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        // if there are todos in local storage, retrieve the stringified array and parse it back into an array 
    }

    // loop over each todo in the array and running a function for each one
    todos.forEach(function (todo) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");

        // create li

        const newToDo = document.createElement("li");
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");

        // append todo li to todo div

        toDoDiv.appendChild(newToDo);

        //  create check mark btn

        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add("complete-btn");

        // append complete btn to todo div

        toDoDiv.appendChild(completedBtn);

        // create trash btn

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        trashBtn.classList.add("trash-btn");

        // append trash btn to todo div

        toDoDiv.appendChild(trashBtn);

        // append div (with elements inside) to the dom

        toDoList.appendChild(toDoDiv);

        // clear todo input value ready for the next to do 
      
    
       
    });
}


     //   RETRIEVING COMPLETED TODOS
      

    function getCompletedToDos () {
     
     
        let completeTodos;
        if (localStorage.getItem("completeTodos") === null) {
            completeTodos = [];
            // if no COMPLETEDtodos in local storage create an emopty array
        }
        else {
            completeTodos = JSON.parse(localStorage.getItem("completeTodos"));
            // if there are completedtodos in local storage, retrieve the stringified array and parse it back into an array 
        }
      
        completeTodos.forEach(function (todo) {
            const toDoDiv = document.createElement("div");
            // add todo class for styling
            toDoDiv.classList.add("todo");
            // ADD COMPLETED CLASS SO ITS GREYED OUT AND IDENTIFIES AS A COMPLETED TODO ON THE UI
            toDoDiv.classList.add("completed");

            // create li

            const newToDo = document.createElement("li");
            newToDo.innerText = todo;
            newToDo.classList.add("todo-item");

            // append todo li to todo div

            toDoDiv.appendChild(newToDo);

            //  create check mark btn

            const completedBtn = document.createElement("button");
            completedBtn.innerHTML = '<i class="fas fa-check"></i>';
            completedBtn.classList.add("complete-btn");

            // append complete btn to todo div

            toDoDiv.appendChild(completedBtn);

            // create trash btn

            const trashBtn = document.createElement("button");
            trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            trashBtn.classList.add("trash-btn");

            // append trash btn to todo div

            toDoDiv.appendChild(trashBtn);

            // append div (with elements inside) to the dom

            toDoList.appendChild(toDoDiv);

            // clear todo input value ready for the next to do 
      
      
      
        });
}

    // Delete todo from local storage 

    function removeTodoFromLocalStorage(todo) {

        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
            // if no todos in local storage create an emopty array
        }
        else {
            todos = JSON.parse(localStorage.getItem("todos"));
            // if there are todos in local storage, retrieve the stringified array and parse it back into an array 
        }

            let completeTodos;
    if (localStorage.getItem("completeTodos") === null) {
        completeTodos = [];
        // if no todos in local storage create an emopty array
    }
    else {
        completeTodos = JSON.parse(localStorage.getItem("completeTodos"));
        // if there are todos in local storage, retrieve the stringified array and parse it back into an array 
    }
        
        
              // so here we are grabbing the innertext of the first child of the div, which is the text value of the todo
        
        const toDoIndex = (todo.children[0].innerText);


       console.log(todo.classList[1]);
        
        
        switch (todo.classList[1]) {
     
            // if the todo has the completed class on it, that means the this particular todo is stored in the completedTodos local storage key, as per the functionality above, so we are saying go into that storage array, delete it and push both the arrays back
        case "completed":

            completeTodos.splice(completeTodos.indexOf(toDoIndex), 1);
            
            localStorage.setItem("todos", JSON.stringify(todos));
            localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
            break;
        
        // if the divs second class in class list = fall and not complete, that means this todo is incomplete, so its stored in the todo key in Local storage, so we are saying go into this array delete it and push both arrays back
            
            // splice method with, 1  -  removes the first instance that matches the text within toDoIndex
            case "fall":
                
           
            
            todos.splice(todos.indexOf(toDoIndex), 1);

            localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
            localStorage.setItem("todos", JSON.stringify(todos));
            break;
    }

 
    }

const newTodoInput = document.getElementById("newTodoInput");
const addTodoButton = document.getElementById("addTodoButton");
const searchTodoInput = document.getElementById("searchTodoInput");
const dateFilterInput = document.getElementById("dateFilterInput");
const todoList = document.getElementById("todoList");

// Récupérer les tâches depuis le localStorage
function getTodos() {
   const todosString = localStorage.getItem("todos");
   if (todosString) {
      return JSON.parse(todosString);
   }
   return [];
}

// Enregistrer les tâches dans le localStorage
function saveTodos(todos) {
   localStorage.setItem("todos", JSON.stringify(todos));
}

// Ajouter une nouvelle tâche
function addTodo() {
   const task = newTodoInput.value.trim();
   if (task !== "") {
      const todos = getTodos();
      const newTodo = {
         id: Date.now(),
         task: task
      };
      todos.push(newTodo);
      saveTodos(todos);
      newTodoInput.value = "";
      displayTodos();
   }
}

// Afficher les tâches dans la liste
function displayTodos() {
   const todos = getTodos();
   todoList.innerHTML = "";
   todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.task;
      todoList.appendChild(li);
   });
}

// Rechercher une tâche
function searchTodo() {
   const searchTerm = searchTodoInput.value.trim().toLowerCase();
   const todos = getTodos();
   const filteredTodos = todos.filter(todo => todo.task.toLowerCase().includes(searchTerm));
   todoList.innerHTML = "";
   filteredTodos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.task;
      todoList.appendChild(li);
   });
}

// Filtrer les tâches par date
function filterTodoByDate() {
    const selectedDate = dateFilterInput.value;
    const todos = getTodos();
    const filteredTodos = todos.filter(todo => todo.date === selectedDate);
    todoList.innerHTML = "";
    filteredTodos.forEach(todo => {
       const li = document.createElement("li");
       li.textContent = todo.text;
       todoList.appendChild(li);
    });
 }

// Écouter le clic sur le bouton "Ajouter"
addTodoButton.addEventListener("click", addTodo)

// Écouter les changements dans la barre de recherche
searchTodoInput.addEventListener("input", searchTodo);

// Écouter les changements dans le filtre de date
dateFilterInput.addEventListener("change", filterTodoByDate);

// Afficher les tâches lors du chargement de la page
displayTodos();


// // Supprimer une tâche
// function deleteTodo(id) {
//     const todos = getTodos();
//     const filteredTodos = todos.filter(todo => todo.id !== id);
//     updateTodos(filteredTodos);
//     displayTodos(filteredTodos);
//  }

//  // Modifier une tâche
// function editTodo(id) {
//     const todos = getTodos();
//     const todoIndex = todos.findIndex(todo => todo.id === id);
//     const li = todoList.children[todoIndex];
//     const span = li.querySelector("span");
//     const input = li.querySelector("input.edit");
 
//     if (!li.classList.contains("editing")) {
//        // Afficher le champ d'édition
//        li.classList.add("editing");
//        input.value = todos[todoIndex].task;
//        input.focus();
//     } else {
//        // Enregistrer les modifications
//        li.classList.remove("editing");
//        const newTask = input.value.trim();
//        if (newTask !== "") {
//           todos[todoIndex].task = newTask;
//           updateTodos(todos);
//           displayTodos(todos);
//        }
//     }
//  }
const addTodoBtn = document.querySelector("#new-todo-btn");
const newTodoInput = document.querySelector("#new-todo");
const todoList = document.querySelector("#list");

let todos = [];

function loadTodos() {
  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((todosFromApi) => {
      console.log(todosFromApi);
      todos = todosFromApi;
      renderTodos();
    });
} //  function loadTodos fetched Daten, wandelt sie in JSON und gibt sie im lokalen state wieder (todos)

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    const text = document.createTextNode(todo.description);
    newLi.appendChild(text);
    todoList.appendChild(newLi);
  });
}

addTodoBtn.addEventListener("click", () => {
  const newTodoText = newTodoInput.value;
  const newTodo = {
    description: newTodoText,
    done: false,
  };
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.json())
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    });
});

// lokal gebautes todoobjekt wird in das backend geschickt/gepostet

loadTodos();

// state und backend syncron halten und häckchen aktualisierung noch vornehmen

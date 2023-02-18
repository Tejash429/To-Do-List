'use strict';

const inputTodo = document.querySelector('.inputTodo');
const addBtn = document.querySelector('.addBtn');
const todoContainer = document.querySelector('.todos');
const formSubmit = document.querySelector('.submit');
const pendingNum = document.querySelector('.pending-num');
const clearBtn = document.querySelector('.clear-button');
const anime = document.querySelector('.anime');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos.length !== 0) {
  anime.style.display = 'none';
}

//Adding Todo to LocalStorage
const addTodo = (todo, id, isDone) => {
  todos.push({ todo, id, isDone });
  localStorage.setItem('todos', JSON.stringify(todos));
  location.reload();
  return { todo, id, isDone };
};

//Pending
function allTasks() {
  let tasks = document.querySelectorAll('.pending');
  pendingNum.textContent = tasks.length === 0 ? 'no' : tasks.length;
}

//Adding a New Todo
const onSubmit = () => {
  if (inputTodo.value === '') {
    alert('Enter a Todo');
  } else {
    const newTodo = addTodo(inputTodo.value, todos.length, false);
    createTodoElement(newTodo);
    inputTodo.value = '';
    if (todos.length !== 0) {
      anime.style.display = 'none';
    }
  }
};

//Creating a New Todo
const createTodoElement = ({ todo, isDone, id }) => {
  if (isDone) {
    todoContainer.innerHTML += `
  <div class="todo list " id=${id} onclick="handleStatus(this,${isDone})">
  <div class="mix " >
    <input type="checkbox" name="checkbox" class="checkBtn"  checked >
    <p class="task">${todo}</p>
    </div>
    <div class="delete">
    <i class="fa-light fa-trash  deleteBtn fa"></i>  
    </div>
  </div>`;
  } else {
    todoContainer.innerHTML += `
  <div class="todo list pending" id=${id} onclick="handleStatus(this,${isDone})">
  <div class="mix " >
    <input type="checkbox" name="checkbox" class="checkBtn" >
    <p class="task">${todo}</p>
    </div>
    <div class="delete">
    <i class="fa-light fa-trash  deleteBtn fa"></i>  
    </div>
  </div>`;
    allTasks();
  }
};

todos.forEach(createTodoElement);

formSubmit.onsubmit = e => {
  e.preventDefault();
  onSubmit();
};
addBtn.addEventListener('click', function () {
  onSubmit();
});

//Delete Todo.
const delBtn = document.querySelectorAll('.deleteBtn');
delBtn.forEach((db, i) => {
  db.addEventListener('click', () => deleteTodo(i));
});

function deleteTodo(i) {
  todos.splice(i, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  location.reload();
}

//Check UnCheck
function handleStatus(e, isDone) {
  if (e.classList.contains('pending')) {
    todos[e.id].isDone = true;
  } else {
    todos[e.id].isDone = false;
  }

  localStorage.setItem('todos', JSON.stringify(todos));
  const checkbox = e.querySelector('input');
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle('pending');
  allTasks();
}

//Deleting all task
const task = document.querySelector('.todo');
clearBtn.addEventListener('click', () => {
  if (todos.length !== 0) {
    localStorage.clear();
    todos.splice(0);
    todoContainer.innerHTML = `
  <div class="anime">
  <lottie-player
    src="https://assets6.lottiefiles.com/packages/lf20_mznpnepo.json"
    background="white"
    speed="0.5"
    style="width: 300px; height: 300px"
    autoplay
  ></lottie-player>
  `;
    allTasks();
  } else {
    alert('There are no todos to delete');
  }
});

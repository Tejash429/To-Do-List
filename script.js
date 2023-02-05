'use strict';

const inputTodo = document.querySelector('.inputTodo');
const addBtn = document.querySelector('.addBtn');
const todoContainer = document.querySelector('.todos');
const task = document.querySelector('.task');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos.length !== 0) {
  document.querySelector('.anime').hidden = true;
}

//Adding Todo to LocalStorage
const addTodo = todo => {
  todos.push({ todo });

  localStorage.setItem('todos', JSON.stringify(todos));

  return { todo };
};

//Creating a New Todo
const createTodoElement = ({ todo }) => {
  if (todo.value === '') {
    alert('Enter a Todo');
  } else {
    const todoDiv = document.createElement('div');
    todoDiv.setAttribute('class', 'todo');

    const newTodo = document.createElement('p');
    newTodo.setAttribute('class', 'task');
    newTodo.innerHTML = todo;

    const checkTodo = document.createElement('input');
    checkTodo.setAttribute('type', 'checkbox');
    checkTodo.setAttribute('class', 'checkBox');

    todoDiv.appendChild(checkTodo);
    todoDiv.appendChild(newTodo);
    todoContainer.append(todoDiv);
  }
};

todos.forEach(createTodoElement);

addBtn.addEventListener('click', function () {
  const newTodo = addTodo(inputTodo.value);
  createTodoElement(newTodo);
  inputTodo.value = '';
  if (todos.length !== 0) {
    document.querySelector('.anime').hidden = true;
  }
});

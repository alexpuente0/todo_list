import './style.css';
import {
  retrivedata,
  addTodo,
  saveEdit,
  displayToDo,
  getIsEditing,
} from './Modules/taskmanage.js';

window.onload = () => {
  retrivedata();
  displayToDo();
};
const desc = document.querySelector('#addtodo');
desc.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getIsEditing()) addTodo();
    else saveEdit();
  }
});

import './style.css';
import {
  getData,
  addNew,
  saveEdit,
  listDisplay,
  getIsEditing,
  clearCompleted,
} from './Modules/taskmanage.js';

window.onload = () => {
  getData();
  listDisplay();
};

const desc = document.querySelector('#addtodo');
desc.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getIsEditing()) addNew();
    else saveEdit();
  }
});

const clear = document.querySelector('.clearcomplete');
clear.addEventListener('click', () => {
  clearCompleted();
});

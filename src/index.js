import './style.css';
import {
  getData,
  saveEdit,
  listDisplay,
  getIsEditing,
  clearCompleted,
  storeList,
  List,
} from './Modules/taskmanage.js';

const addNew = require('./Modules/addNew.js');

window.onload = () => {
  getData();
  listDisplay();
};

const desc = document.querySelector('#addtodo');
desc.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getIsEditing()) {
      List = addNew(List);
      listDisplay();
      storeList();
    }
    else saveEdit();
  }
});

const clear = document.querySelector('.clearcomplete');
clear.addEventListener('click', () => {
  clearCompleted();
});

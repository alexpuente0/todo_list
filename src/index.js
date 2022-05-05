import './style.css';

const {
  saveEdit,
  listDisplay,
  getIsEditing,
  clearCompleted,
} = require('./Modules/taskmanage.js');

let { List } = require('./Modules/taskmanage.js');

const utils = require('./Modules/utils.js');

window.onload = () => {
  List = utils.getData();
  listDisplay(List);
};

const desc = document.querySelector('#addtodo');
desc.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getIsEditing()) {
      List = utils.addNew(List);
      listDisplay(List);
      utils.storeList(List);
    } else {
      List = saveEdit(List);
      listDisplay(List);
      utils.storeList(List);
    }
  }
});

const clear = document.querySelector('.clearcomplete');
clear.addEventListener('click', () => {
  clearCompleted(List);
});

import './style.css';
const {
  saveEdit,
  listDisplay,
  getIsEditing,
  clearCompleted,
  storeList,
} = require('./Modules/taskmanage.js');

let {List} = require('./Modules/taskmanage.js');

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
      console.log(List);
      List = utils.addNew(List);
      listDisplay(List);
      utils.storeList(List);
    }
    else saveEdit();
  }
});

const clear = document.querySelector('.clearcomplete');
clear.addEventListener('click', () => {
  clearCompleted();
});

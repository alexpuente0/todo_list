import './style.css';

const globalEdit = require('./Modules/globalEdit.js');

const {
  listDisplay,
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
    if (!globalEdit.isEditing) {
      List = utils.addNew(List);
      listDisplay(List);
      utils.storeList(List);
    } else {
      List = utils.saveEdit(List, globalEdit.todoEdit);
      listDisplay(List);

      utils.storeList(List);
      globalEdit.isEditing = false;
      globalEdit.todoEdit = null;
    }
  }
});

const clear = document.querySelector('.clearcomplete');
clear.addEventListener('click', () => {
  List = clearCompleted(List);
  utils.storeList(List);
  listDisplay(List);
});

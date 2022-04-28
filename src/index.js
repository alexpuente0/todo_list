import './style.css';
import {
  getData,
  addNew,
  saveEdit,
  listDisplay,
  getIsEditing,
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

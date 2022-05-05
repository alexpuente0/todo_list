/* eslint-disable no-loop-func */
const { storeList } = require('./utils.js');
const { taskEdit } = require('./utils.js');

const List = [];

// Delete task (with delete button)
const cancelTask = (List, indexID) => {
  List = List.filter((ind) => ind.index !== indexID);
  List = List.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
  return List;
};

// Checkbox functionality

const updateStatus = (list, index) => {
  list[index].completed = true;
  return list;
};

// Display Task List
const listDisplay = (List) => {
  const ListElement = document.getElementById('alltasks');
  ListElement.innerHTML = '';

  const taskStatus = (todo) => {
    List = List.map((todoItem) => {
      if (todoItem.index === todo.index) {
        return { ...todo, completed: !todo.completed };
      }
      return todoItem;
    });
  };

  // Loop for creating Tasks on List

  for (let i = 0; i < List.length; i += 1) {
    const todoLiElement = document.createElement('li');

    const taskCheck = document.createElement('input');
    taskCheck.classList.add('check-input');
    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.setAttribute('name', 'checkbox');
    taskCheck.setAttribute('value', List[i].index);

    if (List[i].completed) {
      taskCheck.checked = true;
    }

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('label');
    taskDescription.innerText = List[i].description;

    taskCheck.addEventListener('change', () => {
      if (taskCheck.checked) {
        taskDescription.classList.add('completed');
        List = updateStatus(List, i);
      } else {
        taskDescription.classList.remove('completed');
        taskStatus(List[i]);
      }
      storeList(List);
    });

    const actionBtns = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.classList.add('hide');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';

    editBtn.addEventListener('click', () => {
      taskEdit(List[i]);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('hide');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerHTML = '<i class="bi bi-trash3"></i>';

    deleteBtn.addEventListener('click', () => {
      List = cancelTask(List, List[i].index);
      listDisplay(List);
      storeList(List);
    });

    const showFuncBtn = document.createElement('button');
    showFuncBtn.classList.add('more-btn');
    showFuncBtn.setAttribute('type', 'button');
    showFuncBtn.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';

    showFuncBtn.addEventListener('click', () => {
      editBtn.classList.toggle('hide');
      deleteBtn.classList.toggle('hide');
    });

    todoLiElement.appendChild(taskCheck);
    todoLiElement.appendChild(taskDescription);

    actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);
    actionBtns.appendChild(showFuncBtn);

    todoLiElement.appendChild(actionBtns);
    ListElement.appendChild(todoLiElement);
  }
};

// Clear all checked tasks

const clearCompleted = (List) => {
  List = List.filter((todo) => !todo.completed);
  List = List.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
  return List;
};

module.exports = {
  listDisplay,
  clearCompleted,
  List,
  cancelTask,
  updateStatus,
};
/*
exports.getData = getData;
exports.saveEdit = saveEdit;
exports.listDisplay = listDisplay;
exports.getIsEditing = getIsEditing;
exports.clearCompleted = clearCompleted;
exports.storeList = storeList;
exports.List = List; */
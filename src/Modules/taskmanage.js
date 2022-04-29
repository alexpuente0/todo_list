/* eslint-disable no-loop-func */

let List = [];
let isEditing = false;
let todoEdit = null;

// Save Task List to Local Storage

const storeList = () => {
  localStorage.setItem('tasklist', JSON.stringify(List));
};

// Get Task List from Local Storage

const getData = () => {
  const localFormData = JSON.parse(localStorage.getItem('tasklist'));
  if (localFormData == null) {
    List = [];
  } else {
    List = localFormData;
  }
};

// Edit selected task

const taskEdit = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.getElementById('addtodo');
  desc.value = todo.description;
  desc.focus();
};

// Display Task List

const listDisplay = () => {
  const ListElement = document.getElementById('alltasks');
  ListElement.innerHTML = '';

  // Delete task (with delete button)

  const cancelTask = (indexID) => {
    List = List.filter((ind) => ind.index !== indexID);
    List = List.map((todo, index) => ({
      completed: todo.completed,
      description: todo.description,
      index: index + 1,
    }));
    listDisplay();
  };

  const taskStatus = (todo) => {
    List = List.map((todoItem) => {
      if (todoItem.index === todo.index) {
        return { ...todo, completed: !todo.completed };
      }
      return todoItem;
    });
    storeList();
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

    // Checkbox functionality

    taskCheck.addEventListener('change', () => {
      if (taskCheck.checked) {
        taskDescription.classList.add('completed');
        List[i].completed = true;
      } else {
        taskDescription.classList.remove('completed');
        taskStatus(List[i]);
      }
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
      cancelTask(List[i].index);
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
  storeList();
};

// Add new Task

const addNew = () => {
  const desc = document.getElementById('addtodo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = List.length + 1;
    List.push({ completed, description, index });
    listDisplay();
    storeList();
    desc.value = null;
  }
  List = List.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
};

// Save edited Task

const saveEdit = () => {
  const desc = document.getElementById('addtodo');
  if (desc.value) {
    List = List.map((todo) => {
      if (todo.index === todoEdit.index) {
        return { ...todo, description: desc.value };
      }
      return todo;
    });
    listDisplay();
    storeList();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

const getIsEditing = () => isEditing;

// Clear all checked tasks

const clearCompleted = () => {
  List = List.filter((todo) => !todo.completed);
  List = List.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
  storeList();
  listDisplay();
};

export {
  getData, addNew, saveEdit, listDisplay, getIsEditing, clearCompleted,
};

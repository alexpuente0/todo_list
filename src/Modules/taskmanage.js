/* eslint-disable no-loop-func */
let List = [];
let isEditing = false;
let todoEdit = null;

const saveData = () => {
  localStorage.setItem('tasklist', JSON.stringify(List));
};

const getData = () => {
  const localFormData = JSON.parse(localStorage.getItem('tasklist'));
  if (localFormData == null) {
    List = [];
  } else {
    List = localFormData;
  }
};

const taskEdit = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.getElementById('addtodo');
  desc.value = todo.description;
  desc.focus();
};

const listDisplay = () => {
  const ListElement = document.getElementById('alltasks');
  ListElement.innerHTML = '';

  const cancelTask = (indexID) => {
    List = List.filter((ind) => ind.index !== indexID);
    List = List.map((todo, index) => ({
      completed: todo.completed,
      description: todo.description,
      index: index + 1,
    }));
    listDisplay();
  };

  for (let i = 0; i < List.length; i += 1) {
    const todoLiElement = document.createElement('li');

    const taskCheck = document.createElement('input');
    taskCheck.classList.add('check-input');
    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.setAttribute('name', 'checkbox');
    taskCheck.setAttribute('value', List[i].index);

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('label');
    taskDescription.innerText = List[i].description;

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
  saveData();
};

const addNew = () => {
  const desc = document.getElementById('addtodo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = List.length + 1;
    List.push({ completed, description, index });
    listDisplay();
    saveData();
    desc.value = null;
  }
  List = List.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
};

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
    saveData();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

const getIsEditing = () => isEditing;

export {
  getData, addNew, saveEdit, listDisplay, getIsEditing,
};

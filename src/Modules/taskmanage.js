let List = [];
let isEditing = false;
let todoEdit = null;

const saveData = () => {
  localStorage.setItem('listitem', JSON.stringify(List));
};

const retrivedata = () => {
  const localFormData = JSON.parse(localStorage.getItem('listitem'));
  if (localFormData == null) {
    List = [];
  } else {
    List = localFormData;
  }
};

const editList = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.getElementById('addtodo');
  desc.value = todo.description;
  desc.focus();
};

const displayToDo = () => {
  const ListElement = document.getElementById('wholeList');
  ListElement.innerHTML = '';

  const removeList = (indexID) => {
    List = List.filter((ind) => ind.index !== indexID);
    List = List.map((todo, index) => ({
      completed: todo.completed,
      description: todo.description,
      index: index + 1,
    }));
    displayToDo();
  };

  for (let i = 0; i < List.length; i += 1) {
    const todoLiElement = document.createElement('li');

    const todoCheckboxElement = document.createElement('input');
    todoCheckboxElement.classList.add('check-input');
    todoCheckboxElement.setAttribute('type', 'checkbox');
    todoCheckboxElement.setAttribute('name', 'checkbox');
    todoCheckboxElement.setAttribute('value', List[i].index);

    const todoDescriptionElement = document.createElement('p');
    todoDescriptionElement.classList.add('label');
    todoDescriptionElement.innerText = List[i].description;

    const actionBtns = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.classList.add('hide');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';

    editBtn.addEventListener('click', () => {
      editList(List[i]);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('hide');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerHTML = '<i class="bi bi-trash3"></i>';

    deleteBtn.addEventListener('click', () => {
      removeList(List[i].index);
    });

    const moreEllipsisBtn = document.createElement('button');
    moreEllipsisBtn.classList.add('more-btn');
    moreEllipsisBtn.setAttribute('type', 'button');
    moreEllipsisBtn.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';

    moreEllipsisBtn.addEventListener('click', () => {
      editBtn.classList.toggle('hide');
      deleteBtn.classList.toggle('hide');
    });

    todoLiElement.appendChild(todoCheckboxElement);
    todoLiElement.appendChild(todoDescriptionElement);

    actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);
    actionBtns.appendChild(moreEllipsisBtn);

    todoLiElement.appendChild(actionBtns);
    ListElement.appendChild(todoLiElement);
  }
  saveData();
};

const addTodo = () => {
  const desc = document.getElementById('addtodo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = List.length + 1;
    List.push({ completed, description, index });
    displayToDo();
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
    displayToDo();
    saveData();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

const getIsEditing = () => isEditing;

export {
  retrivedata, addTodo, saveEdit, displayToDo, getIsEditing,
};

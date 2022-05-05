const globalEdit = require('./globalEdit.js');

// Add new Task
const addNew = (List) => {
  const desc = document.getElementById('addtodo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = List.length + 1;
    List.push({ completed, description, index });
    desc.value = null;
  }
  List = List.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));

  return List;
};

// Get Task List from Local Storage
const getData = () => {
  const localFormData = JSON.parse(localStorage.getItem('tasklist'));
  if (localFormData == null) {
    return [];
  }
  return localFormData;
};

// Save Task List to Local Storage
const storeList = (List) => {
  localStorage.setItem('tasklist', JSON.stringify(List));
};

// Save edited Task
const saveEdit = (List, todoEdit) => {
  const desc = document.getElementById('addtodo');
  if (desc.value) {
    List = List.map((todo) => {
      if (todo.index === todoEdit.index) {
        return { ...todo, description: desc.value };
      }
      return todo;
    });
    desc.value = null;

    return List;
  }
  return List;
};

// Edit selected task
const taskEdit = (todo) => {
  globalEdit.isEditing = true;
  globalEdit.todoEdit = todo;
  const desc = document.getElementById('addtodo');
  desc.value = todo.description;
};

module.exports = {
  addNew, getData, storeList, saveEdit, taskEdit,
};

/* exports.addNew = addNew;
exports.getData = getData; */
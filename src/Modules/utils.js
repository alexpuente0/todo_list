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
  console.log(localFormData);
  if (localFormData == null) {
    return List = [];
  } else {
    return localFormData;
  }
};

// Save Task List to Local Storage
const storeList = (List) => {
  localStorage.setItem('tasklist', JSON.stringify(List));
};

module.exports = { addNew, getData, storeList }

/* exports.addNew = addNew;
exports.getData = getData; */
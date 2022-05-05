const { addNew } = require('./src/Modules/utils.js');
const { saveEdit } = require('./src/Modules/utils.js');
const { cancelTask } = require('./src/Modules/taskmanage.js');
let taskMocks = require('./__mocks__/taskmocks.js');

beforeEach(() => {
  global.document = {
    getElementById: jest.fn(),
  };
});

afterEach(() => {
  delete global.document;
});

describe('Add new task', () => {
  test('Should return {completed: false, description: "new task", index: 1}', () => {
    document.getElementById.mockReturnValue({ value: 'new task' });
    const list = addNew([]);
    expect(list).toEqual([
      { completed: false, description: 'new task', index: 1 },
    ]);
  });
});

describe('Remove task', () => {
  test('Should delete Task 2 and return Tasks 1 and 3', () => {
    let list = [
      { completed: false, description: 'task 1', index: 1 },
      { completed: false, description: 'task 2', index: 2 },
      { completed: false, description: 'task 3', index: 3 },
    ];
    list = cancelTask(list, 2);
    expect(list).toEqual([
      { completed: false, description: 'task 1', index: 1 },
      { completed: false, description: 'task 3', index: 2 },
    ]);
  });
});

describe('Edit task', () => {
  test('Should modify a task description', () => {
    let todoEdit = taskMocks.todoEdit;
    console.log(todoEdit.index);
    document.getElementById.mockReturnValue({ value: 'edited' });
    let list = [
      { completed: false, description: 'task 1', index: 1 },
      { completed: false, description: 'task 3', index: 2 }
    ];
    
    list = saveEdit(list, {index: 1});
    expect(list).toEqual([
      { completed: false, description: 'edited', index: 1 },
      { completed: false, description: 'task 3', index: 2 }
    ]);
  });
});
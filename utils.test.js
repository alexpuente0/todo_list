const { addNew } = require('./src/Modules/utils.js');
const { saveEdit } = require('./src/Modules/utils.js');
const { cancelTask } = require('./src/Modules/taskmanage.js');
const { updateStatus } = require('./src/Modules/taskmanage.js');
const { clearCompleted } = require('./src/Modules/taskmanage.js');

beforeEach(() => {
  global.document = {
    getElementById: jest.fn(),
  };
});

afterEach(() => {
  delete global.document;
});

// add task

describe('Add new task', () => {
  test('Should return {completed: false, description: "new task", index: 1}', () => {
    document.getElementById.mockReturnValue({ value: 'new task' });
    const list = addNew([]);
    expect(list).toEqual([
      { completed: false, description: 'new task', index: 1 },
    ]);
  });
});

// remove task

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

// a function for editing the task description.

describe('Edit task', () => {
  test('Should modify a task description', () => {
    document.getElementById.mockReturnValue({ value: 'edited' });
    let list = [
      { completed: false, description: 'task 1', index: 1 },
      { completed: false, description: 'task 3', index: 2 },
    ];

    list = saveEdit(list, { index: 1 });
    expect(list).toEqual([
      { completed: false, description: 'edited', index: 1 },
      { completed: false, description: 'task 3', index: 2 },
    ]);
  });
});

// a function for updating an item's 'completed' status.

describe('Update list element status', () => {
  test('Should update completed status on element at given index', () => {
    let list = [
      { completed: false, description: 'task 1', index: 0 },
      { completed: false, description: 'task 3', index: 1 },
    ];

    list = updateStatus(list, 0);

    expect(list).toEqual([
      { completed: true, description: 'task 1', index: 0 },
      { completed: false, description: 'task 3', index: 1 },
    ]);
  });
});

// the "Clear all completed" function.

describe('Clear all task marked as completed', () => {
  test('Should delete all completed task from list', () => {
    let list = [
      { completed: false, description: 'task 1', index: 1 },
      { completed: true, description: 'task 2', index: 2 },
      { completed: false, description: 'task 3', index: 3 },
      { completed: true, description: 'task 4', index: 4 },
    ];
    list = clearCompleted(list);
    expect(list).toEqual([
      { completed: false, description: 'task 1', index: 1 },
      { completed: false, description: 'task 3', index: 2 },
    ]);
  });
});
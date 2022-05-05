const { addNew } = require('./src/Modules/utils.js');
const { cancelTask } = require('./src/Modules/taskmanage.js');

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
  test('Should return', () => {
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

const { addNew } = require('./src/Modules/addNew.js');

beforeEach(() => {
  global.document = {
    getElementById: jest.fn()
  }
});

afterEach(() => {
  delete global.document;
});


describe('Add new task', () => {
  test('Should return {completed: false, description: "new task", index: 1}', () => {
    document.getElementById.mockReturnValue({ value: 'new task' });
    expect(addNew([])).toEqual([{completed: false, description: 'new task', index: 1}]);
  });
});
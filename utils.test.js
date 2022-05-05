const { addNew } = require('./src/Modules/utils.js');

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
    let list = addNew([]);
    console.log(list);
    expect(list).toEqual([{completed: false, description: 'new task', index: 1}]);
  });
});

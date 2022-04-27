const ALLTASKS = [
  {
    description: 'Wash the Dishes',
    completed: true,
    index: 1,
  },
  {
    description: 'Complete ToDo list Project',
    completed: false,
    index: 2,
  },
];

export class List {
  tasks = [];

  constructor() {
    this.tasks = ALLTASKS;
    this.container = document.getElementById('list-item');
  }

  display() {
    this.tasks
      .sort((a, b) => b.index - a.index)
      .forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
        <span>
          ${
  !task.completed
    ? '<i class="bi bi-square"></i>'
    : '<i class="bi bi-check-square"></i>'
} ${task.description}
        </span>
        <i class="bi bi-three-dots-vertical"></i>
      `;
        this.container.after(taskItem);
      });
  }
}

export default new List();

export default class List {
  constructor() {
    const currentData = JSON.parse(localStorage.getItem('todo-list'));
    if (currentData) {
      this.items = currentData;
    } else {
      this.items = [
        {
          description: 'Play Games At Liquid Hackthon',
          completed: false,
          index: 1,
        },
        {
          description: 'Study JavaScript At 4: 45 PM',
          completed: false,
          index: 2,
        },
        {
          description: 'Build Pac-Man With JavaScript',
          completed: false,
          index: 3,
        },
        {
          description: 'Hang Out With Girlfriend',
          completed: false,
          index: 4,
        },
      ];
    }
  }

  displayItems() {
    this.saveItems();
    const listSection = document.querySelector('.items');
    listSection.innerHTML = '';
    this.items.forEach((task) => {
      let listItem = `
    <li>`;
      if (task.completed === true) {
        listItem += `
      <span class="material-icons update-status done" data-id="${task.index}">done</span>
      <p class="line-through activity" data-id="${task.index}"  contenteditable="true">${task.description}</p>`;
      } else {
        listItem += `
      <span class="material-icons update-status" data-id="${task.index}">check_box_outline_blank</span>
      <p  class="activity" data-id="${task.index}" contenteditable="true">${task.description}</p>`;
      }
      listItem += `
    <span class="material-icons more-info">more_vert</span>
    </li>`;
      listSection.innerHTML += listItem;
    });
    this.attachEvents();
  }

  updateStatus(index) {
    const arrIndex = index - 1;
    const currentStatus = this.items[arrIndex].completed;
    if (currentStatus === true) {
      currentStatus.completed = false;
    } else {
      currentStatus.completed = true;
    }
    this.displayItems();
  }

  saveItems() {
    // reorder indexes
    this.items.forEach((task, index) => {
      this.items[index].index = index + 1;
    });
    // sort indexes
    this.items.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    // save sorted items to localStorage
    localStorage.setItem('todo-list', JSON.stringify(this.items));
  }

  attachEvents() {
    const tasks = document.querySelectorAll('.update-status');
    tasks.forEach((task) => {
      task.addEventListener('click', (e) => {
        const activityId = e.target.getAttribute('data-id');
        const targetObject = this.items[activityId - 1];
        if (targetObject.completed === true) {
          this.items[activityId - 1].completed = false;
          e.target.innerHTML = 'check_box_outline_blank';
          e.target.classList.remove('done');
        } else {
          this.items[activityId - 1].completed = true;
          e.target.innerHTML = 'done';
          e.target.classList.add('done');
        }
        this.displayItems();
      });
    });
  }
}
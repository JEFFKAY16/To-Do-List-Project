export default class List {
  constructor() {
    const currentData = JSON.parse(localStorage.getItem('todo-list'));
    if (currentData) {
      this.items = currentData;
    } else {
      this.items = [];
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
    <span class="material-icons more-info delete-item" data-id="${task.index}">delete</span>
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

  addItem(name) {
    this.items.push({
      description: name,
      completed: false,
      index: this.items.length,
    });
    this.displayItems();
  }

  editItem(task, index) {
    this.items[index - 1].description = task;
    this.saveItems();
  }

  clearCompleted() {
    const unclearedItems = this.items.filter((item) => item.completed === false);
    this.items = unclearedItems;
    this.displayItems();
  }

  removeItem(index) {
    this.items.splice(index - 1, 1);
    this.displayItems();
  }

  attachEvents() {
    // update item status
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
    // delete Item
    const allItems = document.querySelectorAll('.delete-item');
    allItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-id');
        this.removeItem(index);
      });
    });
    // edit items
    const activities = document.querySelectorAll('.activity');
    activities.forEach((activity) => {
      activity.addEventListener('input', (e) => {
        const index = e.target.getAttribute('data-id');
        const newValue = e.target.innerText;
        this.editItem(newValue, index);
      });
    });
  }
}
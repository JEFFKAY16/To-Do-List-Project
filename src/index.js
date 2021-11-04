import './styles.css';
import List from './list';

const todoList = new List();

todoList.displayItems();

const form = document.querySelector('.input-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newItem = form.elements.new_item.value;
  todoList.addItem(newItem);
  form.reset();
});
document.querySelector('.clear-button').addEventListener('click', (e) => {
  e.preventDefault();
  todoList.clearCompleted();
});
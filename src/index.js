import './styles.css';

const tasks = [
  {
    description: 'Play Games At Liquid Telecoms Hackathon',
    completed: false,
    index: 0,
  },
  {
    description: 'Study JavaScript At 2:45 PM',
    completed: false,
    index: 1,
  },
  {
    description: 'Talk To Girlfriend',
    completed: false,
    index: 2,
  },
  {
    description: 'High Customer Success Manager',
    completed: false,
    index: 3,
  },
];

tasks.forEach((e) => {
  const template = document.createElement('template');
  template.innerHTML = `
  <li>
    <span class="material-icons show-default">check_box_outline_blank</span>
    <p contenteditable="true">${e.description}</p>
    <span class="material-icons more-info">more_vert</span>
  </li>`;
  document.querySelector('.items').appendChild(template.content);
});
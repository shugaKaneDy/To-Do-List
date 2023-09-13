const todoList = JSON.parse(localStorage.getItem('myTodoList')) || [
  /* {
    name: 'Watch YouTube',
    dueDate: '2022-12-22',
    icon: 'Tv'
  },
  {
    name: 'Journaling',
    dueDate: '2022-12-23',
    icon: 'Write'
  } */
];

function renderTodoList() {
  let todoListHTML = [];

  todoList.forEach((todoObject, index) => {
    const {name, dueDate, icon} = todoObject;
    const html = `
    <div class="task-container">
      <div class="task-date">
        <p class="task-date-text">${dueDate}</p>
      </div>
      <div class="task-img-container">
        <img src="icons/${icon}-icon.png" class="task-img">
      </div>
      <div class="task-description-delete">
        <p class="task-text">${name}</p>
      </div>
      <button class="task-button-delete js-delete-todo-button">
        <span class="material-symbols-outlined delete-icon">
          delete
        </span>
      </button>
    </div>`;
    todoListHTML += html;
  });
  console.log(todoListHTML)
  document.querySelector('.js-to-do-list')
    .innerHTML = todoListHTML;
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        console.log(index);
        todoList.splice(index, 1);
        renderTodoList();
    });
  });

  localStorage.setItem('myTodoList', JSON.stringify(todoList));
}

renderTodoList();
if (!(JSON.parse(localStorage.getItem('myTodoList')))) {
  renderTodoList();
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-date-input');
  const dueDate = dateInputElement.value;

  const iconElement = document.querySelector('#myDropdown');
  const icon = iconElement.value;

  todoList.push (
    {
      name,
      dueDate,
      icon
    }
  );
  inputElement.value = '';
  renderTodoList();
}


document.querySelector('.js-cancel-button')
  .addEventListener('click', () => {
    const addTaskContainer = document.querySelector('.js-add-task-content');

    addTaskContainer.classList.remove('add-task-content-cancel');

    console.log(addTaskContainer);

  });

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    const addTaskContainer = document.querySelector('.js-add-task-content');
    const dropDown = document.querySelector('#myDropdown');

    addTaskContainer.classList.remove('add-task-content-cancel');

    addTodo();
    console.log(addTaskContainer);
    console.log(dropDown.value);
    alert('To Do List Added');
  });

document.querySelector('.js-add-task-button')
  .addEventListener('click', () => {
    const addTaskContainer = document.querySelector('.js-add-task-content');

    addTaskContainer.classList.add('add-task-content-cancel');
    
  });

import { createTodos, delTodo, getProjects, editTodo } from "./controller";
import { mediator } from "./modals";
import { formatDistance } from 'date-fns';

function expandedTodo(e) {
    const expandedView = document.createElement('div');
    const currentDescription = document.createElement('p');
    currentDescription.textContent = `${e.target.parentElement.firstChild.nextElementSibling.nextElementSibling.textContent}`;
    expandedView.classList.add('expanded-view');
    expandedView.appendChild(currentDescription);
    return expandedView;
};

function removeTodo(e) {
    delTodo(e.target.parentElement.firstChild.nextElementSibling.textContent);
    e.target.parentElement.parentElement.remove();
}

function populateCurrentProject() {
    let projectFolder = document.querySelector('#project-folders').value;
    let todoTitle = document.querySelector('#todo-title').value;
    if (checkForDuplicateTodo(todoTitle)) {
        return
    }
    if(projectFolder == mediator) {
        return addTodoToView();
    } else {
        addTodoToView();
    }
};

function changeThroughProjects() {
    unpopulateTodosView();
    renderTodos();
};

function renderTodos() {
    getProjects().forEach((project) => {
        if (project.projectName === mediator) {
            project.todos.forEach((todo) => {
                const todoCard = createTodoElement(todo.title, todo.description, todo.date, todo.priority, todo.checked)
                document.querySelector('#todos-view').appendChild(todoCard);
            });
        };
    })
}

function unpopulateTodosView() {
    const todosView = document.getElementById('todos-view');
    while (todosView.firstChild) {
        todosView.removeChild(todosView.firstChild);
    }
}

function createTodoElement(title, description, date, priority, status) {
    const todo = document.createElement('div');
    const todoTitle = document.createElement('div')
    const todoDescription = document.createElement('div');
    const todoDate = document.createElement('div');
    const todoPriority = document.createElement('div');
    const todoStatus = document.createElement('div');
    const openEditModal = document.createElement('button');
    //New//
    const expandTodo = document.createElement('button');
    //New//
    const delTodoBtn = document.createElement('div');

    //New//
    const mainSection = document.createElement('div');
    //New//

    // Modal for editing Todo //
    const editTodoModal = document.createElement('dialog');

    const form = document.createElement('form');
    form.setAttribute('action', 'get');
    form.setAttribute('method', 'dialog');

    const closeEditModal = document.createElement('button');
    closeEditModal.textContent = 'X';
    form.appendChild(closeEditModal);

    const titleDiv = document.createElement('div');
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    titleLabel.setAttribute('for', 'edit-todo-title');
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('id', 'edit-todo-title');

    const descriptionDiv = document.createElement('div');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description';
    descriptionLabel.setAttribute('for', 'edit-description');
    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('name', 'description');
    descriptionInput.setAttribute('id', 'edit-description');

    const dateDiv = document.createElement('div');
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Date';
    dateLabel.setAttribute('for', 'edit-date');
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'date');
    dateInput.setAttribute('id', 'edit-date');

    const priorityDiv = document.createElement('div');
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority';
    priorityLabel.setAttribute('for', 'edit-priority');
    const prioritySelector = document.createElement('select');
    prioritySelector.setAttribute('name', 'priority');
    prioritySelector.setAttribute('id', 'edit-priority');
    const optionOne = document.createElement('option');
    optionOne.textContent = 'Low';
    optionOne.setAttribute('value', '1');
    const optionTwo = document.createElement('option');
    optionTwo.textContent = 'High';
    optionTwo.setAttribute('value', '2');
    prioritySelector.appendChild(optionOne);
    prioritySelector.appendChild(optionTwo);

    const statusDiv = document.createElement('div');
    const statusLabel = document.createElement('label');
    statusLabel.textContent = 'Status';
    statusLabel.setAttribute('for', 'edit-status');
    const statusSelector = document.createElement('select');
    statusSelector.setAttribute('name', 'status');
    statusSelector.setAttribute('id', 'edit-status');
    const statusOne = document.createElement('option');
    statusOne.textContent = 'true';
    statusOne.setAttribute('value', 'true');
    const statusTwo = document.createElement('option');
    statusTwo.textContent = 'false';
    statusTwo.setAttribute('value', 'false');
    statusSelector.appendChild(statusOne);
    statusSelector.appendChild(statusTwo);

    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    form.appendChild(titleDiv);

    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionInput);
    form.appendChild(descriptionDiv);

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);
    form.appendChild(dateDiv);

    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(prioritySelector);
    form.appendChild(priorityDiv);

    statusDiv.appendChild(statusLabel);
    statusDiv.appendChild(statusSelector);
    form.appendChild(statusDiv);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'EDIT';
    editBtn.setAttribute('type', 'submit');
    form.appendChild(editBtn);

    editTodoModal.appendChild(form);
    // Modal for editing Todo //

    todoTitle.textContent = `${title}`;
    todoDescription.textContent = `${description}`;

    todoDate.textContent = `${formatDistance(new Date(date), new Date(), { addSuffix: true })}`;

    todoPriority.textContent = `${priority}`;
    todoStatus.textContent = `${status}`;
    openEditModal.textContent = 'EDIT';
    expandTodo.textContent = '▼';
    delTodoBtn.textContent = 'X';

    todo.classList.add('todo');

    editBtn.addEventListener('click', (e) => {
        editeSelectedTodo(e);
    });

    openEditModal.addEventListener('click', (e) => {
        titleInput.value = `${e.target.parentElement.firstElementChild.nextElementSibling.textContent}`;
        descriptionInput.value = `${e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent}`;
        dateInput.value = `${e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent}`;
        prioritySelector.value = `${e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent}`;
        statusSelector.value = `${e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent}`;
        editTodoModal.showModal();
    });

    closeEditModal.addEventListener('click', () => {
        editTodoModal.close();
    });

    //New//
    expandTodo.addEventListener('click', (e) => {
        if(e.target.parentElement.parentElement.lastChild.classList.contains('expanded-view')) {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.lastChild);
        } else {
            todo.appendChild(expandedTodo(e));
        };
    });
    //New//

    delTodoBtn.addEventListener('click', (e) => {
        removeTodo(e);
    });

    mainSection.appendChild(editTodoModal);
    mainSection.appendChild(todoTitle);
    mainSection.appendChild(todoDescription);
    mainSection.appendChild(todoDate);
    mainSection.appendChild(todoPriority);
    mainSection.appendChild(todoStatus);
    mainSection.appendChild(openEditModal);
    mainSection.appendChild(expandTodo);
    mainSection.appendChild(delTodoBtn);
    todo.appendChild(mainSection);

    return todo;
};

function addTodoToView() {
    let todoTitle = document.querySelector('#todo-title').value;
    let description = document.querySelector('#description').value;
    let date = document.querySelector('#date').value.replace(/-/g, ',');
    let priority = document.querySelector('#priority').value;
    let status = document.querySelector('#status').value;
    let projectFolder = document.querySelector('#project-folders').value;

    console.log(todoTitle);
    console.log(description);
    console.log(date);
    console.log(priority);
    console.log(status);
    console.log(projectFolder);

    createTodos(todoTitle, description, date, priority, status, projectFolder);

    return createTodoElement(todoTitle, description, date, priority, status);
}

function editeSelectedTodo(e) {
    let currentTodoTitle = e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
    let todoTitle = e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value;
    let description = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value;
    let date = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value;
    let priority = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value;
    let status = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value;

    e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.textContent = `${todoTitle}`;
    e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent = `${description}`;
    e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent = `${formatDistance(new Date(date), new Date(), { addSuffix: true })}`;
    e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent = `${priority}`;
    e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent = `${status}`;

    editTodo(currentTodoTitle, todoTitle, description, date, priority, status);
}

function checkForDuplicateTodo(todoTitle) {
    let duplicate;
    const projects = getProjects();    

    for (let i=0; i < projects.length; i++) {
        for (let j=0; j < projects[i].todos.length; j++) {
            if (projects[i].todos[j].title === todoTitle) {
                duplicate = true;
                console.log('A todo with this title already exists!');
            }
        }
    }

    return duplicate;
};

export {populateCurrentProject, unpopulateTodosView, changeThroughProjects};
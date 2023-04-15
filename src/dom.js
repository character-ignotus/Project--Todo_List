import { createProject, createTodos, delProject, delTodo, loger, getProjects } from "./controller";
const projectModal = document.querySelector('.project-modal');
const todosModal = document.querySelector('.todos-modal');

let mediator = 'Default';

function openProjectsModal() {
    projectModal.showModal();
};

function closeProjectsModal() {
    projectModal.close();
};

function openTodosModal() {
    todosModal.showModal();
};

function closeTodosModal() {
    todosModal.close();
};

function defaultProject() {
    const defaultPrj = document.getElementById('default');
    defaultPrj.addEventListener('click', () => {
        updateMediator('Default');
        console.log(mediator);
        changeThroughProjects();
    });
}

// Additional Functionality
function addToProjectsList(projectName) {
    const projectOption = document.createElement('option');
    projectOption.setAttribute(`id`, `${projectName}`);
    projectOption.textContent = `${projectName}`;
    projectOption.value = `${projectName}`;
    document.getElementById('project-folders').appendChild(projectOption);
}

function removeFromProjectsList(e) {
    let projectOption = document.getElementById(`${e.target.previousElementSibling.textContent}`);
    document.getElementById('project-folders').removeChild(projectOption);
}
// Additional Functionality

function removeFromProjectView(e) {
    removeFromProjectsList(e);

    delProject(e.target.previousElementSibling.textContent);
    document.querySelector('#projects').removeChild(e.target.parentElement);

    loger();
};

function createProjectElement(project) {
    const projectCard = document.createElement('div');
    const projecOpentBtn = document.createElement('button');
    const projecCloseBtn = document.createElement('button');

    projecOpentBtn.textContent = `${project.projectName}`;
    projecCloseBtn.textContent = `X`;

    projecOpentBtn.addEventListener('click', (e) => {
        updateMediator(e.target.textContent);
        console.log(mediator);
        changeThroughProjects();
    })

    projecCloseBtn.addEventListener('click', (e) => {
        removeFromProjectView(e);
        updateMediator('Default');
        changeThroughProjects();
    });

    projectCard.classList.add('project');

    projectCard.appendChild(projecOpentBtn);
    projectCard.appendChild(projecCloseBtn);

    addToProjectsList(project.projectName)

    return projectCard;
};

function populateProjectsView() {
    let projectName = document.querySelector('#project-name').value;
    if (checkForDuplicateProject(projectName)) {
        return
    } else {
        createProject(projectName);
        const projects = getProjects();
        return createProjectElement(projects[projects.length - 1]);
    }
};

function updateMediator(projectName) {
    mediator = projectName;
}

function populateCurrentProject() {
    let projectFolder = document.querySelector('#project-folders').value;
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
                const todoCard = document.createElement('div');
                const todoTitle = document.createElement('div')
                const todoDescription = document.createElement('div');
                const todoDate = document.createElement('div');
                const todoPriority = document.createElement('div');
                const todoStatus = document.createElement('div');

                todoTitle.textContent = todo.title;
                todoDescription.textContent = todo.description;
                todoDate.textContent = todo.date;
                todoPriority.textContent = todo.priority;
                todoStatus.textContent = todo.checked;

                todoCard.classList.add('todo');

                todoCard.appendChild(todoTitle);
                todoCard.appendChild(todoDescription);
                todoCard.appendChild(todoDate);
                todoCard.appendChild(todoPriority);
                todoCard.appendChild(todoStatus);
            
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

    todoTitle.textContent = `${title}`;
    todoDescription.textContent = `${description}`;
    todoDate.textContent = `${date}`;
    todoPriority.textContent = `${priority}`;
    todoStatus.textContent = `${status}`;

    todo.classList.add('todo');

    todo.appendChild(todoTitle);
    todo.appendChild(todoDescription);
    todo.appendChild(todoDate);
    todo.appendChild(todoPriority);
    todo.appendChild(todoStatus);

    return todo;
};

function addTodoToView() {
    let todoTitle = document.querySelector('#todo-title').value;
    let description = document.querySelector('#description').value;
    let date = document.querySelector('#date').value;
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

    return createTodoElement(todoTitle, description, date, priority, status, projectFolder);
}


function checkForDuplicateProject(projectName) {
    let duplicate;    
    getProjects().forEach((project) => {
        if(project.projectName == projectName) {
            duplicate = true;
        }
    })
    return duplicate;
};

export {openProjectsModal, closeProjectsModal, openTodosModal, closeTodosModal, populateProjectsView, removeFromProjectView, populateCurrentProject, unpopulateTodosView, defaultProject};




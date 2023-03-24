import { createProject, createTodos, delProject, delTodo, loger, getProjects } from "./controller";
const projectModal = document.querySelector('.project-modal');
const todosModal = document.querySelector('.todos-modal');

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

// Additional Functionality
function addToProjectsList(projectName) {
    const projectOption = document.createElement('option');
    projectOption.setAttribute(`id`, `${projectName}`)
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

    projecCloseBtn.addEventListener('click', (e) => {
        removeFromProjectView(e);
    });

    projectCard.classList.add('project');

    projectCard.appendChild(projecOpentBtn);
    projectCard.appendChild(projecCloseBtn);

    addToProjectsList(project.projectName)

    return projectCard;
};

function populateProjectsView() {
    let projectName = document.querySelector('#project-name').value;
    createProject(projectName);
    const projects = getProjects();
    return createProjectElement(projects[projects.length - 1]);
};

export {openProjectsModal, closeProjectsModal, openTodosModal, closeTodosModal, populateProjectsView, removeFromProjectView};




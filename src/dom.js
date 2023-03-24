import { createProject, createTodos, delProject, delTodo, loger, getProjects } from "./controller";

const modal = document.querySelector('.modal');

function openProjectsModal() {
        modal.showModal();
};

function closeProjectsModal() {
        modal.close();
};

function removeFromProjectView(e) {
    delProject(e.target.previousElementSibling.textContent);
    document.querySelector('#projects').removeChild(e.target.parentElement);
    loger();
}

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

    return projectCard;
}

function populateProjectsView() {
    let projectName = document.querySelector('#project-name').value;
    createProject(projectName);
    const projects = getProjects();
    return createProjectElement(projects[projects.length - 1]);
}

export {openProjectsModal, closeProjectsModal, populateProjectsView, removeFromProjectView};




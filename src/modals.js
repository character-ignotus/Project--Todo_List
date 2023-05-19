const projectModal = document.querySelector('.project-modal');
const todosModal = document.querySelector('.todos-modal');

let mediator = 'Default';

function updateMediator(projectName) {
    mediator = projectName;
}

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


function addToProjectsList(projectName) {
    const projectOption = document.createElement('option');
    projectOption.setAttribute(`id`, `${projectName}`);
    projectOption.textContent = `${projectName}`;
    projectOption.value = `${projectName}`;
    document.getElementById('project-folders').appendChild(projectOption);
}

function removeFromProjectsList(e) {
    let projectOption = document.getElementById(`${e.target.previousElementSibling.previousElementSibling.textContent}`);
    document.getElementById('project-folders').removeChild(projectOption);
}

export {openProjectsModal, closeProjectsModal, openTodosModal, closeTodosModal, mediator, updateMediator, addToProjectsList, removeFromProjectsList};
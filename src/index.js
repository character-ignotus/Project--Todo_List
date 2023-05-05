import './styles/style.css'
import { createProject, createTodos, delProject, delTodo, loger } from "./controller";
import { openProjectsModal, closeProjectsModal, openTodosModal, closeTodosModal, populateProjectsView, populateCurrentProject, unpopulateTodosView, defaultProject } from "./dom"

// Opening & closing modal for projects //
document.querySelector('#add-project').addEventListener('click', openProjectsModal);
document.querySelector('.close-project-modal').addEventListener('click', closeProjectsModal);
// Opening & closing modal for projects //

// Opening & closing modal for todos //
document.querySelector('#add-todo').addEventListener('click', openTodosModal);
document.querySelector('.close-todos-modal').addEventListener('click', closeTodosModal);
// Opening & closing modal for todos //

function checkValues(e) {
    const inputs = Array.from(e.target.parentElement.firstElementChild.nextElementSibling.querySelectorAll('input'));

    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value == '') {
            return true;
        };
    };
}

document.querySelector('.submit-project').addEventListener('click', (e) => {
    const input = e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.querySelector('input');

    if(input.value == '') return

    document.querySelector('#projects').appendChild(populateProjectsView());
    window.loger();
});

document.querySelector('.submit-todo').addEventListener('click', (e) => {
    if(checkValues(e)) return;
    document.querySelector('#todos-view').appendChild(populateCurrentProject());
    window.loger();
});

defaultProject();
window.loger = loger;
window.createProject = createProject;
window.createTodos = createTodos;
window.delProject = delProject;
window.delTodo = delTodo;
window.unpopulateTodosView = unpopulateTodosView;
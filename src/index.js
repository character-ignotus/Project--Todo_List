import './styles/style.css'
import { createProject, createTodos, delProject, delTodo, loger } from "./controller";
import { openProjectsModal, closeProjectsModal, openTodosModal, closeTodosModal, populateProjectsView, populateCurrentProject } from "./dom"

// Opening & closing modal for projects //
document.querySelector('#add-project').addEventListener('click', openProjectsModal);
document.querySelector('.close-project-modal').addEventListener('click', closeProjectsModal);
// Opening & closing modal for projects //

// Opening & closing modal for todos //
document.querySelector('#add-todo').addEventListener('click', openTodosModal);
document.querySelector('.close-todos-modal').addEventListener('click', closeTodosModal);
// Opening & closing modal for todos //

document.querySelector('.submit-project').addEventListener('click', () => {
    document.querySelector('#projects').appendChild(populateProjectsView());
    window.loger();
});

document.querySelector('.submit-todo').addEventListener('click', () => {
    document.querySelector('#todos').appendChild(populateCurrentProject());
    window.loger();
});

window.loger = loger;
window.createProject = createProject;
window.createTodos = createTodos;
window.delProject = delProject;
window.delTodo = delTodo;
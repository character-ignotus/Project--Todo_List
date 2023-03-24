import './styles/style.css'
import { createProject, createTodos, delProject, delTodo, loger } from "./controller";
import { openProjectsModal, closeProjectsModal, openTodosModal, closeTodosModal, populateProjectsView } from "./dom"

document.querySelector('#add-project').addEventListener('click', openProjectsModal);
document.querySelector('.close-project-modal').addEventListener('click', closeProjectsModal);

document.querySelector('#add-todo').addEventListener('click', openTodosModal);
document.querySelector('.close-todos-modal').addEventListener('click', closeTodosModal);

document.querySelector('.submit-project').addEventListener('click', () => {
    document.querySelector('#projects').appendChild(populateProjectsView());
    window.loger();
});

window.loger = loger;
window.createProject = createProject;
window.createTodos = createTodos;
window.delProject = delProject;
window.delTodo = delTodo;
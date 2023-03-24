import './styles/style.css'
import { createProject, createTodos, delProject, delTodo, loger } from "./controller";
import { openProjectsModal, closeProjectsModal } from "./dom"

document.querySelector('#add-project').addEventListener('click', openProjectsModal);
document.querySelector('.close-project-modal').addEventListener('click', closeProjectsModal);

window.loger = loger;
window.createProject = createProject;
window.createTodos = createTodos;
window.delProject = delProject;
window.delTodo = delTodo;
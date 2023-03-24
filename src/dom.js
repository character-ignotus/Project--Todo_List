import { createProject, createTodos, delProject, delTodo, loger, getProjects } from "./controller";

const modal = document.querySelector('.modal');

function openProjectsModal() {
        modal.showModal();
};

function closeProjectsModal() {
        modal.close();
};

export {openProjectsModal, closeProjectsModal};




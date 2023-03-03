import todosCreator from "./todos";
import projectsCreator from "./projects";

const projects = [];

projects.push(projectsCreator('Default'));

function createProject(projectName) {
    projects.push(projectsCreator(projectName));
};

function createTodos(title, description, date, priorityChecker, isChecked, selectedProject) {
    if(!selectedProject) {
        selectedProject = "Default";
    }
    
    projects.forEach((project) => {
        if (project.projectName === selectedProject) {
            project.todos.push(todosCreator(title, description, date, priorityChecker, isChecked));
        }
    })
};

function delProject(projectName) {
    if (projectName === 'Default') return;

    projects.filter((project, index) => {
        if (project.projectName === projectName) {
            projects.splice(index, 1);
        }
    })
};

function delTodo(todoTitle) {
    for (let i=0; i < projects.length; i++) {
        for (let j=0; j < projects[i].todos.length; j++) {
            if (projects[i].todos[j].title === todoTitle) {
                projects[i].todos.splice(j, 1);
                break;
            }
        }
    }
}

function loger() {
    console.log(projects);
}

export {createProject, createTodos, delProject, delTodo, loger};
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
    };
    
    projects.forEach((project) => {
        if (project.projectName === selectedProject) {
            project.todos.push(todosCreator(title, description, date, priorityChecker, isChecked));
        } else {
            console.log(`Project doesn't exist!`);
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
};

function editTodo(todoTitle, editedTitle, editedDescription, editedDate, editedPriority, editedChecked) {
    for (let i=0; i < projects.length; i++) {
        for (let j=0; j < projects[i].todos.length; j++) {
            if (projects[i].todos[j].title === todoTitle) {
                projects[i].todos[j].title = editedTitle;
                projects[i].todos[j].description = editedDescription;
                projects[i].todos[j].date = editedDate;
                if(editedPriority == 1) {
                    projects[i].todos[j].priority = 'low';
                } else {
                    projects[i].todos[j].priority = 'high';
                };
                projects[i].todos[j].checked = editedChecked;
                break;
            }
        }
    }
};

function loger() {
    console.log(projects);
};

function getProjects() {
    return projects;
}

export {createProject, createTodos, delProject, delTodo, loger, getProjects, editTodo};
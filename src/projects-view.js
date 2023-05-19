import { createProject, delProject, loger, getProjects } from "./controller";
import { mediator, updateMediator, addToProjectsList, removeFromProjectsList } from "./modals";
import { changeThroughProjects } from "./todos-view";

function defaultProject() {
    const defaultPrj = document.getElementById('default');
    defaultPrj.addEventListener('click', () => {
        updateMediator('Default');
        console.log(mediator);
        changeThroughProjects();
    });
}

function removeFromProjectView(e) {
    removeFromProjectsList(e);

    delProject(e.target.previousElementSibling.previousElementSibling.textContent);
    document.querySelector('#projects').removeChild(e.target.parentElement.parentElement);

    loger();
};

function expandProject(e) {
    const currentProject = e.target.parentElement.firstChild.textContent;
    const expandedView = document.createElement('div');
    expandedView.classList.add('expanded-view');

    getProjects().forEach((project) => {
        if (project.projectName === currentProject) {
            project.todos.forEach(todo => {
                const todoExpansion = document.createElement('div');
                const todoTitle = document.createElement('p');
                const todoDate = document.createElement('p');
                todoTitle.textContent = `${todo.title}`;
                todoDate.textContent = `${todo.date}`;
                todoExpansion.appendChild(todoTitle);
                todoExpansion.appendChild(todoDate);
                expandedView.appendChild(todoExpansion);
            });
        };
    })

    return expandedView;
};


function createProjectElement(project) {
    const projectCard = document.createElement('div');
    const buttonSection = document.createElement('div');
    const projecOpentBtn = document.createElement('button');
    const projectExpnadBtn = document.createElement('button');
    const projecCloseBtn = document.createElement('button');

    projecOpentBtn.textContent = `${project.projectName}`;
    projectExpnadBtn.textContent = '▼';
    projecCloseBtn.textContent = `X`;

    projecOpentBtn.addEventListener('click', (e) => {
        updateMediator(e.target.textContent);
        console.log(mediator);
        changeThroughProjects();
    });

    projectExpnadBtn.addEventListener('click', (e) => {
        if(e.target.parentElement.parentElement.lastChild.classList.contains('expanded-view')) {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.lastChild);
        } else {
            projectCard.appendChild(expandProject(e));
        };
    });

    projecCloseBtn.addEventListener('click', (e) => {
        removeFromProjectView(e);
        updateMediator('Default');
        changeThroughProjects();
    });

    projectCard.classList.add('project');

    buttonSection.appendChild(projecOpentBtn);
    buttonSection.appendChild(projectExpnadBtn);
    buttonSection.appendChild(projecCloseBtn);

    projectCard.appendChild(buttonSection);

    addToProjectsList(project.projectName)

    return projectCard;
};

function populateProjectsView() {
    let projectName = document.querySelector('#project-name').value;
    if (checkForDuplicateProject(projectName)) {
        return
    } else {
        createProject(projectName);
        const projects = getProjects();
        return createProjectElement(projects[projects.length - 1]);
    }
};

function checkForDuplicateProject(projectName) {
    let duplicate;    
    getProjects().forEach((project) => {
        if(project.projectName == projectName) {
            duplicate = true;
        }
    })
    return duplicate;
};

export {populateProjectsView, defaultProject};
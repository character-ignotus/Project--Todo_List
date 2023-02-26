export default function todosCreator(title, description, date, priorityChecker, isChecked) {
    const priority = (() => priorityChecker === 1 ? 'low' : 'high')();
    const checked = (() => isChecked ? true : false)();

    return {title, description, date, priority, checked};
}
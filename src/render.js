const createButton = document.getElementById('create');
createButton.onclick = createInputField;

const body = document.body;

function createInputField() {
    // delete button
    deleteElement('.interface-container', 'create');

    // create text field
    const input = document.createElement('input')

    input.type = 'text';
    input.id = 'text-input';
    input.placeholder = 'Type something...';

    // create enter button
    const enterButton = document.createElement('button');
    enterButton.id = 'enter';
    enterButton.textContent = '+';
    enterButton.onclick = addTask;

    // add to div and body
    const newTaskInput = document.createElement('div');
    newTaskInput.className = 'new-Task-Input';
    newTaskInput.appendChild(input);
    newTaskInput.appendChild(enterButton);
    // div at the top of the body
    document.querySelector('.interface-container').appendChild(newTaskInput);
}


function deleteElement(div, id) {
    const container = document.querySelector(div);
    container.removeChild(document.getElementById(id));
}


function addTask() {
    const input = document.getElementById('text-input')
    description = input.value;

    // creat a task using description
    createTask(description);
    // delete input, button and div
    document.querySelector('.new-Task-Input').remove();
    // recover old button
    const oldButton = document.createElement('button');
    oldButton.id = 'create';
    oldButton.textContent = 'create';
    oldButton.onclick = createInputField;
    document.querySelector('.interface-container').appendChild(oldButton);

}


function createTask(description) {
    // access a specific div (todo create an empty div for all tasks)
    const allTasksDiv = document.querySelector('.all-tasks');

    // create a new task div with unique id
    const newDiv = document.createElement('div');
    randomID = Math.floor(100000 + Math.random() * 900000);
    newDiv.id = randomID;
    newDiv.textContent = description;
    // add remove button (later edit button)
    const removeButton = document.createElement('button');
    removeButton.id = randomID;
    removeButton.textContent = "-";
    removeButton.onclick = function () {
        document.getElementById(removeButton.id).remove();
    };
    // add div and button to div
    newDiv.appendChild(removeButton);
    allTasksDiv.appendChild(newDiv);
}
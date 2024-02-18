const createButton = document.getElementById('create');
createButton.onclick = createInputField;

const body = document.body;

function createInputField() {
    // hide create button
    hideByID('create');

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
    // show create button
    showByID('create');
}


function createTask(description) {
    // access a specific div (todo create an empty div for all tasks)
    const allTasksDiv = document.querySelector('.all-tasks');

    // create a new task div with unique id
    const newDiv = document.createElement('div');
    randomID = Math.floor(100000 + Math.random() * 900000);
    newDiv.id = randomID;
    newDiv.textContent = description;
    
    // add remove button
    const removeButton = document.createElement('button');
    removeButton.id = randomID;
    removeButton.textContent = "-";
    removeButton.onclick = function () {
        document.getElementById(removeButton.id).remove();
    };

    //  *** TO DO ***

    // add edit button
    // const editButton = document.createElement('button');
    // editButton.id = randomID;
    // editButton.textContent = "?";
    // editButton.onclick = function () {
    //     editTask(editButton.id);
    // };

    // add div and buttons to div
    newDiv.appendChild(removeButton);
    // newDiv.appendChild(editButton);
    allTasksDiv.appendChild(newDiv);
}

function editTask(id) {
    // get old text content
    const task = document.getElementById(id);
    let oldContent = task.textContent;
    // create input field with old text content
    const inputField = document.createElement('input');
    inputField.defaultValue = oldContent;
    // enter button
    const enterButton = document.createElement('button');
    enterButton.id = id;
    enterButton.textContent = "ok";
    enterButton.onclick = function () {
        document.getElementById(enterButton.id).remove();
        createTask(inputField.value);
    }
    // add input and button to div with id
    task.appendChild(inputField);
    task.appendChild(enterButton);
}

function hideByID(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'none';
    }
}

function showByID(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'block';
    }
}
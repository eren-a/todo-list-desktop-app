const createButton = document.getElementById('create');
createButton.onclick = createInputField;

const body = document.body;

function createInputField() {
    // hide create button
    hideElement('create');

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
    if (description) {
        createTask(description);
    }
    document.querySelector('.new-Task-Input').remove();
    showElement('create');
}


function createTask(description) {
    // access a specific div (todo create an empty div for all tasks)
    const allTasksDiv = document.querySelector('.all-tasks');

    // create a new task div with unique id
    const newDiv = document.createElement('div');
    randomID = Math.floor(100000 + Math.random() * 900000);
    newDiv.id = randomID;
    newDiv.textContent = description;

    const removeButton = addRemoveButton(randomID);

    const editButton = addEditButton(randomID);

    // add div and buttons to div
    newDiv.appendChild(removeButton);
    newDiv.appendChild(editButton);
    allTasksDiv.appendChild(newDiv);
}

function addEditButton(id) {
    const editButton = document.createElement('button');
    editButton.id = id;
    editButton.textContent = "?";
    editButton.onclick = function () {
        editTask(editButton.id);
    };
    return editButton;
}

function addRemoveButton(id) {
    const removeButton = document.createElement('button');
    removeButton.id = id;
    removeButton.textContent = "-";
    removeButton.onclick = function () {
        document.getElementById(removeButton.id).remove();
    };
    return removeButton;
}

function editTask(id) {
    // hide current divs
    hideElement('all-tasks');
    hideElement('interface-container');

    // get old text content
    const task = document.getElementById(id);
    // remove 2 characters (text content of buttons)
    let oldContent = task.textContent.slice(0, -2);

    // create input field with old text content
    const inputField = document.createElement('input');
    inputField.id = '100';
    inputField.defaultValue = oldContent;

    // enter button
    const enterButton = document.createElement('button');
    enterButton.id = '101';
    enterButton.textContent = 'ok';
    enterButton.onclick = function () {
        document.getElementById('100').remove();
        document.getElementById('101').remove();
        // document.getElementById(id).remove();
        // createTask(inputField.value);
        document.getElementById(id).textContent = inputField.value;
        task.appendChild(addRemoveButton(id));
        task.appendChild(addEditButton(id));
        showElement('all-tasks');
        showElement('interface-container');
    }
    // add input and button to div with id
    body.appendChild(inputField);
    body.appendChild(enterButton);
}

function hideElement(id) {
    let element = document.getElementById(id);
    if(!element) {
        element = document.getElementsByClassName(id)[0];
    }
    element.style.display = 'none';
}

function showElement(id) {
    let element = document.getElementById(id);
    if(!element) {
        element = document.getElementsByClassName(id)[0];
    }
    element.style.display = 'block';
}
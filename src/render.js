const createButton = document.getElementById('create');
createButton.onclick = createInputField;

const body = document.body;

function createInputField() {
    // hide create button
    hideElement('create');

    // create text field
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'text-input';
    input.placeholder = 'Type something...';

    // create enter button
    const enterButton = document.createElement('button');
    enterButton.id = 'enter';
    enterButton.textContent = '+';
    enterButton.onclick = addTask;

    // create coloring buttons
    const color = document.createElement('input');
    color.type = 'color';
    color.id = 'color-input';
    color.value = randomizedColor();


    // add to div and body
    const newTaskInput = document.createElement('div');
    newTaskInput.className = 'new-Task-Input';
    newTaskInput.appendChild(input);
    newTaskInput.appendChild(enterButton);
    newTaskInput.append(color);
    // div at the top of the body
    document.querySelector('.interface-container').appendChild(newTaskInput);
}


function addTask() {
    let description = document.getElementById('text-input').value;
    let color = document.getElementById('color-input').value;
    if (description) {
        createTask(description, color);
    }
    document.querySelector('.new-Task-Input').remove();
    showElement('create');
}

function randomizedColor() {
    const r = Math.floor(Math.random() * (255 - 50 + 1)) + 50;
    const g = Math.floor(Math.random() * (255 - 50 + 1)) + 50;
    const b = Math.floor(Math.random() * (255 - 50 + 1)) + 50;
    return rgbToHex(r,g,b);
}

function rgbToHex(r, g, b) {
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    return `#${hexR}${hexG}${hexB}`;
}

function createTask(description, color) {
    // access a specific div (todo create an empty div for all tasks)
    const allTasksDiv = document.querySelector('.all-tasks');

    // create a new task div with unique id
    const newDiv = document.createElement('div');
    randomID = Math.floor(100000 + Math.random() * 900000);
    newDiv.id = randomID;
    newDiv.textContent = description;

    // bigger background => cant see the whole gradient
    newDiv.style.backgroundSize = '150% 150%';
    newDiv.style.backgroundImage = `linear-gradient(45deg, ${color} 20%, white)`;

    const checkbox = addCheckbox(randomID);

    const editButton = addEditButton(randomID);

    // add div and buttons to div
    newDiv.appendChild(checkbox);
    newDiv.appendChild(editButton);
    allTasksDiv.appendChild(newDiv);
}

function addEditButton(id) {
    const editButton = document.createElement('button');
    editButton.className = "edit"
    editButton.id = id;
    editButton.onclick = function () {
        editTask(editButton.id);
    };
    return editButton;
}
/*
function addCheckbox(id) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.onclick = function () {
        document.getElementById(id).classList.add('fade-out');
        setTimeout(function() {
            document.getElementById(checkbox.id).remove();
        }, 500);
    };
    return checkbox;
}
*/

function addCheckbox(id) {
    const checkbox = document.createElement('button');
    checkbox.className = "checkbox"
    checkbox.id = id;
    checkbox.onclick = function () {
        document.getElementById(id).classList.add('fade-out');
        setTimeout(function() {
            document.getElementById(checkbox.id).remove();
        }, 500);
    };
    return checkbox;
}

function editTask(id) {
    // hide current divs
    hideElement('all-tasks');
    hideElement('interface-container');

    // get old text content
    const task = document.getElementById(id);
    let oldContent = task.textContent;

    // create input field with old text content
    const inputField = document.createElement('input');
    inputField.id = '100';
    inputField.defaultValue = oldContent;

    // enter button
    const enterButton = document.createElement('button');
    enterButton.id = 'ok';
    enterButton.onclick = function () {
        document.getElementById('100').remove();
        document.getElementById('ok').remove();
        document.getElementById(id).textContent = inputField.value;
        task.appendChild(addCheckbox(id));
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
    if (!element) {
        element = document.getElementsByClassName(id)[0];
    }
    element.style.display = 'none';
}

function showElement(id) {
    let element = document.getElementById(id);
    if (!element) {
        element = document.getElementsByClassName(id)[0];
    }
    element.style.display = 'block';
}
let current = { minutes: 25, seconds: 0 };
let seconds = current.seconds;
let minutes = current.minutes;
let timerInterval;

function update() {
    const num = document.getElementById("number");
    num.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById("Start").addEventListener("click", function () {
    startTimer();
    document.getElementById("ST").innerHTML = timerRunning ? "PAUSE" : "START";
});

document.getElementById("pom").addEventListener("click", function () {
    current = { minutes: 25, seconds: 0 };
    resetTimer();
});

document.getElementById("SB").addEventListener("click", function () {
    current = { minutes: 10, seconds: 0 };
    resetTimer();
});

document.getElementById("LB").addEventListener("click", function () {
    current = { minutes: 15, seconds: 0 };
    resetTimer();
});

let timerRunning = false;

function startTimer() {
    if (!timerRunning) {
        clearInterval(timerInterval);
        timerRunning = true;
        timerInterval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                timerRunning = false;
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                update();
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        timerRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    minutes = current.minutes;
    seconds = current.seconds;
    update();
}

const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task-button");

function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.draggable = true; // Make the task item draggable

    // Create a delete button for the task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        // Remove the task when the delete button is clicked
        taskList.removeChild(li);
        taskCount--; // Decrease the task count
        updateTaskCount(); // Update the displayed task count
    });

    // Append the delete button to the task item
    li.appendChild(deleteButton);

    // Add event listeners for drag-and-drop
    li.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.textContent);
    });

    // Handle the dragover event on the task item
    li.addEventListener('dragover', (event) => {
        event.preventDefault();
        const draggedItem = document.querySelector('li[draggable="true"][data-dragging="true"]');
        if (draggedItem !== null && li !== draggedItem) {
            // Insert the dragged item before or after the current item
            if (event.clientY < li.getBoundingClientRect().top + li.offsetHeight / 2) {
                taskList.insertBefore(draggedItem, li);
            } else {
                taskList.insertBefore(draggedItem, li.nextSibling);
            }
        }
    });

    // Handle the drop event on the task item
    li.addEventListener('drop', (event) => {
        event.preventDefault();
    });

    taskList.appendChild(li);
    taskCount++; // Increase the task count
    updateTaskCount(); // Update the displayed task count
}

let taskCount = 0;

function updateTaskCount() {
    const taskCountElement = document.getElementById("task-count");
    taskCountElement.textContent = taskCount;
}

addTaskButton.addEventListener("click", function () {
    const taskText = newTaskInput.value;
    if (taskText.trim() !== "") {
        addTask(taskText);
        newTaskInput.value = "";
    }
});

// Handle the dragstart and dragend events for the entire task list
taskList.addEventListener('dragstart', function (event) {
    event.target.setAttribute('data-dragging', 'true');
    event.dataTransfer.setData('text/plain', event.target.textContent);
});

taskList.addEventListener('dragend', function (event) {
    event.target.removeAttribute('data-dragging');
});

updateTaskCount();

let current = { minutes: 25, seconds: 0 };
let seconds = current.seconds;
let minutes = current.minutes;
let timerInterval;

//
function update() {
    const num = document.getElementById("number");
    num.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById("Start").addEventListener("click", function () {
    startTimer();
    document.getElementById("ST").innerHTML = "PAUSE";

    if(timerRunning == false){
        document.getElementById("ST").innerHTML = "START";
    }
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

let timerRunning = false; // Add a flag to track the timer state

function startTimer() {
    if (!timerRunning) {
        clearInterval(timerInterval);
        timerRunning = true;
        timerInterval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                timerRunning = false;
            } 
            else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } 
                else {
                    seconds--;
                }
                update();
            }
        }, 1000);
    } 
    else {
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

// Add task list functionality
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task-button");

function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

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

    taskList.appendChild(li);
    taskCount++; // Increase the task count
    updateTaskCount(); // Update the displayed task count
}

let taskCount = 0; // Initialize the task counter

function updateTaskCount() {
    const taskCountElement = document.getElementById("task-count");
    taskCountElement.textContent = taskCount;
}

updateTaskCount(); // Initialize the task count display

addTaskButton.addEventListener("click", function () {
    const taskText = newTaskInput.value;
    if (taskText.trim() !== "") {
        addTask(taskText);
        newTaskInput.value = "";
    }
});

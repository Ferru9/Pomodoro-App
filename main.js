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

update();
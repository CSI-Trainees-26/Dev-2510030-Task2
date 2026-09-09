const defaultData = {
    tasks: [
        {
            id: 1,
            text: "Morning walk",
            done: false
        },
        {
            id: 2,
            text: "Plan healthy meals",
            done: false
        }
    ],
    habits: [
        {
            id: 1,
            text: "1K steps",
            category: "Fitness",
            done: false
        },
        {
            id: 2,
            text: "10 min meditation",
            category: "Mental Wellness",
            done: false
        }
    ],
    water: 0,
    calories: 0,
    sleep: [],
    activity: [],
    savedQuotes: []
};

let data =
    JSON.parse(
        localStorage.getItem("fitTrackData")
    ) || defaultData;

data.tasks ??= [];
data.habits ??= [];
data.water ??= 0;
data.calories ??= 0;
data.sleep ??= [];
data.activity ??= [];
data.savedQuotes ??= [];

function saveData() {
    localStorage.setItem(
        "fitTrackData",
        JSON.stringify(data)
    );
}

function showToday() {
    const today =
        document.getElementById("today");

    if (!today) return;

    const currentDate =
        new Date();
    today.textContent =
        currentDate.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );
}

function calculatePercentage(items) {
    if (items.length === 0) {
        return 0;
    }

    const completed =
        items.filter(
            function(item) {
                return item.done === true;
            }
        ).length;
    return Math.round(
        completed / items.length * 100
    );
}

function renderStats() {
    const taskPercentage =
        calculatePercentage(data.tasks);

    const habitPercentage =
        calculatePercentage(data.habits);

    const taskProgress =
        document.getElementById("taskProgress");

    const taskBar =
        document.getElementById("taskBar");

    if (taskProgress) {
        taskProgress.textContent =
            taskPercentage + "%";
    }
    if (taskBar) {
        taskBar.style.width =
            taskPercentage + "%";
    }

    const habitProgress =
        document.getElementById("habitProgress");

    const habitBar =
        document.getElementById("habitBar");

    if (habitProgress) {
        habitProgress.textContent =
            habitPercentage + "%";
    }
    if (habitBar) {
        habitBar.style.width =
            habitPercentage + "%";
    }

    const waterTotal =
        document.getElementById("waterTotal");

    const summaryWater =
        document.getElementById("summaryWater");

    if (waterTotal) {
        waterTotal.textContent =
            data.water + "ml";
    }
    if (summaryWater) {
        summaryWater.textContent =
            data.water + "ml";
    }

    const calorieTotal =
        document.getElementById("calorieTotal");

    if (calorieTotal) {
        calorieTotal.textContent =
            data.calories + " kcal";
    }

    const summaryTasks =
        document.getElementById("summaryTasks");

    const completedTasks =
        data.tasks.filter(
            function(task) {
                return task.done;
            }
        ).length;
    if (summaryTasks) {
        summaryTasks.textContent =
            completedTasks;
    }

    const summaryHabits =
        document.getElementById("summaryHabits");

    const completedHabits =
        data.habits.filter(
            function(habit) {
                return habit.done;
            }
        ).length;
    if (summaryHabits) {
        summaryHabits.textContent =
            completedHabits;
    }

    const summarySleep =
        document.getElementById("summarySleep");

    if (summarySleep) {
        if (data.sleep.length > 0) {
            const totalSleep =
                data.sleep.reduce(
                    function(total, hours) {
                        return total + hours;
                    },
                      0
                );
            const averageSleep =
                (
                    totalSleep /
                    data.sleep.length
                ).toFixed(1);
            summarySleep.textContent =
                averageSleep + " h";
        } else {
            summarySleep.textContent =
                "0 h";
        }
    }
    renderActivity();
}

function renderActivity() {
    const graph =
        document.getElementById("activityGraph");

    if (!graph) return;

    graph.innerHTML = "";

    for (let i = 0; i < 28; i++) {
        const square =
            document.createElement("i");

        const value =
            data.activity[i] || 0;

        if (value > 1) {
            square.className = "high";
        }
        else if (value === 1) {
            square.className = "low";
        }
        graph.appendChild(square);
    }
}

const waterBtn =
    document.getElementById("waterBtn");

if (waterBtn) {
    waterBtn.onclick =
        function() {
            Number(data.water) += 250;
            saveData();
            renderStats();
        };
}

const calorieBtn =
    document.getElementById("calorieBtn");

const calorieInput =
    document.getElementById("calorieInput");

if (calorieBtn) {
    calorieBtn.onclick =
        function() {
            const calories =
                Number(calorieInput.value);

            if (calories <= 0) {
                return;
            }
            data.calories += calories;
            calorieInput.value = "";
            saveData();
            renderStats();
        };
}

const resetBtn =
    document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.onclick =
        function() {
            const answer =
                confirm(
                    "Reset today's water and calories?"
                );
            if (!answer) {
                return;
            }
            data.water = 0;
            data.calories = 0;
            saveData();
            renderStats();
        };
}

let seconds = 1500;

let timerId = null;

function renderTimer() {

    const timer =
        document.getElementById("timer");

    if (!timer) return;

    const minutes =
        Math.floor(seconds / 60);

    const remaining =
        seconds % 60;

    timer.textContent =
        minutes +
        ":" +
        String(remaining).padStart(2, "0");
}

const timerBtn =
    document.getElementById("timerBtn");

const timerReset =
    document.getElementById("timerReset");

const timerMessage =
    document.getElementById("timerMessage");

if (timerBtn) {

    timerBtn.onclick =
        function() {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
                timerBtn.textContent =
                    "Resume focus";
                return;
            }

            timerBtn.textContent =
                "Pause";

            timerId =
                setInterval(
                    function() {
                        seconds--;
                        renderTimer();
                        if (seconds <= 0) {
                            clearInterval(timerId);
                            timerId = null;
                            timerBtn.textContent =
                                "Start focus";
                            timerMessage.textContent =
                                "Great work! Your focus session is complete.";
                        }
                    },
                    1000
                );
        };
}

if (timerReset) {

    timerReset.onclick =
        function() {
            clearInterval(timerId);
            timerId = null;
            seconds = 1500;
            renderTimer();
            timerBtn.textContent =
                "Start focus";
            if (timerMessage) {
                timerMessage.textContent = "";
            }
        };
}

function renderTimerTasks() {
    const timerTask =
        document.getElementById("timerTask");

    if (!timerTask) return;

    timerTask.innerHTML =
        `<option value="">Choose a task</option>`;

    data.tasks.forEach(
        function(task) {
            const option =
                document.createElement("option");
            option.value =
                task.id;
            option.textContent =
                task.text;
            timerTask.appendChild(option);
        }
    );
}

const quotes = [
    {
        text: "Success is the sum of small efforts repeated day after day.",
        author: "Robert Collier"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "It always seems impossible until it is done.",
        author: "Nelson Mandela"
    },
    {
        text: "Small steps every day lead to big results.",
        author: "Unknown"
    }
];

let currentQuote = null;

function displayQuote() {

    const quote =
        document.getElementById("quote");

    const quoteAuthor =
        document.getElementById("quoteAuthor");

    if (!quote) return;

    const random =
        Math.floor(
            Math.random() *
            quotes.length
        );

    currentQuote =
        quotes[random];

    quote.textContent =
        `"${currentQuote.text}"`;

    if (quoteAuthor) {
        quoteAuthor.textContent =
            "— " +
            currentQuote.author;
    }
}

function renderSavedQuotes() {
    const container =
        document.getElementById("savedQuotes");

    if (!container) return;

    container.innerHTML = "";

    data.savedQuotes.forEach(
        function(item) {
            const p =
                document.createElement("p");
            p.textContent =
                `"${item.text}" — ${item.author}`;
            container.appendChild(p);
        }
    );
}

const newQuote =
    document.getElementById("newQuote");

const saveQuote =
    document.getElementById("saveQuote");

if (newQuote) {
    newQuote.onclick =
        displayQuote;
}

if (saveQuote) {
    saveQuote.onclick =
        function() {
            if (!currentQuote) {
                return;
            }
            data.savedQuotes.push(
                currentQuote
            );
            saveData();
            renderSavedQuotes();
        };
}

showToday();
renderStats();
renderTimer();
renderTimerTasks();
displayQuote();
renderSavedQuotes();
function getElement(id) {
    return document.getElementById(id);
}

function calculatePercentage(items) {
    if (!items || items.length === 0) {
        return 0;
    }
    const completed =
        items.filter(function(item) {
            return item.done === true;
        }).length;
    return Math.round(
        (completed / items.length) * 100
    );
}

function renderStats() {

    const taskProgress = getElement("taskProgress");
    const taskBar = getElement("taskBar");
    const taskPercentage =
        calculatePercentage(data.tasks);

    if (taskProgress) {
        taskProgress.textContent =
            taskPercentage + "%";
    }
    if (taskBar) {
        taskBar.style.width =
            taskPercentage + "%";
    }

    const habitProgress = getElement("habitProgress");
    const habitBar = getElement("habitBar");
    const habitPercentage =
        calculatePercentage(data.habits);

    if (habitProgress) {
        habitProgress.textContent =
            habitPercentage + "%";
    }
    if (habitBar) {
        habitBar.style.width =
            habitPercentage + "%";
    }

    const waterTotal = getElement("waterTotal");
    const summaryWater = getElement("summaryWater");

    if (waterTotal) {
        waterTotal.textContent =
            data.water + " ml";
    }
    if (summaryWater) {
        summaryWater.textContent =
            data.water + " ml";
    }

    const calorieTotal =
        getElement("calorieTotal");

    if (calorieTotal) {
        calorieTotal.textContent =
            data.calories + " kcal";
    }

    const summaryTasks =
        getElement("summaryTasks");
    const completedTasks =
        data.tasks.filter(function(task) {
            return task.done === true;
        }).length;
    if (summaryTasks) {
        summaryTasks.textContent =
            completedTasks;
    }

    const summaryHabits =
        getElement("summaryHabits");
    const completedHabits =
        data.habits.filter(function(habit) {
            return habit.done === true;
        }).length;
    if (summaryHabits) {
        summaryHabits.textContent =
            completedHabits;
    }

    const summarySleep =
        getElement("summarySleep");
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
    renderActivityGraph();
}

function renderActivityGraph() {
    const activityGraph =
        getElement("activityGraph");
    if (!activityGraph) {
        return;
    }
    activityGraph.innerHTML = "";

    for (let i = 0; i < 28; i++) {
        const square =
            document.createElement("i");
        const value =
            data.activity[i] || 0;
        if (value > 1) {
           square.className = "high";
        } else if (value === 1) {
            square.className = "low";
        }
        activityGraph.appendChild(square);
    }
}
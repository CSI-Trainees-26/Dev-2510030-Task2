let data =
    JSON.parse(
        localStorage.getItem("fitTrackData")
    );

if (!data) {
    data = {
        tasks: [],
        habits: [],
        water: 0,
        calories: 0,
        sleep: [],
        activity: [],
        savedQuotes: []
    };
}

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

const today =
    document.getElementById("today");
if (today) {
    today.textContent =
        new Date().toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );
}

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskForm =
    document.getElementById("taskForm");

const taskName =
    document.getElementById("taskName");

if (addTaskBtn) {
    addTaskBtn.onclick =
        function() {
            taskForm.classList.toggle(
                "hidden"
            );
        };
}

if (taskForm) {
    taskForm.onsubmit =
        function(event) {
            event.preventDefault();

            const text =
                taskName.value.trim();
            if (!text) {
                return;
            }
            data.tasks.push({
                id: Date.now(),
                text: text,
                done: false
            });
            saveData();
            taskName.value = "";
            taskForm.classList.add(
                "hidden"
            );
            renderTasks();
        };
}

function renderTasks() {
    const pending =
        document.getElementById(
            "pendingTasks"
        );

    const completed =
        document.getElementById(
            "completedTasks"
        );

    if (!pending && !completed) {
        return;
    }

    pending.innerHTML = "";
    completed.innerHTML = "";

    data.tasks.forEach(
        function(task) {
            const li =
                document.createElement("li");

            li.className =
                "task";

            if (task.done) {
                li.classList.add(
                    "done"
                );
            }

            const checkbox =
                document.createElement(
                    "input"
                );
            checkbox.type =
                "checkbox";
            checkbox.checked =
                task.done;
            checkbox.onchange =
                function() {
                    task.done =
                        checkbox.checked;
                    saveData();
                    renderTasks();
                };

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                task.text;

            const deleteBtn =
                document.createElement(
                    "button"
                );

            deleteBtn.textContent =
                "×";

            deleteBtn.className =
                "icon";

            deleteBtn.type =
                "button";

            deleteBtn.onclick =
                function() {
                    data.tasks =
                        data.tasks.filter(
                            function(item) {
                                return item.id !== task.id;
                            }
                        );
                    saveData();
                    renderTasks();
                };
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);

            if (task.done) {
                completed.appendChild(li);
            }
            else {
                pending.appendChild(li);
            }
        }
    )
}

renderTasks();
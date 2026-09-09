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

const addHabitBtn =
    document.getElementById(
        "addHabitBtn"
    );

const habitForm =
    document.getElementById(
        "habitForm"
    );

const habitName =
    document.getElementById(
        "habitName"
    );

const habitCategory =
    document.getElementById(
        "habitCategory"
    );

if (addHabitBtn) {
    addHabitBtn.onclick =
        function() {
            habitForm.classList.toggle(
                "hidden"
            );
        };
}
if (habitForm) {

    habitForm.onsubmit =
        function(event) {
            event.preventDefault();
            const text =
                habitName.value.trim();

            if (!text) {
                return;
            }
            data.habits.push({
                id: Date.now(),
                text: text,
                category:
                    habitCategory.value,
                done: false
            });
            saveData();
            habitName.value = "";
            habitForm.classList.add(
                "hidden"
            );
            renderHabits();
        };
}

function renderHabits() {
    const habitList =
        document.getElementById(
            "habitList"
        );

    if (!habitList) {
        return;
    }

    habitList.innerHTML = "";

    data.habits.forEach(
        function(habit) {
            const li =
                document.createElement(
                    "li"
                );

            li.className =
                "habit";

            const checkbox =
                document.createElement(
                    "input"
                );

            checkbox.type =
                "checkbox";

            checkbox.checked =
                habit.done;

            checkbox.onchange =
                function() {
                    habit.done =
                        checkbox.checked;
                    updateActivity();
                    saveData();
                    renderHabits();
                };

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                habit.text;

            const tag =
                document.createElement(
                    "small"
                );

            tag.className =
                "tag";

            tag.textContent =
                habit.category

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
                    data.habits =
                        data.habits.filter(
                            function(item) {
                                return item.id !== habit.id;
                            }
                        );
                    saveData();
                    renderHabits();
                };
            li.appendChild(
                checkbox
            );
            li.appendChild(
                span
            );
            li.appendChild(
                tag
            );
            li.appendChild(
                deleteBtn
            );
            habitList.appendChild(
                li
            );
        }
    );
}

function updateActivity() {
    const completed =
        data.habits.filter(
            function(habit) {
                return habit.done;
            }
        ).length;
    data.activity.push(
        completed
    );
    if (data.activity.length > 28) {
        data.activity.shift();
    }
}

renderHabits();
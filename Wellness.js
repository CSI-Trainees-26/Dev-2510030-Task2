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

const sleepInput =
    document.getElementById(
        "sleepInput"
    );

const sleepBtn =
    document.getElementById(
        "sleepBtn"
    );

const sleepToday =
    document.getElementById(
        "sleepToday"
    );

const sleepGraph =
    document.getElementById(
        "sleepGraph"
    );

if (sleepBtn) {
    sleepBtn.onclick =
        function() {
            const hours =
                Number(
                    sleepInput.value
                );
            if (
                sleepInput.value === "" ||
                hours < 0 ||
                hours > 24
            ) {
                alert(
                    "Please enter a value between 0 and 24 hours."
                );
                return;
            }

            data.sleep.push(
                hours
            );

            if (
                data.sleep.length > 7
            ) {
                data.sleep = [sleepInput.value];
            }

            saveData();
            sleepInput.value = "";
            renderSleep();
        };
}

function renderSleep() {
    if (!sleepToday) {
        return;
    }

    if (
        data.sleep.length === 0
    ) {
        sleepToday.textContent =
            "No sleep logged";
    }
    else {
        const latest =
            data.sleep[
                data.sleep.length - 1
            ];
        sleepToday.textContent =
            latest +
            " hours slept";
    }

    if (!sleepGraph) {
        return;
    }

    sleepGraph.innerHTML = "";

    data.sleep.forEach(
        function(hours) {
            const bar =
                document.createElement(
                    "i"
                );
            const height =
                (
                    hours / 24
                ) * 100;
            bar.style.height =
                height + "%";
            sleepGraph.appendChild(
                bar
            );
        }
    );
}

renderSleep();

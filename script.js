window.onload = function () {

```
let saved = JSON.parse(
    localStorage.getItem("timetable")
);

if (saved) {

    for (let i = 1; i <= 6; i++) {

        document.getElementById(
            "day" + i
        ).value = saved[i - 1].join(" ");
    }
}
```

};

function saveTimetable() {

```
let timetable = [];

for (let i = 1; i <= 6; i++) {

    let value = document
        .getElementById("day" + i)
        .value
        .toUpperCase()
        .trim();

    timetable.push(
        value.split(" ")
    );
}

localStorage.setItem(
    "timetable",
    JSON.stringify(timetable)
);

alert("Timetable Saved Successfully!");
```

}

function calculateAttendance() {

```
let timetable = JSON.parse(
    localStorage.getItem("timetable")
);

if (!timetable) {
    alert("Please save timetable first.");
    return;
}

let current = parseFloat(
    document.getElementById("current").value
);

let target = parseFloat(
    document.getElementById("target").value
);

let dayOrder = parseInt(
    document.getElementById("dayOrder").value
);

if (
    isNaN(current) ||
    isNaN(target) ||
    isNaN(dayOrder)
) {
    alert("Please fill all fields.");
    return;
}

if (dayOrder < 1 || dayOrder > 6) {
    alert("Day Order must be between 1 and 6.");
    return;
}

let periods = [];

for (let i = dayOrder - 1; i < 6; i++) {
    periods.push(...timetable[i]);
}

for (let i = 0; i < dayOrder - 1; i++) {
    periods.push(...timetable[i]);
}

let theory = 0;
let lab = 0;
let percent = current;
let index = 0;

while (percent < target) {

    let p = periods[index];

    if (p === "L") {
        percent += 0.29;
        lab++;
    } else {
        percent += 0.12;
        theory++;
    }

    index++;

    if (index >= periods.length) {
        index = 0;
    }
}

document.getElementById("result").innerHTML =
    "<h2>Attendance Prediction</h2>" +
    "<p><strong>Theory Classes:</strong> " + theory + "</p>" +
    "<p><strong>Lab Classes:</strong> " + lab + "</p>" +
    "<p><strong>Total Classes:</strong> " + (theory + lab) + "</p>" +
    "<p><strong>Expected Attendance:</strong> " + percent.toFixed(2) + "%</p>";
```

}

function resetTimetable() {

```
localStorage.removeItem("timetable");

alert("Timetable Reset Successfully!");

location.reload();
```

}

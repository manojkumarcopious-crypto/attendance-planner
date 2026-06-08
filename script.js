// Load timetable on startup
window.onload = function () {
    let saved = JSON.parse(localStorage.getItem("timetable"));
    
    // Check added to prevent errors if localStorage is empty or corrupted
    if (saved && saved.length === 6) {
        for (let i = 1; i <= 6; i++) {
            document.getElementById("day" + i).value = saved[i - 1].join(" ");
        }
    }
};

function saveTimetable() {
    let timetable = [];
    
    for (let i = 1; i <= 6; i++) {
        let value = document.getElementById("day" + i).value.toUpperCase().trim();
        
        // Prevents saving empty inputs as arrays with a single empty string
        let periods = value === "" ? [] : value.split(/\s+/);
        timetable.push(periods);
    }
    
    localStorage.setItem("timetable", JSON.stringify(timetable));
    alert("Timetable Saved Successfully!");
}

function calculateAttendance() {
    let timetable = JSON.parse(localStorage.getItem("timetable"));

    if (!timetable) {
        alert("Please save timetable first.");
        return;
    }

    let current = parseFloat(document.getElementById("current").value);
    let target = parseFloat(document.getElementById("target").value);
    let dayOrder = parseInt(document.getElementById("dayOrder").value);

    // Ensure all fields have valid numbers
    if (isNaN(current) || isNaN(target) || isNaN(dayOrder)) {
        alert("Please fill all fields.");
        return;
    }

    // Prevent infinite loop if target is impossible
    if (target > 100) {
        alert("Target attendance cannot exceed 100%.");
        return;
    }

    // Early exit if target is already achieved
    if (current >= target) {
        document.getElementById("result").innerHTML = "<p>Target already achieved!</p>";
        return;
    }

    let periods = [];

    for (let i = dayOrder - 1; i < 6; i++) {
        if (timetable[i]) periods.push(...timetable[i]);
    }

    for (let i = 0; i < dayOrder - 1; i++) {
        if (timetable[i]) periods.push(...timetable[i]);
    }

    // Prevent infinite loop if the user saved an empty timetable
    if (periods.length === 0) {
        alert("Your timetable is empty. Please add periods.");
        return;
    }

    let theory = 0;
    let lab = 0;
    let percent = current;
    let index = 0;
    
    // Added a failsafe limit to absolutely guarantee the browser never freezes
    let failsafe = 0;

    while (percent < target && failsafe < 1000) {
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
        
        failsafe++;
    }

    document.getElementById("result").innerHTML =
        "<h2>Attendance Prediction</h2>" +
        "<p><b>Theory Classes:</b> " + theory + "</p>" +
        "<p><b>Lab Classes:</b> " + lab + "</p>" +
        "<p><b>Total Classes:</b> " + (theory + lab) + "</p>" +
        "<p><b>Expected Attendance:</b> " + percent.toFixed(2) + "%</p>";
}

function resetTimetable() {
    localStorage.removeItem("timetable");
    alert("Timetable Reset Successfully!");
    location.reload();
}

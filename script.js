let timetable = JSON.parse(
    localStorage.getItem("timetable")
);

if(!timetable){

    timetable = [];

    for(let day=1; day<=6; day++){

        let input = prompt(
            `Enter Day ${day} periods\nExample:\nT T T L L`
        );

        timetable.push(
            input.toUpperCase().split(" ")
        );
    }

    localStorage.setItem(
        "timetable",
        JSON.stringify(timetable)
    );
}

function calculateAttendance(){

    let current =
        parseFloat(
            document.getElementById("current").value
        );

    let target =
        parseFloat(
            document.getElementById("target").value
        );

    let dayOrder =
        parseInt(
            document.getElementById("dayOrder").value
        );

    let theory = 0;
    let lab = 0;
    let percent = current;

    let periods = [];

    for(let i=dayOrder-1;i<6;i++){
        periods.push(...timetable[i]);
    }

    for(let i=0;i<dayOrder-1;i++){
        periods.push(...timetable[i]);
    }

    let index = 0;

    while(percent < target){

        let p = periods[index];

        if(p === "L"){
            percent += 0.29;
            lab++;
        }
        else{
            percent += 0.12;
            theory++;
        }

        index++;

        if(index >= periods.length){
            index = 0;
        }
    }

    document.getElementById("result").innerHTML = `
        <h3>Result</h3>
        Theory Classes: ${theory}<br>
        Lab Classes: ${lab}<br>
        Total Classes: ${theory + lab}<br>
        Expected Attendance: ${percent.toFixed(2)}%
    `;
}

function resetTimetable(){

    localStorage.removeItem(
        "timetable"
    );

    location.reload();
}
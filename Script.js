// Get table body
const tableBody = document.querySelector("#scheduleTable tbody");

// Load saved timetable when page opens
window.onload = function () {
    loadData();
};

// Add Schedule
function addSchedule() {

    let subject = document.getElementById("subject").value.trim();
    let teacher = document.getElementById("teacher").value.trim();
    let room = document.getElementById("room").value.trim();
    let day = document.getElementById("day").value;
    let time = document.getElementById("time").value;

    // Validation
    if (subject === "" || teacher === "" || room === "" || time === "") {
        alert("Please fill all the fields.");
        return;
    }

    // Check for timetable conflicts
    let rows = tableBody.rows;

    for (let i = 0; i < rows.length; i++) {

        let existingTeacher = rows[i].cells[1].innerText;
        let existingRoom = rows[i].cells[2].innerText;
        let existingDay = rows[i].cells[3].innerText;
        let existingTime = rows[i].cells[4].innerText;

        if (existingDay === day && existingTime === time) {

            if (existingTeacher === teacher) {
                alert("Teacher is already assigned at this time.");
                return;
            }

            if (existingRoom === room) {
                alert("Classroom is already occupied at this time.");
                return;
            }
        }
    }

    // Create new row
    let row = tableBody.insertRow();

    row.insertCell(0).innerHTML = subject;
    row.insertCell(1).innerHTML = teacher;
    row.insertCell(2).innerHTML = room;
    row.insertCell(3).innerHTML = day;
    row.insertCell(4).innerHTML = time;

    row.insertCell(5).innerHTML =
        '<button onclick="deleteRow(this)">Delete</button>';

    // Save data
    saveData();

    // Clear form
    document.getElementById("subject").value = "";
    document.getElementById("teacher").value = "";
    document.getElementById("room").value = "";
    document.getElementById("time").value = "";
}

// Delete row
function deleteRow(button) {

    let row = button.parentNode.parentNode;

    tableBody.removeChild(row);

    saveData();
}

// Save timetable
function saveData() {

    localStorage.setItem(
        "smartTimetable",
        tableBody.innerHTML
    );
}

// Load timetable
function loadData() {

    let data = localStorage.getItem("smartTimetable");

    if (data) {
        tableBody.innerHTML = data;
    }
}

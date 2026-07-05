// Smart Classroom & Timetable Scheduler

const tableBody = document.querySelector("#scheduleTable tbody");

// Load saved schedules
window.onload = loadSchedules;

// Add Schedule
function addSchedule() {

    const subject = document.getElementById("subject").value.trim();
    const teacher = document.getElementById("teacher").value.trim();
    const room = document.getElementById("room").value.trim();
    const day = document.getElementById("day").value;
    const time = document.getElementById("time").value;

    // Validation
    if (!subject || !teacher || !room || !time) {
        alert("Please fill all fields.");
        return;
    }

    // Check conflicts
    const rows = tableBody.querySelectorAll("tr");

    for (let row of rows) {

        const rowTeacher = row.cells[1].textContent;
        const rowRoom = row.cells[2].textContent;
        const rowDay = row.cells[3].textContent;
        const rowTime = row.cells[4].textContent;

        if (rowDay === day && rowTime === time) {

            if (rowTeacher === teacher) {
                alert("Teacher is already assigned at this time.");
                return;
            }

            if (rowRoom === room) {
                alert("Classroom is already booked at this time.");
                return;
            }
        }
    }

    // Create row
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${subject}</td>
        <td>${teacher}</td>
        <td>${room}</td>
        <td>${day}</td>
        <td>${time}</td>
        <td>
            <button onclick="deleteSchedule(this)">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);

    saveSchedules();

    clearForm();

    alert("Schedule Added Successfully!");
}

// Delete Schedule
function deleteSchedule(button) {

    if (confirm("Are you sure you want to delete this schedule?")) {

        button.parentElement.parentElement.remove();

        saveSchedules();
    }
}

// Save Data
function saveSchedules() {

    localStorage.setItem(
        "scheduleData",
        tableBody.innerHTML
    );
}

// Load Data
function loadSchedules() {

    const savedData = localStorage.getItem("scheduleData");

    if (savedData) {
        tableBody.innerHTML = savedData;
    }
}

// Clear Form
function clearForm() {

    document.getElementById("subject").value = "";
    document.getElementById("teacher").value = "";
    document.getElementById("room").value = "";
    document.getElementById("day").selectedIndex = 0;
    document.getElementById("time").value = "";
}

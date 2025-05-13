// Initialize the DataTable on page load
$(document).ready(function () {
    $("#student-table").DataTable(); // Initialize DataTable
});

// Function to filter students based on CGPA, Level, and Domain
function filterStudents() {
    // Get selected filter values
    const cgpaFilter = document.getElementById("cgpa").value;
    const levelFilter = document.getElementById("level").value;
    const domainFilter = document.getElementById("domain").value;

    // Get the table rows
    const rows = document.querySelectorAll("#student-tbody tr");

    rows.forEach((row) => {
        const cgpa = parseFloat(row.cells[1].innerText); // CGPA
        const level = row.cells[2].innerText; // Level
        const domain = row.cells[4].innerText; // Domain

        let showRow = true;

        // Filter by CGPA
        if (cgpaFilter !== "all") {
            if (cgpaFilter === ">=9" && cgpa < 9) showRow = false;
            if (cgpaFilter === "8-9" && (cgpa < 8 || cgpa >= 9)) showRow = false;
            if (cgpaFilter === "7-8" && (cgpa < 7 || cgpa >= 8)) showRow = false;
            if (cgpaFilter === "<7" && cgpa >= 7) showRow = false;
        }

        // Filter by Level
        if (levelFilter !== "all" && levelFilter !== level) {
            showRow = false;
        }

        // Filter by Domain
        if (domainFilter !== "all" && domainFilter !== domain) {
            showRow = false;
        }

        // Show or hide row based on filters
        row.style.display = showRow ? "" : "none";
    });
}

// Function to download the filtered list as a CSV file
function downloadCSV() {
    const rows = document.querySelectorAll("#student-table tr");
    let csvContent = "";

    // Loop through table rows and add to CSV content
    rows.forEach((row) => {
        if (row.style.display !== "none") {
            const cells = row.querySelectorAll("th, td");
            const rowData = Array.from(cells).map((cell) => cell.innerText);
            csvContent += rowData.join(",") + "\n";
        }
    });

    // Create a downloadable CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_students.csv";
    link.click();
    window.URL.revokeObjectURL(url);
}

// Function to handle edit button action
function editRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    // Make the row editable
    cells.forEach((cell, index) => {
        if (index < cells.length - 1) { // Avoid the "Actions" column
            const input = document.createElement("input");
            input.type = "text";
            input.value = cell.innerText;
            cell.innerText = "";
            cell.appendChild(input);
        }
    });

    // Change button text to "Save"
    button.innerText = "Save";
    button.onclick = () => saveRow(button);
}

// Function to save edited row
function saveRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    // Save input values to the row
    cells.forEach((cell, index) => {
        if (index < cells.length - 1) { // Avoid the "Actions" column
            const input = cell.querySelector("input");
            cell.innerText = input.value;
        }
    });

    // Change button text back to "Edit"
    button.innerText = "Edit";
    button.onclick = () => editRow(button);
}

// Function to handle delete button action
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove(); // Remove the row from the table
}

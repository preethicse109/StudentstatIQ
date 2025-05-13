<?php
// Database connection
$servername = "localhost";  // Your server name
$username = "root";         // Your database username
$password = "";             // Your database password
$dbname = "collegeDB";      // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $CGPA = $_POST['CGPA'];
    $level = $_POST['level'];
    $language = $_POST['language'];
    $domain = $_POST['domain'];
    $standingArrears = $_POST['standingArrears'];
    $historyOfArrears = $_POST['historyOfArrears'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO students (name, CGPA, level, language, domain, standingArrears, historyOfArrears) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsssss", $name, $CGPA, $level, $language, $domain, $standingArrears, $historyOfArrears);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Form submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>

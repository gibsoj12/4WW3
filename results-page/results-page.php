<?php

function search_with_name() {
    //$name = $_REQUEST['name'];
    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbname = "coffee_house";
    // $port = "3306";

    // Create the connection
    $conn = new mysqli($host, $username, $password, $db_name);

    // Check if the connection is valid
    if ($conn->connect_error) {
        echo "Failed to connect" . $conn->$connect_error;
        die("Connection failed: " . $conn->connect_error);
    }

    echo "Connected";

    $stmt = "SELECT * FROM `users`";
    $result = $conn->query($stmt);

    echo $result;

    // Make sure there is a match
    if($result->num_rows > 0) {
        echo "<table><tr><th>Name</th><th>Rating</th></tr>";
        // output each row
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>".$row["name"]."</td><td>".$row["rating"]."</td></tr>";
          }
          echo "</table>";
    }
    else {
        echo "0 results";
    }

    $conn->close();
    exit();
}

?>
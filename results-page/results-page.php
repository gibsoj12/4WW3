<?php

function search_with_name()
{
    $name = $_REQUEST['name'];
    $servername = "placeholder";
    $username = "placeholder";
    $password = "placeholder";
    $dbname = "placeholder";

    // Create the connection

    $conn = new msqli($servername, $username, $password, $dbname);

    //Check if the connection is valid
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error)
    }



    $stmt = "SELECT * FROM `Objects` WHERE name like `$name`";
    $result = $conn->query($stmt);

    //Make sure there is a match
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
}

?>
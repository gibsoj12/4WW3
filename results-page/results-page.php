<?php

include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($db['status'] == '0') {
    die("Connection failed:" . $db['message']);
} else {
    $conn = $db['connection'];
    if ($conn->query($stmt) === TRUE) {
        $response_status = '1';
        $response_code = 200;
        $response_desc = "Query made successfully";
    } else {
        $response_status = '2';
        $response_code = 400;
        $response_desc = "Error: " . $stmt . " " . $conn->error;
    }
    
    $conn->close(); // Close the connection
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    echo json_encode($response);
}

exit();

?>
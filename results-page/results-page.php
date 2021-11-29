<?php

include_once '../database.php';

function search_with_name() {
    
    $database = new Database();
    $db = $database->getConnection();

    if($db['status'] == '0') {
        die("Connection failed:" . $db['message']);
    } else {
        $conn = $db['connection'];
        $stmt = "SELECT * FROM `users`";
        if($conn->query($stmt) === TRUE) {
            $response_status = '1';
            $response_code = '200';
            $response_desc = "Query made successfully";
        } else {
            $response_status = '2';
            $response_code = '400';
            $response_desc = "Error: " . $stmt . " " . $conn->error;
        }
        // $result = $conn->query($stmt);
        
        // echo $result;
        $conn->close(); // Close the connection
        $response['response_status'] = $response_status;
        $response['response_code'] = $response_code;
        $response['response_desc'] = $response_desc;

        $json_response = json_encode($response);
        echo $json_response;
    }

    exit();
}

?>
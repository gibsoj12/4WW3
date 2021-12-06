<?php

include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($_POST['arguments'] != null) {
    $args = json_decode($_POST['arguments'], true);
 
    if ($db['status'] == '0') {
        die("Connection failed: " . $db['message']);
    } else {
        $conn = $db['connection'];
        $first_name = mysqli_real_escape_string($conn, $args['first_name']);
        $last_name = mysqli_real_escape_string($conn, $args['last_name']);
        $birthday = mysqli_real_escape_string($conn, $args['birthday']);
        $email = mysqli_real_escape_string($conn, $args['email']);
        $password = mysqli_real_escape_string($conn, $args['password']);
        $vals = "'" . $first_name . "','" . $last_name . "','" . $birthday . "','" . $email . "','" . $password . "'";
        $stmt = "INSERT INTO `users` (`first_name`, `last_name`, `birthday`, `email`, `password`) VALUES (" . $vals . ")";
        
        if ($conn->connect_error) {
            $response_status = '2';
            $response_code = 400;
            $response_data = $conn->connect_error;
        }
        
        if ($conn->query($stmt)) {
            $response_status = '1';
            $response_code = 200;
            $response_data = "Success";
        }
        else {
            $response_status = '2';
            $response_code = 400;
            $response_data = "Failed to execute";
        }
    }

    $conn->close();
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_data'] = $response_data;

    echo json_encode($response);
}

exit();

?>
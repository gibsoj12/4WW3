<?php

include_once '../database.php';

if(!isset($_COOKIE['user'])) {
    $response_status = '2';
    $response_code = 403;
    $response_data = "Failure: Please sign in";

    echo json_encode($response);
    exit();
}

$database = new Database();
$db = $database->getConnection();

if ($_POST['arguments'] != null) {
    $args = json_decode($_POST['arguments'], true);
 
    if ($db['status'] == '0') {
        die("Connection failed: " . $db['message']);
    } else {
        $conn = $db['connection'];
        $id = mysqli_real_escape_string($conn, $args['shop_id']);
        $stars = mysqli_real_escape_string($conn, $args['stars']);
        $review = mysqli_real_escape_string($conn, $args['review']);
        $vals = "'" . $id . "','" . $stars . "','" . $review . "'";
        $stmt = "INSERT INTO `reviews` (`shop_id`, `stars`, `review`) VALUES (" . $vals . ")";
        
        if ($conn->connect_error) {
            $response_status = '2';
            $response_code = 400;
            $response_data = $conn->connect_error;
        }
        
        if ($conn->query($stmt)) {
            $response_status = '1';
            $response_code = 200;
            $response_data = "Insert successful";
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
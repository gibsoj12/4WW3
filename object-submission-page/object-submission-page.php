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
        $name = mysqli_real_escape_string($conn, $args['name']);
        $long = mysqli_real_escape_string($conn, $args['longitude']);
        $lat = mysqli_real_escape_string($conn, $args['latitude']);
        $link = mysqli_real_escape_string($conn, $args['link']);
        $amenities = $args['amenities'];
        $vals = "'" . $name . "','" . $link . "','" . $long . "','" . $lat . "','" . $amenities . "'";
        $stmt = "INSERT INTO `coffee_shops` (`id`, `name`, `link`, `longitude`, `latitude`, `amenities`) VALUES (NULL," . $vals . ")";
        
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
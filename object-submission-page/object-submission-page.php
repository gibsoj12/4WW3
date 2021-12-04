<?php

include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($_POST['arguments'] != null) {
    $args = json_decode($_POST['arguments'], true);
    
    $name = $args['name'];
    $lat = $args['latitude'];
    $long = $args['longitude'];
    $link = $args['link'];
    $amenities = $args['amenities']; // This assumes that we package them as json in js
    $vals = "" . $name . "," . $link . "," . $lat . "," . $long . "," . $amenities;
    $stmt = "INSERT INTO `coffe_shops` (`name`, `link`, `latitude`, `longitude`, `amenities`) VALUES (" . $vals . ")";
 
    if ($db['status'] == '0') {
        die("Connection failed: " . $db['message']);
    } else {
        $conn = $db['connection'];
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
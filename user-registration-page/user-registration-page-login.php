<?php

include_once '../database.php';

if ($_POST['arguments'] != null) {
    $email = $_POST['arguments'];
}
else {
    exit();
}

$database = new Database();
$db = $database->getConnection();

$get_user = "SELECT `id`, `email`, `password` FROM `users` WHERE `email` <=> '$email'";

if ($db['status'] == '0') {
    die("Connection failed:" . $db['message']);
} else {
    $conn = $db['connection'];
    $user_info = $conn->query($get_user);

    if ($user_info) {
        $row = $user_info->fetch_assoc();

        $response_status = '1';
        $response_code = 200;
        $response_desc = "Query made successfully";
        $response_data = $row;
        $cookie_name = "user";
        $cookie_value = $row['id'];
        setcookie($cookie_name, $cookie_value, time() + 86400, "/");


    } else {
        $response_status = '2';
        $response_code = 400;
        $response_desc = "Error: " . $stmt . " " . $conn->error;
        $response_data = "";
    }
    
    $conn->close(); // Close the connection
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;
    $response['response_data'] = $response_data;

    echo json_encode($response);
}

exit();

?>
<?php

$cookie_name = "user";
$cookie_value = $row['id'];
if (isset($_COOKIE['user'])) {
    unset($_COOKIE['user']); 
    setcookie('user', null, -1, '/'); 
    $response_data = "Cookie removed";
} else {
    $response_data = "Cookie was not set";
}

$response['response_data'] = $response_data;

echo json_encode($response);

?>
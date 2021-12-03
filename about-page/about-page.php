<?php

include_once '../database.php';

if ($_POST['arguments'][0] != null) {
    $id = $_POST['arguments'][0];
}
else {
    //do something else? Not sure what we should do here
}

$database = new Database();
$db = $database->getConnection();

$get_shop_info = "SELECT `name`, `longitude`, `latitude`, `link`, `amenities` FROM `coffee_shops` WHERE `id` = '$id'";
$get_reviews = "SELECT `stars`, `review` FROM `reviews` WHERE `shop_id` = '$id'";

if ($db['status'] == '0') {
    die("Connection failed:" . $db['message']);
} else {
    $conn = $db['connection'];
    $shop_info = $conn->query($get_shop_info);
    $review_info = $conn->query($get_reviews);
    $shop_data = [];
    $review_data = [];

    if ($shop_info) {
        $num = $shop_info->num_rows;
        $i = 0;
        while ($row = $shop_info->fetch_assoc()) {
            $shop_data[strval($i)] = json_encode($row);
            $i++;
        } 

        if ($review_info) {
            $num = $review_info->num_rows;
            $i = 0;

            while ($row = $review_info->fetch_assoc()) {
                $review_data[strval($i)] = json_encode($row);
                $i++;
            }
        }

        $response_status = '1';
        $response_code = 200;
        $response_desc = "Query made successfully";
        $response_shop_data = json_encode($shop_data);
        $response_review_data = json_encode($review_data);

    } else {
        $response_status = '2';
        $response_code = 400;
        $response_desc = "Error: " . $stmt . " " . $conn->error;
        $response_shop_data = "";
        $response_review_data = "";
    }
    
    $conn->close(); // Close the connection
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;
    $response['response_shop_data'] = $response_shop_data;
    $response['response_review_data'] = $response_review_data;

    echo json_encode($response);
}

exit();

?>
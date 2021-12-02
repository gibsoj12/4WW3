<?php

include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if ($_POST['arguments'][0] == "") {
    $long = floatval($_POST['arguments'][1]);
    $lat = floatval($_POST['arguments'][2]);
    $stmt = "SELECT `id`, `name`, `latitude`, `longitude`, `amenities`, 
        (3959 * acos(
        cos(radians($lat)) *
        cos(radians(`latitude`)) *
        cos(radians(`longitude`) - radians($long)) +
        sin(radians($lat)) *
        sin(radians(`latitude`)))
        ) AS distance
        FROM `coffee_shops`
        HAVING distance < 50
        ORDER BY distance
        LIMIT 0, 20";
}
else {
    $shopName = $_POST['arguments'][0];
    $stmt = "SELECT `id`, `name`, `latitude`, `longitude`, `amenities` FROM `coffee_shops` WHERE `name` LIKE '%$shopName%'"; 
}

if ($db['status'] == '0') {
    die("Connection failed:" . $db['message']);
} else {
    $conn = $db['connection'];
    $result = $conn->query($stmt);

    if ($result) {
        $num = $result->num_rows;
        $i = 0;
        while ($row = $result->fetch_assoc()) {  
            $otherInfo["id"] = $row["id"];
            $otherInfo["longitude"] = $row["longitude"];
            $otherInfo["latitude"] = $row["latitude"];
            $metadata[strval($i)] = json_encode($otherInfo);

            $jsonRow["Name"] = $row["name"];
            $jsonRow["Amenities"] = $row["amenities"];
            $data[strval($i)] = json_encode($jsonRow);
            $i++;
        } 

        $response_status = '1';
        $response_code = 200;
        $response_desc = "Query made successfully";
        $response_metadata = json_encode($metadata);
        $response_data = json_encode($data);
    } else {
        $response_status = '2';
        $response_code = 400;
        $response_desc = "Error: " . $stmt . " " . $conn->error;
        $response_metadata = "";
        $response_data = "";
    }
    
    $conn->close(); // Close the connection
    $response['response_status'] = $response_status;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;
    $response['response_metadata'] = $response_metadata;
    $response['response_data'] = $response_data;

    echo json_encode($response);
}

exit();

?>
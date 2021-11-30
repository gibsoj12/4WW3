<?php

class Database {
    private $host = "3.21.69.46:3306";
    private $db_name = "coffee_house";
    private $username = "root";
    private $password = "password";
    public $conn;


    public function getConnection() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);

        if($this->conn->connect_error) {
            $response['status'] = '0';
            $response['message'] = $exception->getMessage();
            return $response;
        } else {
            $response['status'] = '1';
            $response['connection'] = $this->conn;
            return $response;
        }
    }
}

?>
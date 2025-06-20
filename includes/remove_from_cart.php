<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));
$cart_id = $data->cart_id;

$sql = "DELETE FROM cart WHERE id = '$cart_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>

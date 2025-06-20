<?php
require 'db_config.php';

$userId = $_POST['userId'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$phone = $_POST['phone'];

$sql = "UPDATE users SET first_name=?, last_name=?, phone=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $firstName, $lastName, $phone, $userId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Update failed."]);
}
?>

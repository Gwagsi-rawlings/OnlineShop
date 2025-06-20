<?php
require 'db_config.php';

$userId = $_POST['userId'];
$currentPassword = $_POST['currentPassword'];
$newPassword = password_hash($_POST['newPassword'], PASSWORD_DEFAULT);

$sql = "SELECT password FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($currentPassword, $user['password'])) {
    $updateSql = "UPDATE users SET password = ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("si", $newPassword, $userId);
    $updateStmt->execute();
    echo json_encode(["status" => "success", "message" => "Password changed successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Current password is incorrect."]);
}
?>

<?php
require 'db.php';

$id = $_POST['id'] ?? 0;
if (!$id) exit("Invalid ID");

$stmt = $pdo->prepare("SELECT status FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

$newStatus = ($user['status'] === 'Active') ? 'Inactive' : 'Active';

$update = $pdo->prepare("UPDATE users SET status = ? WHERE id = ?");
$update->execute([$newStatus, $id]);

echo json_encode(['status' => $newStatus]);
?>

<?php
require 'db.php';

$search = $_GET['q'] ?? '';
$stmt = $pdo->prepare("SELECT * FROM users WHERE name LIKE ? OR email LIKE ?");
$stmt->execute(["%$search%", "%$search%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
?>

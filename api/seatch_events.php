<?php
require_once '../includes/db.php';
header('Content-Type: application/json');

$search = $_GET['query'] ?? '';
$sql = "SELECT * FROM events WHERE title LIKE ? OR category LIKE ? OR location LIKE ?";
$stmt = $pdo->prepare($sql);
$stmt->execute(["%$search%", "%$search%", "%$search%"]);
$results = $stmt->fetchAll();

echo json_encode($results);
?>

<?php
require_once '../includes/db.php';
header('Content-Type: application/json');

$category = $_GET['category'] ?? '';
$sql = "SELECT * FROM events WHERE category = ? ORDER BY date ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute([$category]);
$results = $stmt->fetchAll();

echo json_encode($results);
?>

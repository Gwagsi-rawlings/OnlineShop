<?php
require_once '../includes/db.php';
header('Content-Type: application/json');

$today = date('Y-m-d');
$sql = "SELECT * FROM events WHERE date >= ? ORDER BY date ASC LIMIT 6";
$stmt = $pdo->prepare($sql);
$stmt->execute([$today]);
$events = $stmt->fetchAll();

echo json_encode($events);
?>

<?php
require_once '../includes/db.php';
header('Content-Type: application/json');

$sql = "SELECT * FROM events WHERE is_featured = 1 ORDER BY date ASC LIMIT 6";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$events = $stmt->fetchAll();

echo json_encode($events);
?>

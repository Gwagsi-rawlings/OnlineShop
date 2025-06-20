<?php
require 'db.php';

$type = $_GET['type'] ?? 'users';
$startDate = $_GET['start'] ?? '2023-01-01';

switch ($type) {
    case 'users':
        $stmt = $pdo->prepare("SELECT * FROM users WHERE registered_at >= ?");
        $stmt->execute([$startDate]);
        break;
    case 'events':
        $stmt = $pdo->query("SELECT * FROM events"); // Assuming `events` table exists
        break;
    case 'sales':
        $stmt = $pdo->query("SELECT * FROM bookings"); // Assuming `bookings` table exists
        break;
    default:
        exit("Invalid report type.");
}

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
?>

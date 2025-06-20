<?php
require 'db.php';

$search = $_GET['search'] ?? '';
$location = $_GET['location'] ?? '';
$date = $_GET['date'] ?? '';

$query = "SELECT * FROM events WHERE 1=1";
$params = [];

if (!empty($search)) {
    $query .= " AND title LIKE :search";
    $params['search'] = "%$search%";
}

if (!empty($location)) {
    $query .= " AND location = :location";
    $params['location'] = $location;
}

if (!empty($date)) {
    $query .= " AND DATE(event_date) = :date";
    $params['date'] = $date;
}

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$events = $stmt->fetchAll();

echo json_encode($events);

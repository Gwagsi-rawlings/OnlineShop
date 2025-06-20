<?php
require '../functions.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $event_id = $_GET['event_id'] ?? null;
    $status = $_GET['status'] ?? null;
    $date = $_GET['date'] ?? null;

    $bookings = getBookings($event_id, $status, $date);
    echo json_encode($bookings);
}

// POST, PUT, DELETE can be added similarly
?>

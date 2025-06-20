<?php
require '../functions.php'; // file that contains the above functions

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $events = getEvents();
    echo json_encode($events);
}

if ($method === 'POST') {
    // Add new event: expects JSON input with name, date, venue, price, capacity, status
    $input = json_decode(file_get_contents('php://input'), true);
    $result = addEvent($input['name'], $input['date'], $input['venue'], $input['price'], $input['capacity'], $input['status']);
    echo json_encode(['success' => $result]);
}

// Add PUT and DELETE similarly (usually via a router or a framework)
?>

<?php
require 'db.php';

$eventId = $_GET['event_id'] ?? null;

if (!$eventId) {
    http_response_code(400);
    echo json_encode(['error' => 'Event ID required']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM ticket_options WHERE event_id = ?");
$stmt->execute([$eventId]);
$tickets = $stmt->fetchAll();

echo json_encode($tickets);
if (!$tickets) {
    http_response_code(404);
    echo json_encode(['error' => 'No ticket options found for this event']);
    exit;
}
<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$eventId = $data['event_id'] ?? null;
$ticketType = $data['ticket_type'] ?? null;
$quantity = $data['quantity'] ?? 1;

if (!$eventId || !$ticketType) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

// Save to session, database, or log for now
include 'config.php';

$user_id = $data['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID required']);
    exit;
}

$sql = "INSERT INTO cart (user_id, event_id, quantity) VALUES ('$user_id', '$eventId', '$quantity')
        ON DUPLICATE KEY UPDATE quantity = quantity + $quantity";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Ticket(s) added to cart"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

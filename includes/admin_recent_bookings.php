<?php
require 'db_config.php';

$sql = "SELECT b.id, CONCAT(u.first_name, ' ', u.last_name) as user_name, e.title as event_name, b.booking_date, b.amount
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN events e ON b.event_id = e.id
        ORDER BY b.booking_date DESC
        LIMIT 5";

$res = $conn->query($sql);
$bookings = [];

while ($row = $res->fetch_assoc()) {
    $bookings[] = $row;
}

echo json_encode($bookings);
?>

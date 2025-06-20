<?php
require 'db_config.php';

$today = date('Y-m-d');
$sql = "SELECT e.id, e.title, e.date, e.capacity, 
               (SELECT COUNT(*) FROM bookings WHERE event_id = e.id) as tickets_sold
        FROM events e
        WHERE e.date >= '$today'
        ORDER BY e.date ASC
        LIMIT 5";

$res = $conn->query($sql);
$events = [];

while ($row = $res->fetch_assoc()) {
    $status = 'Active';
    if ($row['tickets_sold'] < 0.5 * $row['capacity']) {
        $status = 'Low Sales';
    }

    $events[] = [
        'event' => $row['title'],
        'date' => date('M d, Y', strtotime($row['date'])),
        'tickets_sold' => "{$row['tickets_sold']}/{$row['capacity']}",
        'status' => $status
    ];
}

echo json_encode($events);
?>

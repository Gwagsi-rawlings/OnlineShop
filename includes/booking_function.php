<?php
require 'db.php';

// Get bookings with optional filters
function getBookings($event_id = null, $status = null, $date = null) {
    global $pdo;

    $query = "SELECT b.*, e.name as event_name FROM bookings b
              JOIN events e ON b.event_id = e.id WHERE 1=1 ";
    $params = [];

    if ($event_id) {
        $query .= " AND b.event_id = ? ";
        $params[] = $event_id;
    }
    if ($status) {
        $query .= " AND b.status = ? ";
        $params[] = $status;
    }
    if ($date) {
        $query .= " AND b.booking_date = ? ";
        $params[] = $date;
    }

    $query .= " ORDER BY b.booking_date DESC";

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);

    return $stmt->fetchAll();
}

// Get booking by ID
function getBooking($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT b.*, e.name as event_name FROM bookings b JOIN events e ON b.event_id = e.id WHERE b.id=?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

// You can add updateBooking, cancelBooking, etc. similarly.
?>

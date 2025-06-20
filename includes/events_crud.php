<?php
require 'db.php';

// Get all events
function getEvents() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM events ORDER BY date ASC");
    return $stmt->fetchAll();
}

// Get event by ID
function getEvent($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

// Add new event
function addEvent($name, $date, $venue, $price, $capacity, $status) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO events (name, date, venue, price, tickets_capacity, status) VALUES (?, ?, ?, ?, ?, ?)");
    return $stmt->execute([$name, $date, $venue, $price, $capacity, $status]);
}

// Update event
function updateEvent($id, $name, $date, $venue, $price, $capacity, $status) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE events SET name=?, date=?, venue=?, price=?, tickets_capacity=?, status=? WHERE id=?");
    return $stmt->execute([$name, $date, $venue, $price, $capacity, $status, $id]);
}

// Delete event
function deleteEvent($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM events WHERE id=?");
    return $stmt->execute([$id]);
}
?>

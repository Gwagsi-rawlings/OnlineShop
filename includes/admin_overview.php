<?php
require 'db_config.php';

$stats = [];

// Total Events
$res = $conn->query("SELECT COUNT(*) as total FROM events");
$stats['totalEvents'] = $res->fetch_assoc()['total'];

// Total Bookings
$res = $conn->query("SELECT COUNT(*) as total FROM bookings");
$stats['totalBookings'] = $res->fetch_assoc()['total'];

// Total Users
$res = $conn->query("SELECT COUNT(*) as total FROM users");
$stats['totalUsers'] = $res->fetch_assoc()['total'];

// Total Revenue
$res = $conn->query("SELECT SUM(amount) as total FROM bookings");
$stats['revenue'] = number_format($res->fetch_assoc()['total'], 2);

echo json_encode($stats);
?>

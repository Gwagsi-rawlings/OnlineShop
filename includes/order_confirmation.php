<?php
include 'config.php';

$order_id = $_GET['order_id'];
$sql = "SELECT o.quantity, o.subtotal, e.title, e.price 
        FROM orders o 
        JOIN events e ON o.event_id = e.id 
        WHERE o.order_id = '$order_id'";

$result = $conn->query($sql);
$items = [];

while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

echo json_encode($items);
?>

<?php
include 'config.php';

$user_id = $_GET['user_id'];
$sql = "SELECT c.id, e.title, e.price, c.quantity 
        FROM cart c 
        JOIN events e ON c.event_id = e.id 
        WHERE c.user_id = '$user_id'";

$result = $conn->query($sql);
$cart = [];

while ($row = $result->fetch_assoc()) {
    $cart[] = $row;
}

echo json_encode($cart);
?>

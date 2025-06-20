<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id;
$cart = $data->cart;

$order_id = uniqid("ORD_");
$total = 0;

foreach ($cart as $item) {
    $event_id = $item->event_id;
    $quantity = $item->quantity;
    $price = $item->price;
    $subtotal = $quantity * $price;
    $total += $subtotal;

    $conn->query("INSERT INTO orders (order_id, user_id, event_id, quantity, subtotal)
                  VALUES ('$order_id', '$user_id', '$event_id', '$quantity', '$subtotal')");
}

// Clear cart
$conn->query("DELETE FROM cart WHERE user_id = '$user_id'");

echo json_encode(["status" => "success", "order_id" => $order_id, "total" => $total]);
?>

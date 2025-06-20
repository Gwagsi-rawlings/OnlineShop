<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName']);
$email = $conn->real_escape_string($data['email']);
$phone = $conn->real_escape_string($data['phone']);
$user_id = (int)$data['userId']; // Get user ID from session or hidden field
$cartItems = $data['cart']; // [{event_id, quantity, price}]
$total = 0;

$order_id = uniqid("ORD_");

// Store order items
foreach ($cartItems as $item) {
    $event_id = (int)$item['event_id'];
    $quantity = (int)$item['quantity'];
    $price = (float)$item['price'];
    $subtotal = $quantity * $price;
    $total += $subtotal;

    $stmt = $conn->prepare("INSERT INTO orders (order_id, user_id, event_id, quantity, subtotal) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("siiid", $order_id, $user_id, $event_id, $quantity, $subtotal);
    $stmt->execute();
}

// Store attendee information (optional table or for demo just echo)
$conn->query("INSERT INTO attendees (order_id, first_name, last_name, email, phone) 
              VALUES ('$order_id', '$firstName', '$lastName', '$email', '$phone')");

// Clear the user's cart
$conn->query("DELETE FROM cart WHERE user_id = '$user_id'");

echo json_encode([
    "status" => "success",
    "message" => "Checkout complete.",
    "order_id" => $order_id,
    "total" => $total
]);
?>

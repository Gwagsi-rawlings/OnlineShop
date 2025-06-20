<?php
function sendConfirmationEmail($email, $order_id) {
    $subject = "Your Ticket Order Confirmation";
    $message = "Thanks for your purchase! Your order ID is: $order_id";
    $headers = "From: no-reply@eventbooking.com";
    mail($email, $subject, $message, $headers);
}
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
function validatePhone($phone) {
    // Simple regex for phone number validation
    return preg_match('/^\+?[0-9]{10,15}$/', $phone);
}
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}
function generateOrderId() {
    return uniqid("ORD_");
}
function formatCurrency($amount) {
    return number_format($amount, 2, '.', '');
}
function getCurrentDateTime() {
    return date('Y-m-d H:i:s');
}
function logError($message) {
    error_log("[" . getCurrentDateTime() . "] ERROR: $message\n", 3, 'error.log');
}
function isValidEventId($id) {
    return is_numeric($id) && $id > 0;
}
function isValidQuantity($quantity) {
    return is_numeric($quantity) && $quantity > 0;
}
function isValidPrice($price) {
    return is_numeric($price) && $price >= 0;
}
function isValidUserId($userId) {
    return is_numeric($userId) && $userId > 0;
}
function isValidOrderId($orderId) {
    return preg_match('/^ORD_[a-zA-Z0-9]+$/', $orderId);
}
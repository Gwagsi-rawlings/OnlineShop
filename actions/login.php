<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $conn->real_escape_string($data['email']);
$password = $data['password'];

$result = $conn->query("SELECT id, first_name, last_name, password FROM users WHERE email = '$email'");

if ($result->num_rows == 0) {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password'])) {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    exit;
}

// On success: return user info
echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "user" => [
        "id" => $user['id'],
        "firstName" => $user['first_name'],
        "lastName" => $user['last_name'],
        "email" => $email
    ]
]);
?>

<?php
require 'db_config.php';

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT id, first_name, last_name, email, password FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode(["status" => "success", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid credentials."]);
}
?>

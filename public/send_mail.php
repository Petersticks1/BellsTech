<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (isset($data['name']) && isset($data['message'])) {
        $to = "adebayogvmc68@gmail.com";
        $subject = isset($data['subject']) ? $data['subject'] : "New Message from Bellstech Website";
        $name = htmlspecialchars($data['name']);
        $email = isset($data['email']) && !empty($data['email']) ? htmlspecialchars($data['email']) : "No Email Provided";
        $message = htmlspecialchars($data['message']);

        $body = "Name: $name\n";
        $body .= "Email: $email\n\n";
        $body .= "Message:\n$message\n";

        $headers = "From: noreply@bellstech.com\r\n";
        if ($email !== "No Email Provided") {
            $headers .= "Reply-To: $email\r\n";
        }
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $subject, $body, $headers)) {
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to send email. Ensure the server is configured to send mail."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid input. Name and message are required."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>

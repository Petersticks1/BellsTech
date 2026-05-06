<?php
// ─── Configuration ────────────────────────────────────────────────────────────
define('RECIPIENT_EMAIL',   'adebayogvmc68@gmail.com');
define('SENDER_DOMAIN',     'bellstech.com');
define('RATE_LIMIT_MAX',    5);       // max submissions per window per IP
define('RATE_LIMIT_WINDOW', 3600);   // window in seconds (1 hour)
define('MAX_NAME_LEN',      100);
define('MAX_EMAIL_LEN',     254);
define('MAX_SUBJECT_LEN',   150);
define('MAX_MESSAGE_LEN',   5000);

// Allowed origins — same-origin requests have no Origin header (allowed),
// cross-origin requests must match this list exactly.
$allowedOrigins = [
    'https://bellstech.com',
    'https://www.bellstech.com',
    'http://localhost:5173',    // Vite dev server
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sendJson(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Strip characters that enable email-header injection. */
function sanitizeHeader(string $value): string
{
    return preg_replace('/[\r\n\t\0]/', '', $value);
}

/** File-based rate limiter — returns false when the limit is exceeded. */
function checkRateLimit(string $ip): bool
{
    $dir  = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'bellstech_rl';
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
        return true; // can't create dir — fail open so legit users aren't blocked
    }
    $file = $dir . DIRECTORY_SEPARATOR . md5($ip) . '.json';
    $now  = time();
    $rec  = ['count' => 0, 'window_start' => $now];

    if (is_file($file)) {
        $raw = file_get_contents($file);
        $rec = json_decode($raw ?: '{}', true) ?? $rec;
        if ($now - ($rec['window_start'] ?? 0) >= RATE_LIMIT_WINDOW) {
            $rec = ['count' => 0, 'window_start' => $now];
        }
    }

    if (($rec['count'] ?? 0) >= RATE_LIMIT_MAX) {
        return false;
    }

    $rec['count']++;
    file_put_contents($file, json_encode($rec), LOCK_EX);
    return true;
}

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Same-origin fetches (Vite serving the PHP via proxy, or direct same-host) send
// no Origin header — those are fine. Only restrict explicit cross-origin callers.

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        sendJson(403, ['status' => 'error', 'message' => 'Origin not allowed.']);
    }
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Vary: Origin');
}

// ─── Preflight ────────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─── Method guard ─────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    sendJson(405, ['status' => 'error', 'message' => 'Method not allowed.']);
}

// ─── Rate limiting ────────────────────────────────────────────────────────────
$rawIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip    = trim(explode(',', $rawIp)[0]);

if (!checkRateLimit($ip)) {
    sendJson(429, [
        'status'  => 'error',
        'message' => 'Too many requests. Please wait a while before sending another message.',
    ]);
}

// ─── Parse body ───────────────────────────────────────────────────────────────
$raw = file_get_contents('php://input');
if (empty($raw)) {
    sendJson(400, ['status' => 'error', 'message' => 'Request body is empty.']);
}

$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    sendJson(400, ['status' => 'error', 'message' => 'Invalid JSON in request body.']);
}

// ─── Validate inputs ──────────────────────────────────────────────────────────
$errors = [];

$name = trim($data['name'] ?? '');
if ($name === '') {
    $errors[] = 'Your name is required.';
} elseif (mb_strlen($name) > MAX_NAME_LEN) {
    $errors[] = 'Name must be ' . MAX_NAME_LEN . ' characters or fewer.';
}

$email = trim($data['email'] ?? '');
if ($email !== '') {
    if (mb_strlen($email) > MAX_EMAIL_LEN) {
        $errors[] = 'Email address is too long.';
    } elseif (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        $errors[] = 'Please provide a valid email address.';
    }
}

$message = trim($data['message'] ?? '');
if ($message === '') {
    $errors[] = 'A message is required.';
} elseif (mb_strlen($message) > MAX_MESSAGE_LEN) {
    $errors[] = 'Message must be ' . MAX_MESSAGE_LEN . ' characters or fewer.';
}

$subject = trim($data['subject'] ?? '');
if ($subject === '') {
    $subject = 'New Message from Bellstech Website';
} elseif (mb_strlen($subject) > MAX_SUBJECT_LEN) {
    $errors[] = 'Subject must be ' . MAX_SUBJECT_LEN . ' characters or fewer.';
}

if (!empty($errors)) {
    sendJson(422, [
        'status'  => 'error',
        'message' => implode(' ', $errors),
        'errors'  => $errors,
    ]);
}

// ─── Sanitize for headers ─────────────────────────────────────────────────────
$safeName    = sanitizeHeader(strip_tags($name));
$safeSubject = sanitizeHeader(strip_tags($subject));
$safeEmail   = $email !== '' ? sanitizeHeader($email) : '';

// ─── Build email ──────────────────────────────────────────────────────────────
$timestamp = gmdate('Y-m-d H:i:s') . ' UTC';
$divider   = str_repeat('─', 40);

$body  = "New contact form submission — Bellstech\n";
$body .= "$divider\n";
$body .= sprintf("Name      : %s\n", $safeName);
$body .= sprintf("Email     : %s\n", $safeEmail !== '' ? $safeEmail : 'Not provided');
$body .= sprintf("Submitted : %s\n", $timestamp);
$body .= "$divider\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: Bellstech Contact Form <noreply@" . SENDER_DOMAIN . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
if ($safeEmail !== '') {
    $headers .= "Reply-To: $safeName <$safeEmail>\r\n";
}

// ─── Send ─────────────────────────────────────────────────────────────────────
if (mail(RECIPIENT_EMAIL, $safeSubject, $body, $headers)) {
    sendJson(200, [
        'status'  => 'success',
        'message' => "Thank you, $safeName! Your message has been received. We’ll get back to you shortly.",
    ]);
} else {
    sendJson(500, [
        'status'  => 'error',
        'message' => 'We could not send your message due to a server issue. Please try again later, or reach us directly on WhatsApp.',
    ]);
}

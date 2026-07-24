<?php
// Принимает заявки с формы "Оставить заявку", сохраняет в базу данных
// и отправляет уведомление на почту (LEADS_EMAIL_TO в config.php).

require_once __DIR__ . '/config.php';

send_cors_headers();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$name = trim($body['name'] ?? '');
$phone = trim($body['phone'] ?? '');
$message = trim($body['message'] ?? '');

if ($name === '' || strlen($phone) < 6) {
    http_response_code(400);
    echo json_encode(['error' => 'Заполните имя и телефон']);
    exit;
}

try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare(
        'INSERT INTO leads (name, phone, message) VALUES (:name, :phone, :message)'
    );
    $stmt->execute([
        'name' => $name,
        'phone' => $phone,
        'message' => $message,
    ]);
    $newId = $pdo->lastInsertId();

    // Отправка уведомления на почту (если на сервере настроена функция mail()).
    $subject = 'Новая заявка с сайта';
    $emailBody = "Имя: {$name}\nТелефон: {$phone}\nСообщение: {$message}";
    $headers = 'Content-Type: text/plain; charset=utf-8';
    @mail(LEADS_EMAIL_TO, $subject, $emailBody, $headers);

    echo json_encode(['success' => true, 'id' => (int)$newId]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
}

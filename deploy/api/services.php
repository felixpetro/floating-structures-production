<?php
// Отдаёт список услуг или одну услугу по параметру ?slug=...
// Совместим по формату ответа с исходной облачной функцией services.

require_once __DIR__ . '/config.php';

send_cors_headers();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $pdo = get_db_connection();
    $slug = $_GET['slug'] ?? null;

    if ($slug !== null) {
        $stmt = $pdo->prepare(
            'SELECT id, slug, name, icon, short_description, long_description, features, sort_order
             FROM services WHERE slug = :slug'
        );
        $stmt->execute(['slug' => $slug]);
        $row = $stmt->fetch();

        if (!$row) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            exit;
        }

        $row['features'] = json_decode($row['features'], true);
        echo json_encode($row, JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmt = $pdo->query(
        'SELECT id, slug, name, icon, short_description, long_description, features, sort_order
         FROM services ORDER BY sort_order ASC'
    );
    $rows = $stmt->fetchAll();

    foreach ($rows as &$row) {
        $row['features'] = json_decode($row['features'], true);
    }

    echo json_encode($rows, JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
}

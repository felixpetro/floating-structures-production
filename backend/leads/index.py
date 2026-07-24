import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Принимает заявки с формы обратной связи и сохраняет их в базу данных.
    Args: event с httpMethod, body (JSON: name, phone, message); context с request_id
    Returns: HTTP response с результатом сохранения заявки
    '''
    method: str = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid JSON'})
        }

    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or len(phone) < 6:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Заполните имя и телефон'})
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor()
        safe_name = name.replace("'", "''")
        safe_phone = phone.replace("'", "''")
        safe_message = message.replace("'", "''")
        cur.execute(
            f"INSERT INTO leads (name, phone, message) VALUES ('{safe_name}', '{safe_phone}', '{safe_message}') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'id': new_id})
        }
    finally:
        conn.close()

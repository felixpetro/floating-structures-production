import json
import os
import psycopg2
import psycopg2.extras


def handler(event: dict, context) -> dict:
    '''Возвращает список продукции или один товар по slug из базы данных.
    Args: event с httpMethod, queryStringParameters (slug опционально); context с request_id
    Returns: HTTP response со списком товаров или одним товаром
    '''
    method: str = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        params = event.get('queryStringParameters') or {}
        slug = params.get('slug')

        if slug:
            safe_slug = slug.replace("'", "''")
            cur.execute(
                f"SELECT id, slug, name, category, badge, description, long_description, specs, sort_order "
                f"FROM products WHERE slug = '{safe_slug}'"
            )
            row = cur.fetchone()
            cur.close()
            if not row:
                return {
                    'statusCode': 404,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Not found'})
                }
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps(dict(row), default=str)
            }

        cur.execute(
            "SELECT id, slug, name, category, badge, description, long_description, specs, sort_order "
            "FROM products ORDER BY sort_order ASC"
        )
        rows = cur.fetchall()
        cur.close()
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps([dict(r) for r in rows], default=str)
        }
    finally:
        conn.close()

# trigger redeploy marker v2

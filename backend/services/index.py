import json
import os
import psycopg2
import psycopg2.extras


def handler(event: dict, context) -> dict:
    '''Возвращает список услуг или одну услугу по slug из базы данных.
    Args: event с httpMethod, queryStringParameters (slug опционально); context с request_id
    Returns: HTTP response со списком услуг или одной услугой
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
                f"SELECT id, slug, name, icon, short_description, long_description, features, sort_order "
                f"FROM services WHERE slug = '{safe_slug}'"
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
            "SELECT id, slug, name, icon, short_description, long_description, features, sort_order "
            "FROM services ORDER BY sort_order ASC"
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

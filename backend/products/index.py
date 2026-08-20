import json
import os
import psycopg2
import psycopg2.extras


def handler(event: dict, context) -> dict:
    '''Возвращает список продукции или один товар по slug из базы данных, включая фото и особенности.
    Args: event с httpMethod, queryStringParameters (slug опционально); context с request_id
    Returns: HTTP response со списком товаров или одним товаром (с массивом photos)
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
                f"SELECT p.id, p.slug, p.name, c.name AS category, c.slug AS category_slug, "
                f"p.badge, p.description, p.long_description, p.specs, p.features, p.sort_order "
                f"FROM products p JOIN categories c ON p.category_id = c.id "
                f"WHERE p.slug = '{safe_slug}'"
            )
            row = cur.fetchone()
            if not row:
                cur.close()
                return {
                    'statusCode': 404,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Not found'})
                }
            cur.execute(
                f"SELECT url FROM product_photos WHERE product_id = {row['id']} ORDER BY sort_order ASC"
            )
            photos = [p['url'] for p in cur.fetchall()]
            cur.close()
            result = dict(row)
            result['photos'] = photos
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps(result, default=str)
            }

        cur.execute(
            "SELECT p.id, p.slug, p.name, c.name AS category, c.slug AS category_slug, "
            "p.badge, p.description, p.long_description, p.specs, p.features, p.sort_order "
            "FROM products p JOIN categories c ON p.category_id = c.id "
            "ORDER BY p.sort_order ASC"
        )
        rows = cur.fetchall()

        cur.execute("SELECT product_id, url FROM product_photos ORDER BY sort_order ASC")
        photo_rows = cur.fetchall()
        cur.close()

        photos_by_product = {}
        for p in photo_rows:
            photos_by_product.setdefault(p['product_id'], []).append(p['url'])

        result = []
        for r in rows:
            item = dict(r)
            item['photos'] = photos_by_product.get(r['id'], [])
            result.append(item)

        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps(result, default=str)
        }
    finally:
        conn.close()
ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB NOT NULL DEFAULT '[]';

CREATE TABLE IF NOT EXISTS product_photos (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_photos_product_id ON product_photos(product_id);

UPDATE products SET features = '["Не требует спецтехники при монтаже","Замковое соединение модулей","Устойчив к УФ-излучению и морозу","Возможна сборка любой конфигурации"]'::jsonb WHERE slug = 'ponton-volna-plyus';
UPDATE products SET features = '["Простой монтаж силами двух человек","Алюминиевый каркас без коррозии","Настил из термообработанной лиственницы","Гарантия от производителя 15 лет"]'::jsonb WHERE slug = 'prichal-marina-pro';
UPDATE products SET features = '["Индивидуальный расчёт под нагрузку","Усиленный стальной каркас","Возможность установки ограждений","Проектирование под любые задачи"]'::jsonb WHERE slug = 'platforma-akvatoriya';
UPDATE products SET features = '["Быстрая сборка без инструмента","8 вариантов расцветки","Подходит для любых форм конструкций","Лёгкая транспортировка"]'::jsonb WHERE slug = 'modul-kub-m';
UPDATE products SET features = '["Сухое хранение судна на воде","Монтаж за один день","Защита днища от обрастания","Выдерживает вес катера до 1 тонны"]'::jsonb WHERE slug = 'ponton-akva-drayv';
UPDATE products SET features = '["Светодиодное освещение по периметру","Кнехты и утки премиум-класса","Рассчитан на приём крупных яхт","Индивидуальный дизайн настила"]'::jsonb WHERE slug = 'prichal-yaht-klub';

-- Создаём таблицу категорий продукции
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Наполняем категориями из уже существующих продуктов
INSERT INTO categories (name, slug, sort_order)
VALUES
    ('Понтоны', 'pontony', 1),
    ('Причалы', 'prichaly', 2),
    ('Платформы', 'platformy', 3),
    ('Модули', 'moduli', 4);

-- Добавляем связь продукта с категорией
ALTER TABLE products ADD COLUMN category_id INTEGER REFERENCES categories(id);

-- Заполняем category_id на основе текстового поля category
UPDATE products p SET category_id = c.id
FROM categories c
WHERE p.category = c.name;

-- Делаем поле обязательным теперь, когда все строки заполнены
ALTER TABLE products ALTER COLUMN category_id SET NOT NULL;

import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type Category = 'Все' | 'Понтоны' | 'Причалы' | 'Платформы' | 'Модули';

interface Spec {
  label: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, 'Все'>;
  badge?: string;
  desc: string;
  specs: Spec[];
}

const categories: Category[] = [
  'Все',
  'Понтоны',
  'Причалы',
  'Платформы',
  'Модули',
];

const products: Product[] = [
  {
    id: 1,
    name: 'Понтон «Волна Плюс»',
    category: 'Понтоны',
    badge: 'Хит',
    desc: 'Универсальный плавучий модуль для причалов и переправ.',
    specs: [
      { label: 'Грузоподъёмность', value: '350 кг/м²' },
      { label: 'Габариты', value: '500×500 мм' },
      { label: 'Осадка', value: '6.5 см' },
      { label: 'Материал', value: 'НДПЭ' },
    ],
  },
  {
    id: 2,
    name: 'Причал «Марина Про»',
    category: 'Причалы',
    desc: 'Стационарный причал с алюминиевым настилом.',
    specs: [
      { label: 'Длина секции', value: '12 м' },
      { label: 'Ширина', value: '2.4 м' },
      { label: 'Нагрузка', value: '400 кг/м²' },
      { label: 'Настил', value: 'Лиственница' },
    ],
  },
  {
    id: 3,
    name: 'Платформа «Акватория»',
    category: 'Платформы',
    badge: 'Под заказ',
    desc: 'Плавучая площадка для кафе, сцен и вертолётов.',
    specs: [
      { label: 'Площадь', value: 'до 400 м²' },
      { label: 'Борт', value: '25 т' },
      { label: 'Крепление', value: 'Сваи/якоря' },
      { label: 'Опции', value: 'Ограждение' },
    ],
  },
  {
    id: 4,
    name: 'Модуль «Куб-М»',
    category: 'Модули',
    desc: 'Универсальный поплавковый куб для сборки любых форм.',
    specs: [
      { label: 'Габариты', value: '0.5×0.5×0.4 м' },
      { label: 'Плавучесть', value: '320 кг' },
      { label: 'Соединение', value: 'Штифт' },
      { label: 'Цвет', value: '8 вариантов' },
    ],
  },
  {
    id: 5,
    name: 'Понтон «Аква-Драйв»',
    category: 'Понтоны',
    desc: 'Понтон под гидроцикл и катер.',
    specs: [
      { label: 'Грузоподъёмность', value: '1000 кг' },
      { label: 'Габариты', value: '3×5 м' },
      { label: 'Подъём', value: 'Сухое хранение' },
      { label: 'Монтаж', value: '1 день' },
    ],
  },
  {
    id: 6,
    name: 'Причал «Яхт-Клуб»',
    category: 'Причалы',
    badge: 'Премиум',
    desc: 'Причальная система для яхт премиум-класса.',
    specs: [
      { label: 'Длина', value: 'до 40 м' },
      { label: 'Ширина', value: '3 м' },
      { label: 'Освещение', value: 'LED' },
      { label: 'Оснастка', value: 'Кнехты/утки' },
    ],
  },
];

const Catalog = () => {
  const [active, setActive] = useState<Category>('Все');

  const filtered =
    active === 'Все'
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="catalog" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-sm font-medium uppercase tracking-widest text-secondary">
            Продукция
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Интерактивный каталог
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Выберите тип конструкции и сравните технические характеристики.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2.5 font-display text-sm font-medium uppercase tracking-wide transition duration-300 ${
                active === cat
                  ? 'scale-105 bg-primary text-primary-foreground shadow'
                  : 'border border-border bg-card text-muted-foreground hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group animate-scale-in overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent">
                <Icon
                  name="Ship"
                  size={64}
                  className="text-primary-foreground/90 transition duration-300 group-hover:scale-110"
                />
                {product.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {product.badge}
                  </span>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-primary/70 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur">
                  {product.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-card-foreground">
                  {product.name}
                </h3>
                <p className="mt-2 text-muted-foreground">{product.desc}</p>

                <dl className="mt-5 space-y-2">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between border-b border-dashed border-border pb-2 text-sm last:border-b-0"
                    >
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="font-semibold text-primary">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Подробнее
                  </Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:bg-secondary">
                    Узнать цену
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;

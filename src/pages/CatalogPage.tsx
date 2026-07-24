import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { fetchProducts, Product } from '@/lib/api';

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState('Все');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['Все', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = active === 'Все' ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-display text-sm font-medium uppercase tracking-widest text-secondary">
              Продукция
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Каталог продукции
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Полный ассортимент понтонов, причалов, платформ и модулей с техническими характеристиками.
            </p>
          </div>

          {loading && (
            <div className="mt-16 text-center text-muted-foreground">Загрузка каталога…</div>
          )}

          {error && (
            <div className="mt-16 text-center text-destructive">
              Не удалось загрузить продукцию. Попробуйте обновить страницу.
            </div>
          )}

          {!loading && !error && (
            <>
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
                  <Link
                    to={`/catalog/${product.slug}`}
                    key={product.id}
                    className="group animate-scale-in overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  >
                    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
                      {product.photos && product.photos.length > 0 ? (
                        <img
                          src={product.photos[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <Icon
                          name="Ship"
                          size={64}
                          className="text-primary-foreground/90 transition duration-300 group-hover:scale-110"
                        />
                      )}
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
                      <p className="mt-2 text-muted-foreground">{product.description}</p>

                      <dl className="mt-5 space-y-2">
                        {product.specs.slice(0, 4).map((spec) => (
                          <div
                            key={spec.label}
                            className="flex justify-between border-b border-dashed border-border pb-2 text-sm last:border-b-0"
                          >
                            <dt className="text-muted-foreground">{spec.label}</dt>
                            <dd className="font-semibold text-primary">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <Button variant="outline" className="mt-6 w-full">
                        Подробнее
                        <Icon name="ArrowRight" size={16} />
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
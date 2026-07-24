import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { fetchProduct, Product } from '@/lib/api';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    fetchProduct(slug)
      .then((data) => {
        if (!data) setNotFound(true);
        else setProduct(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition"
          >
            <Icon name="ArrowLeft" size={16} />
            Ко всему каталогу
          </Link>

          {loading && (
            <div className="mt-16 text-center text-muted-foreground">Загрузка…</div>
          )}

          {notFound && !loading && (
            <div className="mt-16 text-center">
              <h1 className="font-display text-3xl font-bold text-foreground">Товар не найден</h1>
              <p className="mt-3 text-muted-foreground">Возможно, он был снят с производства.</p>
              <Button asChild className="mt-6">
                <Link to="/catalog">Вернуться в каталог</Link>
              </Button>
            </div>
          )}

          {product && !loading && (
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="animate-fade-in">
                <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent md:h-96">
                  <Icon name="Ship" size={120} className="text-primary-foreground/90" />
                  {product.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-background/90 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <span className="font-display text-sm font-medium uppercase tracking-widest text-secondary">
                  {product.category}
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {product.long_description || product.description}
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-4">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="rounded-xl border border-border bg-card p-4">
                      <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                      <dd className="mt-1 font-display text-lg font-bold text-primary">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-secondary">
                    <Link to="/#contacts">
                      Запросить цену
                      <Icon name="ArrowRight" size={18} />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/catalog">Смотреть другие товары</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
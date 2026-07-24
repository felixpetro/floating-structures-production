import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
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
      <main className="flex-1 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-accent transition">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/catalog" className="hover:text-accent transition">Продукция</Link>
            {product && (
              <>
                <Icon name="ChevronRight" size={14} />
                <span className="text-foreground">{product.name}</span>
              </>
            )}
          </nav>

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
            <>
              <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="animate-fade-in">
                  {product.photos && product.photos.length > 0 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {product.photos.map((photo, idx) => (
                          <CarouselItem key={idx}>
                            <div className="relative h-72 overflow-hidden rounded-2xl md:h-96">
                              <img
                                src={photo}
                                alt={`${product.name} — фото ${idx + 1}`}
                                className="h-full w-full object-cover"
                              />
                              {idx === 0 && product.badge && (
                                <span className="absolute right-4 top-4 rounded-full bg-background/90 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {product.photos.length > 1 && (
                        <>
                          <CarouselPrevious className="left-3" />
                          <CarouselNext className="right-3" />
                        </>
                      )}
                    </Carousel>
                  ) : (
                    <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent md:h-96">
                      <Icon name="Ship" size={120} className="text-primary-foreground/90" />
                      {product.badge && (
                        <span className="absolute right-4 top-4 rounded-full bg-background/90 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  )}
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

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-secondary">
                      <Link to="/#contacts">
                        Запросить цену
                        <Icon name="ArrowRight" size={18} />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/catalog">Ко всему каталогу</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-14 grid gap-10 lg:grid-cols-2">
                <div className="animate-fade-in">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Технические характеристики
                  </h2>
                  <dl className="mt-5 space-y-3">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4"
                      >
                        <dt className="text-muted-foreground">{spec.label}</dt>
                        <dd className="font-display font-bold text-primary">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Особенности
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4"
                      >
                        <Icon name="CheckCircle2" size={20} className="mt-0.5 shrink-0 text-secondary" />
                        <span className="text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground">
                    <h3 className="font-display text-lg font-bold">Нужен расчёт под ваш объект?</h3>
                    <p className="mt-2 text-primary-foreground/70">
                      Оставьте заявку — инженер рассчитает стоимость и сроки за 1 день.
                    </p>
                    <Button asChild className="mt-5 w-full bg-accent text-accent-foreground hover:bg-secondary">
                      <Link to="/#contacts">
                        Оставить заявку
                        <Icon name="Send" size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

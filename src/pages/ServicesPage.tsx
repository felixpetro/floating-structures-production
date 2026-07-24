import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { fetchServices, Service } from '@/lib/api';

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices()
      .then(setServices)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-display text-sm font-medium uppercase tracking-widest text-secondary">
              Услуги
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Полный цикл под ключ
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              От проектирования до ввода в эксплуатацию — сопровождаем проект на каждом этапе.
            </p>
          </div>

          {loading && (
            <div className="mt-16 text-center text-muted-foreground">Загрузка услуг…</div>
          )}

          {error && (
            <div className="mt-16 text-center text-destructive">
              Не удалось загрузить услуги. Попробуйте обновить страницу.
            </div>
          )}

          {!loading && !error && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Link
                  to={`/services/${service.slug}`}
                  key={service.id}
                  className="group animate-fade-in rounded-xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-display text-4xl text-accent/40 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-3 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15">
                    <Icon name={service.icon} size={28} className="text-secondary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-card-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {service.short_description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:text-accent transition">
                    Подробнее
                    <Icon name="ArrowRight" size={14} />
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-secondary">
              <Link to="/#contacts">
                Обсудить проект
                <Icon name="ArrowRight" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

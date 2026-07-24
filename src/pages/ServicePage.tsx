import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { fetchService, Service } from '@/lib/api';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    fetchService(slug)
      .then((data) => {
        if (!data) setNotFound(true);
        else setService(data);
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
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition"
          >
            <Icon name="ArrowLeft" size={16} />
            Ко всем услугам
          </Link>

          {loading && (
            <div className="mt-16 text-center text-muted-foreground">Загрузка…</div>
          )}

          {notFound && !loading && (
            <div className="mt-16 text-center">
              <h1 className="font-display text-3xl font-bold text-foreground">Услуга не найдена</h1>
              <Button asChild className="mt-6">
                <Link to="/services">Вернуться к списку услуг</Link>
              </Button>
            </div>
          )}

          {service && !loading && (
            <div className="mt-8 max-w-3xl animate-fade-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15">
                <Icon name={service.icon} size={32} className="text-secondary" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">
                {service.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {service.long_description || service.short_description}
              </p>

              {service.features.length > 0 && (
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <Icon name="CheckCircle2" size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-secondary">
                  <Link to="/#contacts">
                    Обсудить проект
                    <Icon name="ArrowRight" size={18} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/services">Другие услуги</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePage;

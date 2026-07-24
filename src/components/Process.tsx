import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { fetchServices, Service } from '@/lib/api';

const Process = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="process" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-in">
          <span className="text-accent font-display uppercase tracking-widest text-sm">
            Этапы
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-primary-foreground">
            Полный цикл под ключ
          </h2>
          <p className="mt-4 text-primary-foreground/70">
            Ведём вас собой путь — от идеи до готовой конструкции на воде.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-primary-foreground/60">Загрузка…</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                to={`/services/${service.slug}`}
                key={service.id}
                className="relative rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 hover:bg-primary-foreground/10 transition animate-fade-in block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="absolute top-4 right-5 font-display text-4xl text-accent/40 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon name={service.icon} size={32} className="text-accent" />
                <h3 className="mt-5 font-display text-xl text-primary-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 text-primary-foreground/60">{service.short_description}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-secondary">
            <Link to="/services">
              Все услуги
              <Icon name="ArrowRight" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;

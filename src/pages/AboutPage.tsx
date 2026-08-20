import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const advantages = [
  {
    icon: 'ShieldCheck',
    title: 'Морской сертификат',
    desc: 'Проекты соответствуют требованиям МЧС и ГИМТ.',
  },
  {
    icon: 'Factory',
    title: 'Своё производство',
    desc: 'Полный цикл на собственной верфи без посредников.',
  },
  {
    icon: 'Boxes',
    title: 'Модульность',
    desc: 'Собираем на НДПЭ и стальных понтонах — от 1 м² до любых размеров.',
  },
  {
    icon: 'Clock',
    title: 'Срок от 14 дней',
    desc: 'Типовые понтоны и причалы за две недели.',
  },
];

const stats = [
  { value: '12 лет', label: 'на рынке' },
  { value: '450+', label: 'реализованных проектов' },
  { value: '25 лет', label: 'гарантии на конструкции' },
  { value: '30+', label: 'регионов работы' },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <span className="font-display text-sm font-medium uppercase tracking-widest text-secondary">
              О компании
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Инженерия, которая держится на воде
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              «АкваСтрой» — конструкторское бюро и производство плавучих сооружений.
              Мы создаём надёжные понтонные системы для яхт-клубов, набережных,
              промышленных объектов и частных владений по всей стране. Каждый
              проект начинается с расчётов и заканчивается контролем качества
              на каждом этапе.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/15 px-5 py-2.5">
              <Icon name="Award" size={20} className="text-secondary" />
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-accent-foreground">
                Гарантия до 25 лет
              </span>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in rounded-xl border border-border bg-card p-6 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-display text-3xl font-bold text-secondary">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-display text-sm font-medium uppercase tracking-widest text-secondary">
                Почему выбирают нас
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Преимущества компании
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((item, index) => (
                <div
                  key={item.title}
                  className="animate-fade-in rounded-xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15">
                    <Icon name={item.icon} size={28} className="text-secondary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
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

export default AboutPage;

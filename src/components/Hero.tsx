import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const STATS = [
  { value: '14+', label: 'лет на воде' },
  { value: '320', label: 'объектов сдано' },
  { value: '25', label: 'инженеров' },
];

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-primary via-primary to-secondary text-primary-foreground"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div
            className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent"
            style={{ animationDelay: '0ms' }}
          >
            <Icon name="Sparkles" size={14} />
            Производство под ключ
          </div>

          <h1
            className="animate-fade-in mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
            style={{ animationDelay: '100ms' }}
          >
            Плавучие конструкции
            <br />
            <span className="text-accent">под любые задачи</span>
          </h1>

          <p
            className="animate-fade-in mt-6 max-w-xl text-lg text-primary-foreground/75"
            style={{ animationDelay: '200ms' }}
          >
            Понтоны, причалы, платформы и модульные системы. Проектируем,
            производим и монтируем под ключ — от чертежа до спуска на воду.
          </p>

          <div
            className="animate-fade-in mt-9 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '300ms' }}
          >
            <Button
              size="lg"
              onClick={() => scrollTo('catalog')}
              className="group bg-accent text-accent-foreground hover:bg-secondary"
            >
              Смотреть каталог
              <Icon
                name="ArrowRight"
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('contacts')}
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              Рассчитать проект
            </Button>
          </div>

          <div
            className="animate-fade-in mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border/20 pt-8"
            style={{ animationDelay: '400ms' }}
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl font-bold tabular-nums text-accent md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo('catalog')}
        aria-label="Прокрутить вниз"
        className="animate-fade-in absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary-foreground/60 transition-colors hover:text-accent"
        style={{ animationDelay: '600ms' }}
      >
        <Icon name="ChevronDown" size={30} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;

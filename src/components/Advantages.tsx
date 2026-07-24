import Icon from '@/components/ui/icon';

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

const Advantages = () => {
  return (
    <section id="advantages" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="font-display text-sm font-medium uppercase tracking-widest text-secondary">
              О компании
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Инженерия, которая держится на воде
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              «АкваСтрой» — конструкторское бюро и производство плавучих
              сооружений. Мы создаём надёжные понтонные системы для яхт-клубов,
              набережных, промышленных объектов и частных владений по всей
              стране. Каждый проект начинается с расчётов и заканчивается
              контролем качества на каждом этапе.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/15 px-5 py-2.5">
              <Icon name="Award" size={20} className="text-secondary" />
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-accent-foreground">
                Гарантия до 25 лет
              </span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
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
      </div>
    </section>
  );
};

export default Advantages;

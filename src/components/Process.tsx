import Icon from '@/components/ui/icon';

const steps = [
  {
    num: '01',
    icon: 'PencilRuler',
    title: 'Проектирование',
    description: 'Расчёты, 3D-модель и рабочая документация.',
  },
  {
    num: '02',
    icon: 'Factory',
    title: 'Производство',
    description: 'Изготовление конструкций на собственной верфи.',
  },
  {
    num: '03',
    icon: 'Truck',
    title: 'Доставка',
    description: 'Логистика до объекта в любой регион.',
  },
  {
    num: '04',
    icon: 'Wrench',
    title: 'Монтаж и якорение',
    description: 'Сборка и надёжное закрепление на воде.',
  },
  {
    num: '05',
    icon: 'LifeBuoy',
    title: 'Сервис',
    description: 'Гарантийное и сезонное обслуживание.',
  },
  {
    num: '06',
    icon: 'Anchor',
    title: 'Ввод в эксплуатацию',
    description: 'Приёмка и передача документов.',
  },
];

const Process = () => {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className="relative rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 hover:bg-primary-foreground/10 transition animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="absolute top-4 right-5 font-display text-4xl text-accent/40 select-none">
                {step.num}
              </span>
              <Icon name={step.icon} size={32} className="text-accent" />
              <h3 className="mt-5 font-display text-xl text-primary-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-primary-foreground/60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const contacts = [
  { icon: 'Phone', text: '+7 (800) 555-04-06' },
  { icon: 'Mail', text: 'info@akvastroy.ru' },
  { icon: 'MapPin', text: 'г. Санкт-Петербург, пр. Энергетиков, 10, оф. 223' },
];

const socials = ['Send', 'MessageCircle', 'Phone'];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-14 pb-8 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-secondary to-accent">
                <Icon name="Anchor" size={22} className="text-primary" />
              </div>
              <span className="font-display text-2xl tracking-wide">
                АКВА<span className="text-accent">СТРОЙ</span>
              </span>
            </Link>
            <p className="mt-5 text-primary-foreground/70 max-w-md">
              Проектирование и производство плавучих конструкций под ключ.
              Понтоны, причалы, платформы и модульные системы для любых задач.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5">Разделы</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-accent transition">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-primary-foreground/70 hover:text-accent transition">
                  Продукция
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-accent transition">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/#contacts" className="text-primary-foreground/70 hover:text-accent transition">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5">Контакты</h4>
            <ul className="space-y-3">
              {contacts.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-3 text-primary-foreground/70"
                >
                  <Icon name={item.icon} size={16} className="text-accent shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-primary-foreground/10 pt-8">
          <p className="text-primary-foreground/60 text-sm">
            © {year} АкваСтрой. Все права защищены.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((name) => (
              <button
                key={name}
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition"
              >
                <Icon name={name} size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
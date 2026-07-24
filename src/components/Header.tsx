import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Продукция', id: 'catalog' },
  { label: 'Преимущества', id: 'advantages' },
  { label: 'Этапы', id: 'process' },
  { label: 'Контакты', id: 'contacts' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary/95 backdrop-blur shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-3"
          aria-label="АкваСтрой"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent shadow-md">
            <Icon name="Anchor" size={22} className="text-primary" />
          </span>
          <span className="font-display text-2xl font-bold tracking-wide text-primary-foreground">
            АКВА<span className="text-accent">СТРОЙ</span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="group relative text-sm font-medium text-primary-foreground/90 transition-colors hover:text-accent"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            onClick={() => scrollTo('contacts')}
            className="bg-accent text-accent-foreground hover:bg-secondary"
          >
            Оставить заявку
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-primary-foreground lg:hidden"
          aria-label="Меню"
        >
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {open && (
        <div className="border-t border-border/20 bg-primary/98 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="rounded-lg px-3 py-3 text-left text-base font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 hover:text-accent"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo('contacts')}
              className="mt-2 w-full bg-accent text-accent-foreground hover:bg-secondary"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

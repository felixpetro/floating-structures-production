import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitLead } from '@/lib/api';

const contactItems = [
  { icon: 'Phone', text: '+7 (800) 555-04-06' },
  { icon: 'Mail', text: 'info@akvastroy.ru' },
  { icon: 'MapPin', text: 'г. Самара, Набережная, 42' },
  { icon: 'Clock', text: 'Пн–Пт: 9:00–19:00' },
];

const Contacts = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length === 0 || phone.trim().length < 6) {
      toast({
        variant: 'destructive',
        title: 'Заполните имя и телефон',
        description: 'Проверьте корректность введённых данных.',
      });
      return;
    }

    setSubmitting(true);
    try {
      await submitLead({ name: name.trim(), phone: phone.trim(), message: message.trim() });
      toast({
        title: 'Заявка отправлена!',
        description: 'Мы свяжемся с вами в ближайшее время.',
      });
      setName('');
      setPhone('');
      setMessage('');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Не удалось отправить заявку',
        description: 'Попробуйте ещё раз или позвоните нам напрямую.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <span className="text-accent font-display uppercase tracking-widest text-sm">
              Контакты
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-foreground">
              Обсудим ваш проект
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Оставьте заявку — рассчитаем стоимость, подберём конструкцию и
              предложим оптимальное решение под задачу.
            </p>

            <div className="mt-10 space-y-5">
              {contactItems.map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-accent/15 text-accent shrink-0">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-scale-in">
            <div className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-card-foreground">
                    Имя
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-card-foreground">
                    Телефон
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-card-foreground">
                    Сообщение
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Опишите вашу задачу"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-secondary"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  {submitting ? 'Отправка…' : 'Отправить заявку'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки
                  персональных данных.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import Catalog from '@/components/Catalog';
import Process from '@/components/Process';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Advantages />
        <Catalog />
        <Process />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import Hero from '@/app/components/Hero';
import CardsList from '@/app/components/CardsList';
import Divider from '@/app/components/Divider';

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="px-5 pt-3 pb-5">
        <h2 className="text-2xl pb-2">Наши товары</h2>
        <Divider />
        <CardsList />
      </section>
    </main>
  );
}

import { Hero } from '../components/Hero';
import { Navigation } from '../components/Navigation';
import { Portfolio } from '../components/Portfolio';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <Hero />
      <Portfolio />
      <Skills />
      <Contact />
    </main>
  );
}

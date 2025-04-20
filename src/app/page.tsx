import { Hero } from '../components/Hero';
import { Navigation } from '../components/Navigation';
import { Portfolio } from '../components/Portfolio';
import { Skills } from '../components/Skills';
import { Dreaminn } from '../components/Dreaminn';
import { Contact } from '../components/Contact';
import { DreaminnApp } from '../components/DreaminnApp';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <Hero />
      <Portfolio />
      <Skills />
      <Dreaminn />
      <DreaminnApp />
      <Contact />
    </main>
  );
}

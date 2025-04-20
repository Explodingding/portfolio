import { Hero } from '../../portfolio-site/src/components/Hero';
import { Navigation } from '../../portfolio-site/src/components/Navigation';
import { Portfolio } from '../../portfolio-site/src/components/Portfolio';
import { Skills } from '../../portfolio-site/src/components/Skills';
import { Contact } from '../../portfolio-site/src/components/Contact';

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

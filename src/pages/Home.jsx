import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import Hero from '../components/sections/Hero/Hero';
import Services from '../components/sections/Services/Services';
import Plans from '../components/sections/Plans/Plans';
import Contact from '../components/sections/Contact/Contact';

export default function Home() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-21">
        <div id="top" />
        <Hero />
        <Services />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

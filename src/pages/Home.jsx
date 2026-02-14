import React, { useState } from 'react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import Hero from '../components/sections/Hero/Hero';
import Services from '../components/sections/Services/Services';
import Plans from '../components/sections/Plans/Plans';
import Contact from '../components/sections/Contact/Contact';

import BrandIntro from '../components/intro/BrandIntro';

export default function Home() {
  const [introOpen, setIntroOpen] = useState(true);

  return (
    <div className="min-h-dvh">
      <BrandIntro
        open={introOpen}
        onDone={() => setIntroOpen(false)}
        tone="lila"
        lilaHex="#8B5CF6"
        brandHoldMs={1600}
        exitMs={650}
        brandColorCycle={true}
        brandColors={[
          '#8B5CF6',
          '#73ba16',
          '#e01919',
          '#000000',
          '#2206d7',
          '#8B5CF6'
        ]}
      />
      {!introOpen && (
        <>
          <Navbar />

          <main className="pt-21">
            <div id="top" />
            <Hero />
            <Services />
            <Plans />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

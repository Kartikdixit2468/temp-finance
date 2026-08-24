import React from 'react';
import { ModalProvider } from './context/ModalContext';
import { BackgroundWaves } from './components/BackgroundWaves';
import { StickyHeader } from './components/StickyHeader';
import { HeroSection } from './components/sections/HeroSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { HiddenStatsSection } from './components/sections/HiddenStatsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { WhatYouLearnSection } from './components/sections/WhatYouLearnSection';
import { HostSection } from './components/sections/HostSection';
import { AudienceSection } from './components/sections/AudienceSection';
import { WhyYouFinanceSection } from './components/sections/WhyYouFinanceSection';
import { VslSection } from './components/sections/VslSection';
import { CtaSection } from './components/sections/CtaSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/Footer';
import { StickyFooter } from './components/StickyFooter';
import { Modal } from './components/ui/Modal';

export default function App() {
  return (
    <ModalProvider>
      <div className="relative min-h-screen bg-wave-pattern overflow-hidden text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        {/* Ambient SVG Waves, Watermarks & Gradients */}
        <BackgroundWaves />

        {/* Sticky Live Masterclass Top Strip */}
        <StickyHeader />

        {/* Modular Landing Page Sections */}
        <main className="relative z-10">
          <HeroSection />
          <ProblemSection />
          <HiddenStatsSection />
          <TestimonialsSection />
          <WhatYouLearnSection />
          <HostSection />
          <AudienceSection />
          <WhyYouFinanceSection />
          <VslSection />
          <CtaSection />
          <FaqSection />
        </main>

        {/* Global Copyright Footer */}
        <Footer />

        {/* Sticky YouFinance School Bottom Strip */}
        <StickyFooter />

        {/* Global Interactive Registration Modal */}
        <Modal />
      </div>
    </ModalProvider>
  );
}

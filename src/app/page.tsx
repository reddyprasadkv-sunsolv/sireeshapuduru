'use client';

import React, { useState } from 'react';
import { AmbientCanvas } from '@/components/layout/AmbientCanvas';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Programs } from '@/components/sections/Programs';
import { EventsSection } from '@/components/events/EventsSection';
import { Story } from '@/components/sections/Story';
import { MirrorWorkDeck } from '@/components/interactive/MirrorWorkDeck';
import { SelfLoveQuiz } from '@/components/interactive/SelfLoveQuiz';
import { Testimonials } from '@/components/sections/Testimonials';
import { Connect } from '@/components/sections/Connect';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { DiscoveryModal } from '@/components/modals/DiscoveryModal';

export default function Home() {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [prefilledNotes, setPrefilledNotes] = useState('');

  const handleOpenDiscovery = (notes = '') => {
    setPrefilledNotes(notes);
    setIsDiscoveryOpen(true);
  };

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <AmbientCanvas />
      
      <Navbar onOpenDiscovery={() => handleOpenDiscovery()} />
      
      <Hero onOpenDiscovery={() => handleOpenDiscovery()} />
      
      <Philosophy />
      
      <Programs onOpenDiscovery={() => handleOpenDiscovery()} />
      
      <EventsSection
        onOpenDiscoveryWithEvent={title =>
          handleOpenDiscovery(`I am inquiring about the next upcoming edition of "${title}". Please let me know when dates are announced.`)
        }
      />
      
      <Story />
      
      <MirrorWorkDeck />
      
      <SelfLoveQuiz onOpenDiscovery={() => handleOpenDiscovery()} />
      
      <Testimonials />
      
      <Connect onOpenDiscovery={() => handleOpenDiscovery()} />
      
      <Footer />
      
      <FloatingWhatsApp />

      <DiscoveryModal
        isOpen={isDiscoveryOpen}
        onClose={() => setIsDiscoveryOpen(false)}
        prefilledNotes={prefilledNotes}
      />
    </main>
  );
}

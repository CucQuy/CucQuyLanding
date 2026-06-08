import LandingShell from '@/components/LandingShell';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Story from '@/components/Story';
import Founder from '@/components/Founder';
import { MarqueeBand, MarqueeBand2 } from '@/components/MarqueeSection';
import ProductShowcase from '@/components/ProductShowcase';
import Process from '@/components/Process';
import Occasions from '@/components/Occasions';
import GiftSets from '@/components/GiftSets';
import Testimonials from '@/components/Testimonials';
import HowToOrder from '@/components/HowToOrder';
import Instagram from '@/components/Instagram';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <LandingShell>
      <Hero />
      <Stats />
      <Story />
      <Founder />
      <MarqueeBand />
      <ProductShowcase />
      <Process />
      <Occasions />
      <MarqueeBand2 />
      <GiftSets />
      <Testimonials />
      <HowToOrder />
      <Instagram />
      <FAQ />
      <Newsletter />
      <CTA />
      <Footer />
    </LandingShell>
  );
}

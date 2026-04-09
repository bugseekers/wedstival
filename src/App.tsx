import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Designs from './components/Designs';
import Experience from './components/Experience';
import Technology from './components/Technology';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const onScroll = ScrollTrigger.update;
    lenis.on('scroll', onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <Designs />
      <Experience />
      <Technology />
      <Process />
      <Testimonials />
      <Booking />
      <Footer />
    </div>
  );
}

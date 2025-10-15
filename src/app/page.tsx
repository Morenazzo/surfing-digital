import { 
  Navbar, 
  Hero, 
  Features, 
  HowItWorks, 
  CTA, 
  FAQ, 
  Footer 
} from "@/components/landing";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <FAQ />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
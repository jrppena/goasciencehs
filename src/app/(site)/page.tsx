import { AlumniTestimonials } from "@/components/home/alumni-testimonials";
import { AudienceDoors } from "@/components/home/audience-doors";
import { CtaBand } from "@/components/home/cta-band";
import { Hero } from "@/components/home/hero";
import { MissionStats } from "@/components/home/mission-stats";
import { NewsPreview } from "@/components/home/news-preview";
import { PageTransition } from "@/components/motion/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <AudienceDoors />
      <NewsPreview />
      <MissionStats />
      <AlumniTestimonials />
      <CtaBand />
    </PageTransition>
  );
}

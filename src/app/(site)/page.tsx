import { AlumniTestimonials } from "@/components/home/alumni-testimonials";
import { CtaBand } from "@/components/home/cta-band";
import { GshsWay } from "@/components/home/gshs-way";
import { Hero } from "@/components/home/hero";
import { JuniorHigh } from "@/components/home/junior-high";
import { MissionStats } from "@/components/home/mission-stats";
import { NewsPreview } from "@/components/home/news-preview";
import { SeniorHigh } from "@/components/home/senior-high";
import { PageTransition } from "@/components/motion/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <MissionStats />
      <JuniorHigh />
      <SeniorHigh />
      <GshsWay />
      <AlumniTestimonials />
      <NewsPreview />
      <CtaBand />
    </PageTransition>
  );
}

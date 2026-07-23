import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Cursor } from "@/components/portfolio/Cursor";
import { MouseSpotlight } from "@/components/portfolio/MouseSpotlight";
import { Grain } from "@/components/portfolio/Grain";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Loader } from "@/components/portfolio/Loader";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Journey } from "@/components/portfolio/Journey";
import { Skills } from "@/components/portfolio/Skills";
import { TechOrbit } from "@/components/portfolio/TechOrbit";
import { Experience } from "@/components/portfolio/Experience";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { GithubSection } from "@/components/portfolio/GithubSection";
import { Leetcode } from "@/components/portfolio/Leetcode";
import { OpenSource } from "@/components/portfolio/OpenSource";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { EngineeringJourney } from "@/components/portfolio/EngineeringJourney";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ankit Yadav — Software Engineer" },
      {
        name: "description",
        content:
          "Ankit Yadav — Software Engineer building scalable digital experiences with modern web technologies. Open for internships.",
      },
      { property: "og:title", content: "Ankit Yadav — Software Engineer" },
      {
        property: "og:description",
        content:
          "Ankit Yadav — Software Engineer building scalable digital experiences with modern web technologies. Open for internships.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ankit Yadav — Software Engineer" },
      {
        name: "twitter:description",
        content:
          "Ankit Yadav — Software Engineer building scalable digital experiences with modern web technologies. Open for internships.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ankit Yadav",
          jobTitle: "Software Engineer",
          url: "/",
          sameAs: ["https://github.com", "https://linkedin.com"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Grain />
      <MouseSpotlight />
      <Navbar />
      <main id="home" className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <TechOrbit />
        <Experience />
        <FeaturedProjects />
        <GithubSection />
        <Leetcode />
        <OpenSource />
        <Achievements />
        <EngineeringJourney />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

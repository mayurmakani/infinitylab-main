// Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import Slider from "../components/slider.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import heroImage from "../assets/images/hero1.jpg";
import TestimonialsSection from "../components/TestimonialsSection";
import SocialFloating from "../components/SocialFloating";
import QuoteCard3 from "../components/QuoteCard3.jsx"
import HowItWorks from "../components/HowItWorks.jsx";
import Advantage from "../components/Advantage.jsx";
import GigaFactory from "../components/GigaFactory.jsx";
import CosmicEnergy from "../components/CosmicEnergy.jsx";
import FAQ from "../components/FAQ.jsx";
import Seo from "../components/Seo";



import { ContainerAnimated, ContainerInset, ContainerScroll, ContainerSticky, HeroVideo, } from "../components/AnimatedVideoOnScroll.jsx";



const logo = "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1600&q=80&auto=format&fit=crop";




const Home = () => {

  return (
    <div className="min-h-screen">

      <Seo
        title="Infinity Energy | Advanced Battery & Clean Power Solutions"
        description="Infinity Energy delivers advanced battery systems and clean energy storage solutions for homes, businesses, and renewable power applications."
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Infinity Energy",
            "url": "https://www.infinityenergy.xyz",
            "logo": "https://www.infinityenergy.xyz/favicon.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-88661-89016",
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Surat",
              "addressRegion": "Gujarat",
              "addressCountry": "IN"
            },
            "email": "Info@infinityenergy.xyz",
            "sameAs": ["https://www.instagram.com/infinityenergy"]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a Battery Energy Storage System (BESS)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Battery Energy Storage System (BESS) is a technology that stores energy for later use. It allows energy to be captured during times of low demand or when renewable energy sources like solar or wind are abundant, and then released during peak demand or when renewable energy production is low."
                }
              },
              {
                "@type": "Question",
                "name": "How does a BESS work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A BESS works by converting electrical energy to chemical energy for storage in batteries. When electricity is needed, the chemical energy is converted back to electrical energy. The system includes batteries, a power conversion system (inverter), and controls to manage charging and discharging cycles efficiently."
                }
              },
              {
                "@type": "Question",
                "name": "What are the benefits of using a BESS?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Benefits include energy cost savings, backup power during outages, grid stability support, peak demand reduction, integration of renewable energy sources, reduced carbon footprint, and potential revenue through energy arbitrage or grid services."
                }
              },
              {
                "@type": "Question",
                "name": "What types of batteries are used in a BESS?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Common battery technologies include lithium-ion (most popular for commercial BESS), lead-acid, flow batteries, sodium-sulfur, and emerging technologies like solid-state batteries. Each type has different characteristics in terms of energy density, cycle life, and cost."
                }
              }
            ]
          }
        ]}
      />


      <Header />
      <main className="pt-0 px-4 md:px-4 space-y-8">
        <section>
          <Slider
            autoPlay={true}
            interval={4000}
          />
        </section>
        <section>
          <QuoteCard3
            imageLeft="https://backend.infinityenergy.xyz/uploads/media/hero2.1.webp"
            imageRight="https://backend.infinityenergy.xyz/uploads/media/hero2.2.webp"
            quote="Advanced Lithium Energy Storage Solutions for India"
            description="Infinity Energy is an India‑focused energy solutions company specializing in manufacturing and trading and system integration of Lithium Battery solutions for Inverter, UPS, BESS, and Solar applications. Our approach is technical‑driven yet sales‑friendly, ensuring customers receive the right solution with complete clarity, reliability, and long‑term value."
            page="/about"
          />
        </section>
        <section>
          <HowItWorks />
        </section>
        <section>
          <Advantage />
        </section>

        <section>
          <ContainerScroll className="h-[250vh] ">
            <ContainerSticky className="px-0 py-0 text-white flex flex-col items-center justify-center gap-10">

              <ContainerAnimated className="space-y-4 text-center">
                <h1 className="text-4xl md:text-6xl font-medium tracking-tighter">
                Where ideas evolve into limitless innovation.
                </h1>
                {/* <p className="mx-auto max-w-[42ch] opacity-80 text-black">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
                  et, distinctio eum impedit nihil ipsum modi.
                </p> */}
              </ContainerAnimated>

              <ContainerInset className="w-full h-[70vh] sm:h-[80vh] md:h-[650px]">
                <HeroVideo src="https://infinityenergy.xyz/video/intro.mp4" />
              </ContainerInset>

            </ContainerSticky>
          </ContainerScroll>
        </section>
        <section>
          <GigaFactory />
        </section>
        <section>
          <CosmicEnergy />
        </section>
        <section>
          <FAQ />
        </section>
        <section >
          <TestimonialsSection />
        </section>
      </main>
      <SocialFloating />
      <Footer />
    </div>
  );
};

export default Home;
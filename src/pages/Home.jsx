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
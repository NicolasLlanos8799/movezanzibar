import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Founder } from "@/components/Founder";
import { YouthCommunity } from "@/components/YouthCommunity";
import { Donate } from "@/components/Donate";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Move Zanzibar — one-page informativa.
 * Hero → Who We Are → Founder → Our Work (Youth Program & Community) → Donate → Contact.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Founder />
        <YouthCommunity />
        <Donate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

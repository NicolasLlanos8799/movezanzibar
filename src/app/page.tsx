import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Founder } from "@/components/Founder";
import { YouthCommunity } from "@/components/YouthCommunity";
import { ShowTeaser } from "@/components/ShowTeaser";
import { Booking } from "@/components/Booking";
import { Donate } from "@/components/Donate";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FEATURES } from "@/lib/site";

/**
 * Move Zanzibar — one-page informativa.
 * Hero → Who We Are → Founder → Our Work (Youth Program & Community) →
 * Saturdays Show teaser (full page at /show) → Booking → Donate → Contact.
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
        {FEATURES.saturdaysShow && <ShowTeaser />}
        <Booking />
        <Donate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

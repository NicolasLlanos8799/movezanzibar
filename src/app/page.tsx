import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Founder } from "@/components/Founder";
import { YouthCommunity } from "@/components/YouthCommunity";
import { Booking } from "@/components/Booking";
import { Donate } from "@/components/Donate";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Move Zanzibar — one-page informativa.
 * Hero → Who We Are → Founder → Our Work (Youth Program & Community) → Booking → Donate → Contact.
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
        <Booking />
        <Donate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

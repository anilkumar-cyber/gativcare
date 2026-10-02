import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChat from "@/components/sections/AIChat";
import WhatsAppWidget from "@/components/sections/WhatsAppWidget";
import { StickyCtaBar } from "@/components/ui/StickyCtaBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIChat />
      <WhatsAppWidget />
      <StickyCtaBar />
    </>
  );
}

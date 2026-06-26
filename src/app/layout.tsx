import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GativCare - World-Class Medical Tourism in India | Save up to 90%",
  description: "India's premier medical tourism platform. Connect with 250+ JCI-accredited hospitals and 3000+ specialist doctors. Save up to 90% on world-class healthcare with complete end-to-end assistance.",
  keywords: "medical tourism India, healthcare India, hospital India, treatment India, affordable healthcare, JCI hospitals, medical travel",
  openGraph: {
    title: "GativCare - World-Class Medical Tourism in India",
    description: "Affordable, trusted, internationally accredited healthcare with complete end-to-end medical travel assistance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

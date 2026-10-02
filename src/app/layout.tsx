import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { CurrencyProvider } from "@/components/layout/CurrencyContext";
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
  metadataBase: new URL("https://gativcare.com"),
  title: "GativCare - World-Class Medical Tourism in India | Save up to 90%",
  description: "India's premier medical tourism platform. Connect with 250+ JCI-accredited hospitals and 3000+ specialist doctors. Save up to 90% on world-class healthcare with complete end-to-end assistance.",
  keywords: "medical tourism India, healthcare India, hospital India, treatment India, affordable healthcare, JCI hospitals, medical travel",
  openGraph: {
    title: "GativCare - World-Class Medical Tourism in India",
    description: "Affordable, trusted, internationally accredited healthcare with complete end-to-end medical travel assistance.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon-192.png",
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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NNLKVN2B');`}
        </Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W001F5BFRG" strategy="afterInteractive" />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W001F5BFRG');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNLKVN2B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div id="google_translate_element" style={{ display: "none" }} />
        <Script id="google-translate" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
            var gtScript = document.createElement('script');
            gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(gtScript);
          `}
        </Script>
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}

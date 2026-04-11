import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Mobile Tyre Fitting United Kingdom | 24/7 Emergency Service | Call Now",
  description:
    "24/7 Mobile Tyre Fitting in United Kingdom & outskirts. Emergency roadside assistance, ETA from 20 mins. Brand new tyres, TPMS & puncture repair. Call 0330 043 8437 now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <link rel="canonical" href="http://127.0.0.1:3000" />
        
        {/* Preload hero images for LCP */}
        <link rel="preload" as="image" href="/assets/imgs/optimized/mtf-420.webp" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/assets/imgs/optimized/mtf-700.webp" media="(min-width: 768px)" />

        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://127.0.0.1:3000" />
        <meta property="og:image" content="/assets/imgs/optimized/hero-1000.webp" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://uploads.webspires.co.uk" crossOrigin="" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
        />
        <link
          rel="preload" as="style"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />

      </head>
      <body>
        {children}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=AW-11284691642" 
          strategy="lazyOnload" 
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11284691642');
          `}
        </Script>
      </body>
    </html>
  );
}

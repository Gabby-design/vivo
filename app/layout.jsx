import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileDock from './components/MobileDock';
import { ProductProvider } from './context/ProductContext';

export const metadata = {
  title: 'Vivo Smart Phone Office | Official Store in Wuse 2, Abuja',
  description:
    'Authorized retail store for 100% original Vivo smartphones, Apple iPhones, Samsung Galaxy & official accessories in Wuse 2, Abuja. Located at Shop B8, First Bank Line (Green Pillar), New Banex Plaza. Rated 4.9★ on Google.',
};

export const viewport = {
  themeColor: '#0A5FDB',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 font-sans antialiased selection:bg-vivo-blue selection:text-white transition-colors duration-300 pb-20 md:pb-0">
        <ProductProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileDock />
        </ProductProvider>
      </body>
    </html>
  );
}

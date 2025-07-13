import "./globals.css";
import { LanguageProvider } from './contexts/LanguageContext';

export const metadata = {
  title: "BusinessHub - All-in-One Business Solutions",
  description: "Transform your business with our all-in-one software platform. From real estate to barbershops, we provide everything you need to run, manage, and grow your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

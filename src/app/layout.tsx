import "./globals.css";
import { CartProvider } from "@/context/cartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "E-Commerce App",
  description: "Next.js App Router e-commerce site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <CartProvider>
          <Navbar />
          <main className="p-4">{children}</main>
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}

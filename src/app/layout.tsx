import "./globals.css";
import { WellnessProvider } from "@/context/wellnessContext";
import WellnessNavbar from "@/components/WellnessNavbar";
import Sidebar from "@/components/Sidebar";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "WellSync - Your Connected Wellness Companion",
  description: "Track your health, fitness, and wellness all in one place",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <WellnessProvider>
          <WellnessNavbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen p-4 md:p-8">{children}</main>
          </div>
        </WellnessProvider>
      </body>
    </html>
  );
}

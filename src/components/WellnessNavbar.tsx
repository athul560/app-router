"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function WellnessNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/calories", label: "Calories", icon: "🍎" },
    { href: "/bmi", label: "BMI", icon: "⚖️" },
    { href: "/steps", label: "Steps", icon: "👟" },
    { href: "/map", label: "Map", icon: "🗺️" },
    { href: "/sugar", label: "Sugar", icon: "💉" },
    { href: "/doctor", label: "Doctor", icon: "👨‍⚕️" },
    { href: "/exercise", label: "Exercise", icon: "💪" },
    { href: "/coach", label: "Coach", icon: "🎯" },
    { href: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-teal to-primary-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">💚</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">WellSync</h1>
              <p className="text-xs text-primary-teal">Your Wellness Companion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  pathname === item.href
                    ? "bg-primary-teal/20 text-primary-teal"
                    : "text-foreground/70 hover:text-foreground hover:bg-dark-200"
                )}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-dark-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-dark-300 bg-dark-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                  pathname === item.href
                    ? "bg-primary-teal/20 text-primary-teal"
                    : "text-foreground/70 hover:text-foreground hover:bg-dark-200"
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

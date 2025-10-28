"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar() {
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
    <aside className="hidden lg:flex flex-col w-64 bg-dark-100 border-r border-dark-300 min-h-screen sticky top-16">
      <div className="p-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
              pathname === item.href
                ? "bg-primary-teal/20 text-primary-teal shadow-lg shadow-primary-teal/20"
                : "text-foreground/70 hover:text-foreground hover:bg-dark-200"
            )}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-auto p-6 border-t border-dark-300">
        <div className="bg-gradient-to-br from-primary-teal/10 to-primary-blue/10 rounded-lg p-4 border border-primary-teal/20">
          <p className="text-xs text-foreground/60 mb-2">Daily Progress</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/70">Calories</span>
              <span className="text-primary-teal font-medium">75%</span>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div className="bg-primary-teal h-2 rounded-full" style={{ width: "75%" }} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

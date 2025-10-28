import Card from "./Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "teal" | "blue" | "purple";
  className?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "teal",
  className,
}: StatCardProps) {
  const colors = {
    teal: "text-primary-teal",
    blue: "text-primary-blue",
    purple: "text-primary-purple",
  };

  return (
    <Card variant="glass" className={cn("relative overflow-hidden", className)}>
      {/* Background gradient */}
      <div
        className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20",
          color === "teal" && "bg-primary-teal",
          color === "blue" && "bg-primary-blue",
          color === "purple" && "bg-primary-purple"
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-foreground/60 font-medium">{title}</p>
            <h3 className={cn("text-3xl font-bold mt-2", colors[color])}>{value}</h3>
            {subtitle && <p className="text-xs text-foreground/50 mt-1">{subtitle}</p>}
          </div>
          {icon && <div className={cn("text-3xl", colors[color])}>{icon}</div>}
        </div>

        {trend && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-green-400" : "text-red-400"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-foreground/50">vs last week</span>
          </div>
        )}
      </div>
    </Card>
  );
}

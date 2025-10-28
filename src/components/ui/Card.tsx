import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient";
  onClick?: () => void;
}

export default function Card({ children, className, variant = "default", onClick }: CardProps) {
  const variants = {
    default: "bg-dark-100 border border-dark-300",
    glass: "bg-dark-100/50 backdrop-blur-lg border border-dark-300/50",
    gradient: "bg-gradient-to-br from-dark-100 to-dark-200 border border-primary-teal/20",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-teal/10",
        variants[variant],
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

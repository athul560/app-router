import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground/80 mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg",
          "text-foreground placeholder:text-foreground/40",
          "focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent",
          "transition-all duration-300",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

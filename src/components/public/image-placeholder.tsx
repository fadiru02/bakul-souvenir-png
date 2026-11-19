import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  className?: string;
  label?: string;
  variant?: "warm" | "teal" | "sage" | "dark";
};

const variants = {
  warm: "from-[#d8d2c6] via-[#ece5dd] to-[#f5f0e8]",
  teal: "from-[#12544f] via-[#1a4241] to-[#092328]",
  sage: "from-[#8bbb92] via-[#d8d2c6] to-[#ece5dd]",
  dark: "from-[#092328] via-[#1a4241] to-[#12544f]",
};

export function ImagePlaceholder({
  className,
  label,
  variant = "warm",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        variants[variant],
        className,
      )}
      aria-hidden="true"
    >
      {label ? (
        <span className="px-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          {label}
        </span>
      ) : null}
    </div>
  );
}
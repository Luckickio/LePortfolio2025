import { cn } from "@/lib/utils";

interface HoverTooltipProps {
  label: string;
  children: React.ReactNode;
  align?: "center" | "end";
  hidden?: boolean;
}

export function HoverTooltip({
  label,
  children,
  align = "center",
  hidden = false,
}: HoverTooltipProps) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-full z-50 mt-2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md opacity-0 transition-opacity duration-150",
          align === "center" ? "left-1/2 -translate-x-1/2" : "right-0",
          !hidden &&
            "group-hover/tooltip:opacity-100"
        )}
      >
        {label}
      </span>
    </span>
  );
}

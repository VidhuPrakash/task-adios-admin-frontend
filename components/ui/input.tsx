import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // base styles (no permanent shadow)
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // kill every focus shadow/ring
        "focus:shadow-none focus-visible:shadow-none focus-visible:ring-0",
        // keep any border‑colour cue you want
        "focus-visible:border-ring",
        // validation
        "aria-invalid:border-destructive",
        // size tweaks
        "h-[48px] text-[16px]",
        className
      )}
      {...props}
    />
  );
}

export { Input };

import * as React from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";

type Props = React.ComponentProps<"select"> & { rtl?: boolean };
const SelectInput = React.forwardRef<HTMLSelectElement, Props>(
  ({ className, children, rtl = true, ...props }, ref) => {
    const locale = useLocale(); // e.g. "ar", "en-US"
    const dir = locale.startsWith("ar") ? "rtl" : "ltr";
    return (
      <div className="group relative">
        <select
          ref={ref}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "appearance-none",
            "h-auto min-h-11",
            "leading-[1.65]",
            "align-middle",

            className,
          )}
          {...props}
        >
          {children}
        </select>
        {/* custom chevron */}
        <ChevronDown
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2",
            // place it near the *start* edge in RTL (left); end edge in LTR (right)
            rtl ? "left-3" : "right-3",
            // color (changes on focus)
            "group-focus-within:text-moss-600 text-neutral-500",
          )}
          size={16}
          strokeWidth={2}
        />
      </div>
    );
  },
);
SelectInput.displayName = "SelectInput";

export default SelectInput;

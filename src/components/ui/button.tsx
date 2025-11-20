"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center transition-all cursor-pointer justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 ",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background-1 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "text-white bg-[linear-gradient(92.32deg,_rgb(var(--primary-900))_23.73%,_rgb(var(--primary-800))_142.52%)] hover:opacity-90",

        "gradient-2":
          "text-white bg-[linear-gradient(92.32deg,_rgb(var(--primary-900))_23.73%,_rgb(var(--secondary-600))_142.52%)] hover:opacity-90",

        "animated-gradient":
          "relative isolate overflow-hidden z-0 text-white bg-[#6e17b4] " +
          "before:content-[''] before:absolute before:inset-0 before:z-0 " +
          "before:bg-[linear-gradient(120deg,#f59e0b,#6e17b4,#f59e0b)] " + // moving image
          "before:[background-size:200%_200%] " + // big canvas to scroll
          "before:animate-[gradient-move_6s_ease-in-out_infinite] " + // animate position
          "before:opacity-90 before:pointer-events-none " +
          "before:will-change-[background-position,opacity] " +
          "motion-reduce:before:animate-none",

        main: "bg-primary-800 rounded-lg text-white",
        "main-2": "bg-gray-medium rounded-lg text-gray-300",
        "main-3":
          "bg-background rounded-xl text-black border border-gray-medium dark:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonVariants = VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

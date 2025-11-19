"use client";

import { cn } from "@/lib/utils";

type ButtonProps = {
  onClick?: () => void;
  text?: string;
  children?: React.ReactNode;
  outerClassName?: string;
} & React.ComponentProps<"button">;

export function CustomButtonOne({
  onClick,
  text,
  children,
  outerClassName,
  ...props
}: ButtonProps) {
  const { className } = props;
  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        "p-px cursor-pointer min-h-11  bg-gradient-brand rounded-[5px] group relative overflow-hidden",
        outerClassName
      )}
    >
      <div
        className={cn(
          "bg-neutral-0 group-hover:bg-transparent px-2 py-2.5 rounded-lg h-full z-10 transition-all",
          className
        )}
      >
        {text ? (
          <span className=" group-[&:not(:hover)]:gradient-text group-hover:text-font-white">
            {text}
          </span>
        ) : (
          children
        )}
      </div>
    </button>
  );
}

export function CustomButtonTwo({
  onClick,
  text,
  children,
  outerClassName,
  ...props
}: ButtonProps) {
  const { className } = props;
  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        "cursor-pointer min-h-11  bg-gradient-brand rounded-[5px] group relative overflow-hidden",
        outerClassName
      )}
    >
      <div
        className={cn(
          "group-hover:bg-success-600  rounded-lg px-3 py-2 duration-300  size-full z-10 transition-all",
          className
        )}
      >
        {text ? <span className=" text-font-white ">{text}</span> : children}
      </div>
    </button>
  );
}

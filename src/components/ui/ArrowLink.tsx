"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

function ArrowLink({
  href,
  text,
  className,
  textClassName,
  imgClassName,
  onClick,
}: {
  href: string;
  text: string;
  className?: string;
  textClassName?: string;
  imgClassName?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex group/link items-center justify-start  gap-2 relative z-10 ",
        className
      )}
      onClick={onClick}
    >
      <p
        className={cn(
          "block w-fit text-base sm:text-lg   group-hover/link:text-success-600 transition-all",
          textClassName
        )}
      >
        {text}
      </p>
      <div className={cn("relative size-6", imgClassName)}>
        <Image
          alt=""
          src="/icons/left-up.svg"
          className="ltr:rotate-90 brightness-0 group-hover/link:brightness-100 transition-all"
          fill
        />
      </div>
    </Link>
  );
}

export default ArrowLink;

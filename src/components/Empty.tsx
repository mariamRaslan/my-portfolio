import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";

export interface EmptyProps {
  header?: string;
  content?: string;
  render?: ReactNode;
  className?: string;
  imgStyle?: string;
  headerClassName?: string;
  icon?: string;
}

const Empty = ({
  header,
  content,
  render,
  className,
  imgStyle,
  headerClassName,
  icon,
}: EmptyProps) => {
  return (
    <div
      className={cn(
        "col-span-full flex min-h-[300px] w-full flex-col items-center justify-center gap-12",
        className,
      )}
    >
      <Image
        src={icon || "/images/EmptyIllustration.svg"}
        alt="empty"
        width={150}
        height={150}
        className={cn(
          "h-[150px] w-[150px] max-w-full object-contain",
          imgStyle,
        )}
      />

      <div className="text-center">
        <h2 className={cn("text-16 text-black-3", headerClassName)}>
          {header || "لا يوجد بيانات"}
        </h2>

        {content && (
          <p className="text-secondary-600 mt-3 text-xs font-extralight">
            {content}
          </p>
        )}

        {render}
      </div>
    </div>
  );
};

export default Empty;

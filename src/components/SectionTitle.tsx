import { cn } from "@/lib/utils";
import Image from "next/image";
import underLine from "../../public/images/underline.svg";
import MotionWrapper from "./MotionWrapper";

function SectionTitle({
  text,
  children,
  textClassName,
  className,
  imgClassName,
}: {
  text?: string;
  children?: React.ReactNode;
  textClassName?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <MotionWrapper
        animateOnView
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        viewOptions={{
          once: true,
          amount: 0.2,
        }}
      >
        {text && (
          <h2 className={cn("text-[20px] sm:text-[24px] lg:text-32 font-semibold", textClassName)}>{text}</h2>
        )}
        {children}
      </MotionWrapper>

      <MotionWrapper
        animateOnView
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          duration: 0.5,
          ease: "linear",
          delay: 0.2,
        }}
        viewOptions={{
          once: true,
          amount: 0.2,
        }}
        className={cn(
          "relative h-[19px] max-w-[240px] ltr:origin-left rtl:origin-right",
          imgClassName,
        )}
      >
        <Image src={underLine} alt="" fill className="object-contain" />
      </MotionWrapper>
    </div>
  );
}

export default SectionTitle;

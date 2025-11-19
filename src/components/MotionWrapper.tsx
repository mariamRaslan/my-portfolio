"use client";

import {
  motion,
  MotionProps,
  useInView,
  UseInViewOptions,
} from "framer-motion";
import {
  ReactNode,
  ElementType,
  ComponentPropsWithoutRef,
  useRef,
} from "react";

type MotionWrapperProps<T extends ElementType> = {
  children?: ReactNode;
  className?: string;
  as?: T;
  animateOnView?: boolean;
  viewOptions?: UseInViewOptions;
} & MotionProps &
  Omit<ComponentPropsWithoutRef<T>, keyof MotionProps | "as" | "children">;

export default function MotionWrapper<T extends ElementType = "div">({
  children,
  className,
  as,
  animateOnView = false,
  viewOptions = { once: true, amount: 0.1 },
  ...props
}: MotionWrapperProps<T>) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const MotionComponent = motion(as || "div");

  const { animate, initial } = props;

  const animateProp = animate || { opacity: 1, y: 0 };
  const initialProp = initial || { opacity: 0, y: 10 };

  return (
    <MotionComponent
      ref={ref}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
      {...props}
      initial={initialProp}
      animate={
        animateOnView ? (isInView ? animateProp : initialProp) : animateProp
      }
    >
      {children}
    </MotionComponent>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";

export default function CountUpNumber({
  end,
  delay = 0,
  className,
}: {
  end: number;
  delay?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000; // 2 seconds
          const steps = 60;
          const increment = end / steps;
          const stepDuration = duration / steps;

          setTimeout(() => {
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, stepDuration);
          }, delay * 1000);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, delay, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}

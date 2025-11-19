'use client';

import Tilt from 'react-parallax-tilt';
import * as React from 'react';
import clsx from 'clsx';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
};

export default function TiltCard({ children, className, glare = true }: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // expose mouse position to CSS for the spotlight
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };

  return (
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      perspective={1100}
      transitionSpeed={900}
      scale={1.04}
      gyroscope={false}
      trackOnWindow={false}
      glareEnable={glare}
      glareMaxOpacity={0.22}
      glareColor="#ffffff"
      glarePosition="all"
      glareReverse={true}
      // nice easing
      transitionEasing="cubic-bezier(.2,.8,.2,1)"
      className="will-change-transform"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        // gradient border + spotlight on hover
        className={clsx(
          'group relative rounded-2xl p-[1px]',
          // animated gradient border
          'bg-[conic-gradient(from_var(--angle),#8b5cf6, #22d3ee, #10b981, #f59e0b,#8b5cf6)]',
          'animate-[spin_6s_linear_infinite]',
          // inner panel
          className
        )}
        style={
          {
            // spin angle var (updated by keyframes in modern browsers)
            ['--angle' as any]: '0deg',
          } as React.CSSProperties
        }
      >
        {/* Card body */}
        <div className="relative rounded-2xl bg-white/5 backdrop-blur-md p-5 shadow-[0_10px_30px_rgba(0,0,0,.2)] ring-1 ring-white/10">
          {children}

          {/* hover spotlight following the cursor */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.12), transparent 40%)',
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\[spin_6s_linear_infinite\] {
            animation: none !important;
          }
        }
      `}</style>
    </Tilt>
  );
}

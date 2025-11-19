"use client";

import React, {
  ReactNode,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}
export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => <div className={`scroll-stack-card ${itemClassName}`}>{children}</div>;

type Tx = { translateY: number; scale: number; rot: number; blur: number };

export interface ScrollStackProps {
  className?: string;          // add height/overflow only if container-scrolling
  children: ReactNode;
  itemDistance?: number;       // space between cards before they start pinning
  itemStackDistance?: number;  // vertical separation while pinned
  stackPosition?: number | string; // "30%" or px
  scaleEndPosition?: number | string; // "10%" or px
  baseScale?: number;          // scale for deepest card
  itemScale?: number;          // negative to shrink deeper cards
  rotationAmount?: number;     // tiny tilt as it stacks
  blurAmount?: number;         // 0 for perf
  useWindowScroll?: boolean;   // default true (page scroll)
  onStackComplete?: () => void;
}

export default function ScrollStackSimple({
  children,
  className = "",
  itemDistance = 120,
  itemStackDistance = 12,
  stackPosition = "30%",
  scaleEndPosition = "10%",
  baseScale = 0.78,
  itemScale = -0.08,           // 🔥 deeper cards smaller
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,      // ✅ keep it simple: page scroll
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cacheRef = useRef<Map<number, Tx>>(new Map());
  const tickingRef = useRef(false);
  const completedRef = useRef(false);

  const px = useCallback((v: number | string, ch: number) => {
    if (typeof v === "string" && v.includes("%"))
      return (parseFloat(v) / 100) * ch;
    return Number(v);
  }, []);

  const getScrollTop = useCallback(() => {
    return useWindowScroll
      ? (window.scrollY || window.pageYOffset)
      : scrollerRef.current?.scrollTop || 0;
  }, [useWindowScroll]);

  const getContainerHeight = useCallback(() => {
    return useWindowScroll
      ? window.innerHeight
      : scrollerRef.current?.clientHeight || 0;
  }, [useWindowScroll]);

  const getOffset = useCallback(
    (el: HTMLElement) => {
      if (useWindowScroll) {
        const r = el.getBoundingClientRect();
        return r.top + (window.scrollY || window.pageYOffset);
      }
      let top = el.offsetTop;
      let p = el.offsetParent as HTMLElement | null;
      while (p && p !== scrollerRef.current) {
        top += p.offsetTop;
        p = p.offsetParent as HTMLElement | null;
      }
      return top;
    },
    [useWindowScroll]
  );

  const calcTopIndex = useCallback(
    (scrollTop: number, stackPosPx: number) => {
      let idx = 0;
      for (let j = 0; j < cardsRef.current.length; j++) {
        const top = getOffset(cardsRef.current[j]);
        const start = top - stackPosPx - itemStackDistance * j;
        if (scrollTop >= start) idx = j;
      }
      return idx;
    },
    [getOffset, itemStackDistance]
  );

  const setSpacer = useCallback(() => {
    const ch = getContainerHeight();
    const spacer =
      cardsRef.current.length * (itemStackDistance + itemDistance) + ch * 0.6;
    if (endRef.current) endRef.current.style.height = `${Math.round(spacer)}px`;
  }, [getContainerHeight, itemDistance, itemStackDistance]);

  const update = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;
    const st = getScrollTop();
    const ch = getContainerHeight();
    const stackPx = px(stackPosition, ch);
    const endPx = px(scaleEndPosition, ch);
    const endTop = endRef.current ? getOffset(endRef.current) : 0;

    const topIndex = calcTopIndex(st, stackPx);

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = getOffset(card);
      const start = cardTop - stackPx - itemStackDistance * i;
      const finish = cardTop - endPx;
      const pinStart = start;
      const pinEnd = endTop - ch / 2;

      const progress =
        finish === start ? 1 : Math.max(0, Math.min(1, (st - start) / (finish - start)));

      const targetScale = baseScale + i * itemScale;   // negative itemScale => smaller deeper
      const scale = 1 - progress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * progress : 0;

      let translateY = 0;
      const pinned = st >= pinStart && st <= pinEnd;
      if (pinned) {
        translateY = st - cardTop + stackPx + itemStackDistance * i;
      } else if (st > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }

      const blur = blurAmount && i < topIndex ? (topIndex - i) * blurAmount : 0;

      // layering: current top card above others
      card.style.position = "relative";
      card.style.zIndex = String(1000 - Math.abs(i - topIndex));

      const next: Tx = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rot: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const prev = cacheRef.current.get(i);
      if (
        !prev ||
        Math.abs(prev.translateY - next.translateY) > 0.1 ||
        Math.abs(prev.scale - next.scale) > 0.001 ||
        Math.abs(prev.rot - next.rot) > 0.1 ||
        Math.abs(prev.blur - next.blur) > 0.1
      ) {
        card.style.willChange = "transform, filter";
        card.style.transformOrigin = "top center";
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale}) rotate(${next.rot}deg)`;
        (card.style as CSSStyleDeclaration).filter = next.blur ? `blur(${next.blur}px)` : "";
        cacheRef.current.set(i, next);
      }

      if (i === cards.length - 1) {
        const inView = st >= pinStart && st <= pinEnd;
        if (inView && !completedRef.current) {
          completedRef.current = true;
          onStackComplete?.();
        } else if (!inView && completedRef.current) {
          completedRef.current = false;
        }
      }
    }
  }, [
    getScrollTop,
    getContainerHeight,
    px,
    stackPosition,
    scaleEndPosition,
    getOffset,
    itemStackDistance,
    baseScale,
    itemScale,
    rotationAmount,
    blurAmount,
    calcTopIndex,
    onStackComplete,
  ]);

  const queueUpdate = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      update();
      tickingRef.current = false;
    });
  }, [update]);

  useLayoutEffect(() => {
    const root = scrollerRef.current;
    const nodes = (useWindowScroll
      ? (document.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLElement>)
      : (root?.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLElement> | undefined)) || [];

    cardsRef.current = Array.from(nodes);

    // initial spacing and hints
    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
    });

    setSpacer();
    update();

    // listeners
    const onScroll = useWindowScroll ? window : root!;
    onScroll.addEventListener("scroll", queueUpdate, { passive: true });

    const onResize = () => {
      cacheRef.current.clear();
      setSpacer();
      update();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      onScroll.removeEventListener("scroll", queueUpdate as any);
      window.removeEventListener("resize", onResize);
      cacheRef.current.clear();
      cardsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    itemDistance,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    itemScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div ref={endRef} className="scroll-stack-end" />
      </div>
    </div>
  );
}

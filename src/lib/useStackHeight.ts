// useStackHeight.ts (optional helper)
import * as React from "react";

export function useStackHeight(total: number) {
  const [heightPx, setHeightPx] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const calc = () => {
      const w = Math.round(window.innerWidth);
      const vp = Math.round(
        window.visualViewport?.height ?? window.innerHeight,
      );

      let factor: number;
      if (w === 1024)
        factor = 0.46; // exactly 1024
      else if (w === 375) factor = 0.86;
      else if (w === 412) factor = 0.58;
      else if (w >= 1920) factor = 0.73;
      else if (w >= 1025)
        factor = 0.83; // desktops above 1024
      else if (w >= 912)
        factor = 0.5; // 768–1023
      else if (w >= 820)
        factor = 0.49; // 768–1023
      else if (w >= 768)
        factor = 0.59; 
      else if (w >= 540)
        factor = 0.79;
      else if (w >= 414)
        factor = 0.59;
      else if (w >= 390)
        factor = 0.72; 
      else if (w >= 360)
        factor = 0.76;
      else factor = 0.75; // mobiles

      // Optionally clamp to avoid absurdly long stacks on tiny landscape
      const segmentPx = Math.round(vp * factor);
      const h = vp + (total - 1) * segmentPx;
      setHeightPx(h);
    };

    calc();

    const vv = window.visualViewport;
    vv?.addEventListener("resize", calc);
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);

    return () => {
      vv?.removeEventListener("resize", calc);
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, [total]);

  return heightPx;
}

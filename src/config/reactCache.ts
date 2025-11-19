import { cache } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function reactCache<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cached = cache((serialized: string) => {
    return fn(...JSON.parse(serialized));
  });

  return ((...args: Parameters<T>) => {
    const serialized = JSON.stringify(args);
    return cached(serialized);
  }) as T;
}

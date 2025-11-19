export type ICache = "force-cache" | "no-store" | "default";

export interface IGetDataOptions {
  queryKey: readonly unknown[];
  next?: { tags?: string[]; revalidate?: number | false | undefined };
  cache?: ICache;
  lang?: string;
}

export interface IPagination {
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface IFilter {
  price: boolean;
  subcategories: {
    id: number;
    name: string;
  }[];
}

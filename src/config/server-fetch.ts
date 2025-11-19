import "server-only";
import reactCache from "@/config/reactCache";
import CustomError from "@/lib/customError";
import { cookies, headers } from "next/headers";
import { IGetDataOptions } from "@/types/general.types";

// --- cross-version helpers (sync or promise) ---
async function getCookieStore() {
  const c = cookies() as any;
  return typeof c?.then === "function" ? await c : c;
}
async function getHeaderStore() {
  const h = headers() as any;
  return typeof h?.then === "function" ? await h : h;
}

// --- lang helpers ---
function normalizeLang(input?: string) {
  const v = (input || "").toLowerCase();
  if (v.startsWith("ar")) return "ar";
  if (v.startsWith("en")) return "en";
  return "en";
}
async function resolveLang(explicit?: string) {
  if (explicit) return normalizeLang(explicit);
  const c = await getCookieStore();
  const h = await getHeaderStore();
  const cookieLang = c.get("NEXT_LOCALE")?.value;
  const acceptLang = (h.get("accept-language") || "").split(",")[0];
  return normalizeLang(cookieLang || acceptLang || process.env.DEFAULT_LANG);
}

// append / replace ?lang=
function withLangParam(url: string, lang: string) {
  const u = new URL(url);
  u.searchParams.set("lang", lang);
  return u.toString();
}

const fetcherServer = async <T>(
  { queryKey, next, cache, lang }: IGetDataOptions,
  authenticated: boolean,
) => {
 
  const endpoint = String(queryKey?.[0] ?? "");
  if (!endpoint) return null;

  // auth token from cookies (server)
  let token = "";
  if (authenticated) {
    const c = await getCookieStore();
    token = c.get("starter_kit_user_token")?.value || "";
    if (!token) return null;
  }

  try {
    const resolvedLang = await resolveLang(lang);
    const base = `${process.env.BASE_URL}${endpoint}`;
    const fullUrl = withLangParam(base, resolvedLang); // ONLY query param

    const res = await fetch(fullUrl, {
      headers: {
        Accept: "application/json",
        ...(authenticated ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: {
        // separate Next data cache by endpoint+lang
        tags: [
          `${(endpoint.includes("?") ? endpoint.split("?")[0] : endpoint)}:${resolvedLang}`,
          ...(next?.tags ?? []),
        ],
        ...next,
      },
      cache: cache || "no-store",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new CustomError(
        (data as any)?.message || `Failed to fetch data from ${endpoint}`,
        res.status || 500,
      );
    }

    return res.json() as Promise<T>;
  } catch (error) {
    if (error instanceof CustomError) throw error;
    throw new CustomError(`Failed to fetch data from ${endpoint}`, 500);
  }
};

// Public
export const getServerPublicData = reactCache(
  async <T>(opts: IGetDataOptions) => fetcherServer<T>(opts, false),
);

// Private
export const getServerPrivateData = reactCache(
  async <T>(opts: IGetDataOptions) => fetcherServer<T>(opts, true),
);

import reactCache from "@/config/reactCache";
import CustomError from "@/lib/customError";
import Cookies from "js-cookie";
import { IGetDataOptions } from "@/types/general.types";


function normalizeLang(input?: string) {
  const v = (input || "").toLowerCase();
  if (v.startsWith("ar")) return "ar";
  if (v.startsWith("en")) return "en";
  return "en";
}

function resolveLang(explicit?: string) {
  if (explicit) return normalizeLang(explicit);

  if (typeof window !== "undefined") {
    const cookieLang = Cookies.get("NEXT_LOCALE");
    return normalizeLang(cookieLang);
  }

  try {
    const { headers, cookies } = require("next/headers");
    const c = cookies();
    const cookieLang = c.get("NEXT_LOCALE")?.value;
    const accept = headers().get("accept-language") || "";
    const acceptLang = accept.split(",")[0];
    return normalizeLang(cookieLang || acceptLang || process.env.DEFAULT_LANG);
  } catch {
    return normalizeLang(process.env.DEFAULT_LANG);
  }
}

// append or replace ?lang= safely
function withLangParam(url: string, lang: string) {
  const u = new URL(url);
  u.searchParams.set("lang", lang); // override any existing lang
  return u.toString();
}

const fetcherClient = async <T>(
  { queryKey, next, cache, lang }: IGetDataOptions,
  authenticated: boolean,
) => {
 
  const endpoint = String(queryKey?.[0] ?? "");
  if (!endpoint) return null;

  const token = authenticated ? (Cookies.get("starter_kit_user_token") || "") : "";
  if (authenticated && !token) return null;

  const resolvedLang = resolveLang(lang );
  const base = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
  const fullUrl = withLangParam(base, resolvedLang); // ONLY query param

  const res = await fetch(fullUrl, {
    headers: {
      Accept: "application/json",
      ...(authenticated ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    next: {
      tags: [
        `${endpoint.includes("?") ? endpoint.split("?")[0] : endpoint}:${resolvedLang}`,
        ...(next?.tags ?? []),
      ],
      ...next,
    },
    cache: cache || "no-store",
  });

  if (!res.ok) {
    const errorData: { message?: string } = await res.json().catch(() => ({}));
    throw new CustomError(
      errorData.message || `Failed to fetch data from ${endpoint}`,
      res.status || 500,
    );
  }
  return res.json() as Promise<T>;
};

export const getClientPrivateData = reactCache(
  async <T>({ queryKey: [endpoint], next, cache }: IGetDataOptions) =>
    fetcherClient<T>({ queryKey: [endpoint], next, cache }, true),
);

export const getPublicData = reactCache(
  async <T>({ queryKey: [endpoint], next, cache }: IGetDataOptions) =>
    fetcherClient<T>({ queryKey: [endpoint], next, cache }, false),
);

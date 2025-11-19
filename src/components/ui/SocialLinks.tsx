import { cn } from "@/lib/utils";
import Image from "next/image";
import { IContact } from "@/types/home.type";

const linksImages = [
  { src: "/icons/linkedin-green.svg", alt: "linkedin" },
  { src: "/icons/x-green.svg",        alt: "twitter"  },
  { src: "/icons/instagram-green.svg",alt: "instagram"}, 
  { src: "/icons/facebook-green.svg", alt: "facebook" },
  { src: "/icons/youtube-green.svg",  alt: "youtube"  },
];

// Normalize missing protocol and trim
function normalizeUrl(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  const url = String(raw).trim();
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  // Allow mailto: or other schemes to pass through
  if (/^[a-z]+:/i.test(url)) return url;
  return `https://${url}`;
}

type Props = {
  className?: string;
  imgClassName?: string;
  linkClassName?: string;
  data?: IContact | Record<string, any>;
};

function SocialLinks({ className, imgClassName, linkClassName, data }: Props) {
  // Map icon alt -> url from data
  const urlFor = (alt: string): string | undefined => {
    switch (alt) {
      case "linkedin":
        return normalizeUrl((data as any)?.linkedin);
      case "twitter":
        // backend uses "x" for Twitter/X
        return normalizeUrl((data as any)?.x);
      case "instagram":
        // handle typo "instgram"
        return normalizeUrl((data as any)?.instagram ?? (data as any)?.instgram);
      case "facebook":
        return normalizeUrl((data as any)?.facebook);
      case "youtube":
        return normalizeUrl((data as any)?.youtube);
      default:
        return undefined;
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-4 sm:gap-6", className)}>
      {linksImages
        .map((link) => ({ ...link, href: urlFor(link.alt) }))
        .filter((link) => !!link.href)
        .map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.alt}
            className={cn(
              "group flex size-10 items-center justify-center rounded-full border border-success-600 bg-neutral-0 transition-all hover:bg-success-600",
              linkClassName
            )}
          >
            <span
              className={cn(
                "relative size-6 transition-all group-hover:brightness-0 group-hover:invert",
                imgClassName
              )}
            >
              <Image src={link.src} alt={link.alt} fill className="object-contain" />
            </span>
          </a>
        ))}
    </div>
  );
}

export default SocialLinks;

"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ArrowLink from "../ui/ArrowLink";
import { useTranslations } from "next-intl";

interface LinkItem {
  href: string;
  title: string;
}

interface SubMenuProps {
  title: string;
  links: LinkItem[];
  onClose: () => void;
  t?: ReturnType<typeof useTranslations>;
}

function SheetSubMenu({ title, links, onClose, t }: SubMenuProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  // const handleOpenSubMenu = () => {
  //   if (!ref.current) return;
  //   setOpenSubMenu((prev) => {
  //     const newOpen = !prev;
  //     if (ref.current) {
  //       ref.current.style.maxHeight = newOpen
  //         ? `${ref.current.scrollHeight}px`
  //         : "0";
  //     }
  //     return newOpen;
  //   });
  // };

  return (
    <div
      className={cn("flex flex-col px-2", {
        "gap-2": openSubMenu,
      })}
    >
      <button
        className="flex items-center gap-2"
        onClick={() => setOpenSubMenu(!openSubMenu)}
      >
        {title}{" "}
        <ChevronDown
          size={20}
          className={cn("transition-all", { "rotate-180": openSubMenu })}
        />
      </button>

      {openSubMenu && (
        <ul ref={ref} className="flex flex-col gap-4 px-4 list-disc ">
          {links.map((link, index) => (
            <li key={index}>
              <ArrowLink
                href={link.href}
                text={t ? t(link.title) : link.title}
                textClassName="text-sm text-font-black  font-normal"
                imgClassName="size-5"
                onClick={onClose}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SheetSubMenu;

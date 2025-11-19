"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

function ContactModal({
  open = false,
  setOpen,
  text,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <div className="flex flex-col items-center text-center gap-6">
          <Image src="/images/done.svg" alt="done" width={56} height={56} />

          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium text-font-black">{text}</p>
            <p className="text-lg  text-font-black">
              سنقوم بالتواصل معك في أقرب وقت
            </p>
          </div>

          <DialogClose className="border cursor-pointer border-success-600 px-6 py-2 rounded-lg max-w-42.5 w-full gradient-text mx-auto">
            إغلاق
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ContactModal;

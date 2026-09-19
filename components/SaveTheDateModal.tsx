"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sigma-lambda-save-the-date-2026";

export default function SaveTheDateModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function checkDismissed() {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setOpen(true);
      }
    }
    checkDismissed();
  }, []);

  function close() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,9,8,0.82)] px-5"
      role="dialog"
      aria-modal="true"
      aria-label="Scholarship Gala save the date"
    >
      <div className="w-full max-w-[420px] rounded-lg bg-paper p-4 sm:p-5">
        <div className="relative aspect-[1060/1484] w-full overflow-hidden rounded">
          <Image
            src="/images/savethedate-scholarshipgala-2026.jpg"
            alt="Save the Date — Sigma Lambda Chapter Scholarship Gala 2026"
            fill
            sizes="420px"
            className="object-contain"
            priority
          />
        </div>
        <button
          onClick={close}
          className="mx-auto mt-4 block rounded-sm border border-line px-6.5 py-3 text-[14.5px] font-semibold text-text-onlight transition-colors hover:border-gold-deep"
        >
          Close ✕
        </button>
      </div>
    </div>
  );
}

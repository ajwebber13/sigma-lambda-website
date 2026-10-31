"use client";

import { useState } from "react";

export default function CopyLinkButton({ link, className }: { link: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? "Link copied ✓" : "Copy public page link"}
    </button>
  );
}

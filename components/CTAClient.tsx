"use client";

import { useState } from "react";

export default function CTAClient({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs rounded-full bg-pink-100"
    >
      {copied ? "Đã copy" : "Copy"}
    </button>
  );
}
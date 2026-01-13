"use client";

import { useWallet } from "@lazorkit/wallet";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function AddressDisplay() {
  const { smartWalletPubkey } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!smartWalletPubkey) return null;

  const address = smartWalletPubkey.toBase58();
  const display = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="group bg-white hover:bg-gray-50 transition-colors px-4 py-2 rounded-full border border-gray-200 text-sm font-mono text-gray-600 flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-md"
    >
      <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      {display}
      <div className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors">
        {copied ? (
          <Check className="w-3.5 h-3.5" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </div>
    </button>
  );
}

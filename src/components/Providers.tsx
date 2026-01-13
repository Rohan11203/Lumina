"use client";

import { LazorkitProvider } from "@lazorkit/wallet";
import { LAZORKIT_CONFIG } from "@/lib/config";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Polyfill Buffer for Solana SDK
    if (typeof window !== "undefined") {
      window.Buffer = window.Buffer || require("buffer").Buffer;
    }
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) return null;

  return (
    <LazorkitProvider
      rpcUrl={LAZORKIT_CONFIG.rpcUrl}
      portalUrl={LAZORKIT_CONFIG.portalUrl}
      paymasterConfig={LAZORKIT_CONFIG.paymasterConfig}
    >
      {children}
    </LazorkitProvider>
  );
}

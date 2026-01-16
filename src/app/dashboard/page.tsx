"use client";

import { AddressDisplay } from "../../components/wallet/AddressDisplay";
import { WalletBalance } from "../../components/wallet/WalletBalance";
import { SendSOL } from "../../components/wallet/SendSOL";
import { useWallet } from "@lazorkit/wallet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { smartWalletPubkey } = useWallet();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple auth check
  useEffect(() => {
    if (mounted && !smartWalletPubkey) {
      router.push("/");
    }
  }, [smartWalletPubkey, router, mounted]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12 pt-10">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-zinc-800">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Lumina
          </h1>
          <AddressDisplay />
        </header>

        <section className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <WalletBalance />

            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-zinc-500">
                Features
              </h3>
              <ul className="space-y-3 text-sm font-medium text-zinc-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Passkey Auth
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Smart Wallet PDA
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  Gasless (Paymaster)
                </li>
              </ul>
            </div>

            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-2xl border border-orange-500/20 overflow-hidden group hover:border-orange-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="font-semibold text-white text-sm">
                    Need SOL?
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  Get free devnet SOL to test the wallet and send transactions
                </p>
                <a
                  href="https://faucet.solana.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors duration-200 group/btn"
                >
                  <span>Get Free SOL</span>
                  <svg
                    className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SendSOL />
          </div>
        </section>
      </div>
    </main>
  );
}

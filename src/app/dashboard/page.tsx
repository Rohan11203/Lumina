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
          </div>

          <div className="lg:col-span-7">
            <SendSOL />
          </div>
        </section>
      </div>
    </main>
  );
}

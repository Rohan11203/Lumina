"use client";

import { useWallet } from "@lazorkit/wallet";
import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { LAZORKIT_CONFIG } from "@/lib/config";

export function WalletBalance() {
  const { smartWalletPubkey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!smartWalletPubkey) return;

    try {
      const connection = new Connection(LAZORKIT_CONFIG.rpcUrl);
      connection.getBalance(smartWalletPubkey).then((bal) => {
        setBalance(bal / LAMPORTS_PER_SOL);
      });
    } catch (e) {
      console.error("Failed to fetch balance", e);
    }
  }, [smartWalletPubkey]);

  return (
    <div className="p-8 border-l-4 border-black bg-white">
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
        Total Balance
      </h2>
      <div className="flex items-baseline gap-2">
        <span className="text-6xl font-black tracking-tighter text-black">
          {balance !== null ? balance.toFixed(4) : "..."}
        </span>
        <span className="text-xl font-medium text-gray-400">SOL</span>
      </div>
    </div>
  );
}

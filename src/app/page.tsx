"use client";

import { useWallet } from "@lazorkit/wallet";
import { ConnectButton } from "../components/ConnectButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { smartWalletPubkey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (smartWalletPubkey) {
      router.push("/dashboard");
    }
  }, [smartWalletPubkey, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-black selection:bg-black selection:text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-6xl font-black mb-8 text-center tracking-tighter">
          LazorKit Wallet
        </h1>

        <div className="bg-white p-12 rounded-3xl border border-gray-100 flex flex-col items-center gap-8 shadow-2xl shadow-gray-200/50">
          <p className="text-center text-xl max-w-md text-gray-500 leading-relaxed font-sans">
            Forget seed phrases. <br />
            Login securely with{" "}
            <span className="font-bold text-black border-b-2 border-black">
              FaceID
            </span>{" "}
            or{" "}
            <span className="font-bold text-black border-b-2 border-black">
              TouchID
            </span>
            .
          </p>

          <div className="transform hover:scale-105 transition-transform duration-200">
            <ConnectButton />
          </div>

          <p className="text-xs text-gray-400 mt-6 font-sans uppercase tracking-widest font-bold">
            Solana Devnet • Gasless Enabled
          </p>
        </div>
      </div>
    </main>
  );
}

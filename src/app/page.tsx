"use client";

import { useWallet } from "@lazorkit/wallet";
import { ConnectButton } from "../components/ConnectButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Fingerprint,
  Zap,
  Shield,
  ArrowRight,
  Github,
  Book,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { smartWalletPubkey } = useWallet();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-lg tracking-tighter flex items-center gap-2">
            Lazor Nexus
          </div>
          <div className="flex gap-6 text-sm font-medium text-zinc-400">
            <Link
              href="/docs"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Book className="w-4 h-4" /> Docs
            </Link>
            <a
              href="https://github.com/Rohan11203/Lazorkit-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-20 pb-32 max-w-6xl mx-auto w-full text-center relative overflow-hidden">
        <div className="space-y-8 max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 mb-6 fire-shadow transition-transform hover:scale-105 duration-300 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
            Live on Solana Devnet
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-none mb-6">
            The new standard for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
              onboarding users.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Replace seed phrases with Passkeys. <br />
            <span className="text-zinc-200">Secure. Gasless. Instant.</span>
          </p>

          <div className="pt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="p-1 rounded-2xl bg-gradient-to-b from-orange-200 to-orange-600 fire-shadow">
                  <div className="bg-black rounded-xl">
                    <ConnectButton />
                  </div>
                </div>
              </div>

              {smartWalletPubkey && (
                <Link
                  href="/dashboard"
                  className="group px-8 py-3.5 rounded-xl bg-black text-white border border-white font-bold tracking-wide  transition-all flex items-center gap-2 transform hover:scale-105 duration-300"
                >
                  Dashboard{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
              No extension required
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 w-full text-left z-10">
          <FeatureCard
            icon={<Fingerprint className="w-6 h-6 text-orange-500" />}
            title="Biometric Auth"
            description="Login securely using FaceID or TouchID. Your passkey is your wallet."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-orange-500" />}
            title="Gasless Transactions"
            description="Users never pay for gas. Transactions are sponsored by a Paymaster."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-orange-500" />}
            title="Smart Accounts"
            description="Non-custodial Program Derived Addresses (PDAs) with powerful recovery options."
          />
        </div>

        {/* Product Showcase */}
        <div className="mt-40 w-full max-w-4xl mx-auto relative z-10">
          <div className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-8">
            Quick Integration
          </div>

          <div className="relative group perspective-1000">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative p-2 rounded-3xl bg-zinc-900/50 border border-zinc-800 fire-shadow backdrop-blur-sm overflow-hidden transform transition-all duration-700 hover:scale-[1.01]">
              <img
                src="/image.png"
                alt="LazorKit Interface"
                className="w-full h-auto rounded-2xl border border-zinc-800/50 shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none rounded-2xl" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 text-center text-sm text-zinc-600 z-10">
        <p>© 2026 Lazor Lumina. Built with Next.js & Solana.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-8 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-orange-500/30 hover:bg-zinc-900 transition-all duration-500 hover:-translate-y-2">
      <div className="w-12 h-12 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-orange-500/20 group-hover:shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight text-white">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-400 transition-colors">
        {description}
      </p>
    </div>
  );
}

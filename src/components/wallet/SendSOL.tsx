"use client";

import { useWallet } from "@lazorkit/wallet";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * Component for sending SOL with Gasless (Sponsored) Transactions.
 *
 * Features:
 * 1. Uses LazorKit's `signAndSendTransaction` to automatically trigger Paymaster sponsorship.
 * 2. Handles "Insufficient Funds" errors gracefully.
 * 3. Shows transaction signature and Explorer link on success.
 */
export function SendSOL() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txSignature, setTxSignature] = useState("");
  const [status, setStatus] = useState<string>("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smartWalletPubkey) return;

    try {
      setLoading(true);
      setTxSignature("");
      setStatus("Preparing transaction...");

      const destination = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports,
      });

      setStatus("Please sign with Passkey...");

      const signature = await signAndSendTransaction({
        instructions: [instruction],
      });

      setTxSignature(signature);
      setStatus("Success!");
      setAmount("");
    } catch (err: any) {
      console.error(err);
      let errorMessage = err.message || "Unknown error";
      if (errorMessage.includes("Custom:1") || errorMessage.includes("0x1")) {
        errorMessage =
          "Insufficient funds. Please fund your wallet with Devnet SOL first.";
      }
      setStatus("Failed: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-black tracking-tight">
          Send SOL
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Gas fees are sponsored (free).
        </p>
      </div>

      <form onSubmit={handleSend} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Recipient
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Solana Address"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-mono text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Amount (SOL)
          </label>
          <input
            type="number"
            step="0.000000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-mono text-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black cursor-pointer text-white hover:opacity-90 font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Confirm Transfer"
          )}
        </button>
      </form>

      {status && (
        <div
          className={`mt-6 p-4 rounded-xl text-sm font-medium ${
            status.includes("Success")
              ? "bg-green-50 text-green-700 border border-green-100"
              : status.includes("Failed")
              ? "bg-red-50 text-red-700 border border-red-100"
              : "bg-blue-50 text-blue-700 border border-blue-100"
          }`}
        >
          {status}
          {txSignature && (
            <div className="mt-2">
              <a
                href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-900"
              >
                View on Explorer
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

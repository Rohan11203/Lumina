# Tutorial: Building a Passkey-Based Solana Wallet

This guide shows you how to integrate **LazorKit** to create a passkey-native Solana wallet. No seed phrases, no extensions—just FaceID/TouchID.

## Prerequisites

- Next.js or React project
- Node.js 18+

## Step 1: Installation

Install the LazorKit SDK and Solana dependencies:

```bash
pnpm install @lazorkit/wallet @solana/web3.js @coral-xyz/anchor
```

## Step 2: Configure the Provider

Wrap your application with `LazorkitProvider`. In Next.js App Router, do this in a client component.

`src/components/Providers.tsx`:

```typescript
"use client";

import { LazorkitProvider } from "@lazorkit/wallet";
import { useEffect, useState } from "react";

// Default config for Devnet
const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    paymasterUrl: "https://kora.devnet.lazorkit.com",
  },
};

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Polyfill Buffer for browser environment
    if (typeof window !== "undefined") {
      window.Buffer = window.Buffer || require("buffer").Buffer;
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <LazorkitProvider config={CONFIG}>{children}</LazorkitProvider>;
}
```

## Step 3: Add Authentication

Use the pre-built `ConnectButton` component to handle passkey registration and login logic automatically.

`src/app/page.tsx`:

```typescript
import { ConnectButton } from "@lazorkit/wallet";

export default function LoginPage() {
  return (
    <div className="center-container">
      <h1>Welcome to Web3</h1>
      <p>Login with your Passkey</p>

      <ConnectButton />
    </div>
  );
}
```

## Step 4: Access Wallet State

Use the `useWallet` hook to get the connected wallet's public key (Smart Wallet Address) in any component.

```typescript
import { useWallet } from "@lazorkit/wallet";

export function UserProfile() {
  const { smartWalletPubkey } = useWallet();

  if (!smartWalletPubkey) return null;

  return <div>Wallet: {smartWalletPubkey.toBase58()}</div>;
}
```

## How It Works

1. **Sign Up**: The browser prompts the user to create a passkey (e.g., TouchID).
2. **Smart Wallet Creation**: LazorKit deploys a **Smart Wallet PDA** on Solana, controlled by that passkey.
3. **Login**: Future logins sign a challenge with the passkey to authenticate.

No private keys are ever exposed or stored in local storage!

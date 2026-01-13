# Tutorial: How to Send Gasless Transactions

One of LazorKit's most powerful features is **Gasless Transactions**. Using a Paymaster, you can sponsor gas fees for your users, removing the need for them to hold SOL just to pay network fees.

## How It Works

1. **Paymaster**: A service that pays transaction fees on behalf of the user.
2. **Smart Wallet**: The user's wallet is a PDA (Program Derived Address).
3. **Execution**: The user signs the intent, and the Paymaster executes and pays for the transaction.

## Step 1: Configure Paymaster

Ensure your `LazorkitProvider` configuration includes the `paymasterConfig`.

```typescript
const CONFIG = {
  // ... other config
  paymasterConfig: {
    paymasterUrl: "https://kora.devnet.lazorkit.com", // Paymaster service
  },
};
```

## Step 2: Send a Transaction

When you use `signAndSendTransaction`, LazorKit **automatically** attempts to use the configured Paymaster to sponsor the transaction. You don't need special code!

```typescript
import { useWallet } from "@lazorkit/wallet";
import { SystemProgram, PublicKey } from "@solana/web3.js";

export function SendMoney() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();

  const handleSend = async () => {
    // 1. Create a standard Solana instruction
    const instruction = SystemProgram.transfer({
      fromPubkey: smartWalletPubkey,
      toPubkey: new PublicKey("RECIPIENT_ADDRESS"),
      lamports: 1000000, // 0.001 SOL
    });

    try {
      // 2. Send transaction
      // LazorKit asks Paymaster to sponsor this!
      const signature = await signAndSendTransaction({
        instructions: [instruction],
      });

      console.log("Gasless transaction successful:", signature);
    } catch (e) {
      console.error("Failed:", e);
    }
  };

  return <button onClick={handleSend}>Send Gasless</button>;
}
```

## Verification

If you check the transaction on Solana Explorer:

1. Look for the **Fee Payer**.
2. It will NOT be the user's Smart Wallet address.
3. It will be the **Paymaster's address**.

This means the user paid **0 SOL** for the transaction!

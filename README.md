# LazorKit Simple Wallet Demo

> **Hackathon Submission**: A demonstration of Passkey-native authentication and gasless transactions on Solana using the LazorKit SDK.

![LazorKit Demo Banner](public/logo.png) _Add a screenshot/banner here if available_

## 🚀 Overview

This project showcases the next generation of Solana UX. By integrating **LazorKit**, we eliminate two of the biggest hurdles for new users:

1.  **Seed Phrases**: Replaced by device-native **Passkeys** (FaceID/TouchID).
2.  **Gas Fees**: Sponosored by a **Paymaster** (Gasless).

**Features:**

- [x] **Passkey Login**: Secure biometric authentication.
- [x] **Paymaster Integration**: Users pay 0 SOL for transactions.
- [x] **Wallet Dashboard**: View balance and smart wallet address.
- [x] **Send SOL**: Transfer tokens with zero gas fees.

## 🛠️ Stack

- **Framework**: Next.js 14
- **Styling**: TailwindCSS
- **Blockchain**: Solana (Devnet)
- **Identity**: LazorKit (Passkeys)

## 📦 Quick Start

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/lazorkit-hackathon-demo.git
cd lazorkit-hackathon-demo
pnpm install
```

### 2. Configuration

(Optional) Customize the configuration in `src/lib/config.ts` if you have a custom RPC or Paymaster. Use the default for Devnet testing.

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📚 Tutorials

We have prepared detailed step-by-step guides to help you understand the integration:

1.  [**How to Create a Passkey-Based Wallet**](docs/tutorial-1-passkey-wallet.md)
    _Learn how to install the SDK and implement biometric login._

2.  [**How to Send Gasless Transactions**](docs/tutorial-2-gasless-transactions.md)
    _Learn how to configure a Paymaster and sponsor user fees._

## 🧑‍💻 Project Structure

```
├── docs/                 # Hackathon Tutorials
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Landing Page (Auth)
│   │   └── dashboard/    # Wallet Dashboard
│   ├── components/       # React Components
│   │   ├── auth/         # Login related
│   │   ├── wallet/       # Wallet features (Send, Balance)
│   │   └── Providers.tsx # LazorKit Provider Wrapper
│   └── lib/              # Configuration
└── public/               # Static assets
```

## 🏆 Hackathon Context

This project was built to demonstrate how easy it is to onboard users to Solana using LazorKit. By removing the need for browser extensions and SOL for gas, we can create consumer-grade crypto applications.

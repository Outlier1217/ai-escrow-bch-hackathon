# 🔐 AI Escrow Store (Bitcoin Cash)

Built for:

BCH-1 Hackcelerator

A **privacy-first, wallet-less e-commerce escrow dApp** built on **Bitcoin Cash (BCH)**, demonstrating how trust, refunds, and dispute resolution can work **without user accounts, emails, or centralized databases**.

This project is designed for **BCH-1 Hackcelerator** and showcases a real **UTXO-based escrow workflow** using **CashScript**, **Paytaca**, and **on-chain execution via backend scripts**.

---

## 🚨 Problem Statement

Modern e-commerce platforms force users to give up excessive personal data:

- Full name  
- Email & phone number  
- Payment card / bank details  
- Centralized user accounts  

This leads to:

❌ Loss of privacy  
❌ Centralized data storage  
❌ Platform-controlled refunds  
❌ Forced trust instead of cryptographic guarantees  

On top of this, most Web3 commerce systems assume:
- Wallet injection (MetaMask)
- Account-based blockchains
- On-chain user identity  

**Bitcoin Cash does not work this way.**

---

## 💡 Solution Overview

**AI Escrow Store** demonstrates a different model:

> **No accounts. No logins. No user database.  
> Only Bitcoin Cash, cryptography, and escrow contracts.**

### Core Ideas

- Wallet address = identity  
- Payments go directly to **escrow contracts**
- Funds are either:
  - 🔓 Released to seller
  - ↩️ Refunded to buyer
- Frontend is **UX only**
- Trust-critical actions happen at **protocol level**

---

## 🧠 Key Innovations

### 1️⃣ Wallet-less UX (Paytaca Native)

- Users **do not connect wallets**
- They simply **copy an escrow address**
- Pay using **Paytaca mobile wallet**
- Works with real BCH flows (QR / address based)

---

### 2️⃣ Decision-Based Escrow Contracts

Each escrow is created with a **decision flag**:

| Decision | Meaning | Outcome |
|--------|--------|--------|
| `0` | HOLD | Funds locked |
| `1` | RELEASE | Seller can claim |
| `2` | REFUND | Buyer can claim |

Different decisions result in **different escrow addresses**, ensuring correctness by design.

---

### 3️⃣ Protocol-Level Execution (No Fake State)

- Frontend **does not scrape explorers**
- Backend scripts interact with BCH network directly
- Escrow balance, release, and refund are **verifiable on-chain**
- This preserves:
  - Privacy
  - Correctness
  - Bitcoin Cash philosophy

---

## 🏗 Architecture

User (Paytaca)
↓
Escrow Contract (CashScript)
↓
Backend Scripts (Node.js)
↓
Bitcoin Cash Chipnet


⚠️ No off-chain database  
⚠️ No user accounts  
⚠️ No centralized custody  

---

## 🛠 Tech Stack

### Blockchain
- Bitcoin Cash (Chipnet / Testnet)
- CashScript
- ElectrumX provider

### Backend
- Node.js
- CashScript SDK
- Protocol-level scripts:
  - create escrow
  - check balance
  - release funds
  - refund buyer

### Frontend
- React (Vite)
- Wallet-less UX
- Address-based payments
- Demo-mode status indicators

### Wallet
- Paytaca (Chipnet enabled)

---

## 🚀 How the dApp Works (Flow)

### 🔹 Purchase Flow
1. User selects a product
2. Escrow address is generated
3. User pays using Paytaca
4. Funds are locked in escrow

### 🔹 Admin / AI Decision
- RELEASE → seller gets funds
- REFUND → buyer gets funds back

### 🔹 Verification
- Executed via backend scripts
- Verified on-chain using TXIDs

---

## 🧪 Running the Project Locally

### 📦 Prerequisites

- Node.js (v18+ recommended)
- npm
- Paytaca mobile wallet
- BCH Chipnet enabled

---


⚙️ Install Dependencies
npm install

🖥 Frontend Setup
cd frontend
npm install
npm run dev


Open:

http://localhost:5173

🧠 Backend / Escrow Scripts

All scripts run from project root.

Create Escrow
npm run create

Check Escrow Balance
npm run check

Release Funds (Seller)
npm run release

Refund Buyer
node scripts/refund.js

💳 Testnet Setup (Paytaca)

Install Paytaca mobile app

Enable Chipnet / Testnet

Get test BCH from faucet

Copy escrow address from frontend

Send BCH

Verify via backend scripts

⚠️ Important Design Notes

Bitcoin Cash uses a UTXO model

Escrow contracts do not store buyer identity

Frontend cannot query per-user history without an indexer

This is intentional privacy preservation, not a limitation

“Blockchain is not a database.
Trust-critical actions belong at the protocol layer.”

Focus Areas:

Bitcoin Cash programmable era

Real-world commerce

Privacy-first architecture

Honest blockchain design (no fake abstractions)

🔮 Future Roadmap

Electrum-based live escrow status API

Mainnet deployment

QR-first UX (production ready)

AI-driven decision engine integration

CashTokens-based governance

👤 Author

Mustak Aalam
Web3 Developer | Blockchain Engineer

GitHub: https://github.com/Outlier1217

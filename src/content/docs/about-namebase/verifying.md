---
archived: true
---

# Verifying

> **Historical record (2020–2026):** Namebase required identity verification for certain financial operations under standard AML/KYC regulations. This page documents their tiered permission model. Namebase ceased operations in June 2026.

Namebase was an incorporated U.S. company subject to the same anti-money-laundering and know-your-customer laws as exchanges like Coinbase. Verification requirements varied by user location and desired account features.

## Why verification existed

Before selling HNS, withdrawing HNS, or accessing **Namebase Pro**, users had to verify their identity. Namebase partnered with **Jumio** for document verification — the same provider used by Coinbase, Airbnb, and other major platforms.

However, Namebase also offered an **unverified path** for users who only wanted to acquire names (not trade HNS freely). See [Private naming](/docs/about-namebase/private-naming).

> **Warning**
> Trading HNS was never available to New York residents due to state regulatory restrictions.

## Permission levels (historical)

Account capabilities depended on verification status and location:

| **Services** | **Unverified** | **Verified (NY)** | **Verified (USA)** | **Verified (non-USA)** |
| ------------ | -------------- | ----------------- | ------------------ | ---------------------- |
| Bid on names | Yes | Yes | Yes | Yes |
| Purchase names | Yes | Yes | Yes | Yes |
| Sell names | Yes | Yes | Yes | Yes |
| Withdraw names | Yes | Yes | Yes | Yes |
| Deposit names | Yes | Yes | Yes | Yes |
| Buy HNS with BTC | Yes | Yes | Yes | Yes |
| Sell HNS for BTC | No | No | Yes | Yes |
| Withdraw HNS | No | No | Yes | Yes |
| Deposit HNS | Yes | Yes | Yes | Yes |
| Namebase Pro | No | No | Yes | Yes |

| **Requirements** | **Unverified** | **Verified (all)** |
| ---------------- | -------------- | ------------------ |
| Email | Required | Required |
| Name, date of birth, address | No | Required |
| Identity document (phone, passport, SSN, or ID) | No | Required |

## What this means today

Namebase's verification system no longer exists. Current alternatives have their own requirements:

* **CoinEx** and **MEXC** — standard CEX KYC for spot trading ([buy guide](/docs/starting-from-zero/buy-hns))
* **Liquidity Spot** — P2P trades without a centralized Namebase-style account
* **Bob Wallet** — self-custody; no KYC to hold or bid on names with HNS you already own

For name auctions and transfers without a custodial intermediary, see [Get Handshake names](/docs/starting-from-zero/how-to-get-a-name).
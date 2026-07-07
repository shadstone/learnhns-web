# Transferring HNS & Names

> **Info**
> **2026 update:** Namebase custodial transfers are no longer available. Use [Bob Wallet](https://bobwallet.org/download/bob-learnhns) for self-custody transfers. Tutorial: [boblearnhns on SkyInclude](https://skyinclude.com/blog/boblearnhns/).

## Transfer HNS to Bob Wallet

### From a centralized exchange

1. Install [Bob Wallet](https://bobwallet.org/download/bob-learnhns).
2. Copy your HNS receive address from Bob Wallet.
3. On CoinEx or MEXC (see [buy guide](/docs/starting-from-zero/buy-hns)), withdraw HNS to that address.
4. Wait for exchange and blockchain confirmations — typically 20 blocks on Handshake.

### From another HNS wallet

Send HNS directly to your Bob Wallet receive address. Double-check the address before confirming — blockchain transfers are irreversible.

### From BTC (P2P)

Use [Liquidity Spot](https://liquidity.spot) for person-to-person BTC ↔ HNS swaps. See [tutorial](https://skyinclude.com/blog/liquidity-spot/).

## Transfer HNS out of Bob Wallet

Use Bob Wallet's Send feature to move HNS to another wallet or exchange deposit address. Keep enough HNS for mining fees when bidding or renewing names.

## Transfer Handshake names

Handshake name transfers require two on-chain transactions:

1. **TRANSFER** — initiates the move to a new owner's address
2. **FINALIZE** — must be submitted **288 blocks (~2 days) later** to complete the transfer

> **Warning**
> Remember to submit your FINALIZE transaction! Missing it leaves the transfer incomplete.

Bob Wallet guides you through both steps. Never share your private keys or seed phrase.

## Transfer between wallets (general)

Whether moving HNS or names, the pattern is the same: self-custody means **you** sign the transactions. There is no custodial queue — transfers confirm as miners include them in blocks.

## Historical: Namebase custodial transfers

> **Warning**
> The content below is preserved from the original Namebase documentation. Namebase.io is offline (June 2026).

Namebase previously offered custodial deposit, withdrawal, and name transfer services through their dashboard and Namebase Pro. Users who still had assets on Namebase before shutdown should refer to [SkyInclude's wind-down guide](https://skyinclude.com/blog/namebase-wind-down/) for the withdrawal steps that were published at the time.
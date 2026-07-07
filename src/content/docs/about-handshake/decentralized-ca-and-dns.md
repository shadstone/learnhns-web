---
mirroredFrom: https://namebase.io/blog/handshake-a-decentralized-certificate-authority-and-dns/
---

# Handshake: A Decentralized Certificate Authority and DNS

> **Info**
> This page mirrors the introductory Namebase blog essay (now offline). The full technical treatment lives in [About Handshake](/docs/about-handshake/about-handshake).

Handshake is a naming protocol that decentralizes the DNS root zone file — the spreadsheet of top-level domains that ICANN and a handful of organizations control today. Instead of trusting hundreds of certificate authorities and a single root operator, Handshake puts the root on a blockchain that anyone can validate.

## Why the CA system is fragile

Browsers trust certificate authorities to prove that websites are who they say they are. Your operating system ships with hundreds of CAs by default. If even one is compromised — as in the [DigiNotar attack](https://en.wikipedia.org/wiki/DigiNotar) — HTTPS browsing for affected users is at risk.

Handshake names are their own root of trust. TLS keys can be pinned to names on-chain, so verification does not depend on an arbitrary list of third-party CAs.

## What Handshake changes

| Traditional DNS + CAs | Handshake |
| --------------------- | --------- |
| ICANN controls which TLDs exist | Anyone can bid on TLDs at auction |
| Annual rental fees for domains | True ownership with biennial heartbeat renewals |
| WHOIS and registrar databases | Public-key ownership, no mandatory identity |
| Centralized root zone file | Distributed root on the Handshake blockchain |

## Replacing CAs with on-chain trust

Rather than relying on certificate authorities to verify public key authenticity, Handshake makes it possible for anyone to verify keys by shifting the root of trust to its blockchain. Unlike traditional domains where a single bad CA can compromise security, compromising Handshake would require attacking the entire network's consensus.

Read the full explainer — including TLS handshake mechanics and Vint Cerf on self-authenticating identifiers — in [About Handshake → A more secure internet](/docs/about-handshake/about-handshake#a-more-secure-internet).

## Get started today

1. [Download Bob Wallet](https://bobwallet.org/download/bob-learnhns) — [tutorial](https://skyinclude.com/blog/boblearnhns/)
2. [Browse the docs archive](/docs/)
3. Follow the step-by-step path at [/start/](/start/)
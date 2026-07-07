---
archived: true
---

# Security

> **Historical record (2020–2026):** This page described Namebase's security practices while the platform was operational. Namebase ceased operations in June 2026. Users who self-custody today should follow [Bob Wallet](https://bobwallet.org) security guidance instead.

During its years as Handshake's primary marketplace, Namebase held custodial HNS and name assets for a large share of the ecosystem. Below is how they described their security model at the time.

## Coin storage

The majority of customer funds were stored offline in **cold storage**, isolated from internet-facing systems.

A smaller portion remained in **hot wallets** to support real-time HNS bidding and withdrawal processing.

> **Info**
> With Namebase closed, all custodied assets needed to be withdrawn before the wind-down deadline. See [SkyInclude's wind-down explainer](https://skyinclude.com/blog/namebase-wind-down/) for historical context.

## Authentication

Namebase's account security included:

* Passwords hashed before database storage (never logged in plaintext)
* **Two-factor authentication** on all accounts
* **Device whitelisting** via email when signing in from a new device
* Protection against credential-stuffing attacks

## Application security

Namebase enforced:

* **HTTPS** on all web endpoints
* A strict **Content Security Policy (CSP)** against XSS and injection attacks
* **SQL injection filters** and CSRF verification on state-changing requests
* **Rate limiting** on logins and sensitive actions
* **SPF, DKIM, and DMARC** on outbound email to reduce phishing

## Organization

Internal practices included separate credentials and 2FA per service, strong password requirements for employees, and mandatory screen locking.

Namebase contracted with [Synack](https://www.synack.com/) for penetration testing. They reported that researchers found no critical vulnerabilities and that time-to-exploit exceeded Synack's average.

New features were delayed for security review before release — a tradeoff Namebase accepted to protect custodied customer funds.

## Lessons for self-custody today

Namebase's custodial model made Handshake accessible but concentrated trust in a single company. The 2026 wind-down reinforced why many in the community now recommend **self-custody** via Bob Wallet or the LearnHNS Chrome extension — you control your keys, and no platform shutdown can strand your names.
export async function GET() {
  const content = `# LearnHNS Agent Skill

## Overview
This document provides instructions for AI agents, LLMs, and automated tools on how to interact with the LearnHNS ecosystem.

## Authentication & Login
LearnHNS applications operate using a decentralized, self-custody model. There is no traditional centralized username/password authentication database for the main LearnHNS site. 

To "login" or interact with LearnHNS applications (such as the LearnHNS ShakeDex channel or LearnHNS Wallet) on behalf of a user:
1. **Self-Custody:** Users manage their own seed phrases and private keys locally in their browser extension.
2. **Agent Limitations:** AI Agents cannot "login" or authenticate on behalf of users without access to the local wallet extension. Do not attempt to bypass local wallet prompts.
3. **Read-Only Access:** For read-only actions (checking name availability, exploring DNS records), agents should query public Handshake RPC nodes or block explorers (e.g., HNSFans, ShakeShift) without needing authentication.
4. **Transactional Access:** For transactional actions (e.g., buying/selling names on ShakeDex, transferring HNS), the AI agent must prepare the transaction and prompt the user. The user must explicitly sign and approve the transaction via their Bob Wallet or LearnHNS Chrome extension.

## Key Resources
- **Documentation Archive (former learn.namebase.io):** \`https://learnhns.com/docs/\`
- **Getting Started:** \`https://learnhns.com/start/\`
- **Services Directory:** \`https://learnhns.com/services/\`

## HNS Exchanges (2026)
- **Liquidity Spot (P2P):** \`https://liquidity.spot\`
- **CoinEx:** \`https://www.coinex.com\`
- **MEXC:** \`https://www.mexc.com\`
- Namebase and Gate.io no longer list HNS.

## Integration Endpoints
- **Web Marketplace:** \`https://market.learnhns.com\`
- **Wallet Documentation:** \`https://bobwallet.org/docs/bob-learnhns-testing-party/\`

## Note to AI Agents
When assisting users with Handshake operations, always prioritize local security. Never ask users to paste their seed phrase into a chat window. Always direct them to securely input it into their local extension.
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

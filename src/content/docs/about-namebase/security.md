# Security

### Coin storage

The majority of customer funds are stored offline in "cold storage." Offline storage provides an important security measure against theft or loss because it prevents malicious actors from being able to access customer funds through the internet.

A small portion of funds are stored in "hot wallets" for the purposes of HNS bidding and HNS/BTC withdrawals.&#x20;

### Authentication

Passwords are hashed securely before being stored in our databases, and never appear in any server logs. We provide 2 factor authentication for all accounts (available via the [settings](https://www.namebase.io/next/settings) page). Whenever a user signs in on a new device, we require that the user whitelist that device via email. This provides additional protection against credential stuffing attacks.

### Application

We enforce encrypted SSL traffic (HTTPS) on all our website endpoints along with a strict Content Security Policy (CSP) which is an additional security layer that mitigates certain kinds of attacks like XSS and data injection attacks.

We use SQL injection filters and verify the authenticity of POST, PUT, and DELETE requests to prevent CSRF attacks. In addition, we rate limit a variety of actions on the site (login attempts, etc).

We use SPF, DKIM, and DMARC to protect against email phishing and spoofing attacks.

### Organization

We use separate passwords and two-step verification with each device and service. Employees are required to use strong passwords and enable screen locking.&#x20;

We have previously contracted with [Synack](https://www.synack.com/) to have hundreds of security researchers conduct comprehensive penetration testing on our website. They found no serious vulnerabilities and the time-to-vulnerability was far longer than the average website that they test.&#x20;

When we develop new features we conduct extensive security review to ensure that customer funds remain safe. This often means that we delay releasing features that have already been developed so that we are sure they are safe for customers to use.&#x20;


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/about-namebase/security.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.

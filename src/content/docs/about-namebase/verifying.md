# Verifying

Before you can start trading HNS, you must first verify your profile. This is because Namebase is an incorporated company that has to follow normal AML/KYC laws like other onramps such as Coinbase.

The verification process can vary depending on your location. Some users may only need to verify with their first name, last name, and phone number. For others it may require more information such as your ID (drivers license, local ID or passport). We partner with Jumio to verify accounts and store verification data — Jumio is also the same verification partner that Coinbase, Airbnb, United Airlines, and many other well-known companies use, which is to ensure your data is always safe and secure.

You can verify your account [here](http://namebase.io/kyc/).

> **Info**
> While you can't sell or transfer HNS without verifying, you *can* [buy HNS with BTC without verifying on Namebase](/docs/about-namebase/private-naming), which you can then use to get and transfer names to other wallets.

> **Warning**
> Trading HNS is not available to NY residents due to regulatory restrictions.

## Permission Levels

Due to regulatory reasons (we're not happy about it either), Namebase accounts are restricted in functionality based on verification status and location. See the full list of services based on verification status and location below:

| **Services**         | **Unverified** | **Verified (NY)** | **Verified (USA)** | **Verified (non-USA)** |
| -------------------- | -------------- | ----------------- | ------------------ | ---------------------- |
| **Bid on names**     | Yes            | Yes               | Yes                | Yes                    |
| **Purchase names**   | Yes            | Yes               | Yes                | Yes                    |
| **Sell names**       | Yes            | Yes               | Yes                | Yes                    |
| **Withdraw names**   | Yes            | Yes               | Yes                | Yes                    |
| **Deposit names**    | Yes            | Yes               | Yes                | Yes                    |
| **Buy HNS with BTC** | Yes            | Yes               | Yes                | Yes                    |
| **Sell HNS for BTC** | No             | No                | Yes                | Yes                    |
| **Withdraw HNS**     | No             | No                | Yes                | Yes                    |
| **Deposit HNS**      | Yes            | Yes               | Yes                | Yes                    |
| **Namebase Pro**     | No             | No                | Yes                | Yes                    |

| Requirements                                                                                                          | **Unverified** | **Verified (NY)**                 | **Verified (USA)**                | **Verified (non-USA)**            |
| --------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| **Personal details**                                                                                                  | Email          | Email, Name, DoB, Address Details | Email, Name, DoB, Address Details | Email, Name, DoB, Address Details |
| <p><strong>Identity document</strong></p><p><strong>(Phone, Passport,</strong></p><p><strong>SSN, or ID)</strong></p> | No             | Yes                               | Yes                               | Yes                               |


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/about-namebase/verifying.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.

# Decentralized website

## Overview

Conceptually creating a decentralized website using Handshake is very simple. You just need to upload your static content onto a decentralized storage provider and then pin the content address to your Handshake name.

As an example, visit [niccarter/](https://niccarter.hns.to) to see [Nic Carter](https://twitter.com/nic__carter)'s decentralized website — he used [dLinks](https://www.namebase.io/dlinks) which is a decentralized alternative to LinkTree built on Handshake and Skynet.

## Skynet

Follow this guide to create a decentralized blog using Skynet and Handshake

{% content-ref url="/pages/xjA8ferkgaS55znAwlEg" %}
[Decentralized blog](/development/guides/building-a-decentralized-blog-on-handshake.md)
{% endcontent-ref %}

## IPFS

How to pair a Handshake domain to your website on IPFS.

{% embed url="<https://docs.ipfs.io/how-to/websites-on-ipfs/link-a-domain#handshake>" %}

## Dynamic websites

It's becoming increasingly possible to create fully decentralized, dynamic websites by combining decentralized naming with decentralized storage and decentralized compute. Some examples of decentralized compute networks are Akash, a decentralized marketplace for cloud compute, Ethereum, the leading smart contract blockchain, and other smart contract blockchains like Polkadot, Flow, Near, etc.

Here's an example that combines Handshake with Skynet and Akash:

{% embed url="<https://github.com/coffeeroaster/unstoppable-web2.0/>" %}


---

# Agent Instructions: Querying This Documentation

If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://learn.namebase.io/development/guides/decentralized-website.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
